import fs from 'fs';
import path from 'path';

console.log('=== STARTING CHRISTMAS 2026 V2 COMPREHENSIVE VERIFICATION ===\n');

// 1. Load campaign.js and extract definitions
const campaignCode = fs.readFileSync('campaign.js', 'utf8');

// Use a sandboxed eval to extract objects
const sandbox = {
  window: { matchMedia: () => ({ matches: false }) },
  document: {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  sessionStorage: { getItem: () => null, setItem: () => {} }
};

const fn = new Function('window', 'document', 'localStorage', 'sessionStorage', campaignCode + `
  return {
    SEASONAL_CAMPAIGN,
    SLIDE_DEFINITIONS,
    PLANNER_EDITIONS,
    ELIGIBLE_SLIDES_BY_LOCALE,
    FIRST_SLIDE_WEIGHTS,
    SLIDE_TRANSLATIONS,
    UI_TEXTS,
    getOrderForLocale,
    resolveSlide
  };
`);

const {
  SEASONAL_CAMPAIGN,
  SLIDE_DEFINITIONS,
  PLANNER_EDITIONS,
  ELIGIBLE_SLIDES_BY_LOCALE,
  FIRST_SLIDE_WEIGHTS,
  SLIDE_TRANSLATIONS,
  UI_TEXTS,
  getOrderForLocale,
  resolveSlide
} = fn(sandbox.window, sandbox.document, sandbox.localStorage, sandbox.sessionStorage);

let allTestsPassed = true;
function assert(condition, message) {
  if (!condition) {
    console.error('❌ FAIL:', message);
    allTestsPassed = false;
  } else {
    console.log('✅ PASS:', message);
  }
}

// -------------------------------------------------------------
// Test 1: Slide Counts per Locale (8 / 6 / 6 / 6 / 5 / 5 / 5 / 5 / 5)
// -------------------------------------------------------------
console.log('--- TEST 1: SLIDE COUNTS PER LOCALE ---');
const expectedCounts = {
  it: 8,
  en: 6,
  de: 5,
  fr: 6,
  es: 6,
  nl: 5,
  pl: 5,
  sv: 5,
  ja: 5
};

for (const [locale, expected] of Object.entries(expectedCounts)) {
  const actual = ELIGIBLE_SLIDES_BY_LOCALE[locale].length;
  assert(actual === expected, `Locale ${locale.toUpperCase()} has exactly ${expected} slides (got ${actual})`);
}

// -------------------------------------------------------------
// Test 2: Forbidden Slides Absence
// -------------------------------------------------------------
console.log('\n--- TEST 2: FORBIDDEN SLIDES ABSENCE ---');
for (const locale of ['en', 'de', 'fr', 'es', 'nl', 'pl', 'sv', 'ja']) {
  assert(!ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('01-regali'), `01-regali excluded from ${locale.toUpperCase()}`);
  assert(!ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('05-lucas-antistress'), `05-lucas-antistress excluded from ${locale.toUpperCase()}`);
}

for (const locale of ['de', 'nl', 'pl', 'sv', 'ja']) {
  assert(!ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('02-lucas-agenda'), `02-lucas-agenda excluded from ${locale.toUpperCase()} (no English fallback)`);
}

for (const locale of ['it', 'en', 'fr', 'es']) {
  assert(ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('02-lucas-agenda'), `02-lucas-agenda included in ${locale.toUpperCase()}`);
}

for (const locale of Object.keys(expectedCounts)) {
  assert(ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('03-isaac-cozy'), `03-isaac-cozy included in ${locale.toUpperCase()}`);
  assert(ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('04-lucia-pixel'), `04-lucia-pixel included in ${locale.toUpperCase()}`);
  assert(ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('06-italian-girls'), `06-italian-girls included in ${locale.toUpperCase()}`);
  assert(ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('07-paws-duo'), `07-paws-duo included in ${locale.toUpperCase()}`);
  assert(ELIGIBLE_SLIDES_BY_LOCALE[locale].includes('08-regali-internazionali'), `08-regali-internazionali included in ${locale.toUpperCase()}`);
}

// -------------------------------------------------------------
// Test 3: Asset Existence on Disk
// -------------------------------------------------------------
console.log('\n--- TEST 3: ASSET EXISTENCE ON DISK ---');
let missingAssets = 0;
for (const [locale, slideIds] of Object.entries(ELIGIBLE_SLIDES_BY_LOCALE)) {
  for (const slideId of slideIds) {
    const resolved = resolveSlide(slideId, locale);
    if (!resolved) {
      console.error(`Missing resolved slide for ${slideId} in ${locale}`);
      missingAssets++;
      continue;
    }
    if (!fs.existsSync(resolved.desktopAsset)) {
      console.error(`Missing desktop asset: ${resolved.desktopAsset} for ${slideId} in ${locale}`);
      missingAssets++;
    }
    if (!fs.existsSync(resolved.mobileAsset)) {
      console.error(`Missing mobile asset: ${resolved.mobileAsset} for ${slideId} in ${locale}`);
      missingAssets++;
    }
  }
}
assert(missingAssets === 0, `All referenced banner WebP assets exist on disk for all 9 locales (${missingAssets} missing)`);

// -------------------------------------------------------------
// Test 4: Planner Edition Resolving
// -------------------------------------------------------------
console.log('\n--- TEST 4: PLANNER EDITION RESOLVING ---');
const agendaExpectations = {
  it: {
    title: 'Non mi ricordo mai un cazzo',
    cardId: 'card-non-mi-ricordo-mai-un-cazzo',
    desktop: 'banners/02-lucas-agenda-desktop.webp',
    mobile: 'banners/02-lucas-agenda-mobile.webp'
  },
  en: {
    title: "I Can't Remember Jack Shit",
    cardId: 'card-i-cant-remember-jack-shit',
    desktop: 'banners/02-lucas-agenda-en-desktop.webp',
    mobile: 'banners/02-lucas-agenda-en-mobile.webp'
  },
  fr: {
    title: "J'ai une mémoire de merde",
    cardId: 'card-jai-une-memoire-de-merde',
    desktop: 'banners/02-lucas-agenda-fr-desktop.webp',
    mobile: 'banners/02-lucas-agenda-fr-mobile.webp'
  },
  es: {
    title: 'Tengo una memoria de mierda',
    cardId: 'card-tengo-una-memoria-de-mierda',
    desktop: 'banners/02-lucas-agenda-es-desktop.webp',
    mobile: 'banners/02-lucas-agenda-es-mobile.webp'
  }
};

for (const [locale, exp] of Object.entries(agendaExpectations)) {
  const resolved = resolveSlide('02-lucas-agenda', locale);
  assert(resolved.editionTitle === exp.title, `Planner edition title for ${locale.toUpperCase()} is "${exp.title}"`);
  assert(resolved.targetCardId === exp.cardId, `Planner card target for ${locale.toUpperCase()} is "${exp.cardId}"`);
  assert(resolved.desktopAsset === exp.desktop, `Planner desktop asset for ${locale.toUpperCase()} is "${exp.desktop}"`);
  assert(resolved.mobileAsset === exp.mobile, `Planner mobile asset for ${locale.toUpperCase()} is "${exp.mobile}"`);
  assert(resolved.alt.includes(exp.title), `Alt text for ${locale.toUpperCase()} contains edition title "${exp.title}"`);
}

// -------------------------------------------------------------
// Test 5: Weighted First Slide Simulation
// -------------------------------------------------------------
console.log('\n--- TEST 5: WEIGHTED FIRST SLIDE SIMULATION (10,000 RUNS) ---');
const N = 10000;
const firstSlidePicks = {};
for (let i = 0; i < N; i++) {
  // Clear session storage to force draw
  sandbox.sessionStorage.getItem = () => null;
  const order = getOrderForLocale('en');
  const first = order[0];
  firstSlidePicks[first] = (firstSlidePicks[first] || 0) + 1;
}

console.log('EN First Slide Draw Distribution over 10,000 draws:');
for (const [slideId, count] of Object.entries(firstSlidePicks)) {
  const pct = ((count / N) * 100).toFixed(1);
  console.log(`  - ${slideId}: ${count} (${pct}%)`);
}

// Italian Girls has weight 4 / 10 = ~40%
const igPct = (firstSlidePicks['06-italian-girls'] || 0) / N;
assert(igPct >= 0.36 && igPct <= 0.44, `Italian Girls opening frequency is ~40% (observed: ${(igPct * 100).toFixed(1)}%)`);
assert(!firstSlidePicks['03-isaac-cozy'], '03-isaac-cozy was NEVER picked as first slide (weight 0)');
assert(!firstSlidePicks['01-regali'], '01-regali was NEVER picked in EN (weight 0 & ineligible)');

// -------------------------------------------------------------
// Test 6: Fisher-Yates Complete Non-Repeating Cycle
// -------------------------------------------------------------
console.log('\n--- TEST 6: NON-REPEATING CYCLE VERIFICATION ---');
for (const locale of Object.keys(expectedCounts)) {
  sandbox.sessionStorage.getItem = () => null;
  const order = getOrderForLocale(locale);
  const eligible = ELIGIBLE_SLIDES_BY_LOCALE[locale];
  assert(order.length === eligible.length, `Order length for ${locale} is ${order.length}`);
  assert(new Set(order).size === order.length, `Order for ${locale} has no duplicates: [${order.join(', ')}]`);
}

// -------------------------------------------------------------
// Test 7: Language Switching Logic Simulation
// -------------------------------------------------------------
console.log('\n--- TEST 7: SEAMLESS LANGUAGE SWITCH TRANSITIONS ---');
// Transition IT -> EN while on 02-lucas-agenda
let activeId = '02-lucas-agenda';
let itSlide = resolveSlide(activeId, 'it');
assert(itSlide.desktopAsset === 'banners/02-lucas-agenda-desktop.webp', 'IT active slide shows IT agenda banner');

// Switch to EN
let enEligible = ELIGIBLE_SLIDES_BY_LOCALE.en.includes(activeId);
assert(enEligible, '02-lucas-agenda remains eligible in EN');
let enSlide = resolveSlide(activeId, 'en');
assert(enSlide.desktopAsset === 'banners/02-lucas-agenda-en-desktop.webp', 'EN slide synchronously resolves to EN agenda banner');
assert(enSlide.targetCardId === 'card-i-cant-remember-jack-shit', 'EN slide points to card-i-cant-remember-jack-shit');

// Switch EN -> FR
let frEligible = ELIGIBLE_SLIDES_BY_LOCALE.fr.includes(activeId);
assert(frEligible, '02-lucas-agenda remains eligible in FR');
let frSlide = resolveSlide(activeId, 'fr');
assert(frSlide.desktopAsset === 'banners/02-lucas-agenda-fr-desktop.webp', 'FR slide synchronously resolves to FR agenda banner');

// Switch FR -> DE
let deEligible = ELIGIBLE_SLIDES_BY_LOCALE.de.includes(activeId);
assert(!deEligible, '02-lucas-agenda is NOT eligible in DE');
let deOrder = getOrderForLocale('de');
let newDeActiveId = deEligible ? activeId : deOrder[0];
assert(newDeActiveId !== '02-lucas-agenda', 'Safely switches to a valid DE slide (no wrong agenda flash)');
assert(ELIGIBLE_SLIDES_BY_LOCALE.de.includes(newDeActiveId), `Switched to valid DE slide: ${newDeActiveId}`);

// Transition IT -> EN while on 05-lucas-antistress
activeId = '05-lucas-antistress';
enEligible = ELIGIBLE_SLIDES_BY_LOCALE.en.includes(activeId);
assert(!enEligible, '05-lucas-antistress is NOT eligible in EN');
let enOrder = getOrderForLocale('en');
let newEnActiveId = enEligible ? activeId : enOrder[0];
assert(newEnActiveId !== '05-lucas-antistress', 'Safely switches away from Italian-only slide 05 when entering EN');

// -------------------------------------------------------------
// Test 8: HTML Integrity & SEO
// -------------------------------------------------------------
console.log('\n--- TEST 8: HTML INTEGRITY & STRUCTURE ---');
const html = fs.readFileSync('index.html', 'utf8');

const h1Matches = html.match(/<h1[\s>]/g) || [];
assert(h1Matches.length === 1, `Exactly one <h1> tag in index.html (found ${h1Matches.length})`);

assert(!html.includes('id="black-sword-feature"'), 'black-sword-feature section completely removed from index.html');
assert(html.includes('id="seasonal-campaign-banner"'), '#seasonal-campaign-banner container present in index.html');
assert(html.includes('id="gift-selection-bar"'), '#gift-selection-bar container present in index.html');

console.log('\n=============================================================');
if (allTestsPassed) {
  console.log('🎉 ALL 45+ AUTOMATED CHECKS PASSED PERFECTLY!');
} else {
  console.error('❌ SOME CHECKS FAILED!');
  process.exit(1);
}
console.log('=============================================================\n');
