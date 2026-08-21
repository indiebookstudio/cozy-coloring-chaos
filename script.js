/**
 * ============================================================================
 * COZY COLORING CHAOS - STATIC WEBSITE JAVASCRIPT
 * ============================================================================
 * 
 * In this file you can:
 * 1. Add, edit or remove books from the BOOKS array.
 * 2. Set Amazon ASIN (the website will automatically generate links for all Amazon marketplaces).
 * 3. Configure languages, translations, and filters.
 */

// ============================================================================
// AMAZON MARKETPLACE DEFINITIONS
// ============================================================================
const AMAZON_MARKETS = {
  it: { name: "Amazon.it", flag: "🇮🇹", domain: "amazon.it" },
  com: { name: "Amazon.com (US / Global)", flag: "🇺🇸", domain: "amazon.com" },
  uk: { name: "Amazon.co.uk", flag: "🇬🇧", domain: "amazon.co.uk" },
  de: { name: "Amazon.de", flag: "🇩🇪", domain: "amazon.de" },
  fr: { name: "Amazon.fr", flag: "🇫🇷", domain: "amazon.fr" },
  es: { name: "Amazon.es", flag: "🇪🇸", domain: "amazon.es" },
  ca: { name: "Amazon.ca", flag: "🇨🇦", domain: "amazon.ca" },
  au: { name: "Amazon.com.au", flag: "🇦🇺", domain: "amazon.com.au" }
};

// ============================================================================
// ADD OR EDIT BOOKS HERE
// ============================================================================
const BOOKS = [
  {
    id: "innocent-paws",
    title: "Innocent Paws",
    subtitle: "A Cozy Murder Coloring Book | Darkly Humorous Murder Scenes in Cozy Everyday Settings for Adults and Teens",
    author: "Isaac McClour",
    language: "English",
    langCode: "en",
    cover: "assets/Innocent.Paws/Front.Cover.png",
    preview: [
      "assets/Innocent.Paws/Front.Cover.png",
      "assets/Innocent.Paws/2.png",
      "assets/Innocent.Paws/3.png",
      "assets/Innocent.Paws/6.png",
      "assets/Innocent.Paws/8.png",
      "assets/Innocent.Paws/10.png",
      "assets/Innocent.Paws/Back.Cover.png"
    ],
    defaultMarket: "com",
    asin: "B0HFGBJW8Y"
  },
  {
    id: "impossible-worlds",
    title: "Impossible Worlds",
    subtitle: "Cozy & Easy Coloring Book | Adorable Animals, Absurd Places, and Wonderfully Impossible Surprises",
    author: "Isaac McClour",
    language: "English",
    langCode: "en",
    cover: "assets/Impossible.Worlds/Front.Cover.png",
    preview: [
      "assets/Impossible.Worlds/Front.Cover.png",
      "assets/Impossible.Worlds/2.png",
      "assets/Impossible.Worlds/4.png",
      "assets/Impossible.Worlds/8.png",
      "assets/Impossible.Worlds/36.png",
      "assets/Impossible.Worlds/90.png",
      "assets/Impossible.Worlds/Back.Cover.png"
    ],
    defaultMarket: "com",
    asin: "B0HFZZ2TMH"
  },
  {
    id: "non-rompetemi-i-coglioni",
    title: "Non Rompetemi i Coglioni",
    subtitle: "Il libro da colorare per sfogarsi senza finire nei guai | Libro antistress kawaii per adulti",
    author: "Lucas C. Morica",
    language: "Italiano",
    langCode: "it",
    cover: "assets/Non.Rompetemi.I.Coglioni/Front.Cover.png",
    preview: [
      "assets/Non.Rompetemi.I.Coglioni/Front.Cover.png",
      "assets/Non.Rompetemi.I.Coglioni/4.png",
      "assets/Non.Rompetemi.I.Coglioni/5.png",
      "assets/Non.Rompetemi.I.Coglioni/6.png",
      "assets/Non.Rompetemi.I.Coglioni/8.png",
      "assets/Non.Rompetemi.I.Coglioni/10.png",
      "assets/Non.Rompetemi.I.Coglioni/12.png",
      "assets/Non.Rompetemi.I.Coglioni/14.png",
      "assets/Non.Rompetemi.I.Coglioni/Back.Cover.png"
    ],
    defaultMarket: "it",
    asin: "B0HF7WZBYD"
  }
  /*
  // TEMPLATE PER NUOVO LIBRO:
  {
    id: "mio-nuovo-libro",
    title: "Titolo Libro",
    subtitle: "Sottotitolo del libro",
    author: "Nome Autore",
    language: "Italiano", // o "English", "Español", "Deutsch", ecc.
    langCode: "it",       // "it" o "en" per il filtro automatico
    cover: "assets/NomeCartella/Front.Cover.png",
    preview: [
      "assets/NomeCartella/Front.Cover.png",
      "assets/NomeCartella/2.png",
      "assets/NomeCartella/Back.Cover.png"
    ],
    defaultMarket: "it",  // "it" oppure "com", "uk", "de", ecc.
    asin: "B0XXXXXXXX"
  }
  */
];

