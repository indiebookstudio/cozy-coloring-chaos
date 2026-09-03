/**
 * ============================================================================
 * COZY COLORING CHAOS - SEASONAL CAMPAIGN SYSTEM
 * ============================================================================
 * Fully localized promotional system for seasonal events (Halloween 2026,
 * Christmas, Valentine's Day, etc.) supporting all 9 website languages.
 */

const SEASONAL_CAMPAIGN = {
  id: "halloween-2026",
  name: "Halloween 2026",
  enabled: true,

  banner: {
    enabled: true,
    bgImage: "assets/campaigns/halloween-2026/Banner.Halloween.2026.jpeg"
  },

  popup: {
    enabled: true,
    delayMs: 4000, // Short timeout (4s)
    sessionStorageKey: "ccc_campaign_halloween_2026_dismissed",
    bgImage: "assets/campaigns/halloween-2026/Popup.Halloween.2026.jpeg",
    // Horizontal row of three cards with Cozy Terror centered
    bookIds: ["innocent-paws", "cozy-terror", "killer-paws"],
    centerBookId: "cozy-terror"
  }
};

/**
 * Full localization dictionary across all 9 supported languages.
 */
const CAMPAIGN_TRANSLATIONS = {
  it: {
    bannerTitle: "🎃 HALLOWEEN DIVENTA COZY... E TERRIFICANTE.",
    bannerCta: "SCOPRI LA COLLEZIONE HALLOWEEN →",
    bannerAria: "Esplora la collezione di Halloween 2026",
    popupHeadline: "QUESTO HALLOWEEN, COLORA QUALCOSA DI TERRIFICANTE.",
    popupSubheadline: "Tre incubi cozy. Un Halloween indimenticabile.",
    popupBadge: "NOVITÀ",
    buyPrefix: "ACQUISTA SU ",
    buySuffix: "",
    popupFooterText: "Esplora l'intera collezione Cozy Coloring Chaos",
    popupFooterCta: "VEDI TUTTI I LIBRI",
    popupLangHint: "Store / Lingua:",
    popupCloseAria: "Chiudi promozione di Halloween"
  },
  en: {
    bannerTitle: "🎃 HALLOWEEN IS GETTING COZY... AND TERRIFYING.",
    bannerCta: "SHOP THE HALLOWEEN COLLECTION →",
    bannerAria: "Explore the Halloween 2026 Collection",
    popupHeadline: "THIS HALLOWEEN, COLOR SOMETHING TERRIFYING.",
    popupSubheadline: "Three cozy nightmares. One unforgettable Halloween.",
    popupBadge: "NEW",
    buyPrefix: "BUY ON ",
    buySuffix: "",
    popupFooterText: "Explore the full Cozy Coloring Chaos collection",
    popupFooterCta: "VIEW ALL BOOKS",
    popupLangHint: "Store / Language:",
    popupCloseAria: "Close Halloween promotion"
  },
  de: {
    bannerTitle: "🎃 HALLOWEEN WIRD GEMÜTLICH... UND GRUSELIG.",
    bannerCta: "HALLOWEEN-KOLLEKTION ENTDECKEN →",
    bannerAria: "Halloween 2026 Kollektion entdecken",
    popupHeadline: "DIESES HALLOWEEN ETWAS WIRKLICH GRUSELIGES AUSMALEN.",
    popupSubheadline: "Drei gemütliche Albträume. Ein unvergessliches Halloween.",
    popupBadge: "NEU",
    buyPrefix: "AUF ",
    buySuffix: " KAUFEN",
    popupFooterText: "Entdecke die gesamte Cozy Coloring Chaos Kollektion",
    popupFooterCta: "ALLE BÜCHER ANSEHEN",
    popupLangHint: "Store / Sprache:",
    popupCloseAria: "Halloween-Aktion schließen"
  },
  fr: {
    bannerTitle: "🎃 HALLOWEEN DEVIENT COZY... ET TERRIFIANT.",
    bannerCta: "DÉCOUVRIR LA COLLECTION HALLOWEEN →",
    bannerAria: "Découvrir la collection Halloween 2026",
    popupHeadline: "POUR HALLOWEEN, COLORIEZ QUELQUE CHOSE D'EFFRAYANT.",
    popupSubheadline: "Trois cauchemars cozy. Un Halloween inoubliable.",
    popupBadge: "NOUVEAU",
    buyPrefix: "ACHETER SUR ",
    buySuffix: "",
    popupFooterText: "Découvrez toute la collection Cozy Coloring Chaos",
    popupFooterCta: "VOIR TOUS LES LIVRES",
    popupLangHint: "Boutique / Langue :",
    popupCloseAria: "Fermer la promotion d'Halloween"
  },
  es: {
    bannerTitle: "🎃 HALLOWEEN SE VUELVE COZY... Y ATERRADOR.",
    bannerCta: "DESCUBRE LA COLECCIÓN DE HALLOWEEN →",
    bannerAria: "Descubre la colección Halloween 2026",
    popupHeadline: "ESTE HALLOWEEN, COLOREA ALGO ATERRADOR.",
    popupSubheadline: "Tres pesadillas cozy. Un Halloween inolvidable.",
    popupBadge: "NUEVO",
    buyPrefix: "COMPRAR EN ",
    buySuffix: "",
    popupFooterText: "Explora toda la colección Cozy Coloring Chaos",
    popupFooterCta: "VER TODOS LOS LIBROS",
    popupLangHint: "Tienda / Idioma:",
    popupCloseAria: "Cerrar promoción de Halloween"
  },
  nl: {
    bannerTitle: "🎃 HALLOWEEN WORDT COZY... EN HUIVERWEKKEND.",
    bannerCta: "ONTDEK DE HALLOWEEN-COLLECTIE →",
    bannerAria: "Ontdek de Halloween 2026 collectie",
    popupHeadline: "KLEUR DEZE HALLOWEEN IETS ECHT GRIEZELIGS.",
    popupSubheadline: "Drie cozy nachtmerries. Eén onvergetelijke Halloween.",
    popupBadge: "NIEUW",
    buyPrefix: "KOOP OP ",
    buySuffix: "",
    popupFooterText: "Ontdek de complete Cozy Coloring Chaos collectie",
    popupFooterCta: "BEKIJK ALLE BOEKEN",
    popupLangHint: "Winkel / Taal:",
    popupCloseAria: "Halloween-promotie sluiten"
  },
  pl: {
    bannerTitle: "🎃 HALLOWEEN STAJE SIĘ COZY... I PRZERAŻAJĄCE.",
    bannerCta: "ODKRYJ KOLEKCJĘ HALLOWEEN →",
    bannerAria: "Odkryj kolekcję Halloween 2026",
    popupHeadline: "W TO HALLOWEEN POKOLORUJ COŚ PRZERAŻAJĄCEGO.",
    popupSubheadline: "Trzy przytulne koszmary. Jedno niezapomniane Halloween.",
    popupBadge: "NOWOŚĆ",
    buyPrefix: "KUP NA ",
    buySuffix: "",
    popupFooterText: "Odkryj całą kolekcję Cozy Coloring Chaos",
    popupFooterCta: "ZOBACZ WSZYSTKIE KSIĄŻKI",
    popupLangHint: "Sklep / Język:",
    popupCloseAria: "Zamknij promocję Halloween"
  },
  sv: {
    bannerTitle: "🎃 HALLOWEEN BLIR MYSIG... OCH SKRÄMMANDE.",
    bannerCta: "UTFORSKA HALLOWEEN-KOLLEKTIONEN →",
    bannerAria: "Utforska Halloween 2026 kollektionen",
    popupHeadline: "FÄRGLÄGG NÅGOT RIKTIGT SKRÄMMANDE DENNA HALLOWEEN.",
    popupSubheadline: "Tre mysiga mardrömmar. En oförglömlig Halloween.",
    popupBadge: "NYHET",
    buyPrefix: "KÖP PÅ ",
    buySuffix: "",
    popupFooterText: "Upptäck hela Cozy Coloring Chaos-kollektionen",
    popupFooterCta: "VISA ALLA BÖCKER",
    popupLangHint: "Butik / Språk:",
    popupCloseAria: "Stäng Halloween-kampanj"
  },
  ja: {
    bannerTitle: "🎃 ハロウィンを彩るコージーで恐ろしい悪夢。",
    bannerCta: "ハロウィンコレクションを見る →",
    bannerAria: "ハロウィン 2026 コレクションを見る",
    popupHeadline: "今年のハロウィンは、恐ろしくも愛らしい世界を塗ろう。",
    popupSubheadline: "3つの悪夢。忘れられないハロウィンへ。",
    popupBadge: "新刊",
    buyPrefix: "",
    buySuffix: " で購入",
    popupFooterText: "Cozy Coloring Chaos の全コレクションを見る",
    popupFooterCta: "すべての本を見る",
    popupLangHint: "ストア / 言語:",
    popupCloseAria: "ハロウィンプロモーションを閉じる"
  }
};

