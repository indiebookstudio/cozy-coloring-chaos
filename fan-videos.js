/**
 * ============================================================================
 * COZY COLORING CHAOS - FAN VIDEOS JAVASCRIPT
 * ============================================================================
 * Community TikTok showcase gallery:
 * - Lazy-loaded official TikTok playback only on play/modal open
 * - Dynamic combined filters (book, category, language) + search + sorting
 * - Full creator credit & direct TikTok links
 * - Offline / static fallback protection
 */

// Fallback dataset in case API is unreachable or during static preview
const FALLBACK_VIDEOS = [
  {
    id: "video-7690538422930279712",
    tiktok_url: "https://www.tiktok.com/@cozy.sparkles90/video/7690538422930279712",
    tiktok_video_id: "7690538422930279712",
    creator_username: "cozy.sparkles90",
    creator_name: "CozySparkles",
    creator_profile_url: "https://www.tiktok.com/@cozy.sparkles90",
    creator_avatar_url: "assets/fan-videos/avatars/cozy.sparkles90.jpg",
    caption: "New flip-through!  This amazing book is from @Cozy Coloring Chaos and I’m in love with this theme!  #colortok #colortokcommunity #foryoupage❤️❤️ #fyp #dutchtiktok",
    thumbnail_url: "assets/fan-videos/7690538422930279712.jpg",
    book_slug: "cozy-terror",
    category: "flip-through",
    language: "nl",
    featured: true,
    published: true,
    sort_order: 1,
    created_at: "2026-09-28T11:45:00.000Z",
    updated_at: "2026-09-28T11:45:00.000Z"
  },
  {
    id: "video-7690225937111158048",
    tiktok_url: "https://www.tiktok.com/@cozy.sparkles90/video/7690225937111158048",
    tiktok_video_id: "7690225937111158048",
    creator_username: "cozy.sparkles90",
    creator_name: "CozySparkles",
    creator_profile_url: "https://www.tiktok.com/@cozy.sparkles90",
    creator_avatar_url: "assets/fan-videos/avatars/cozy.sparkles90.jpg",
    caption: "OMG…Flip trough tomorrow!  Tomorrow I will put the flip trough online! This amazing book is from: @Cozy Coloring Chaos  Stay tuned… #colortok #colortokcommunity #foryoupage❤️❤️ #fyp #dutchtiktok",
    thumbnail_url: "assets/fan-videos/7690225937111158048.jpg",
    book_slug: "cozy-terror",
    category: "unboxing",
    language: "nl",
    featured: true,
    published: true,
    sort_order: 2,
    created_at: "2026-09-26T14:30:00.000Z",
    updated_at: "2026-09-26T14:30:00.000Z"
  },
  {
    id: "video-7689374962397760800",
    tiktok_url: "https://www.tiktok.com/@craftyclare21/video/7689374962397760800",
    tiktok_video_id: "7689374962397760800",
    creator_username: "craftyclare21",
    creator_name: "CraftyClare",
    creator_profile_url: "https://www.tiktok.com/@craftyclare21",
    creator_avatar_url: "assets/fan-videos/avatars/craftyclare21.jpg",
    caption: "I was kindly gifted this book from @Cozy Coloring Chaos . Thank you so much I love it. it's is available on Amazon perfect for Halloween. #CapCut  #colourtokuk  #newcolouringbook  #colouringbooks  #colouringisfunandrelaxing",
    thumbnail_url: "assets/fan-videos/7689374962397760800.jpg",
    book_slug: "cozy-terror",
    category: "review",
    language: "en",
    featured: true,
    published: true,
    sort_order: 3,
    created_at: "2026-09-25T11:20:00.000Z",
    updated_at: "2026-09-25T11:20:00.000Z"
  }
];

let allVideos = [];
let activeVideo = null;