// ============================================================================
// MULTI-LANGUAGE TRANSLATIONS DICTIONARY
// ============================================================================
const TRANSLATIONS = {
  it: {
    pageTitle: "Cozy Coloring Chaos | Libri da Colorare Cozy, Divertenti & Caotici",
    metaDesc: "Scopri libri da colorare cozy con un tocco di umorismo nero e caos creativo. Scegli il tuo store Amazon e ordina la tua copia!",
    brandSubtitle: "Colorare cozy. Umorismo nero. Splendido caos.",
    sectionTitle: "SCEGLI IL TUO CAOS",
    filterAll: "Tutti",
    filterIt: "Italiano",
    filterEn: "English",
    selectStore: "Seleziona Store Amazon",
    viewOn: (market) => `VEDI SU ${market.toUpperCase()}`,
    byAuthor: "di",
    previewBtn: "📖 Anteprima",
    previewBadge: "📖 Anteprima",
    frontCoverLabel: "Copertina (Front)",
    backCoverLabel: "Retro Copertina (Back)",
    pageLabel: "Pagina",
    footerTagline: "Creato per chi ama i libri da colorare un po' fuori dagli schemi. ✨",
    footerCopyright: "Tutti i diritti riservati.",
    followTikTok: "Seguici su TikTok",
    tiktokAria: "Segui @cozycoloringchaos su TikTok (apre una nuova scheda)",
    noBooksFound: "Nessun libro trovato per questa lingua. Torna a 'Tutti' per esplorare la collezione!",
    ariaSelectMarket: (title) => `Seleziona il marketplace Amazon per ${title}`,
    ariaViewMarket: (title, market) => `Visualizza ${title} su ${market} (apre una nuova scheda)`
  },
  en: {
    pageTitle: "Cozy Coloring Chaos | Cozy, Dark & Funny Coloring Books",
    metaDesc: "Discover vibrant cozy coloring books with a twist of dark humor and beautiful chaos. Choose your Amazon marketplace and order your copy today!",
    brandSubtitle: "Cozy coloring. Dark humor. Beautiful chaos.",
    sectionTitle: "CHOOSE YOUR CHAOS",
    filterAll: "All",
    filterIt: "Italian",
    filterEn: "English",
    selectStore: "Select Amazon Store",
    viewOn: (market) => `VIEW ON ${market.toUpperCase()}`,
    byAuthor: "by",
    previewBtn: "📖 Preview",
    previewBadge: "📖 Sample Preview",
    frontCoverLabel: "Front Cover",
    backCoverLabel: "Back Cover",
    pageLabel: "Page",
    footerTagline: "Made for people who like their coloring books a little weird. ✨",
    footerCopyright: "All rights reserved.",
    followTikTok: "Follow on TikTok",
    tiktokAria: "Follow @cozycoloringchaos on TikTok (opens in a new tab)",
    noBooksFound: "No books found for this language. Switch to 'All' to explore the full collection!",
    ariaSelectMarket: (title) => `Select Amazon Marketplace for ${title}`,
    ariaViewMarket: (title, market) => `View ${title} on ${market} (opens in a new tab)`
  }
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================
let currentLanguage = 'en';
let currentBookFilter = 'all'; // 'all', 'it', 'en'
// Store individual book selected markets
const selectedMarketState = {};

/**
 * Returns the default Amazon store key based on the website interface language.
 * If website is in Italian -> "it" (Amazon.it)
 * If website is in English -> book's defaultMarket or "com" (Amazon.com)
 */
function getDefaultMarketForLanguage(book, lang) {
  if (lang === 'it') {
    return 'it';
  }
  return book.defaultMarket || 'com';
}

/**
 * Detects browser local language or retrieves user preference from localStorage.
 */
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem('ccc_site_lang');
    if (saved && (saved === 'it' || saved === 'en')) {
      return saved;
    }
  } catch (e) {
    // Local storage access might be restricted in some environments
  }

  // Detect browser language
  const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
  for (const lang of browserLangs) {
    if (typeof lang === 'string') {
      const lower = lang.toLowerCase();
      if (lower.startsWith('it')) return 'it';
      if (lower.startsWith('en')) return 'en';
    }
  }
  return 'en';
}