const CAMPAIGN_LANGUAGES = [
  { code: 'it', flag: 'it', name: 'Italiano', market: 'it', domain: 'amazon.it' },
  { code: 'en', flag: 'us', name: 'English', market: 'us', domain: 'amazon.com' },
  { code: 'de', flag: 'de', name: 'Deutsch', market: 'de', domain: 'amazon.de' },
  { code: 'fr', flag: 'fr', name: 'Français', market: 'fr', domain: 'amazon.fr' },
  { code: 'es', flag: 'es', name: 'Español', market: 'es', domain: 'amazon.es' },
  { code: 'nl', flag: 'nl', name: 'Nederlands', market: 'nl', domain: 'amazon.nl' },
  { code: 'pl', flag: 'pl', name: 'Polski', market: 'pl', domain: 'amazon.pl' },
  { code: 'sv', flag: 'se', name: 'Svenska', market: 'se', domain: 'amazon.se' },
  { code: 'ja', flag: 'jp', name: '日本語', market: 'jp', domain: 'amazon.co.jp' }
];

let campaignTimer = null;

/**
 * Returns current campaign translations matching website language.
 */
function getCampaignT(lang) {
  const code = lang || getActiveLanguage();
  return CAMPAIGN_TRANSLATIONS[code] || CAMPAIGN_TRANSLATIONS.en || CAMPAIGN_TRANSLATIONS.it;
}

