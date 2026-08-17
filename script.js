/**
 * ============================================================================
 * COZY COLORING CHAOS - STATIC WEBSITE JAVASCRIPT
 * ============================================================================
 * 
 * In this file you can:
 * 1. Add, edit or remove books from the BOOKS array.
 * 2. Set Amazon ASIN (the website will automatically generate links for all Amazon marketplaces).
 * 
 * No HTML editing required!
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

// ============================================
// ADD OR EDIT BOOKS HERE
// ============================================
const BOOKS = [
  {
    id: "innocent-paws",
    title: "Innocent Paws",
    subtitle: "A Cozy Murder Coloring Book | Darkly Humorous Murder Scenes in Cozy Everyday Settings for Adults and Teens",
    author: "Isaac McClour",
    language: "English",
    cover: "assets/Innocent.Paws/Front.Cover.png",
    defaultMarket: "com",
    asin: "B0HFGBJW8Y"
  },
  {
    id: "non-rompetemi-i-coglioni",
    title: "Non Rompetemi i Coglioni",
    subtitle: "Il libro da colorare per sfogarsi senza finire nei guai | Libro antistress kawaii per adulti",
    author: "Lucas C. Morica",
    language: "Italiano",
    cover: "assets/Non.Rompetemi.I.Coglioni/Front.Cover.png",
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
    cover: "assets/NomeCartella/Front.Cover.png",
    defaultMarket: "it",
    asin: "B0XXXXXXXX"
  }
  */
];

// ============================================================================
// CORE LOGIC & RENDERING ENGINE
// ============================================================================

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
  // 1. Direct link in amazonLinks if explicitly specified
  if (book.amazonLinks && book.amazonLinks[marketKey]) {
    return book.amazonLinks[marketKey];
  }
  // 2. Generate automatically from ASIN
  if (book.asin && AMAZON_MARKETS[marketKey]) {
    return `https://www.amazon.${AMAZON_MARKETS[marketKey].domain.replace('amazon.', '')}/dp/${book.asin}`;
  }
  // 3. Fallback
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
 * Event listener triggered when a user changes the Amazon marketplace dropdown on a card.
 */
function onMarketChange(selectElement, bookIndex) {
  const selectedMarketKey = selectElement.value;
  const book = BOOKS[bookIndex];
  if (!book) return;

  const cardElement = selectElement.closest('.book-card');
  if (!cardElement) return;

  const btnBuy = cardElement.querySelector('.btn-buy');
  const btnText = cardElement.querySelector('.btn-buy-text');
  
  const targetUrl = getBookUrlForMarket(book, selectedMarketKey);
  const marketInfo = AMAZON_MARKETS[selectedMarketKey] || { name: 'Amazon' };

  if (btnBuy) {
    btnBuy.href = targetUrl;
    btnBuy.setAttribute('aria-label', `View ${book.title} on ${marketInfo.name} (opens in a new tab)`);
  }

  if (btnText) {
    btnText.textContent = `VIEW ON ${marketInfo.name.toUpperCase()}`;
  }
}

/**
 * Generates HTML for a single book card.
 */
function createBookCard(book, index) {
  const safeTitle = escapeHtml(book.title || 'Untitled Book');
  const safeSubtitle = book.subtitle ? escapeHtml(book.subtitle) : '';
  const safeAuthor = book.author ? escapeHtml(book.author) : '';
  const safeLang = book.language ? escapeHtml(book.language) : '';
  const safeCover = book.cover ? escapeHtml(book.cover) : '';

  // Determine initial selected market
  let initialMarketKey = book.defaultMarket;
  if (!initialMarketKey || !AMAZON_MARKETS[initialMarketKey]) {
    initialMarketKey = (safeLang.toLowerCase().includes('ital') ? 'it' : 'com');
  }

  const initialUrl = getBookUrlForMarket(book, initialMarketKey);
  const initialMarketInfo = AMAZON_MARKETS[initialMarketKey] || { name: 'Amazon', flag: '🛒' };

  // Language Badge
  const langBadgeHtml = safeLang 
    ? `<span class="book-lang-badge" aria-label="Language: ${safeLang}">${safeLang}</span>` 
    : '';

  // Author prefix ("di" for Italian, "by" for others)
  const isItalian = safeLang.toLowerCase().includes('ital');
  const authorPrefix = isItalian ? 'di' : 'by';
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
    <article class="book-card" role="listitem" id="card-${index}">
      <!-- Book Cover Image -->
      <div class="book-cover-container">
        <img 
          src="${safeCover}" 
          alt="${safeTitle} - Coloring Book Cover by ${safeAuthor || 'Cozy Coloring Chaos'}"
          class="book-cover-img"
          loading="lazy"
          onerror="handleImageError(this, '${safeTitle.replace(/'/g, "\\'")}')"
        >
      </div>

      <!-- Book Info -->
      <div class="book-details">
        <div class="book-header-row">
          <h3 class="book-title">${safeTitle}</h3>
          ${langBadgeHtml}
        </div>
        
        ${authorHtml}
        ${subtitleHtml}

        <!-- Amazon Marketplace Selector & Action Area -->
        <div class="book-action-area">
          <div class="market-selector-wrapper">
            <label for="market-select-${index}" class="market-label">
              <span>Select Amazon Store</span>
              <span>🌍</span>
            </label>
            <div class="market-select-container">
              <select 
                id="market-select-${index}" 
                class="market-select" 
                onchange="onMarketChange(this, ${index})"
                aria-label="Select Amazon Marketplace for ${safeTitle}"
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
            aria-label="View ${safeTitle} on ${initialMarketInfo.name} (opens in a new tab)"
          >
            <span class="btn-buy-text">VIEW ON ${initialMarketInfo.name.toUpperCase()}</span>
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
 * Initializes and renders the catalog into the DOM.
 */
function renderBooks() {
  const booksContainer = document.getElementById('books-grid');
  if (!booksContainer) return;

  if (!Array.isArray(BOOKS) || BOOKS.length === 0) {
    booksContainer.innerHTML = `
      <div class="empty-state">
        <p>No books currently available. Check back soon!</p>
      </div>
    `;
    return;
  }

  booksContainer.innerHTML = BOOKS.map((book, idx) => createBookCard(book, idx)).join('');
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

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
    updateFooterYear();
  });
} else {
  renderBooks();
  updateFooterYear();
}