/**
 * Escapes HTML characters to prevent rendering issues and XSS.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Resolves the destination Amazon URL for a given book and marketplace key.
 */
function getBookUrlForMarket(book, marketKey) {
  if (book.amazonLinks && book.amazonLinks[marketKey]) {
    return book.amazonLinks[marketKey];
  }
  if (book.asin && AMAZON_MARKETS[marketKey]) {
    return `https://www.amazon.${AMAZON_MARKETS[marketKey].domain.replace('amazon.', '')}/dp/${book.asin}`;
  }
  return book.amazonUrl || '#';
}

/**
 * Handles image loading errors with a clean fallback card.
 */
function handleImageError(imgElement, bookTitle) {
  const container = imgElement.parentElement;
  if (!container) return;
  
  container.innerHTML = `
    <div class="book-cover-fallback">
      <svg class="fallback-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
        <path d="M6 6h10"></path>
        <path d="M6 10h10"></path>
      </svg>
      <span class="fallback-title">${escapeHtml(bookTitle)}</span>
    </div>
  `;
}

/**
 * Updates UI texts matching data-i18n attributes, meta tags, and synchronizes
 * default Amazon store according to the chosen website language.
 */
function updateInterfaceLanguage(lang) {
  currentLanguage = (lang === 'it' || lang === 'en') ? lang : 'en';
  const t = TRANSLATIONS[currentLanguage];

  // Update default selected Amazon store for all books based on website language
  BOOKS.forEach((book) => {
    selectedMarketState[book.id] = getDefaultMarketForLanguage(book, currentLanguage);
  });

  // Update HTML tag lang
  document.documentElement.lang = currentLanguage;

  // Update Page Title and Meta Description
  if (t.pageTitle) {
    document.title = t.pageTitle;
    const ogTitle = document.getElementById('og-title');
    const twitterTitle = document.getElementById('twitter-title');
    if (ogTitle) ogTitle.setAttribute('content', t.pageTitle);
    if (twitterTitle) twitterTitle.setAttribute('content', t.pageTitle);
  }
  if (t.metaDesc) {
    const metaDesc = document.getElementById('meta-desc');
    const ogDesc = document.getElementById('og-desc');
    const twitterDesc = document.getElementById('twitter-desc');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);
    if (ogDesc) ogDesc.setAttribute('content', t.metaDesc);
    if (twitterDesc) twitterDesc.setAttribute('content', t.metaDesc);
  }

  // Update elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (typeof t[key] === 'string') {
        el.textContent = t[key];
      }
    }
  });

  // Update Language Switcher active buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const btnLang = btn.getAttribute('data-lang');
    const isActive = (btnLang === currentLanguage);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Save preference
  try {
    localStorage.setItem('ccc_site_lang', currentLanguage);
  } catch (e) {
    // Ignore if localStorage unavailable
  }

  // Re-render books so book-level labels and store selections update
  renderBooks();
  updateFilterCounts();
}

/**
 * Calculates and displays the count of books in each filter tab.
 */
function updateFilterCounts() {
  const countAll = BOOKS.length;
  const countIt = BOOKS.filter(b => isBookLanguage(b, 'it')).length;
  const countEn = BOOKS.filter(b => isBookLanguage(b, 'en')).length;

  const elAll = document.getElementById('count-all');
  const elIt = document.getElementById('count-it');
  const elEn = document.getElementById('count-en');

  if (elAll) elAll.textContent = countAll;
  if (elIt) elIt.textContent = countIt;
  if (elEn) elEn.textContent = countEn;
}

/**
 * Checks if a book matches a target language filter.
 */
