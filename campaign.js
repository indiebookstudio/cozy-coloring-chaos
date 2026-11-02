/**
 * ============================================================================
 * COZY COLORING CHAOS - SEASONAL CAMPAIGN SYSTEM (CHRISTMAS 2026 V2)
 * ============================================================================
 * Edition-aware, fully localized seasonal hero carousel supporting all 9 website
 * languages (it, en, de, fr, es, nl, pl, sv, ja).
 *
 * Rules:
 * - IT: 8 slides (01, 02-IT, 03, 04, 05, 06, 07, 08)
 * - EN, FR, ES: 6 slides (02-local, 03, 04, 06, 07, 08)
 * - DE, NL, PL, SV, JA: 5 slides (03, 04, 06, 07, 08 - no planner banner)
 * - Planner editions strictly resolved per language (IT, EN, FR, ES)
 * - Weighted first slide draw + Fisher-Yates remainder, non-repeating cycle
 * - Zero flash of wrong covers or language mismatch on UI language switch
 * - Accessible controls (prev, next, dots, pause/resume, counter, live announcer)
 * - Priority loading for the active slide only; progressive loading for the rest
 */

const SEASONAL_CAMPAIGN = {
  id: "christmas-2026-v2",
  name: "Natale 2026 V2",
  enabled: true, // Centralized switch to disable after season
  intervalMs: 8000
};

// ============================================================================
// 1. ASSETS & BASE SLIDE DEFINITIONS
// ============================================================================
const SLIDE_DEFINITIONS = [
  {
    id: "01-regali",
    allowedUiLocales: ["it"],
    role: "secondary",
    action: "show-selection",
    bookIds: ["planner-lucas", "crazy-cozy", "the-cyberpunk-pixel-show"],
    fallbackCardId: "catalog-heading",
    assets: {
      default: {
        desktop: "banners/01-regali-desktop.webp",
        mobile: "banners/01-regali-mobile.webp"
      }
    }
  },
  {
    id: "02-lucas-agenda",
    allowedUiLocales: ["it", "en", "fr", "es"],
    role: "primary",
    action: "show-book",
    bookIds: ["planner-lucas"],
    fallbackCardId: "card-non-mi-ricordo-mai-un-cazzo",
    assets: {
      it: {
        desktop: "banners/02-lucas-agenda-desktop.webp",
        mobile: "banners/02-lucas-agenda-mobile.webp"
      },
      en: {
        desktop: "banners/02-lucas-agenda-en-desktop.webp",
        mobile: "banners/02-lucas-agenda-en-mobile.webp"
      },
      fr: {
        desktop: "banners/02-lucas-agenda-fr-desktop.webp",
        mobile: "banners/02-lucas-agenda-fr-mobile.webp"
      },
      es: {
        desktop: "banners/02-lucas-agenda-es-desktop.webp",
        mobile: "banners/02-lucas-agenda-es-mobile.webp"
      }
    }
  },
  {
    id: "03-isaac-cozy",
    allowedUiLocales: ["it", "en", "de", "fr", "es", "nl", "pl", "sv", "ja"],
    role: "secondary",
    action: "show-selection",
    bookIds: ["crazy-cozy", "cozy-and-doomed", "impossible-worlds"],
    fallbackCardId: "card-crazy-cozy",
    assets: {
      default: {
        desktop: "banners/03-isaac-cozy-desktop.webp",
        mobile: "banners/03-isaac-cozy-mobile.webp"
      }
    }
  },
  {
    id: "04-lucia-pixel",
    allowedUiLocales: ["it", "en", "de", "fr", "es", "nl", "pl", "sv", "ja"],
    role: "primary",
    action: "show-selection",
    bookIds: ["the-cyberpunk-pixel-show", "the-black-sword", "homer-in-circles"],
    fallbackCardId: "card-the-cyberpunk-pixel-show",
    assets: {
      default: {
        desktop: "banners/04-lucia-pixel-desktop.webp",
        mobile: "banners/04-lucia-pixel-mobile.webp"
      }
    }
  },
  {
    id: "05-lucas-antistress",
    allowedUiLocales: ["it"],
    role: "primary",
    action: "show-book",
    bookIds: ["non-rompetemi-i-coglioni"],
    fallbackCardId: "card-non-rompetemi-i-coglioni",
    assets: {
      default: {
        desktop: "banners/05-lucas-antistress-desktop.webp",
        mobile: "banners/05-lucas-antistress-mobile.webp"
      }
    }
  },
  {
    id: "06-italian-girls",
    allowedUiLocales: ["it", "en", "de", "fr", "es", "nl", "pl", "sv", "ja"],
    role: "primary",
    action: "show-book",
    bookIds: ["italian-girls"],
    fallbackCardId: "card-italian-girls",
    assets: {
      default: {
        desktop: "banners/06-italian-girls-desktop.webp",
        mobile: "banners/06-italian-girls-mobile.webp"
      }
    }
  },
  {
    id: "07-paws-duo",
    allowedUiLocales: ["it", "en", "de", "fr", "es", "nl", "pl", "sv", "ja"],
    role: "primary",
    action: "show-selection",
    bookIds: ["killer-paws", "innocent-paws"],
    fallbackCardId: "card-killer-paws",
    assets: {
      default: {
        desktop: "banners/07-paws-duo-desktop.webp",
        mobile: "banners/07-paws-duo-mobile.webp"
      }
    }
  },
  {
    id: "08-regali-internazionali",
    allowedUiLocales: ["it", "en", "de", "fr", "es", "nl", "pl", "sv", "ja"],
    role: "primary",
    action: "show-selection",
    bookIds: ["italian-girls", "killer-paws", "the-cyberpunk-pixel-show"],
    fallbackCardId: "catalog-heading",
    assets: {
      default: {
        desktop: "banners/08-regali-internazionali-desktop.webp",
        mobile: "banners/08-regali-internazionali-mobile.webp"
      }
    }
  }
];

// ============================================================================
// 2. PLANNER EDITIONS PER LOCALE
// ============================================================================
const PLANNER_EDITIONS = {
  it: {
    title: "Non mi ricordo mai un cazzo",
    cardId: "card-non-mi-ricordo-mai-un-cazzo",
    bookId: "non-mi-ricordo-mai-un-cazzo",
    asin: "B0HLT3HR9Z"
  },
  en: {
    title: "I Can't Remember Jack Shit",
    cardId: "card-i-cant-remember-jack-shit",
    bookId: "i-cant-remember-jack-shit",
    asin: "B0HM3HRQ93"
  },
  fr: {
    title: "J'ai une mémoire de merde",
    cardId: "card-jai-une-memoire-de-merde",
    bookId: "jai-une-memoire-de-merde",
    asin: "B0HM3VTVHN"
  },
  es: {
    title: "Tengo una memoria de mierda",
    cardId: "card-tengo-una-memoria-de-mierda",
    bookId: "tengo-una-memoria-de-mierda",
    asin: "B0HM7M6WB1"
  }
};