/**
 * Helper to get the active language code safely.
 */
function getActiveLanguage() {
  if (typeof currentLanguage !== 'undefined' && currentLanguage) {
    return currentLanguage;
  }
  try {
    const saved = localStorage.getItem('ccc_site_lang');
    if (saved) return saved;
  } catch (e) {}
  return 'it';
}

/**
 * Initializes the seasonal campaign system on DOM ready.
 */
function initSeasonalCampaign() {
  if (!SEASONAL_CAMPAIGN || !SEASONAL_CAMPAIGN.enabled) return;

  // 1. Mount Top Banner
  if (SEASONAL_CAMPAIGN.banner && SEASONAL_CAMPAIGN.banner.enabled) {
    mountCampaignBanner();
  }

  // 2. Mount and schedule Popup
  if (SEASONAL_CAMPAIGN.popup && SEASONAL_CAMPAIGN.popup.enabled) {
    mountCampaignPopup();
    scheduleCampaignPopup();
  }

  // 3. Attach keyboard listener (ESC key)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      const backdrop = document.getElementById('campaign-modal-backdrop');
      if (backdrop && backdrop.classList.contains('is-open')) {
        closeCampaignPopup(true);
      }
    }
  });
}

/**
 * Mounts the top promotional banner inside #seasonal-campaign-banner container.
 */
