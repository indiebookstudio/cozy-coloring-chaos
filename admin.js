/**
 * ============================================================================
 * COZY COLORING CHAOS - ADMIN CMS SCRIPT
 * ============================================================================
 * Handles single-admin authentication, TikTok oEmbed import workflow,
 * CRUD operations for fan videos, and instant updates.
 */

let adminVideos = [];
let pendingDeleteId = null;

// DOM references
const loginView = document.getElementById('admin-login-view');
const dashboardView = document.getElementById('admin-dashboard-view');
const loginForm = document.getElementById('admin-login-form');
const loginPasswordInput = document.getElementById('admin-password');
const loginErrorAlert = document.getElementById('admin-login-error');
const loginSubmitBtn = document.getElementById('admin-login-submit');

const videosTbody = document.getElementById('admin-videos-tbody');
const videoCountEl = document.getElementById('admin-video-count');
const searchInput = document.getElementById('admin-search-input');
const toastEl = document.getElementById('admin-toast');

// Modal references
const modalEl = document.getElementById('admin-modal');
const modalTitle = document.getElementById('admin-modal-title');
const importSection = document.getElementById('admin-import-section');
const tiktokUrlInput = document.getElementById('admin-tiktok-url');
const importBtn = document.getElementById('admin-import-btn');
const importBtnText = document.getElementById('admin-import-btn-text');
const importSpinner = document.getElementById('admin-import-spinner');
const importErrorAlert = document.getElementById('admin-import-error');
const importWarningAlert = document.getElementById('admin-import-warning');

const previewBox = document.getElementById('admin-preview-box');
const previewImg = document.getElementById('admin-preview-img');
const previewCreatorName = document.getElementById('admin-preview-creator-name');
const previewCreatorHandle = document.getElementById('admin-preview-creator-handle');
const previewCaption = document.getElementById('admin-preview-caption');

const videoForm = document.getElementById('admin-video-form');
const formVideoId = document.getElementById('admin-form-video-id');
const formTiktokId = document.getElementById('admin-form-tiktok-id');
const formUsername = document.getElementById('admin-creator-username');
const formCreatorName = document.getElementById('admin-creator-name');
const formCaption = document.getElementById('admin-caption');
const formBookSelect = document.getElementById('admin-book-select');
const formCategorySelect = document.getElementById('admin-category-select');
const formLangSelect = document.getElementById('admin-lang-select');
const formThumbnailUrl = document.getElementById('admin-thumbnail-url');
const formAvatarUrl = document.getElementById('admin-avatar-url');
const formSortOrder = document.getElementById('admin-sort-order');
const formFeaturedCheckbox = document.getElementById('admin-featured-checkbox');
const formPublishedCheckbox = document.getElementById('admin-published-checkbox');
const saveBtn = document.getElementById('admin-save-btn');
const saveBtnText = document.getElementById('admin-save-btn-text');
const saveSpinner = document.getElementById('admin-save-spinner');

const deleteModal = document.getElementById('admin-delete-modal');

/**
 * Initialize on load: check session auth.
 */
async function initAdmin() {
  populateAdminBookOptions();
  await checkAuth();
}

/**
 * Populates the Book Select dropdown from the catalog in script.js.
 */
function populateAdminBookOptions() {
  if (!formBookSelect) return;
  const catalog = (typeof BOOKS !== 'undefined' && Array.isArray(BOOKS)) ? BOOKS : [];
  
  formBookSelect.innerHTML = `<option value="unassigned">Unassigned / General</option>`;
  catalog.forEach(b => {
    const opt = document.createElement('option');
    opt.value = b.id;
    opt.textContent = b.author ? `${b.title} (${b.author})` : b.title;
    formBookSelect.appendChild(opt);
  });
}

/**
 * Checks server-side if session is valid.
 */
async function checkAuth() {
  try {
    const res = await fetch('/api/admin-auth');
    if (res.ok) {
      const data = await res.json();
      if (data.authenticated) {
        showDashboard();
        await fetchAdminVideos();
        return;
      }
    }
  } catch (e) {
    console.error('Session check failed:', e);
  }
  showLogin();
}

function showLogin() {
  if (loginView) loginView.style.display = 'flex';
  if (dashboardView) dashboardView.style.display = 'none';
  if (loginPasswordInput) {
    loginPasswordInput.value = '';
    loginPasswordInput.focus();
  }
}

function showDashboard() {
  if (loginView) loginView.style.display = 'none';
  if (dashboardView) dashboardView.style.display = 'block';
}