function isBookLanguage(book, targetLang) {
  if (targetLang === 'all') return true;

  if (book.langCode && book.langCode.toLowerCase() === targetLang.toLowerCase()) {
    return true;
  }
  if (book.language) {
    const l = book.language.toLowerCase();
    if (targetLang === 'it' && (l.includes('it') || l.includes('ital'))) return true;
    if (targetLang === 'en' && (l.includes('en') || l.includes('engl') || l.includes('ingl'))) return true;
  }
  return false;
}

/**
 * Sets the active book filter ('all', 'it', 'en') and re-renders the catalog.
 */
function setBookFilter(filterKey) {
  currentBookFilter = filterKey;

  // Update button active classes & ARIA
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    const key = btn.getAttribute('data-filter');
    const isActive = (key === currentBookFilter);
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  renderBooks();
}

/**
 * Escapes JavaScript string literals for inline handlers.
 */
function escapeJs(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '\\"');
}

/**
 * ============================================================================
 * PREVIEW MODAL / SAMPLE VIEWER LOGIC
 * ============================================================================
 */
let activePreviewBook = null;
let currentPreviewIndex = 0;

window.openSampleModal = function(bookId) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const pages = (Array.isArray(book.preview) && book.preview.length > 0)
    ? book.preview
    : [book.cover];

  activePreviewBook = { ...book, preview: pages };
  currentPreviewIndex = 0;

  const modal = document.getElementById('sample-modal');
  const titleEl = document.getElementById('sample-modal-title');
  const badgeEl = document.getElementById('sample-modal-badge');
  const footerEl = document.getElementById('sample-modal-footer');
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (titleEl) titleEl.textContent = book.title;
  if (badgeEl) badgeEl.textContent = t.previewBadge || "📖 Anteprima";

  if (footerEl) {
    let marketKey = selectedMarketState[book.id];
    if (!marketKey || !AMAZON_MARKETS[marketKey]) {
      marketKey = getDefaultMarketForLanguage(book, currentLanguage);
    }
    const targetUrl = getBookUrlForMarket(book, marketKey);
    const marketInfo = AMAZON_MARKETS[marketKey] || { name: 'Amazon' };
    footerEl.innerHTML = `
      <a 
        href="${targetUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-buy" 
        style="max-width: 380px;" 
        aria-label="${t.ariaViewMarket(book.title, marketInfo.name)}"
      >
        <span class="btn-buy-text">${t.viewOn(marketInfo.name)}</span>
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    `;
  }

  updateSampleViewer();

  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

window.closeSampleModal = function() {
  const modal = document.getElementById('sample-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  activePreviewBook = null;
};

window.changeSamplePage = function(delta) {
  if (!activePreviewBook || !activePreviewBook.preview) return;
  const newIndex = currentPreviewIndex + delta;
  if (newIndex >= 0 && newIndex < activePreviewBook.preview.length) {
    currentPreviewIndex = newIndex;
    updateSampleViewer();
  }
};

function updateSampleViewer() {
  if (!activePreviewBook || !activePreviewBook.preview) return;

  const pages = activePreviewBook.preview;
  const total = pages.length;
  const imgEl = document.getElementById('sample-page-img');
  const labelEl = document.getElementById('sample-page-label');
  const counterEl = document.getElementById('sample-page-counter');
  const prevBtn = document.getElementById('sample-prev-btn');
  const nextBtn = document.getElementById('sample-next-btn');
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const currentSrc = pages[currentPreviewIndex];

  if (imgEl) {
    imgEl.src = currentSrc;
    imgEl.alt = `${activePreviewBook.title} - ${currentPreviewIndex + 1}`;
  }

  if (labelEl) {
    if (currentPreviewIndex === 0) {
      labelEl.textContent = t.frontCoverLabel || "Front Cover";
    } else if (currentPreviewIndex === total - 1) {
      labelEl.textContent = t.backCoverLabel || "Back Cover";
    } else {
      labelEl.textContent = `${t.pageLabel || "Pagina"} ${currentPreviewIndex + 1}`;
    }
  }

  if (counterEl) {
    counterEl.textContent = `${currentPreviewIndex + 1} / ${total}`;
  }

  if (prevBtn) prevBtn.disabled = currentPreviewIndex === 0;
  if (nextBtn) nextBtn.disabled = currentPreviewIndex === total - 1;

  // Preload next image for instant transitions
  if (currentPreviewIndex + 1 < total) {
    const preloadImg = new Image();
    preloadImg.src = pages[currentPreviewIndex + 1];
  }
}

function initSampleModalEvents() {
  const modal = document.getElementById('sample-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSampleModal();
      }
    });
  }

  // Keyboard controls: Escape, ArrowLeft, ArrowRight
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('sample-modal');
    if (!modal || !modal.classList.contains('open')) return;

    if (e.key === 'Escape') {
      closeSampleModal();
    } else if (e.key === 'ArrowLeft') {
      changeSamplePage(-1);
    } else if (e.key === 'ArrowRight') {
      changeSamplePage(1);
    }
  });

  // Touch Swipe for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  const viewer = document.getElementById('sample-viewer');
  if (viewer) {
    viewer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        changeSamplePage(1); // Swipe left -> Next page
      } else if (touchEndX - touchStartX > 45) {
        changeSamplePage(-1); // Swipe right -> Previous page
      }
    }, { passive: true });

    // Prevent right-click context menu and drag on sample viewer
    viewer.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });

    viewer.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  }

  // Prevent right click and dragging globally inside modal and cover containers
  document.addEventListener('contextmenu', (e) => {
    if (e.target && (e.target.closest('#sample-modal') || e.target.closest('.book-cover-container'))) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target && (e.target.closest('#sample-modal') || e.target.closest('.book-cover-container'))) {
      e.preventDefault();
      return false;
    }
  });
}