function mountCampaignBanner() {
  const container = document.getElementById('seasonal-campaign-banner');
  if (!container) return;

  const b = SEASONAL_CAMPAIGN.banner;
  const t = getCampaignT();

  container.innerHTML = `
    <div class="seasonal-banner-wrapper">
      <div 
        class="seasonal-banner-container" 
        onclick="openCampaignPopup()"
        role="button"
        tabindex="0"
        aria-label="${t.bannerAria}"
        onkeydown="if(event.key==='Enter'||event.key===' ')openCampaignPopup()"
      >
        <img 
          src="${b.bgImage}" 
          alt="Halloween Collection" 
          class="seasonal-banner-img"
          loading="eager"
        >
        <div class="seasonal-banner-action">
          <span class="seasonal-banner-cta-btn" id="campaign-banner-cta">
            ${t.bannerCta}
          </span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Helper to determine current Amazon marketplace info (marketKey & domain)
 */
function getActiveMarketInfo(book, lang) {
  const activeLang = lang || getActiveLanguage();
  let marketKey = 'us';
  let domain = 'amazon.com';

  if (typeof getDefaultMarketForLanguage === 'function' && book) {
    marketKey = getDefaultMarketForLanguage(book, activeLang);
  } else {
    const matched = CAMPAIGN_LANGUAGES.find(l => l.code === activeLang);
    if (matched) marketKey = matched.market;
  }

  if (typeof AMAZON_MARKETS !== 'undefined' && AMAZON_MARKETS[marketKey]) {
    domain = AMAZON_MARKETS[marketKey].domain || 'amazon.com';
  } else {
    const matched = CAMPAIGN_LANGUAGES.find(l => l.market === marketKey);
    if (matched) domain = matched.domain;
  }

  return { marketKey, domain };
}

/**
 * Generates HTML for the 3 product cards according to current language & marketplace.
 */
function generateCampaignCardsHtml(lang) {
  const p = SEASONAL_CAMPAIGN.popup;
  const activeLang = lang || getActiveLanguage();
  const t = getCampaignT(activeLang);

  return p.bookIds.map(bookId => {
    const book = (typeof BOOKS !== 'undefined' && Array.isArray(BOOKS))
      ? BOOKS.find(b => b.id === bookId)
      : null;

    if (!book) return '';

    const isCenter = (bookId === p.centerBookId);
    const { marketKey, domain } = getActiveMarketInfo(book, activeLang);
    
    // Obtain the correct Amazon URL matching current marketplace
    let amazonUrl = `https://www.amazon.com/dp/${book.asin}`;
    try {
      if (typeof getBookUrlForMarket === 'function') {
        amazonUrl = getBookUrlForMarket(book, marketKey);
      }
    } catch (e) {}

    const safeTitle = book.title || '';
    const safeDesc = book.subtitle ? book.subtitle.split('|')[0].trim() : '';
    const safeCover = book.cover || '';
    const buyLabel = `${t.buyPrefix}${domain.toUpperCase()}${t.buySuffix}`;

    return `
      <div class="campaign-product-card ${isCenter ? 'card-center' : ''}">
        ${isCenter && t.popupBadge ? `<span class="campaign-card-center-badge">${t.popupBadge}</span>` : ''}
        <div class="campaign-card-cover-wrapper">
          <img 
            src="${safeCover}" 
            alt="${safeTitle} Cover" 
            class="campaign-card-cover"
            loading="lazy"
          >
        </div>
        <h4 class="campaign-card-title">${safeTitle}</h4>
        <p class="campaign-card-desc" title="${safeDesc}">${safeDesc}</p>
        <a 
          href="${amazonUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="campaign-card-buy-btn"
          aria-label="${buyLabel} - ${safeTitle}"
        >
          <span>${buyLabel}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </div>
    `;
  }).join('');
}