function getResolvedPlannerId(locale) {
  return PLANNER_EDITIONS[locale] ? PLANNER_EDITIONS[locale].bookId : null;
}
window.getResolvedPlannerId = getResolvedPlannerId;

// ============================================================================
// 3. ELIGIBILITY & WEIGHTS BY LOCALE
// ============================================================================
const ELIGIBLE_SLIDES_BY_LOCALE = {
  it: ["01-regali", "02-lucas-agenda", "03-isaac-cozy", "04-lucia-pixel", "05-lucas-antistress", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  en: ["02-lucas-agenda", "03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  de: ["03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  fr: ["02-lucas-agenda", "03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  es: ["02-lucas-agenda", "03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  nl: ["03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  pl: ["03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  sv: ["03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"],
  ja: ["03-isaac-cozy", "04-lucia-pixel", "06-italian-girls", "07-paws-duo", "08-regali-internazionali"]
};

const FIRST_SLIDE_WEIGHTS = {
  it: { "01-regali": 0, "02-lucas-agenda": 1, "03-isaac-cozy": 0, "04-lucia-pixel": 1, "05-lucas-antistress": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  en: { "02-lucas-agenda": 1, "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 4, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  de: { "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  fr: { "02-lucas-agenda": 1, "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  es: { "02-lucas-agenda": 1, "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  nl: { "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  pl: { "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  sv: { "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 },
  ja: { "03-isaac-cozy": 0, "04-lucia-pixel": 1, "06-italian-girls": 2, "07-paws-duo": 2, "08-regali-internazionali": 2 }
};

// ============================================================================
// 4. TRANSLATIONS ACROSS ALL 9 LANGUAGES
// ============================================================================
const SLIDE_TRANSLATIONS = {
  it: {
    "01-regali": {
      eyebrow: "NATALE, A MODO NOSTRO",
      title: "Regala un po’ di splendido caos.",
      body: "Libri da colorare, mondi pixel e un quaderno irriverente: tre idee regalo per chi ama uscire dagli schemi.",
      cta: "Scegli il tuo regalo",
      alt: "Tre idee regalo tra luci natalizie: il quaderno di Lucas, Crazy Cozy e The Cyberpunk Pixel Show."
    },
    "02-lucas-agenda": {
      eyebrow: "LUCAS C. MORICA · QUADERNI PER ADULTI",
      title: "Per chi dimentica tutto. Anche a Natale.",
      body: "Un quaderno senza date per appuntamenti, cose da fare e tutto quello che sparisce dalla testa.",
      cta: "Scopri il quaderno",
      alt: "Il quaderno senza date di Lucas C. Morica, nell’edizione {editionTitle}, su una scrivania natalizia con penna rossa e regali."
    },
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · UNA PAUSA COZY",
      title: "Una pausa cozy, lontano dal caos.",
      body: "Crazy Cozy, Cozy & Doomed e Impossible Worlds: tre modi di staccare con creature adorabili e situazioni assurde.",
      cta: "Scopri questi tre libri",
      alt: "Crazy Cozy, Cozy & Doomed e Impossible Worlds tra coperte, regali e un capibara decorativo con cappello natalizio."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · MONDI DA RIVELARE",
      title: "Sotto l’albero, un altro mondo.",
      body: "Futuri al neon, draghi e miti greci. Scopri i mondi da rivelare di Lucia, un segno alla volta.",
      cta: "Esplora i libri di Lucia",
      alt: "The Cyberpunk Pixel Show, The Black Sword e Homer in Circles tra regali, luci dorate e un’aurora invernale."
    },
    "05-lucas-antistress": {
      eyebrow: "LUCAS C. MORICA · UMORISMO PER ADULTI",
      title: "A Natale siamo tutti più buoni. Quasi.",
      body: "Per chi ama il kawaii, l’ironia e le parole senza filtro. Un regalo da colorare, per adulti che dicono quello che pensano.",
      cta: "Scopri il lato irriverente",
      alt: "Non Rompetemi i Coglioni di Lucas C. Morica accanto a un cappello natalizio, matite e una tazzina."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "Un piccolo viaggio in Italia. Da scartare.",
      body: "Stile, dolce vita e pagine da colorare: regala un’evasione italiana con Italian Girls.",
      cta: "Scopri Italian Girls",
      alt: "Italian Girls di Isaac McClour tra regali natalizi, luci dorate e una tazzina su un piedistallo di velluto rosso."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "Sembrano innocenti. Scartali con cautela.",
      body: "Killer Paws e Innocent Paws: due libri da colorare dove il cozy incontra l’umorismo nero.",
      cta: "Scopri i due libri Paws",
      alt: "Killer Paws e Innocent Paws di Isaac McClour in una scena natalizia con regali, nastri e un gatto decorativo."
    },
    "08-regali-internazionali": {
      eyebrow: "REGALI FUORI DAGLI SCHEMI",
      title: "Regali diversi. Per persone fuori dagli schemi.",
      body: "Dolce vita, misteri cozy e mondi al neon. Trova il libro da colorare per la persona che hai in mente.",
      cta: "Trova il tuo regalo",
      alt: "Italian Girls, Killer Paws e The Cyberpunk Pixel Show presentati come regali tra velluto verde, nastri rossi e luci natalizie."
    }
  },
  en: {
    "02-lucas-agenda": {
      eyebrow: "LUCAS C. MORICA · NOTEBOOKS FOR ADULTS",
      title: "For the one who forgets everything. Even at Christmas.",
      body: "An undated notebook for appointments, to-dos and everything that slips your mind.",
      cta: "Discover the notebook",
      alt: "The undated notebook by Lucas C. Morica, in the edition {editionTitle}, on a Christmas desk with a red pen and gifts."
    },
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · A COZY BREAK",
      title: "A cozy break from the holiday chaos.",
      body: "Crazy Cozy, Cozy & Doomed and Impossible Worlds: three coloring escapes filled with cute creatures and wonderfully absurd situations.",
      cta: "Explore these three books",
      alt: "Crazy Cozy, Cozy & Doomed and Impossible Worlds among blankets, gifts and a decorative capybara in a Santa hat."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · WORLDS TO REVEAL",
      title: "Another world, under the tree.",
      body: "Neon futures, dragons and Greek myths. Discover Lucia’s hidden worlds, one mark at a time.",
      cta: "Explore Lucia’s books",
      alt: "The Cyberpunk Pixel Show, The Black Sword and Homer in Circles among gifts, golden lights and a winter aurora."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "A little Italian escape. Wrapped for Christmas.",
      body: "A touch of dolce vita, cozy style and pages to color. Give an Italian escape with Italian Girls.",
      cta: "Discover Italian Girls",
      alt: "Italian Girls by Isaac McClour among Christmas gifts, golden lights and an espresso cup on red velvet."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "They look innocent. Unwrap with caution.",
      body: "Killer Paws and Innocent Paws: two coloring books where cozy scenes meet dark humor.",
      cta: "Explore both Paws books",
      alt: "Killer Paws and Innocent Paws by Isaac McClour in a Christmas scene with gifts, ribbons and a decorative cat."
    },
    "08-regali-internazionali": {
      eyebrow: "GIFTS FOR THE WONDERFULLY DIFFERENT",
      title: "Different gifts. For delightfully different people.",
      body: "Dolce vita, cozy mysteries and neon worlds. Find a coloring book for the person you have in mind.",
      cta: "Find your gift",
      alt: "Italian Girls, Killer Paws and The Cyberpunk Pixel Show presented as gifts among green velvet, red ribbons and Christmas lights."
    }
  },
  de: {
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · EINE COZY AUSZEIT",
      title: "Eine gemütliche Pause fernab vom Feiertagschaos.",
      body: "Crazy Cozy, Cozy & Doomed und Impossible Worlds: drei Ausmal-Fluchten voller liebenswerter Kreaturen und wunderbar absurder Szenen.",
      cta: "Diese drei Bücher entdecken",
      alt: "Crazy Cozy, Cozy & Doomed und Impossible Worlds inmitten von Decken, Geschenken und einem Deko-Wasserschwein mit Weihnachtsmütze."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · WELTEN ZUM ENTHÜLLEN",
      title: "Eine andere Welt unter dem Weihnachtsbaum.",
      body: "Neon-Zukünfte, Drachen und griechische Mythen. Entdecke Lucias verborgene Welten Strich für Strich.",
      cta: "Lucias Bücher entdecken",
      alt: "The Cyberpunk Pixel Show, The Black Sword und Homer in Circles zwischen Geschenken, goldenen Lichtern und Polarlicht."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "Eine kleine Italienreise zum Auspacken.",
      body: "Ein Hauch von Dolce Vita, gemütlicher Stil und Seiten zum Ausmalen. Schenke eine italienische Auszeit mit Italian Girls.",
      cta: "Italian Girls entdecken",
      alt: "Italian Girls von Isaac McClour zwischen Weihnachtsgeschenken, goldenen Lichtern und einer Espressotasse auf rotem Samt."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "Sie wirken unschuldig. Vorsichtig auspacken.",
      body: "Killer Paws und Innocent Paws: zwei Malbücher, in denen Gemütlichkeit auf schwarzen Humor trifft.",
      cta: "Beide Paws-Bücher entdecken",
      alt: "Killer Paws und Innocent Paws von Isaac McClour in einer Weihnachtsszene mit Geschenken, Schleifen und einer Deko-Katze."
    },
    "08-regali-internazionali": {
      eyebrow: "GESCHENKE FÜR BESONDERE MENSCHEN",
      title: "Besondere Geschenke für herrlich andere Menschen.",
      body: "Dolce Vita, gemütliche Geheimnisse und Neonwelten. Finde das passende Malbuch für deine Liebsten.",
      cta: "Finde dein Geschenk",
      alt: "Italian Girls, Killer Paws und The Cyberpunk Pixel Show als Geschenke auf grünem Samt mit roten Bändern und Lichterglanz."
    }
  },
  fr: {
    "02-lucas-agenda": {
      eyebrow: "LUCAS C. MORICA · CARNETS POUR ADULTES",
      title: "Pour qui oublie tout. Même à Noël.",
      body: "Un carnet non daté pour les rendez-vous, les choses à faire et tout ce qui vous sort de la tête.",
      cta: "Découvrir le carnet",
      alt: "Le carnet non daté de Lucas C. Morica, dans l'édition {editionTitle}, sur un bureau de Noël avec stylo rouge et cadeaux."
    },
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · UNE PAUSE COZY",
      title: "Une pause cozy, loin du chaos des fêtes.",
      body: "Crazy Cozy, Cozy & Doomed et Impossible Worlds : trois échappées à colorier pleines de créatures adorables et de situations délicieusement absurdes.",
      cta: "Découvrir ces trois livres",
      alt: "Crazy Cozy, Cozy & Doomed et Impossible Worlds parmi des plaids, des cadeaux et un capybara décoratif coiffé d'un bonnet de Noël."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · MONDES À RÉVÉLER",
      title: "Un autre monde au pied du sapin.",
      body: "Futurs néon, dragons et mythologie grecque. Découvrez les mondes cachés de Lucia, trait après trait.",
      cta: "Explorer les livres de Lucia",
      alt: "The Cyberpunk Pixel Show, The Black Sword et Homer in Circles parmi des cadeaux, des lumières dorées et une aurore d'hiver."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "Une petite escapade en Italie à déballer.",
      body: "Une touche de dolce vita, du style cosy et de belles pages à colorier. Offrez un voyage italien avec Italian Girls.",
      cta: "Découvrir Italian Girls",
      alt: "Italian Girls d'Isaac McClour parmi des cadeaux de Noël, des lumières dorées et une tasse sur du velours rouge."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "Ils ont l'air innocents. Déballez avec précaution.",
      body: "Killer Paws et Innocent Paws : deux livres de coloriage où l'ambiance cozy rencontre l'humour noir.",
      cta: "Découvrir les deux livres Paws",
      alt: "Killer Paws et Innocent Paws d'Isaac McClour dans une scène de Noël avec cadeaux, rubans et un chat décoratif."
    },
    "08-regali-internazionali": {
      eyebrow: "CADEAUX QUI SORTENT DE L'ORDINAIRE",
      title: "Des cadeaux uniques. Pour des personnes qui le sont tout autant.",
      body: "Dolce vita, mystères cozy et mondes néon. Trouvez le livre de coloriage parfait pour la personne à laquelle vous pensez.",
      cta: "Trouver votre cadeau",
      alt: "Italian Girls, Killer Paws et The Cyberpunk Pixel Show présentés comme cadeaux parmi velours vert, rubans rouges et lumières de Noël."
    }
  },
  es: {
    "02-lucas-agenda": {
      eyebrow: "LUCAS C. MORICA · CUADERNOS PARA ADULTOS",
      title: "Para quien lo olvida todo. Incluso en Navidad.",
      body: "Un cuaderno sin fechas para citas, tareas y todo lo que se te escapa de la cabeza.",
      cta: "Descubre el cuaderno",
      alt: "El cuaderno sin fechas de Lucas C. Morica, en la edición {editionTitle}, sobre un escritorio navideño con bolígrafo rojo y regalos."
    },
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · UNA PAUSA COZY",
      title: "Una pausa cozy, lejos del caos navideño.",
      body: "Crazy Cozy, Cozy & Doomed e Impossible Worlds: tres escapadas para colorear con criaturas adorables y situaciones maravillosamente absurdas.",
      cta: "Descubre estos tres libros",
      alt: "Crazy Cozy, Cozy & Doomed e Impossible Worlds entre mantas, regalos y un capibara decorativo con gorro navideño."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · MUNDOS POR REVELAR",
      title: "Otro mundo bajo el árbol de Navidad.",
      body: "Futuros de neón, dragones y mitos griegos. Descubre los mundos ocultos de Lucia trazo a trazo.",
      cta: "Explora los libros de Lucia",
      alt: "The Cyberpunk Pixel Show, The Black Sword y Homer in Circles entre regalos, luces doradas y una aurora invernal."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "Una pequeña escapada a Italia para desenvolver.",
      body: "Un toque de dolce vita, estilo acogedor y páginas para colorear. Regala una evasión italiana con Italian Girls.",
      cta: "Descubre Italian Girls",
      alt: "Italian Girls de Isaac McClour entre regalos de Navidad, luces doradas y una taza de café sobre terciopelo rojo."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "Parecen inocentes. Desenvuélvelos con cuidado.",
      body: "Killer Paws e Innocent Paws: dos libros para colorear donde lo cozy se une al humor negro.",
      cta: "Descubre los dos libros Paws",
      alt: "Killer Paws e Innocent Paws de Isaac McClour en una escena navideña con regalos, lazos y un gato decorativo."
    },
    "08-regali-internazionali": {
      eyebrow: "REGALOS FUERA DE LO COMÚN",
      title: "Regalos diferentes. Para personas maravillosamente distintas.",
      body: "Dolce vita, misterios cozy y mundos de neón. Encuentra el libro para colorear ideal para quien tienes en mente.",
      cta: "Encuentra tu regalo",
      alt: "Italian Girls, Killer Paws y The Cyberpunk Pixel Show presentados como regalos entre terciopelo verde, lazos rojos y luces navideñas."
    }
  },
  nl: {
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · EEN COZY PAUZE",
      title: "Een knusse pauze, ver weg van de feestdagenchaos.",
      body: "Crazy Cozy, Cozy & Doomed en Impossible Worlds: drie kleurontsnappingen vol schattige wezens en heerlijk absurde situaties.",
      cta: "Ontdek deze drie boeken",
      alt: "Crazy Cozy, Cozy & Doomed en Impossible Worlds tussen dekens, cadeaus en een decoratieve capibara met kerstmuts."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · WERELDEN OM TE ONTHULLEN",
      title: "Een andere wereld onder de kerstboom.",
      body: "Neon-toekomsten, draken en Griekse mythen. Ontdek Lucia's verborgen werelden, lijn voor lijn.",
      cta: "Ontdek Lucia’s boeken",
      alt: "The Cyberpunk Pixel Show, The Black Sword en Homer in Circles tussen cadeaus, gouden lichtjes en een winteraurora."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "Een Italiaanse minivakantie om uit te pakken.",
      body: "Een vleugje dolce vita, knusse stijl en pagina's om in te kleuren. Geef een Italiaanse ontsnapping cadeau met Italian Girls.",
      cta: "Ontdek Italian Girls",
      alt: "Italian Girls van Isaac McClour tussen kerstcadeaus, gouden lichtjes en een espressokopje op rood fluweel."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "Ze lijken onschuldig. Pak voorzichtig uit.",
      body: "Killer Paws en Innocent Paws: twee kleurboeken waarin cozy en zwarte humor elkaar ontmoeten.",
      cta: "Ontdek beide Paws-boeken",
      alt: "Killer Paws en Innocent Paws van Isaac McClour in een kerstscène met cadeaus, linten en een decoratieve kat."
    },
    "08-regali-internazionali": {
      eyebrow: "CADEAUS BUITEN DE GEBAANDE PADEN",
      title: "Bijzondere cadeaus voor heerlijk eigenzinnige mensen.",
      body: "Dolce vita, knusse mysteries en neonwerelden. Vind het ideale kleurboek voor wie jij in gedachten hebt.",
      cta: "Vind jouw cadeau",
      alt: "Italian Girls, Killer Paws en The Cyberpunk Pixel Show gepresenteerd als cadeaus tussen groen fluweel, rode linten en kerstverlichting."
    }
  },
  pl: {
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · CHWILA COZY",
      title: "Przytulna przerwa od świątecznego chaosu.",
      body: "Crazy Cozy, Cozy & Doomed oraz Impossible Worlds: trzy kolorowanki pełne uroczych stworzeń i cudownie absurdalnych sytuacji.",
      cta: "Odkryj te trzy książki",
      alt: "Crazy Cozy, Cozy & Doomed i Impossible Worlds wśród koców, prezentów i dekoracyjnej kapibary w czapce Mikołaja."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · ŚWIATY DO ODKRYCIA",
      title: "Inny świat pod choinką.",
      body: "Neonowa przyszłość, smoki i greckie mity. Odkryj tajemnicze światy Lucii, kreska po kresce.",
      cta: "Odkryj książki Lucii",
      alt: "The Cyberpunk Pixel Show, The Black Sword i Homer in Circles pośród prezentów, złotych światełek i zimowej zorzy."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "Mała włoska podróż do rozpakowania.",
      body: "Odrobina dolce vita, przytulny styl i strony do kolorowania. Podaruj włoską ucieczkę z Italian Girls.",
      cta: "Odkryj Italian Girls",
      alt: "Italian Girls Isaaca McCloura wśród świątecznych prezentów, złotych światełek i filiżanki na czerwonym aksamicie."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "Wyglądają niewinnie. Rozpakowuj ostrożnie.",
      body: "Killer Paws i Innocent Paws: dwie kolorowanki, w których przytulny klimat spotyka czarny humor.",
      cta: "Odkryj obie książki Paws",
      alt: "Killer Paws i Innocent Paws Isaaca McCloura w świątecznej scenerii z prezentami, wstążkami i kotem."
    },
    "08-regali-internazionali": {
      eyebrow: "PREZENTY NIE Z TEJ ZIEMI",
      title: "Wyjątkowe prezenty dla wyjątkowych osób.",
      body: "Dolce vita, przytulne tajemnice i neonowe światy. Znajdź kolorowankę idealną dla kogoś bliskiego.",
      cta: "Wybierz prezent",
      alt: "Italian Girls, Killer Paws i The Cyberpunk Pixel Show zaprezentowane jako prezenty wśród zielonego aksamitu, czerwonych wstążek i światełek."
    }
  },
  sv: {
    "03-isaac-cozy": {
      eyebrow: "ISAAC MCCLOUR · EN MYSIG PAUS",
      title: "En mysig paus från helgkaoset.",
      body: "Crazy Cozy, Cozy & Doomed och Impossible Worlds: tre målarböcker fyllda med bedårande varelser och underbart absurda situationer.",
      cta: "Upptäck dessa tre böcker",
      alt: "Crazy Cozy, Cozy & Doomed och Impossible Worlds bland filtar, julklappar och en dekorativ kapybar med tomteluva."
    },
    "04-lucia-pixel": {
      eyebrow: "LUCIA C. MARCOS · VÄRLDAR ATT AVTÄCKA",
      title: "En annan värld under granen.",
      body: "Neonframtid, drakar och grekiska myter. Upptäck Lucias gömda världar, ett streck i taget.",
      cta: "Utforska Lucias böcker",
      alt: "The Cyberpunk Pixel Show, The Black Sword och Homer in Circles bland julklappar, gyllene ljus och vinternorrsken."
    },
    "06-italian-girls": {
      eyebrow: "ISAAC MCCLOUR · ITALIAN GIRLS",
      title: "En liten italiensk resa att slå in.",
      body: "En touch av dolce vita, mysig stil och sidor att färglägga. Ge bort en italiensk tillflykt med Italian Girls.",
      cta: "Upptäck Italian Girls",
      alt: "Italian Girls av Isaac McClour bland julklappar, gyllene ljus och en kaffekopp på röd sammet."
    },
    "07-paws-duo": {
      eyebrow: "ISAAC MCCLOUR · COZY MURDER",
      title: "De ser oskyldiga ut. Öppna med försiktighet.",
      body: "Killer Paws och Innocent Paws: två målarböcker där mys möter svart humor.",
      cta: "Utforska båda Paws-böckerna",
      alt: "Killer Paws och Innocent Paws av Isaac McClour i en julscen med paket, band och en dekorativ katt."
    },
    "08-regali-internazionali": {
      eyebrow: "JULKLAPPAR UTÖVER DET VANLIGA",
      title: "Annorlunda julklappar för härligt unika människor.",
      body: "Dolce vita, mysiga mysterier och neonvärldar. Hitta den perfekta målarboken för den du tänker på.",
      cta: "Hitta din julklapp",
      alt: "Italian Girls, Killer Paws och The Cyberpunk Pixel Show presenterade som julklappar bland grön sammet, röda band och juleljus."
    }
  },
  ja: {
    "03-isaac-cozy": {
      eyebrow: "アイザック・マックルーア · コージーなひと休み",
      title: "ホリデーの喧騒を離れて、心温まるひとときを。",
      body: "『Crazy Cozy』『Cozy & Doomed』『Impossible Worlds』：愛らしい生き物たちと不条理な世界が彩る、3つの塗り絵エスケープ。",
      cta: "この3冊を見る",
      alt: "ブランケット、ギフト、サンタ帽をかぶったカピバラに囲まれた『Crazy Cozy』『Cozy & Doomed』『Impossible Worlds』。"
    },
    "04-lucia-pixel": {
      eyebrow: "ルシア・C・マルコス · 明かされる世界",
      title: "ツリーの下に広がる、もうひとつの世界。",
      body: "ネオンの未来、ドラゴン、そしてギリシャ神話。一線ごとに明かされるルシアの隠された世界。",
      cta: "ルシアの本を見る",
      alt: "ギフト、金色の光、冬のオーロラに囲まれた『The Cyberpunk Pixel Show』『The Black Sword』『Homer in Circles』。"
    },
    "06-italian-girls": {
      eyebrow: "アイザック・マックルーア · ITALIAN GIRLS",
      title: "開けた瞬間広がる、小さなイタリアの旅。",
      body: "甘い生活（ドルチェ・ヴィータ）の雰囲気とおしゃれな塗り絵。とっておきのイタリアのひとときを贈ろう。",
      cta: "『Italian Girls』を見る",
      alt: "赤いベルベット、ギフト、金色の光、エスプレッソカップに囲まれたアイザック・マックルーアの『Italian Girls』。"
    },
    "07-paws-duo": {
      eyebrow: "アイザック・マックルーア · コージー・マーダー",
      title: "見た目は無邪気。開けるときはご用心。",
      body: "『Killer Paws』と『Innocent Paws』：コージーな世界観にブラックユーモアが光る2冊の塗り絵。",
      cta: "Pawsシリーズの2冊を見る",
      alt: "クリスマスギフト、リボン、猫のオブジェに囲まれたアイザック・マックルーアの『Killer Paws』と『Innocent Paws』。"
    },
    "08-regali-internazionali": {
      eyebrow: "型破りなクリスマスギフト",
      title: "個性豊かなあの人へ、特別なギフトを。",
      body: "ドルチェ・ヴィータ、コージーなミステリー、ネオンの世界。思い浮かぶあの人にぴったりの塗り絵を見つけよう。",
      cta: "ギフトを選ぶ",
      alt: "グリーンのベルベット、赤いリボン、クリスマスの灯りに包まれた『Italian Girls』『Killer Paws』『The Cyberpunk Pixel Show』。"
    }
  }
};

const UI_TEXTS = {
  it: {
    prev: "Banner precedente",
    next: "Banner successivo",
    pause: "Metti in pausa i banner",
    resume: "Riprendi i banner",
    goToSlide: "Vai al banner {number}: {title}",
    carouselAriaLabel: "Idee regalo di Natale",
    selectedGiftsChip: "Idee regalo selezionate",
    showAllBooks: "Mostra tutti i libri"
  },
  en: {
    prev: "Previous banner",
    next: "Next banner",
    pause: "Pause banner carousel",
    resume: "Resume banner carousel",
    goToSlide: "Go to banner {number}: {title}",
    carouselAriaLabel: "Christmas gift ideas",
    selectedGiftsChip: "Selected gift ideas",
    showAllBooks: "Show all books"
  },
  de: {
    prev: "Vorheriger Banner",
    next: "Nächster Banner",
    pause: "Banner-Karussell anhalten",
    resume: "Banner-Karussell fortsetzen",
    goToSlide: "Zu Banner {number} wechseln: {title}",
    carouselAriaLabel: "Weihnachtsgeschenkideen",
    selectedGiftsChip: "Ausgewählte Geschenkideen",
    showAllBooks: "Alle Bücher anzeigen"
  },
  fr: {
    prev: "Bannière précédente",
    next: "Bannière suivante",
    pause: "Mettre le carrousel en pause",
    resume: "Reprendre le carrousel",
    goToSlide: "Aller à la bannière {number} : {title}",
    carouselAriaLabel: "Idées de cadeaux de Noël",
    selectedGiftsChip: "Idées cadeaux sélectionnées",
    showAllBooks: "Afficher tous les livres"
  },
  es: {
    prev: "Banner anterior",
    next: "Banner siguiente",
    pause: "Pausar carrusel de banners",
    resume: "Reanudar carrusel de banners",
    goToSlide: "Ir al banner {number}: {title}",
    carouselAriaLabel: "Ideas de regalos de Navidad",
    selectedGiftsChip: "Ideas de regalo seleccionadas",
    showAllBooks: "Mostrar todos los libros"
  },
  nl: {
    prev: "Vorige banner",
    next: "Volgende banner",
    pause: "Banner-carrousel pauzeren",
    resume: "Banner-carrousel hervatten",
    goToSlide: "Ga naar banner {number}: {title}",
    carouselAriaLabel: "Kerstcadeau-ideeën",
    selectedGiftsChip: "Geselecteerde cadeau-ideeën",
    showAllBooks: "Toon alle boeken"
  },
  pl: {
    prev: "Poprzedni baner",
    next: "Następny baner",
    pause: "Zatrzymaj karuzelę banerów",
    resume: "Wznów karuzelę banerów",
    goToSlide: "Przejdź do banera {number}: {title}",
    carouselAriaLabel: "Świąteczne pomysły na prezent",
    selectedGiftsChip: "Wybrane pomysły na prezent",
    showAllBooks: "Pokaż wszystkie książki"
  },
  sv: {
    prev: "Föregående banner",
    next: "Nästa banner",
    pause: "Pausa bannerkarusell",
    resume: "Återuppta bannerkarusell",
    goToSlide: "Gå till banner {number}: {title}",
    carouselAriaLabel: "Julklappstips",
    selectedGiftsChip: "Utvalda julklappstips",
    showAllBooks: "Visa alla böcker"
  },
  ja: {
    prev: "前のバナー",
    next: "次のバナー",
    pause: "バナーを一時停止",
    resume: "バナーを再開",
    goToSlide: "バナー {number} へ移動: {title}",
    carouselAriaLabel: "クリスマスのギフトアイディア",
    selectedGiftsChip: "おすすめギフトセレクション",
    showAllBooks: "すべての本を表示"
  }
};

function getCampaignUiText(lang) {
  const code = lang || getActiveLanguage();
  return UI_TEXTS[code] || UI_TEXTS.en || UI_TEXTS.it;
}
window.getCampaignUiText = getCampaignUiText;

// ============================================================================
// 5. STORAGE & UTILITIES
// ============================================================================
const memorySessionStore = {};

function getSessionItem(key) {
  try {
    return sessionStorage.getItem(key);
  } catch (e) {
    return memorySessionStore[key] || null;
  }
}

function setSessionItem(key, val) {
  try {
    sessionStorage.setItem(key, val);
  } catch (e) {
    memorySessionStore[key] = val;
  }
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

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getActiveLanguage() {
  if (typeof currentLanguage !== 'undefined' && currentLanguage) {
    return currentLanguage;
  }
  try {
    const saved = localStorage.getItem('ccc_site_lang');
    if (saved && ELIGIBLE_SLIDES_BY_LOCALE[saved]) return saved;
  } catch (e) {}
  return 'it';
}

function trackCampaignEvent(action, params) {
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', action, params);
    } catch (e) {}
  }
}

// ============================================================================
// 6. ORDER GENERATION & SLIDE RESOLUTION
// ============================================================================
function getOrderForLocale(locale) {
  const eligible = ELIGIBLE_SLIDES_BY_LOCALE[locale] || ELIGIBLE_SLIDES_BY_LOCALE.en;
  const storageKey = 'ccc_xmas_2026_order_' + locale;
  let savedOrder = null;

  try {
    const raw = getSessionItem(storageKey);
    if (raw) savedOrder = JSON.parse(raw);
  } catch (e) {}

  if (Array.isArray(savedOrder) &&
      savedOrder.length === eligible.length &&
      savedOrder.every(id => eligible.includes(id)) &&
      new Set(savedOrder).size === eligible.length) {
    return savedOrder;
  }

  // Generate weighted first slide draw
  const weights = FIRST_SLIDE_WEIGHTS[locale] || FIRST_SLIDE_WEIGHTS.en;
  const totalWeight = eligible.reduce((sum, id) => sum + (weights[id] || 0), 0);
  let rand = Math.random() * totalWeight;
  let firstId = eligible.find(id => {
    rand -= (weights[id] || 0);
    return rand < 0;
  });

  if (!firstId) {
    firstId = eligible.find(id => (weights[id] || 0) > 0) || eligible[0];
  }

  // Shuffle remaining eligible slides with Fisher-Yates
  const remaining = eligible.filter(id => id !== firstId);
  const shuffledRemaining = shuffleArray(remaining);
  const newOrder = [firstId, ...shuffledRemaining];

  try {
    setSessionItem(storageKey, JSON.stringify(newOrder));
  } catch (e) {}

  return newOrder;
}

function resolveSlide(slideId, locale) {
  const base = SLIDE_DEFINITIONS.find(s => s.id === slideId);
  if (!base) return null;

  const copy = (SLIDE_TRANSLATIONS[locale] && SLIDE_TRANSLATIONS[locale][slideId]) ||
               (SLIDE_TRANSLATIONS.it && SLIDE_TRANSLATIONS.it[slideId]);

  let assets = base.assets.default;
  if (base.assets[locale]) {
    assets = base.assets[locale];
  }

  const edition = (slideId === '02-lucas-agenda') ? PLANNER_EDITIONS[locale] : null;
  const editionTitle = edition ? edition.title : '';
  const editionId = edition ? edition.bookId : null;
  const altText = (copy.alt || base.alt || '').replace('{editionTitle}', editionTitle);
  const targetCardId = edition ? edition.cardId : base.fallbackCardId;

  return {
    id: slideId,
    eyebrow: copy.eyebrow,
    title: copy.title,
    body: copy.body,
    cta: copy.cta,
    alt: altText,
    desktopAsset: assets.desktop,
    mobileAsset: assets.mobile,
    action: base.action,
    bookIds: base.bookIds,
    targetCardId: targetCardId,
    editionTitle: editionTitle,
    editionId: editionId
  };
}

// ============================================================================
// 7. CAROUSEL RUNTIME STATE & CONTROLLER
// ============================================================================
let currentLocale = 'it';
let arrangedSlides = [];
let currentIndex = 0;
let isPaused = false;
let isHovered = false;
let isFocused = false;
let isInView = true;
let carouselTimer = null;
let touchStartX = null;
let touchStartY = null;

function renderSlideMarkup(slide, index, isActive) {
  const isPriority = isActive;
  const desktopSrcAttr = isPriority ? `src="${slide.desktopAsset}"` : `data-src="${slide.desktopAsset}"`;
  const mobileSrcAttr = isPriority ? `srcset="${slide.mobileAsset}"` : `data-srcset="${slide.mobileAsset}"`;
  const fetchPriorityAttr = isPriority ? 'fetchpriority="high"' : '';
  const loadingAttr = isPriority ? 'loading="eager"' : 'loading="lazy"';
  const inertAttr = !isActive ? 'inert aria-hidden="true"' : 'aria-hidden="false"';

  return `
    <article
      class="hero-slide ${isActive ? 'active' : ''}"
      data-id="${slide.id}"
      data-edition="${escapeHtml(slide.editionTitle)}"
      ${inertAttr}
      id="hero-slide-${index}"
    >
      <picture class="hero-picture">
        <source
          media="(max-width: 768px)"
          ${mobileSrcAttr}
          width="1024"
          height="1536"
        >
        <img
          ${desktopSrcAttr}
          alt="${escapeHtml(slide.alt)}"
          class="hero-img"
          width="1942"
          height="809"
          ${fetchPriorityAttr}
          ${loadingAttr}
          decoding="async"
          onerror="handleHeroImageError(this, '${slide.id}')"
        >
      </picture>
      <div class="hero-copy">
        <p class="hero-kicker">${escapeHtml(slide.eyebrow)}</p>
        <h2 class="hero-title">${escapeHtml(slide.title)}</h2>
        <p class="hero-body">${escapeHtml(slide.body)}</p>
        <a
          href="#${slide.targetCardId}"
          class="hero-cta-btn"
          onclick="handleHeroCtaClick(event, ${index})"
          aria-label="${escapeHtml(slide.cta)} - ${escapeHtml(slide.title)}"
        >
          <span>${escapeHtml(slide.cta)}</span>
          <span class="hero-cta-arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  `;
}

function handleHeroImageError(imgEl, slideId) {
  console.warn(`[Hero] Failed to load banner image for ${slideId}: ${imgEl.src}`);
  // If desktop fails, ensure dark spruce background maintains readable layout without collapsing
  imgEl.style.opacity = '0.15';
}
window.handleHeroImageError = handleHeroImageError;

function loadSlideAssets(slideEl) {
  if (!slideEl) return;
  const source = slideEl.querySelector('source');
  const img = slideEl.querySelector('img');
  if (source && source.dataset.srcset) {
    source.srcset = source.dataset.srcset;
    delete source.dataset.srcset;
  }
  if (img && img.dataset.src) {
    img.src = img.dataset.src;
    delete img.dataset.src;
  }
}

function updateCarouselPauseState() {
  const pauseBtn = document.getElementById('hero-pause');
  const t = getCampaignUiText(currentLocale);

  if (pauseBtn) {
    pauseBtn.textContent = isPaused ? '▶' : 'Ⅱ';
    pauseBtn.setAttribute('aria-label', isPaused ? t.resume : t.pause);
    pauseBtn.setAttribute('title', isPaused ? t.resume : t.pause);
  }

  if (carouselTimer) {
    clearTimeout(carouselTimer);
    carouselTimer = null;
  }

  const shouldRotate = !isPaused && !isHovered && !isFocused && !document.hidden && isInView;
  if (shouldRotate && arrangedSlides.length > 1) {
    carouselTimer = setTimeout(() => {
      showHeroSlide(currentIndex + 1, false);
    }, SEASONAL_CAMPAIGN.intervalMs || 8000);
  }
}

function showHeroSlide(targetIndex, isManual = true) {
  if (!arrangedSlides.length) return;
  const count = arrangedSlides.length;
  currentIndex = (targetIndex % count + count) % count;

  const slidesContainer = document.getElementById('hero-slides');
  const dotsContainer = document.getElementById('hero-dots');
  const counterEl = document.getElementById('hero-counter');
  const announcerEl = document.getElementById('hero-announce');

  if (slidesContainer) {
    const slideEls = slidesContainer.querySelectorAll('.hero-slide');
    slideEls.forEach((el, idx) => {
      const active = (idx === currentIndex);
      el.classList.toggle('active', active);
      el.inert = !active;
      el.setAttribute('aria-hidden', String(!active));
      if (active) {
        loadSlideAssets(el);
      }
    });
  }

  if (dotsContainer) {
    const dotEls = dotsContainer.querySelectorAll('.hero-dot');
    dotEls.forEach((dot, idx) => {
      dot.setAttribute('aria-current', String(idx === currentIndex));
    });
  }

  if (counterEl) {
    const currentNum = String(currentIndex + 1).padStart(2, '0');
    const totalNum = String(count).padStart(2, '0');
    counterEl.textContent = `${currentNum} / ${totalNum}`;
  }

  const activeSlide = arrangedSlides[currentIndex];
  if (activeSlide) {
    if (isManual) {
      isPaused = true; // After manual user action, only resume on request
      if (announcerEl) {
        announcerEl.textContent = activeSlide.title;
      }
    }
    trackCampaignEvent('campaign_slide_view', {
      campaign: SEASONAL_CAMPAIGN.id,
      slideId: activeSlide.id,
      uiLocale: currentLocale,
      editionId: activeSlide.editionId || null,
      position: currentIndex + 1
    });
  }

  updateCarouselPauseState();
}

function handleHeroCtaClick(event, slideIndex) {
  if (event) event.preventDefault();
  const slide = arrangedSlides[slideIndex];
  if (!slide) return;

  trackCampaignEvent('campaign_slide_click', {
    campaign: SEASONAL_CAMPAIGN.id,
    slideId: slide.id,
    uiLocale: currentLocale,
    editionId: slide.editionId || null,
    position: slideIndex + 1
  });

  if (slide.action === 'show-selection') {
    if (typeof window.showGiftSelection === 'function') {
      window.showGiftSelection(slide.bookIds);
    }
  } else if (slide.action === 'show-book') {
    const bookId = (slide.bookIds && slide.bookIds[0]) || slide.id;
    if (typeof window.scrollToBookCard === 'function') {
      window.scrollToBookCard(bookId);
    }
  }
}
window.handleHeroCtaClick = handleHeroCtaClick;
window.goToChristmasSlide = goToSlide;

// ============================================================================
// 8. MOUNT & SYNCHRONOUS LANGUAGE UPDATE
// ============================================================================
function mountSeasonalHero() {
  if (!SEASONAL_CAMPAIGN || !SEASONAL_CAMPAIGN.enabled) return;
  const container = document.getElementById('seasonal-campaign-banner');
  if (!container) return;

  currentLocale = getActiveLanguage();
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    isPaused = true;
  }

  const order = getOrderForLocale(currentLocale);
  arrangedSlides = order.map(id => resolveSlide(id, currentLocale)).filter(Boolean);
  currentIndex = 0;

  const t = getCampaignUiText(currentLocale);

  const slidesHtml = arrangedSlides.map((s, i) => renderSlideMarkup(s, i, i === currentIndex)).join('');
  const dotsHtml = arrangedSlides.map((s, i) => {
    const label = t.goToSlide.replace('{number}', i + 1).replace('{title}', s.title);
    return `<button type="button" class="hero-dot" data-index="${i}" aria-label="${escapeHtml(label)}" aria-current="${i === currentIndex}"></button>`;
  }).join('');

  const currentNum = String(currentIndex + 1).padStart(2, '0');
  const totalNum = String(arrangedSlides.length).padStart(2, '0');

  container.innerHTML = `
    <section
      class="hero-carousel"
      id="christmas-hero-carousel"
      role="region"
      aria-roledescription="carosello"
      aria-label="${escapeHtml(t.carouselAriaLabel)}"
      tabindex="0"
    >
      <div class="hero-slides" id="hero-slides">
        ${slidesHtml}
      </div>
      <div class="hero-controls" role="group" aria-label="Controlli carosello">
        <button type="button" class="hero-nav-btn" id="hero-prev" aria-label="${escapeHtml(t.prev)}">‹</button>
        <div class="hero-dots" id="hero-dots" role="tablist" aria-label="Seleziona banner">
          ${dotsHtml}
        </div>
        <button type="button" class="hero-nav-btn" id="hero-next" aria-label="${escapeHtml(t.next)}">›</button>
        <button type="button" class="hero-pause-btn" id="hero-pause" aria-label="${escapeHtml(isPaused ? t.resume : t.pause)}">
          ${isPaused ? '▶' : 'Ⅱ'}
        </button>
        <span class="hero-counter" id="hero-counter">${currentNum} / ${totalNum}</span>
      </div>
      <div class="sr-only" id="hero-announce" aria-live="polite"></div>
    </section>
  `;

  attachHeroEvents();
  updateCarouselPauseState();
}