/**
 * Event listener triggered when a user changes the Amazon marketplace dropdown on a card.
 */
function onMarketChange(selectElement, bookId) {
  const selectedMarketKey = selectElement.value;
  selectedMarketState[bookId] = selectedMarketKey;

  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  const cardElement = selectElement.closest('.book-card');
  if (!cardElement) return;

  const btnBuy = cardElement.querySelector('.btn-buy');
  const btnText = cardElement.querySelector('.btn-buy-text');
  
  const targetUrl = getBookUrlForMarket(book, selectedMarketKey);
  const marketInfo = AMAZON_MARKETS[selectedMarketKey] || { name: 'Amazon' };
  const t = TRANSLATIONS[currentLanguage];

  if (btnBuy) {
    btnBuy.href = targetUrl;
    btnBuy.setAttribute('aria-label', t.ariaViewMarket(book.title, marketInfo.name));
  }

  if (btnText) {
    btnText.textContent = t.viewOn(marketInfo.name);
  }
}

/**
 * Generates HTML for a single book card.
 */
function createBookCard(book, index) {
  const t = TRANSLATIONS[currentLanguage];
  const safeTitle = escapeHtml(book.title || 'Untitled Book');
  const safeSubtitle = book.subtitle ? escapeHtml(book.subtitle) : '';
  const safeAuthor = book.author ? escapeHtml(book.author) : '';
  const safeLang = book.language ? escapeHtml(book.language) : '';
  const safeCover = book.cover ? escapeHtml(book.cover) : '';
  const hasPreview = Array.isArray(book.preview) && book.preview.length > 0;

  // Determine selected market based on state or website language
  let initialMarketKey = selectedMarketState[book.id];
  if (!initialMarketKey || !AMAZON_MARKETS[initialMarketKey]) {
    initialMarketKey = getDefaultMarketForLanguage(book, currentLanguage);
  }
  selectedMarketState[book.id] = initialMarketKey;

  const initialUrl = getBookUrlForMarket(book, initialMarketKey);
  const initialMarketInfo = AMAZON_MARKETS[initialMarketKey] || { name: 'Amazon', flag: '🛒' };

  // Language Badge
  const langBadgeHtml = safeLang 
    ? `<span class="book-lang-badge" aria-label="Language: ${safeLang}">${safeLang}</span>` 
    : '';

  // Preview Chip Button
  const previewChipHtml = hasPreview 
    ? `<button type="button" class="chip-preview-btn" onclick="openSampleModal('${escapeJs(book.id)}')" aria-label="${t.previewBtn} - ${safeTitle}">
        <span>${t.previewBtn}</span>
       </button>`
    : '';

  // Localized Author prefix ("di" / "by")
  const authorPrefix = t.byAuthor;
  const authorHtml = safeAuthor
    ? `<p class="book-author"><span class="author-prefix">${authorPrefix}</span> <strong class="author-name">${safeAuthor}</strong></p>`
    : '';

  // Subtitle
  const subtitleHtml = safeSubtitle 
    ? `<p class="book-subtitle">${safeSubtitle}</p>` 
    : '';

  // Marketplace Dropdown Options
  const marketOptionsHtml = Object.entries(AMAZON_MARKETS).map(([key, info]) => {
    const isSelected = (key === initialMarketKey) ? 'selected' : '';
    return `<option value="${key}" ${isSelected}>${info.flag} ${info.name}</option>`;
  }).join('');

  return `
    <article class="book-card" role="listitem" id="card-${escapeHtml(book.id || index)}">
      <!-- Book Cover Image with Preview Click Trigger -->
      <div 
        class="book-cover-container ${hasPreview ? 'has-preview' : ''}"
        ${hasPreview ? `onclick="openSampleModal('${escapeJs(book.id)}')" title="${t.previewBtn} - ${safeTitle}" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')openSampleModal('${escapeJs(book.id)}')"` : ''}
      >
        <img 
          src="${safeCover}" 
          alt="${safeTitle} - Coloring Book Cover by ${safeAuthor || 'Cozy Coloring Chaos'}"
          class="book-cover-img"
          loading="lazy"
          draggable="false"
          oncontextmenu="return false;"
          onerror="handleImageError(this, '${safeTitle.replace(/'/g, "\\'")}')"
        >
        ${hasPreview ? `<div class="cover-preview-overlay"><span class="cover-preview-badge">${t.previewBtn}</span></div>` : ''}
      </div>

      <!-- Book Info -->
      <div class="book-details">
        <div class="book-header-row">
          <h3 class="book-title">${safeTitle}</h3>
          ${langBadgeHtml}
        </div>

        <div class="book-meta-row">
          ${previewChipHtml}
        </div>
        
        ${authorHtml}
        ${subtitleHtml}

        <!-- Amazon Marketplace Selector & Action Area -->
        <div class="book-action-area">
          <div class="market-selector-wrapper">
            <label for="market-select-${index}" class="market-label">
              <span>${t.selectStore}</span>
              <span>🌍</span>
            </label>
            <div class="market-select-container">
              <select 
                id="market-select-${index}" 
                class="market-select" 
                onchange="onMarketChange(this, '${escapeHtml(book.id)}')"
                aria-label="${t.ariaSelectMarket(safeTitle)}"
              >
                ${marketOptionsHtml}
              </select>
              <svg class="market-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          <a 
            href="${initialUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn-buy"
            aria-label="${t.ariaViewMarket(safeTitle, initialMarketInfo.name)}"
          >
            <span class="btn-buy-text">${t.viewOn(initialMarketInfo.name)}</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Initializes and renders the catalog into the DOM based on current filter.
 */