/**
 * Mounts the seasonal popup modal markup in #seasonal-campaign-popup-root.
 */
function mountCampaignPopup() {
  let root = document.getElementById('seasonal-campaign-popup-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'seasonal-campaign-popup-root';
    document.body.appendChild(root);
  }

  const p = SEASONAL_CAMPAIGN.popup;
  const activeLang = getActiveLanguage();
  const t = getCampaignT(activeLang);
  const cardsHtml = generateCampaignCardsHtml(activeLang);

  const langButtonsHtml = CAMPAIGN_LANGUAGES.map(item => {
    const isActive = (item.code === activeLang);
    return `
      <button 
        type="button" 
        class="campaign-lang-btn ${isActive ? 'active' : ''}" 
        onclick="setCampaignLanguage('${item.code}')" 
        title="${item.name} (${item.domain})"
        aria-pressed="${isActive ? 'true' : 'false'}"
      >
        <img src="https://flagcdn.com/20x15/${item.flag}.png" alt="${item.code.toUpperCase()}" width="18" height="13" loading="eager">
        <span>${item.code.toUpperCase()}</span>
      </button>
    `;
  }).join('');

  root.innerHTML = `
    <div 
      class="campaign-modal-backdrop" 
      id="campaign-modal-backdrop" 
      onclick="handleCampaignBackdropClick(event)"
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="campaign-modal-headline"
    >
      <div 
        class="campaign-modal-dialog" 
        id="campaign-modal-dialog"
        style="background-image: url('${p.bgImage}');"
      >
        <button 
          type="button" 
          class="campaign-modal-close" 
          id="campaign-modal-close"
          onclick="closeCampaignPopup(true)" 
          aria-label="${t.popupCloseAria}"
        >
          ✕
        </button>

        <div class="campaign-modal-content">
          <header class="campaign-modal-header">
            <h3 class="campaign-modal-headline" id="campaign-modal-headline">
              ${t.popupHeadline}
            </h3>
            <p class="campaign-modal-subheadline" id="campaign-modal-subheadline">
              ${t.popupSubheadline}
            </p>
          </header>

          <div class="campaign-cards-row" id="campaign-cards-row">
            ${cardsHtml}
          </div>

          <footer class="campaign-modal-footer">
            <div class="campaign-footer-left">
              <p class="campaign-footer-text" id="campaign-footer-text">${t.popupFooterText}</p>
              <button type="button" class="campaign-view-all-btn" id="campaign-view-all-btn" onclick="handleCampaignViewAll()">
                ${t.popupFooterCta}
              </button>
            </div>

            <div class="campaign-footer-right">
              <span class="campaign-lang-hint" id="campaign-lang-hint">${t.popupLangHint}</span>
              <div class="campaign-lang-bar" role="group" aria-label="Cambia lingua e store Amazon">
                ${langButtonsHtml}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  `;
}

/**
 * Updates all texts in both the banner and the popup when website language changes.
 * Called automatically by script.js updateInterfaceLanguage(lang).
 */