function attachHeroEvents() {
  const carousel = document.getElementById('christmas-hero-carousel');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  const pauseBtn = document.getElementById('hero-pause');
  const dotsContainer = document.getElementById('hero-dots');

  if (!carousel) return;

  if (prevBtn) {
    prevBtn.onclick = () => showHeroSlide(currentIndex - 1, true);
  }
  if (nextBtn) {
    nextBtn.onclick = () => showHeroSlide(currentIndex + 1, true);
  }
  if (pauseBtn) {
    pauseBtn.onclick = () => {
      isPaused = !isPaused;
      updateCarouselPauseState();
    };
  }
  if (dotsContainer) {
    dotsContainer.onclick = (e) => {
      const dot = e.target.closest('.hero-dot');
      if (dot && dot.dataset.index !== undefined) {
        showHeroSlide(parseInt(dot.dataset.index, 10), true);
      }
    };
  }

  // Keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      showHeroSlide(currentIndex + 1, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showHeroSlide(currentIndex - 1, true);
    }
  });

  // Hover & Focus auto-pause
  carousel.addEventListener('mouseenter', () => {
    isHovered = true;
    updateCarouselPauseState();
  });
  carousel.addEventListener('mouseleave', () => {
    isHovered = false;
    updateCarouselPauseState();
  });
  carousel.addEventListener('focusin', () => {
    isFocused = true;
    updateCarouselPauseState();
  });
  carousel.addEventListener('focusout', (e) => {
    if (!carousel.contains(e.relatedTarget)) {
      isFocused = false;
      updateCarouselPauseState();
    }
  });

  // Viewport intersection observer (pause when scrolled out of view)
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      if (entries && entries[0]) {
        isInView = entries[0].isIntersecting;
        updateCarouselPauseState();
      }
    }, { threshold: 0.25 }).observe(carousel);
  }

  // Touch swipe (passive, non-blocking for vertical scroll)
  carousel.addEventListener('touchstart', (e) => {
    if (e.changedTouches && e.changedTouches[0]) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    touchStartX = null;
    touchStartY = null;

    // Only swipe horizontally if delta X is greater than delta Y * 1.5 and >= 50px
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) {
        showHeroSlide(currentIndex + 1, true);
      } else {
        showHeroSlide(currentIndex - 1, true);
      }
    }
  }, { passive: true });
}