/**
 * Handles Admin Login Form submission.
 */
window.handleAdminLogin = async function(e) {
  e.preventDefault();
  if (loginErrorAlert) loginErrorAlert.style.display = 'none';

  const password = loginPasswordInput?.value || '';
  if (!password) return;

  if (loginSubmitBtn) loginSubmitBtn.disabled = true;

  try {
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showDashboard();
      await fetchAdminVideos();
    } else {
      if (loginErrorAlert) {
        loginErrorAlert.textContent = data.error || 'Invalid password. Please try again.';
        loginErrorAlert.style.display = 'block';
      }
    }
  } catch (err) {
    if (loginErrorAlert) {
      loginErrorAlert.textContent = 'Network or server error. Please try again.';
      loginErrorAlert.style.display = 'block';
    }
  } finally {
    if (loginSubmitBtn) loginSubmitBtn.disabled = false;
  }
};

/**
 * Handles Admin Logout.
 */
window.handleAdminLogout = async function() {
  try {
    await fetch('/api/admin-auth', { method: 'DELETE' });
  } catch (e) {}
  showLogin();
};

/**
 * Fetches all video records (including unpublished) from the server.
 */
async function fetchAdminVideos() {
  try {
    const res = await fetch('/api/admin-videos');
    if (res.status === 401) {
      showLogin();
      return;
    }
    const data = await res.json();
    if (data.success && Array.isArray(data.videos)) {
      adminVideos = data.videos;
      renderAdminTable(adminVideos);
    }
  } catch (err) {
    console.error('Failed to fetch admin videos:', err);
    showToast('Failed to load videos', 'error');
  }
}

/**
 * Quick search within the admin table.
 */
window.handleAdminSearch = function() {
  const query = (searchInput?.value || '').trim().toLowerCase();
  if (!query) {
    renderAdminTable(adminVideos);
    return;
  }

  const filtered = adminVideos.filter(v => {
    const text = `${v.creator_username} ${v.creator_name} ${v.caption} ${v.book_slug} ${v.category}`.toLowerCase();
    return text.includes(query);
  });
  renderAdminTable(filtered);
};

/**
 * Renders the videos in the admin table.
 */