function updateCampaignTranslations(langCode) {
  const activeLang = langCode || getActiveLanguage();
  const t = getCampaignT(activeLang);

  // 1. Update Banner texts
  const bannerCta = document.getElementById('campaign-banner-cta');
  if (bannerCta) bannerCta.textContent = t.bannerCta;
  const bannerContainer = document.querySelector('.seasonal-banner-container');
  if (bannerContainer) bannerContainer.setAttribute('aria-label', t.bannerAria);

  // 2. Update Popup texts if mounted
  const popupHeadline = document.getElementById('campaign-modal-headline');
  const popupSubheadline = document.getElementById('campaign-modal-subheadline');
  const footerText = document.getElementById('campaign-footer-text');
  const viewAllBtn = document.getElementById('campaign-view-all-btn');
  const langHint = document.getElementById('campaign-lang-hint');
  const closeBtn = document.getElementById('campaign-modal-close');

  if (popupHeadline) popupHeadline.textContent = t.popupHeadline;
  if (popupSubheadline) popupSubheadline.textContent = t.popupSubheadline;
  if (footerText) footerText.textContent = t.popupFooterText;
  if (viewAllBtn) viewAllBtn.textContent = t.popupFooterCta;
  if (langHint) langHint.textContent = t.popupLangHint;
  if (closeBtn) closeBtn.setAttribute('aria-label', t.popupCloseAria);

  // 3. Update Cards in Popup with localized buy buttons & badges
  const cardsContainer = document.getElementById('campaign-cards-row');
  if (cardsContainer) {
    cardsContainer.innerHTML = generateCampaignCardsHtml(activeLang);
  }

  // 4. Update active class on popup language buttons
  document.querySelectorAll('.campaign-lang-btn').forEach(btn => {
    const isTarget = btn.getAttribute('onclick').includes(`'${activeLang}'`);
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
  });
}

/**
 * Changes language from the popup selector:
 * Updates global site language, syncs translations across the entire page,
 * and updates the popup cards with new Amazon links & button labels.
 */
function setCampaignLanguage(langCode) {
  if (typeof updateInterfaceLanguage === 'function') {
    updateInterfaceLanguage(langCode);
  } else {
    updateCampaignTranslations(langCode);
  }
}

/**
 * Schedules the popup to open after the configured delay.
 * In local environment, resets previous dismissal so it reliably opens on page reload for review.
 */
function scheduleCampaignPopup() {
  const p = SEASONAL_CAMPAIGN.popup;

  const isLocal = (typeof window !== 'undefined') &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (!isLocal) {
    try {
      const isDismissed = sessionStorage.getItem(p.sessionStorageKey);
      if (isDismissed) return;
    } catch (e) {}
  } else {
    try {
      sessionStorage.removeItem(p.sessionStorageKey);
    } catch (e) {}
  }

  if (campaignTimer) {
    clearTimeout(campaignTimer);
  }

  const delay = p.delayMs || 4000;
  campaignTimer = setTimeout(() => {
    openCampaignPopup();
  }, delay);
}

/**
 * Opens the promotional popup modal.
 */
function openCampaignPopup() {
  if (campaignTimer) {
    clearTimeout(campaignTimer);
    campaignTimer = null;
  }

  const backdrop = document.getElementById('campaign-modal-backdrop');
  if (!backdrop) {
    mountCampaignPopup();
  }

  const activeBackdrop = document.getElementById('campaign-modal-backdrop');
  if (activeBackdrop) {
    // Ensure texts match current language at open time
    updateCampaignTranslations(getActiveLanguage());
    activeBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Closes the promotional popup modal.
 * @param {boolean} persistDismiss - If true, saves dismissal in sessionStorage.
 */
function closeCampaignPopup(persistDismiss = true) {
  const backdrop = document.getElementById('campaign-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (persistDismiss && SEASONAL_CAMPAIGN && SEASONAL_CAMPAIGN.popup) {
    try {
      sessionStorage.setItem(SEASONAL_CAMPAIGN.popup.sessionStorageKey, '1');
    } catch (e) {}
  }
}

/**
 * Closes modal when clicking outside the dialog on the backdrop.
 */
function handleCampaignBackdropClick(event) {
  if (event.target && event.target.id === 'campaign-modal-backdrop') {
    closeCampaignPopup(true);
  }
}

/**
 * Handles clicking "VIEW ALL BOOKS": closes modal and scrolls to catalog.
 */
function handleCampaignViewAll() {
  closeCampaignPopup(true);
  const catalogEl = document.getElementById('catalog-heading') || document.getElementById('books-grid');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSeasonalCampaign);
} else {
  initSeasonalCampaign();
}