// Tab visibility listener (pause on hidden tab)
document.addEventListener('visibilitychange', () => {
  updateCarouselPauseState();
});

/**
 * Synchronously recalculates eligibility, resolves localized edition/assets/copy,
 * and updates the hero carousel immediately on UI language change with zero flash.
 * Called automatically by script.js updateInterfaceLanguage(langCode).
 */
function updateCampaignTranslations(langCode) {
  if (!SEASONAL_CAMPAIGN || !SEASONAL_CAMPAIGN.enabled) return;
  const container = document.getElementById('seasonal-campaign-banner');
  if (!container) return;

  const prevSlideId = arrangedSlides[currentIndex]?.id;
  currentLocale = langCode || getActiveLanguage();

  const order = getOrderForLocale(currentLocale);
  arrangedSlides = order.map(id => resolveSlide(id, currentLocale)).filter(Boolean);

  // If previous active slide remains eligible, preserve it and seamlessly resolve its edition
  const matchingIndex = arrangedSlides.findIndex(s => s.id === prevSlideId);
  currentIndex = (matchingIndex !== -1) ? matchingIndex : 0;

  const t = getCampaignUiText(currentLocale);

  const slidesHtml = arrangedSlides.map((s, i) => renderSlideMarkup(s, i, i === currentIndex)).join('');
  const dotsHtml = arrangedSlides.map((s, i) => {
    const label = t.goToSlide.replace('{number}', i + 1).replace('{title}', s.title);
    return `<button type="button" class="hero-dot" data-index="${i}" aria-label="${escapeHtml(label)}" aria-current="${i === currentIndex}"></button>`;
  }).join('');

  const currentNum = String(currentIndex + 1).padStart(2, '0');
  const totalNum = String(arrangedSlides.length).padStart(2, '0');

  // Synchronous DOM replacement: removes old slide before any flash of wrong cover
  container.innerHTML = `
    <section
      class="hero-carousel"
      id="christmas-hero-carousel"
      role="region"
      aria-roledescription="carosello"
      aria-label="${escapeHtml(t.carouselAriaLabel)}"
      tabindex="0"
    >
      <div class="hero-slides" id="hero-slides">
        ${slidesHtml}
      </div>
      <div class="hero-controls" role="group" aria-label="Controlli carosello">
        <button type="button" class="hero-nav-btn" id="hero-prev" aria-label="${escapeHtml(t.prev)}">‹</button>
        <div class="hero-dots" id="hero-dots" role="tablist" aria-label="Seleziona banner">
          ${dotsHtml}
        </div>
        <button type="button" class="hero-nav-btn" id="hero-next" aria-label="${escapeHtml(t.next)}">›</button>
        <button type="button" class="hero-pause-btn" id="hero-pause" aria-label="${escapeHtml(isPaused ? t.resume : t.pause)}">
          ${isPaused ? '▶' : 'Ⅱ'}
        </button>
        <span class="hero-counter" id="hero-counter">${currentNum} / ${totalNum}</span>
      </div>
      <div class="sr-only" id="hero-announce" aria-live="polite"></div>
    </section>
  `;

  attachHeroEvents();
  updateCarouselPauseState();
}
window.updateCampaignTranslations = updateCampaignTranslations;

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountSeasonalHero);
} else {
  mountSeasonalHero();
}