function renderAdminTable(videos) {
  if (!videosTbody) return;
  if (videoCountEl) {
    videoCountEl.textContent = `${videos.length} video${videos.length === 1 ? '' : 's'} in database`;
  }

  if (videos.length === 0) {
    videosTbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 2.5rem; color: var(--color-text-muted);">
          No videos found. Click <strong>+ ADD VIDEO</strong> above to import your first TikTok!
        </td>
      </tr>
    `;
    return;
  }

  videosTbody.innerHTML = videos.map(v => {
    const safeCaption = escapeHtml(v.caption || '');
    const dateFormatted = v.created_at ? new Date(v.created_at).toLocaleDateString() : '-';
    const bookTitle = getBookTitle(v.book_slug);
    const localFallback = `assets/fan-videos/${v.tiktok_video_id}.jpg`;
    const thumb = v.thumbnail_url || localFallback;

    return `
      <tr data-id="${v.id}">
        <td>
          <img 
            src="${thumb}" 
            alt="Thumb" 
            class="admin-table-thumb" 
            onerror="if(this.src!=='${localFallback}') this.src='${localFallback}';"
          >
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <img 
              src="${v.creator_avatar_url || `assets/fan-videos/avatars/${v.creator_username}.jpg`}" 
              alt="" 
              style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 1px solid var(--color-border);"
              onerror="this.style.display='none';"
            >
            <div class="admin-table-creator">
              <strong>${escapeHtml(v.creator_name || v.creator_username)}</strong>
              <a href="${v.creator_profile_url || `https://www.tiktok.com/@${v.creator_username}`}" target="_blank" class="admin-table-handle">
                @${escapeHtml(v.creator_username)} ↗
              </a>
            </div>
          </div>
          <div class="admin-table-caption-preview" title="${safeCaption}" style="margin-top: 0.35rem;">${safeCaption}</div>
        </td>
        <td>
          <span class="admin-chip admin-chip-book">${escapeHtml(bookTitle)}</span>
        </td>
        <td>
          <span class="admin-chip admin-chip-cat">${escapeHtml((v.category || 'other').toUpperCase())}</span>
        </td>
        <td>
          <span class="admin-table-lang">${(v.language || 'en').toUpperCase()}</span>
        </td>
        <td style="font-size: 0.8rem; color: var(--color-text-light);">
          ${dateFormatted}
        </td>
        <td>
          <button 
            type="button" 
            class="admin-badge-toggle ${v.published ? 'status-published' : 'status-draft'}" 
            onclick="togglePublish('${v.id}', ${v.published})"
            title="Click to toggle publish status"
          >
            ${v.published ? 'Published' : 'Hidden'}
          </button>
        </td>
        <td>
          <button 
            type="button" 
            class="admin-badge-toggle ${v.featured ? 'status-featured' : 'status-standard'}" 
            onclick="toggleFeatured('${v.id}', ${v.featured})"
            title="Click to toggle featured status"
          >
            ${v.featured ? '★ Yes' : 'No'}
          </button>
        </td>
        <td style="text-align: right;">
          <div class="admin-table-actions">
            <a 
              href="${v.tiktok_url}" 
              target="_blank" 
              class="admin-action-btn" 
              title="View on TikTok"
              aria-label="View on TikTok"
            >
              ↗
            </a>
            <button 
              type="button" 
              class="admin-action-btn admin-action-edit" 
              onclick="openEditVideoModal('${v.id}')"
              title="Edit video metadata"
              aria-label="Edit video"
            >
              ✎
            </button>
            <button 
              type="button" 
              class="admin-action-btn admin-action-delete" 
              onclick="confirmDeleteVideo('${v.id}')"
              title="Delete video"
              aria-label="Delete video"
            >
              🗑
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/**
 * Opens Add Video modal.
 */
window.openAddVideoModal = function() {
  if (modalTitle) modalTitle.textContent = 'Add TikTok Video';
  if (importSection) importSection.style.display = 'block';
  if (previewBox) previewBox.style.display = 'none';
  if (importErrorAlert) importErrorAlert.style.display = 'none';
  if (importWarningAlert) importWarningAlert.style.display = 'none';

  if (tiktokUrlInput) tiktokUrlInput.value = '';
  if (formVideoId) formVideoId.value = '';
  if (formTiktokId) formTiktokId.value = '';
  if (formUsername) formUsername.value = '';
  if (formCreatorName) formCreatorName.value = '';
  if (formCaption) formCaption.value = '';
  if (formBookSelect) formBookSelect.value = 'unassigned';
  if (formCategorySelect) formCategorySelect.value = 'other';
  if (formLangSelect) formLangSelect.value = 'en';
  if (formThumbnailUrl) formThumbnailUrl.value = '';
  if (formAvatarUrl) formAvatarUrl.value = '';
  if (formSortOrder) formSortOrder.value = '0';
  if (formFeaturedCheckbox) formFeaturedCheckbox.checked = false;
  if (formPublishedCheckbox) formPublishedCheckbox.checked = true;

  if (saveBtnText) saveBtnText.textContent = 'SAVE / PUBLISH';

  if (modalEl) {
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    if (tiktokUrlInput) tiktokUrlInput.focus();
  }
};

/**
 * Opens Edit Video modal with existing data.
 */
window.openEditVideoModal = function(id) {
  const video = adminVideos.find(v => v.id === id);
  if (!video) return;

  if (modalTitle) modalTitle.textContent = `Edit Video (@${video.creator_username})`;
  // Hide import step during edit
  if (importSection) importSection.style.display = 'none';

  if (formVideoId) formVideoId.value = video.id;
  if (formTiktokId) formTiktokId.value = video.tiktok_video_id || '';
  if (formUsername) formUsername.value = video.creator_username || '';
  if (formCreatorName) formCreatorName.value = video.creator_name || '';
  if (formCaption) formCaption.value = video.caption || '';
  if (formBookSelect) formBookSelect.value = video.book_slug || 'unassigned';
  if (formCategorySelect) formCategorySelect.value = video.category || 'other';
  if (formLangSelect) formLangSelect.value = video.language || 'en';
  if (formThumbnailUrl) formThumbnailUrl.value = video.thumbnail_url || '';
  if (formAvatarUrl) formAvatarUrl.value = video.creator_avatar_url || '';
  if (formSortOrder) formSortOrder.value = video.sort_order ?? 0;
  if (formFeaturedCheckbox) formFeaturedCheckbox.checked = !!video.featured;
  if (formPublishedCheckbox) formPublishedCheckbox.checked = video.published !== false;

  // Show preview box
  if (previewBox) {
    previewBox.style.display = 'flex';
    if (previewImg) previewImg.src = video.thumbnail_url || `assets/fan-videos/${video.tiktok_video_id}.jpg`;
    if (previewCreatorName) previewCreatorName.textContent = video.creator_name || video.creator_username;
    if (previewCreatorHandle) previewCreatorHandle.textContent = `@${video.creator_username}`;
    if (previewCaption) previewCaption.textContent = video.caption || '';
  }

  if (saveBtnText) saveBtnText.textContent = 'UPDATE VIDEO';

  if (modalEl) {
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
};

/**
 * Closes Add / Edit Modal.
 */
window.closeAdminModal = function() {
  if (modalEl) {
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
};

/**
 * Imports TikTok oEmbed metadata when user clicks [ IMPORT ].
 */
window.handleImportTikTok = async function() {
  const url = (tiktokUrlInput?.value || '').trim();
  if (!url) {
    showImportError('Inserisci un link video TikTok valido (es. https://www.tiktok.com/@creator/video/123456789 o link breve).');
    return;
  }

  if (importErrorAlert) importErrorAlert.style.display = 'none';
  if (importWarningAlert) importWarningAlert.style.display = 'none';
  if (importBtn) importBtn.disabled = true;
  if (importBtnText) importBtnText.style.display = 'none';
  if (importSpinner) importSpinner.style.display = 'inline-block';

  try {
    const res = await fetch('/api/admin-import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    if (res.ok && data.success && data.metadata) {
      const meta = data.metadata;
      
      // Update input to canonical clean URL if available
      if (meta.tiktok_url && tiktokUrlInput) {
        tiktokUrlInput.value = meta.tiktok_url;
      }

      // Auto-populate form fields
      if (formTiktokId) formTiktokId.value = meta.tiktok_video_id || '';
      if (formUsername) formUsername.value = meta.creator_username || '';
      if (formCreatorName) formCreatorName.value = meta.creator_name || meta.creator_username || '';
      if (formCaption) formCaption.value = meta.caption || '';
      if (formThumbnailUrl) formThumbnailUrl.value = meta.thumbnail_url || '';
      
      if (formBookSelect && meta.suggested_book_slug) {
        formBookSelect.value = meta.suggested_book_slug;
      }
      if (formCategorySelect && meta.suggested_category) {
        formCategorySelect.value = meta.suggested_category;
      }
      if (formLangSelect && meta.suggested_language) {
        formLangSelect.value = meta.suggested_language;
      }

      // Show live preview
      if (previewBox) {
        previewBox.style.display = 'flex';
        if (previewImg) {
          previewImg.src = meta.thumbnail_url || 'assets/fan-videos/7690225937111158048.jpg';
        }
        if (previewCreatorName) previewCreatorName.textContent = meta.creator_name || meta.creator_username || 'Creator';
        if (previewCreatorHandle) previewCreatorHandle.textContent = meta.creator_username ? `@${meta.creator_username}` : '';
        if (previewCaption) previewCaption.textContent = meta.caption || '(Nessuna didascalia automatica)';
      }

      if (data.warning) {
        if (importWarningAlert) {
          importWarningAlert.textContent = data.warning;
          importWarningAlert.style.display = 'block';
        }
        showToast('Link riconosciuto! Completa la didascalia o i dettagli qui sotto e salva.', 'info');
      } else {
        showToast('Metadati importati da TikTok con successo! Verifica e salva.', 'success');
      }
    } else {
      showImportError(data.error || 'Impossibile importare i metadati da TikTok.');
    }
  } catch (err) {
    showImportError('Errore di rete durante la connessione al server.');
  } finally {
    if (importBtn) importBtn.disabled = false;
    if (importBtnText) importBtnText.style.display = 'inline';
    if (importSpinner) importSpinner.style.display = 'none';
  }
};

function showImportError(msg) {
  if (importWarningAlert) importWarningAlert.style.display = 'none';
  if (importErrorAlert) {
    importErrorAlert.textContent = msg;
    importErrorAlert.style.display = 'block';
  }
}

/**
 * Handles Form Save / Publish.
 */
window.handleSaveVideo = async function(e) {
  e.preventDefault();

  const id = formVideoId?.value || null;
  const rawUrl = (tiktokUrlInput?.value || '').trim();
  const tiktokId = formTiktokId?.value || '';
  const username = (formUsername?.value || '').trim().replace(/^@/, '');
  const creatorName = (formCreatorName?.value || '').trim() || username;
  const caption = (formCaption?.value || '').trim();
  const bookSlug = formBookSelect?.value || 'unassigned';
  const category = formCategorySelect?.value || 'other';
  const language = formLangSelect?.value || 'en';
  const thumbUrl = (formThumbnailUrl?.value || '').trim();
  const avatarUrl = (formAvatarUrl?.value || '').trim();
  const sortOrder = parseInt(formSortOrder?.value || '0', 10);
  const featured = !!formFeaturedCheckbox?.checked;
  const published = !!formPublishedCheckbox?.checked;

  if (!username) {
    alert('Creator username is required.');
    return;
  }

  const payload = {
    tiktok_video_id: tiktokId,
    creator_username: username,
    creator_name: creatorName,
    creator_profile_url: `https://www.tiktok.com/@${username}`,
    creator_avatar_url: avatarUrl,
    caption: caption,
    book_slug: bookSlug,
    category: category,
    language: language,
    thumbnail_url: thumbUrl,
    sort_order: sortOrder,
    featured: featured,
    published: published
  };

  if (!id) {
    if (!rawUrl) {
      alert('TikTok URL is required.');
      return;
    }
    payload.tiktok_url = rawUrl;
  } else {
    payload.id = id;
  }

  if (saveBtn) saveBtn.disabled = true;
  if (saveBtnText) saveBtnText.style.display = 'none';
  if (saveSpinner) saveSpinner.style.display = 'inline-block';

  try {
    const method = id ? 'PUT' : 'POST';
    const res = await fetch('/api/admin-videos', {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok && data.success) {
      showToast(id ? 'Video updated successfully!' : 'Video published to gallery!', 'success');
      closeAdminModal();
      await fetchAdminVideos();
    } else {
      alert(data.error || 'Failed to save video record.');
    }
  } catch (err) {
    alert('Error saving video. Please check your connection.');
  } finally {
    if (saveBtn) saveBtn.disabled = false;
    if (saveBtnText) saveBtnText.style.display = 'inline';
    if (saveSpinner) saveSpinner.style.display = 'none';
  }
};

/**
 * Toggles published status directly from table.
 */
window.togglePublish = async function(id, currentStatus) {
  try {
    const res = await fetch('/api/admin-videos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, published: !currentStatus })
    });
    if (res.ok) {
      showToast(!currentStatus ? 'Video published' : 'Video unpublished', 'success');
      await fetchAdminVideos();
    }
  } catch (e) {
    showToast('Failed to update status', 'error');
  }
};

/**
 * Toggles featured status directly from table.
 */
window.toggleFeatured = async function(id, currentStatus) {
  try {
    const res = await fetch('/api/admin-videos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, featured: !currentStatus })
    });
    if (res.ok) {
      showToast(!currentStatus ? 'Marked as featured' : 'Unmarked featured', 'success');
      await fetchAdminVideos();
    }
  } catch (e) {
    showToast('Failed to update status', 'error');
  }
};

/**
 * Opens delete confirmation dialog.
 */
window.confirmDeleteVideo = function(id) {
  pendingDeleteId = id;
  if (deleteModal) {
    deleteModal.classList.add('active');
    deleteModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
};

window.closeAdminDeleteModal = function() {
  pendingDeleteId = null;
  if (deleteModal) {
    deleteModal.classList.remove('active');
    deleteModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
};

/**
 * Executes video deletion.
 */
window.executeDeleteVideo = async function() {
  if (!pendingDeleteId) return;

  try {
    const res = await fetch(`/api/admin-videos?id=${encodeURIComponent(pendingDeleteId)}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (res.ok && data.success) {
      showToast('Video removed from gallery', 'success');
      closeAdminDeleteModal();
      await fetchAdminVideos();
    } else {
      alert(data.error || 'Failed to delete video.');
    }
  } catch (e) {
    alert('Network error while deleting video.');
  }
};

/**
 * Helper to display toast notifications.
 */
function showToast(msg, type = 'info') {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.className = `admin-toast admin-toast-${type} active`;
  toastEl.style.display = 'block';

  setTimeout(() => {
    toastEl.classList.remove('active');
    setTimeout(() => {
      toastEl.style.display = 'none';
    }, 300);
  }, 3500);
}

function getBookTitle(slug) {
  if (!slug || slug === 'unassigned') return 'Unassigned';
  if (typeof BOOKS !== 'undefined' && Array.isArray(BOOKS)) {
    const found = BOOKS.find(b => b.id === slug);
    if (found) return found.author ? `${found.title} (${found.author})` : found.title;
  }
  return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdmin);
} else {
  initAdmin();
}