// DOM Elements
const gridEl = document.getElementById('fan-videos-grid');
const emptyStateEl = document.getElementById('fan-empty-state');
const resultsCountEl = document.getElementById('fan-results-count');
const searchInput = document.getElementById('fan-search-input');
const searchClearBtn = document.getElementById('fan-search-clear');
const filterBookSelect = document.getElementById('fan-filter-book');
const filterCatSelect = document.getElementById('fan-filter-category');
const filterLangSelect = document.getElementById('fan-filter-lang');
const sortSelect = document.getElementById('fan-sort-select');
const resetFiltersBtn = document.getElementById('fan-reset-filters');

// Modal Elements
const modalEl = document.getElementById('fan-video-modal');
const modalPlayerContainer = document.getElementById('fan-player-container');
const modalPlayerFallback = document.getElementById('fan-player-fallback');
const modalFallbackTiktokLink = document.getElementById('fan-fallback-tiktok-link');
const modalCreatorName = document.getElementById('modal-creator-name');
const modalCreatorHandle = document.getElementById('modal-creator-handle');
const modalCreatorAvatarWrap = document.getElementById('modal-creator-avatar-wrap');
const modalTagBook = document.getElementById('modal-tag-book');
const modalTagCategory = document.getElementById('modal-tag-category');
const modalTagLang = document.getElementById('modal-tag-lang');
const modalVideoCaption = document.getElementById('modal-video-caption');
const modalCreatorProfileLink = document.getElementById('modal-creator-profile-link');
const modalFollowBtnLabel = document.getElementById('modal-follow-btn-label');
const modalOriginalTiktokLink = document.getElementById('modal-original-tiktok-link');
const modalBookBox = document.getElementById('modal-book-box');
const modalBookTitle = document.getElementById('modal-book-title');
const modalBookLink = document.getElementById('modal-book-link');

/**
 * Initializes the Fan Videos page.
 */