function renderBooks() {
  const booksContainer = document.getElementById('books-grid');
  if (!booksContainer) return;

  const t = TRANSLATIONS[currentLanguage];

  // Filter books
  const filteredBooks = BOOKS.filter(book => isBookLanguage(book, currentBookFilter));

  if (filteredBooks.length === 0) {
    booksContainer.innerHTML = `
      <div class="empty-state">
        <p>${t.noBooksFound}</p>
      </div>
    `;
    return;
  }

  booksContainer.innerHTML = filteredBooks.map((book, idx) => createBookCard(book, idx)).join('');
}

/**
 * Updates the footer copyright year dynamically.
 */
function updateFooterYear() {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

/**
 * Attaches event listeners to language switcher and filter buttons.
 */
function attachEventListeners() {
  // Language Switcher Buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      if (selectedLang && selectedLang !== currentLanguage) {
        updateInterfaceLanguage(selectedLang);
      }
    });
  });

  // Book Filter Buttons
  document.querySelectorAll('.filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterKey = btn.getAttribute('data-filter');
      if (filterKey && filterKey !== currentBookFilter) {
        setBookFilter(filterKey);
      }
    });
  });
}

/**
 * App initialization
 */
function initApp() {
  // 1. Detect browser local language or saved preference
  currentLanguage = detectInitialLanguage();

  // 2. Set up event listeners
  attachEventListeners();
  initSampleModalEvents();

  // 3. Render page according to initial language & default filter 'all'
  updateInterfaceLanguage(currentLanguage);
  updateFooterYear();
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