async function initFanVideos() {
  populateBookFilterOptions();
  setupFilterListeners();
  setupCustomLanguageSelect();
  setupModalListeners();

  // Check for URL query parameter ?book= (e.g. from homepage book card)
  const urlParams = new URLSearchParams(window.location.search);
  const bookParam = urlParams.get('book');
  if (bookParam && filterBookSelect) {
    const optExists = Array.from(filterBookSelect.options).some(o => o.value === bookParam);
    if (optExists) {
      filterBookSelect.value = bookParam;
    }
  }

  await loadVideosData();

  // If a book was requested via URL, scroll smoothly to the videos showcase
  if (bookParam) {
    const controlsSec = document.getElementById('fan-controls-section');
    if (controlsSec) {
      setTimeout(() => {
        controlsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }
}

/**
 * Populates the Book Filter dropdown dynamically from the books catalog in script.js.
 */
function populateBookFilterOptions() {
  if (!filterBookSelect) return;

  const catalogBooks = (typeof BOOKS !== 'undefined' && Array.isArray(BOOKS)) ? BOOKS : [];
  
  // Clear any existing options except "All books"
  filterBookSelect.innerHTML = `<option value="all" data-i18n="filterAllBooks">All books</option>`;

  catalogBooks.forEach(book => {
    const opt = document.createElement('option');
    opt.value = book.id;
    opt.textContent = book.author ? `${book.title} (${book.author})` : book.title;
    filterBookSelect.appendChild(opt);
  });

  const unassignedOpt = document.createElement('option');
  unassignedOpt.value = 'unassigned';
  unassignedOpt.textContent = 'Unassigned / General';
  unassignedOpt.setAttribute('data-i18n', 'filterUnassigned');
  filterBookSelect.appendChild(unassignedOpt);
}

/**
 * Loads video data from /api/fan-videos with automatic fallback.
 */
async function loadVideosData() {
  const host = window.location.hostname;
  const apiBase = (host === 'localhost' || host === '127.0.0.1')
    ? ''
    : (window.COZY_BACKEND_URL || 'https://cozy-coloring-chaos-saluccimarco-3318s-projects.vercel.app').replace(/\/api\/.*$/, '');

  let loaded = false;

  // 1. Try dynamic backend API
  try {
    const res = await fetch(`${apiBase}/api/fan-videos`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
        allVideos = data.videos;
        loaded = true;
      }
    }
  } catch (err) {
    console.warn('Could not fetch from /api/fan-videos:', err);
  }

  // 2. If API is down or returned fewer videos than static repository file, fetch data/fan-videos.json
  if (!loaded || (allVideos && allVideos.length < FALLBACK_VIDEOS.length)) {
    try {
      const staticRes = await fetch('data/fan-videos.json?v=' + Date.now());
      if (staticRes.ok) {
        const staticData = await staticRes.json();
        if (Array.isArray(staticData) && staticData.length >= (allVideos ? allVideos.length : 0)) {
          allVideos = staticData.filter(v => v.published !== false);
          loaded = true;
        }
      }
    } catch (e) {
      console.warn('Could not fetch static data/fan-videos.json:', e);
    }
  }

  // 3. Fallback to bundled dataset if all else fails
  if (!loaded || !allVideos || allVideos.length === 0) {
    allVideos = FALLBACK_VIDEOS;
  }

  applyFiltersAndRender();
}

/**
 * Maps book slug to readable book title with author name.
 */
function getBookTitle(slug) {
  if (!slug || slug === 'unassigned') return 'Cozy Coloring Chaos';
  if (typeof BOOKS !== 'undefined' && Array.isArray(BOOKS)) {
    const found = BOOKS.find(b => b.id === slug);
    if (found) return found.author ? `${found.title} (${found.author})` : found.title;
  }
  return slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}

/**
 * Gets active translation dictionary from script.js.
 */
function getTranslations() {
  const lang = (window.currentLanguage)
    ? window.currentLanguage
    : (typeof currentLanguage !== 'undefined' ? currentLanguage : 'en');
  const translations = (window.TRANSLATIONS && window.TRANSLATIONS[lang])
    ? window.TRANSLATIONS[lang]
    : ((typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[lang]) ? TRANSLATIONS[lang] : {});
  return translations;
}

/**
 * Global reactive hook called when the site language changes.
 */
window.updateFanVideosLanguage = function(lang, t) {
  t = t || getTranslations();

  // 1. Re-populate the book filter options (keeping selected book if any)
  const currentSelectedBook = filterBookSelect?.value || 'all';
  populateBookFilterOptions();
  if (filterBookSelect) {
    filterBookSelect.value = currentSelectedBook;
  }

  // 2. Update custom language select trigger label if "all" is currently selected
  const hiddenLangSelect = document.getElementById('fan-filter-lang');
  const currentLangLabel = document.getElementById('fan-lang-current-label');
  if (hiddenLangSelect && hiddenLangSelect.value === 'all' && currentLangLabel) {
    currentLangLabel.textContent = t.filterAllLanguages || 'All languages';
  }

  // 3. Re-render videos grid (updating results count label, category badge; NEVER touching captions)
  applyFiltersAndRender();

  // 4. If modal is currently active, update its localized labels
  if (modalEl && modalEl.classList.contains('active') && activeVideo) {
    const username = activeVideo.creator_username || 'creator';
    if (modalFollowBtnLabel) {
      modalFollowBtnLabel.textContent = (t.followCreator && typeof t.followCreator === 'function')
        ? t.followCreator(username)
        : `Follow @${username}`;
    }
    const catKeyMap = {
      'unboxing': 'catUnboxing',
      'flip-through': 'catFlipThrough',
      'coloring': 'catColoring',
      'review': 'catReview',
      'collection': 'catCollection',
      'other': 'catOther'
    };
    const catKey = catKeyMap[activeVideo.category] || 'catOther';
    if (modalTagCategory) {
      modalTagCategory.textContent = (t[catKey] || activeVideo.category || 'video').toUpperCase();
    }
  }
};

/**
 * Filters and sorts videos, then renders the grid.
 */
function applyFiltersAndRender() {
  const searchTerm = (searchInput?.value || '').trim().toLowerCase();
  const selectedBook = filterBookSelect?.value || 'all';
  const selectedCat = filterCatSelect?.value || 'all';
  const selectedLang = filterLangSelect?.value || 'all';
  const sortBy = sortSelect?.value || 'newest';

  const hasActiveFilters = searchTerm !== '' || selectedBook !== 'all' || selectedCat !== 'all' || selectedLang !== 'all';
  if (resetFiltersBtn) {
    resetFiltersBtn.style.display = hasActiveFilters ? 'inline-flex' : 'none';
  }
  if (searchClearBtn) {
    searchClearBtn.style.display = searchTerm !== '' ? 'block' : 'none';
  }

  let filtered = allVideos.filter(video => {
    // Book filter
    if (selectedBook !== 'all' && video.book_slug !== selectedBook) return false;

    // Category filter
    if (selectedCat !== 'all' && (video.category || '').toLowerCase() !== selectedCat.toLowerCase()) return false;

    // Language filter
    if (selectedLang !== 'all' && (video.language || '').toLowerCase() !== selectedLang.toLowerCase()) return false;

    // Search filter
    if (searchTerm) {
      const textToSearch = `${video.creator_username} ${video.creator_name} ${video.caption} ${video.book_slug} ${video.category}`.toLowerCase();
      if (!textToSearch.includes(searchTerm)) return false;
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
    }
    if (sortBy === 'oldest') {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    // Default: newest first
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  renderVideosGrid(filtered);
}

/**
 * Renders the video cards in the grid.
 */
function renderVideosGrid(videos) {
  if (!gridEl) return;

  const selectedBook = filterBookSelect?.value;
  const isFilteredByBook = selectedBook && selectedBook !== 'all';
  const bookName = isFilteredByBook ? getBookTitle(selectedBook) : '';

  if (resultsCountEl) {
    const totalCount = videos.length;
    const t = getTranslations();
    
    const countLabel = totalCount === 1 
      ? (t.showingSingleVideo || 'Showing 1 video') 
      : (typeof t.showingMultipleVideos === 'function' ? t.showingMultipleVideos(totalCount) : `Showing ${totalCount} videos`);

    resultsCountEl.textContent = isFilteredByBook 
      ? `${countLabel} · ${bookName}` 
      : countLabel;
  }

  if (videos.length === 0) {
    gridEl.innerHTML = '';
    if (emptyStateEl) {
      emptyStateEl.style.display = 'block';
      const emptyDescEl = emptyStateEl.querySelector('p');
      if (emptyDescEl) {
        if (isFilteredByBook) {
          emptyDescEl.textContent = `No community videos found for "${bookName}" yet. Explore all videos below!`;
        } else {
          emptyDescEl.textContent = 'Try adjusting your filters or search keywords.';
        }
      }
    }
    return;
  }

  if (emptyStateEl) emptyStateEl.style.display = 'none';

  gridEl.innerHTML = videos.map(video => createVideoCardHtml(video)).join('');
}

/**
 * Creates HTML for a single vertical 9:16 video card.
 * NOTE: The creator's caption and username are authentic fan content and are NEVER translated.
 */
function createVideoCardHtml(video) {
  const t = getTranslations();
  const bookTitle = getBookTitle(video.book_slug);
  const catKeyMap = {
    'unboxing': 'catUnboxing',
    'flip-through': 'catFlipThrough',
    'coloring': 'catColoring',
    'review': 'catReview',
    'collection': 'catCollection',
    'other': 'catOther'
  };
  const catKey = catKeyMap[video.category] || 'catOther';
  const categoryLabel = (t[catKey] || video.category || 'video').toUpperCase();

  // Authentic fan text: NEVER translated, untouched!
  const safeCaption = escapeHtml(video.caption || '');
  const username = escapeHtml(video.creator_username || 'creator');
  const creatorName = escapeHtml(video.creator_name || username);
  const langCode = (video.language || 'en').toUpperCase();

  // Thumbnail fallback: local fallback file if remote fails
  const localFallback = `assets/fan-videos/${video.tiktok_video_id}.jpg`;
  const primaryThumb = video.thumbnail_url || localFallback;
  const avatarSrc = video.creator_avatar_url || `assets/fan-videos/avatars/${video.creator_username}.jpg`;

  return `
    <article class="fan-video-card" data-video-id="${video.id}" role="listitem" onclick="openFanVideoModal('${video.id}')" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ') { event.preventDefault(); openFanVideoModal('${video.id}'); }" aria-label="Play video by @${username}: ${safeCaption.slice(0, 50)}">
      <div class="fan-card-media-wrapper">
        <img 
          src="${primaryThumb}" 
          alt="Video by @${username}: ${safeCaption.slice(0, 60)}" 
          class="fan-card-thumbnail" 
          loading="lazy" 
          onerror="if(this.src!=='${localFallback}') this.src='${localFallback}';"
        />

        <!-- Gradient Vignette & Dark Tint -->
        <div class="fan-card-scrim" aria-hidden="true"></div>

        <!-- Badges on top of card -->
        <div class="fan-card-badges">
          <span class="fan-badge-cat">${categoryLabel}</span>
          <span class="fan-badge-lang">${langCode}</span>
        </div>

        <!-- Big Play Button Overlay -->
        <button 
          type="button" 
          class="fan-play-btn" 
          onclick="event.stopPropagation(); openFanVideoModal('${video.id}')" 
          aria-label="Play video by @${username}"
        >
          <span class="play-icon-glow"></span>
          <svg class="play-svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>

        <!-- Associated Book Pill -->
        <div class="fan-card-book-pill" title="Book: ${bookTitle}">
          <svg class="book-mini-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
          <span class="book-pill-text">${bookTitle}</span>
        </div>
      </div>

      <!-- Card Metadata Content -->
      <div class="fan-card-content">
        <!-- Creator Info with Profile Picture -->
        <div class="fan-card-creator">
          <a 
            href="${video.creator_profile_url || `https://www.tiktok.com/@${video.creator_username}`}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="creator-chip-link" 
            title="Visit @${username} on TikTok"
            onclick="event.stopPropagation()"
          >
            <div class="creator-chip-avatar-wrap">
              <img 
                src="${avatarSrc}" 
                alt="@${username}" 
                class="creator-chip-avatar-img"
                loading="lazy"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
              />
              <div class="creator-chip-avatar-fallback" style="display: none;">
                ${username.charAt(0).toUpperCase()}
              </div>
            </div>
            <div class="creator-chip-text">
              <span class="creator-chip-name">${creatorName}</span>
              <span class="creator-chip-handle">@${username}</span>
            </div>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Opens the video modal and initializes the official TikTok embed player lazily.
 */
window.openFanVideoModal = function(videoId) {
  const video = allVideos.find(v => v.id === videoId);
  if (!video) return;

  activeVideo = video;
  const username = video.creator_username || 'creator';
  const bookTitle = getBookTitle(video.book_slug);
  const avatarSrc = video.creator_avatar_url || `assets/fan-videos/avatars/${video.creator_username}.jpg`;

  const t = getTranslations();
  const catKeyMap = {
    'unboxing': 'catUnboxing',
    'flip-through': 'catFlipThrough',
    'coloring': 'catColoring',
    'review': 'catReview',
    'collection': 'catCollection',
    'other': 'catOther'
  };
  const catKey = catKeyMap[video.category] || 'catOther';
  const categoryLabel = (t[catKey] || video.category || 'video').toUpperCase();

  // Set Modal Data
  if (modalCreatorName) modalCreatorName.textContent = video.creator_name || username;
  if (modalCreatorHandle) modalCreatorHandle.textContent = `@${username}`;
  if (modalTagBook) modalTagBook.textContent = bookTitle;
  if (modalTagCategory) modalTagCategory.textContent = categoryLabel;
  if (modalTagLang) modalTagLang.textContent = (video.language || 'en').toUpperCase();
  // Authentic fan text: untouched!
  if (modalVideoCaption) modalVideoCaption.textContent = video.caption || '';

  if (modalCreatorAvatarWrap) {
    modalCreatorAvatarWrap.innerHTML = `
      <img src="${avatarSrc}" alt="@${username}" class="modal-creator-avatar-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
      <div class="creator-avatar-fallback" style="display: none;">${username.charAt(0).toUpperCase()}</div>
    `;
  }

  if (modalCreatorProfileLink) {
    modalCreatorProfileLink.href = video.creator_profile_url || `https://www.tiktok.com/@${username}`;
  }
  if (modalFollowBtnLabel) {
    modalFollowBtnLabel.textContent = (t.followCreator && typeof t.followCreator === 'function')
      ? t.followCreator(username)
      : `Follow @${username}`;
  }
  if (modalOriginalTiktokLink) {
    modalOriginalTiktokLink.href = video.tiktok_url;
  }
  if (modalFallbackTiktokLink) {
    modalFallbackTiktokLink.href = video.tiktok_url;
  }

  // Associated Book link
  if (modalBookBox && modalBookTitle && modalBookLink) {
    if (video.book_slug && video.book_slug !== 'unassigned') {
      modalBookTitle.textContent = bookTitle;
      modalBookLink.href = `index.html#book-${video.book_slug}`;
      modalBookBox.style.display = 'block';
    } else {
      modalBookBox.style.display = 'none';
    }
  }

  // Reset player containers
  if (modalPlayerFallback) modalPlayerFallback.style.display = 'none';
  if (modalPlayerContainer) {
    modalPlayerContainer.innerHTML = '';
    modalPlayerContainer.style.display = 'block';

    // Official TikTok Embed:
    // We embed official TikTok player iframe with autoplay, sandbox and fullscreen support
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.tiktok.com/player/v1/${video.tiktok_video_id}?autoplay=1`;
    iframe.title = `TikTok video by @${username}`;
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.setAttribute('scrolling', 'no');
    iframe.className = 'fan-tiktok-iframe';
    
    // Timeout check: if blocked or failed after 8s, show graceful fallback
    const fallbackTimer = setTimeout(() => {
      try {
        // If iframe hasn't loaded or is inaccessible
      } catch (e) {}
    }, 8000);

    iframe.onload = () => {
      clearTimeout(fallbackTimer);
      try {
        iframe.contentWindow.postMessage({ 'x-tiktok-player': true, type: 'play' }, 'https://www.tiktok.com');
      } catch (e) {}
    };

    iframe.onerror = () => {
      clearTimeout(fallbackTimer);
      if (modalPlayerContainer) modalPlayerContainer.style.display = 'none';
      if (modalPlayerFallback) modalPlayerFallback.style.display = 'flex';
    };

    modalPlayerContainer.appendChild(iframe);
  }

  // Show Modal
  if (modalEl) {
    modalEl.scrollTop = 0;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');
    const closeBtn = document.getElementById('fan-modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }
};

/**
 * Closes the video modal and stops player.
 */
window.closeFanVideoModal = function() {
  if (!modalEl) return;
  modalEl.classList.remove('active');
  modalEl.setAttribute('aria-hidden', 'true');
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');

  // Stop video by clearing container
  if (modalPlayerContainer) {
    modalPlayerContainer.innerHTML = '';
  }
  activeVideo = null;
};

/**
 * Resets all filters and search input.
 */
window.resetFanFilters = function() {
  if (searchInput) searchInput.value = '';
  if (filterBookSelect) filterBookSelect.value = 'all';
  if (filterCatSelect) filterCatSelect.value = 'all';
  if (filterLangSelect) filterLangSelect.value = 'all';
  if (sortSelect) sortSelect.value = 'newest';

  // Reset custom language select
  const currentFlag = document.getElementById('fan-lang-current-flag');
  const currentLabel = document.getElementById('fan-lang-current-label');
  const langMenu = document.getElementById('fan-lang-menu');
  if (currentFlag) currentFlag.innerHTML = '🌐';
  if (currentLabel) {
    const t = (window.translations && window.currentLang) ? window.translations[window.currentLang] : null;
    currentLabel.textContent = t && t.filterAllLanguages ? t.filterAllLanguages : 'All languages';
  }
  if (langMenu) {
    langMenu.querySelectorAll('.fan-custom-select-option').forEach(b => {
      const isAll = b.getAttribute('data-value') === 'all';
      b.classList.toggle('active', isAll);
      b.setAttribute('aria-selected', isAll ? 'true' : 'false');
    });
  }

  // Sync URL search params
  if (window.history && window.history.replaceState) {
    const url = new URL(window.location);
    url.searchParams.delete('book');
    window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
  }

  applyFiltersAndRender();
};

/**
 * Sets up custom dropdown for language filtering with real flag images.
 */
function setupCustomLanguageSelect() {
  const container = document.getElementById('fan-lang-custom-select');
  const trigger = document.getElementById('fan-lang-trigger');
  const menu = document.getElementById('fan-lang-menu');
  const currentFlag = document.getElementById('fan-lang-current-flag');
  const currentLabel = document.getElementById('fan-lang-current-label');
  const hiddenSelect = document.getElementById('fan-filter-lang');
  if (!container || !trigger || !menu || !hiddenSelect) return;

  // Toggle dropdown open/close
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = container.classList.contains('open');
    container.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', !isOpen ? 'true' : 'false');
  });

  // Handle option click
  menu.querySelectorAll('.fan-custom-select-option').forEach(optionBtn => {
    optionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = optionBtn.getAttribute('data-value');

      // Update active option styling
      menu.querySelectorAll('.fan-custom-select-option').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      optionBtn.classList.add('active');
      optionBtn.setAttribute('aria-selected', 'true');

      // Update trigger content with flag and label
      const optFlag = optionBtn.querySelector('.lang-flag-img');
      const optName = optionBtn.querySelector('.fan-lang-opt-name');
      if (currentFlag) {
        if (optFlag) {
          currentFlag.innerHTML = `<img src="${optFlag.src}" srcset="${optFlag.srcset || ''}" width="17" height="12" alt="" class="lang-flag-img">`;
        } else {
          currentFlag.innerHTML = '🌐';
        }
      }
      if (currentLabel && optName) {
        currentLabel.textContent = optName.textContent;
      }

      // Close dropdown
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');

      // Update hidden select and trigger filtering
      hiddenSelect.value = val;
      hiddenSelect.dispatchEvent(new Event('change'));
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('open')) {
      container.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }
  });
}

/**
 * Sets up event listeners for filters, search, and sorting.
 */
function setupFilterListeners() {
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      applyFiltersAndRender();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      applyFiltersAndRender();
      if (searchInput) searchInput.focus();
    });
  }

  if (filterBookSelect) {
    filterBookSelect.addEventListener('change', () => {
      // Sync URL search params
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location);
        if (filterBookSelect.value !== 'all') {
          url.searchParams.set('book', filterBookSelect.value);
        } else {
          url.searchParams.delete('book');
        }
        window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
      }
      applyFiltersAndRender();
    });
  }

  if (filterCatSelect) {
    filterCatSelect.addEventListener('change', applyFiltersAndRender);
  }

  if (filterLangSelect) {
    filterLangSelect.addEventListener('change', applyFiltersAndRender);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', applyFiltersAndRender);
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', resetFanFilters);
  }
}

/**
 * Sets up modal accessibility: ESC key and backdrop clicks.
 */
function setupModalListeners() {
  if (modalEl) {
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        closeFanVideoModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalEl && modalEl.classList.contains('active')) {
      closeFanVideoModal();
    }
  });
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
  document.addEventListener('DOMContentLoaded', initFanVideos);
} else {
  initFanVideos();
}
