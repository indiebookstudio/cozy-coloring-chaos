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
// ============================================================================
// AMAZON MARKETPLACE DEFINITIONS (14 Official Stores)
// ============================================================================
// ============================================================================
// AMAZON MARKETPLACE DEFINITIONS (14 Official Stores)
// ============================================================================
const AMAZON_MARKETS = {
  us: { name: "Amazon.com (US)", code: "US", flag: "🇺🇸", domain: "amazon.com", buttonLabel: "Amazon.com (US)" },
  uk: { name: "Amazon.co.uk (UK)", code: "UK", flag: "🇬🇧", domain: "amazon.co.uk", buttonLabel: "Amazon.co.uk (UK)" },
  de: { name: "Amazon.de (DE)", code: "DE", flag: "🇩🇪", domain: "amazon.de", buttonLabel: "Amazon.de (DE)" },
  fr: { name: "Amazon.fr (FR)", code: "FR", flag: "🇫🇷", domain: "amazon.fr", buttonLabel: "Amazon.fr (FR)" },
  es: { name: "Amazon.es (ES)", code: "ES", flag: "🇪🇸", domain: "amazon.es", buttonLabel: "Amazon.es (ES)" },
  it: { name: "Amazon.it (IT)", code: "IT", flag: "🇮🇹", domain: "amazon.it", buttonLabel: "Amazon.it (IT)" },
  nl: { name: "Amazon.nl (NL)", code: "NL", flag: "🇳🇱", domain: "amazon.nl", buttonLabel: "Amazon.nl (NL)" },
  pl: { name: "Amazon.pl (PL)", code: "PL", flag: "🇵🇱", domain: "amazon.pl", buttonLabel: "Amazon.pl (PL)" },
  se: { name: "Amazon.se (SE)", code: "SE", flag: "🇸🇪", domain: "amazon.se", buttonLabel: "Amazon.se (SE)" },
  be: { name: "Amazon.com.be (BE)", code: "BE", flag: "🇧🇪", domain: "amazon.com.be", buttonLabel: "Amazon.com.be (BE)" },
  ie: { name: "Amazon.ie (IE)", code: "IE", flag: "🇮🇪", domain: "amazon.ie", buttonLabel: "Amazon.ie (IE)" },
  jp: { name: "Amazon.co.jp (JP)", code: "JP", flag: "🇯🇵", domain: "amazon.co.jp", buttonLabel: "Amazon.co.jp (JP)" },
  ca: { name: "Amazon.ca (CA)", code: "CA", flag: "🇨🇦", domain: "amazon.ca", buttonLabel: "Amazon.ca (CA)" },
  au: { name: "Amazon.com.au (AU)", code: "AU", flag: "🇦🇺", domain: "amazon.com.au", buttonLabel: "Amazon.com.au (AU)" }
};

// ============================================================================
// ADD OR EDIT BOOKS HERE
// ============================================================================
const BOOKS = [
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
    colored: [
      "assets/Impossible.Worlds/Colored/01.jpeg",
      "assets/Impossible.Worlds/Colored/02.jpeg",
      "assets/Impossible.Worlds/Colored/03.jpeg",
      "assets/Impossible.Worlds/Colored/04.jpeg",
      "assets/Impossible.Worlds/Colored/05.jpeg",
      "assets/Impossible.Worlds/Colored/06.jpeg",
      "assets/Impossible.Worlds/Colored/07.jpeg"
    ],
    defaultMarket: "us",
    asin: "B0HFZZ2TMH"
  },
  {
    id: "italian-girls",
    title: "Italian Girls",
    subtitle: "Cozy & Easy Coloring Book | Cute Italian Girls, Relaxing Coloring Pages, Italian Lifestyle, Fashion & Everyday Moments",
    author: "Isaac McClour",
    language: "English",
    langCode: "en",
    cover: "assets/Italian.Girls/Front.Cover.png",
    preview: [
      "assets/Italian.Girls/Front.Cover.png",
      "assets/Italian.Girls/2.png",
      "assets/Italian.Girls/4.png",
      "assets/Italian.Girls/8.png",
      "assets/Italian.Girls/10.png",
      "assets/Italian.Girls/14.png",
      "assets/Italian.Girls/22.png",
      "assets/Italian.Girls/Back.Cover.png"
    ],
    colored: [
      "assets/Italian.Girls/Colored/01.jpeg",
      "assets/Italian.Girls/Colored/02.jpeg",
      "assets/Italian.Girls/Colored/03.jpeg",
      "assets/Italian.Girls/Colored/04.jpeg",
      "assets/Italian.Girls/Colored/05.jpeg",
      "assets/Italian.Girls/Colored/06.jpeg",
      "assets/Italian.Girls/Colored/07.jpeg",
      "assets/Italian.Girls/Colored/08.jpeg"
    ],
    defaultMarket: "us",
    asin: "B0HGJBKMGZ"
  },
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
    colored: [
      "assets/Innocent.Paws/Colored/01.jpeg",
      "assets/Innocent.Paws/Colored/02.jpeg",
      "assets/Innocent.Paws/Colored/03.jpeg",
      "assets/Innocent.Paws/Colored/04.jpeg",
      "assets/Innocent.Paws/Colored/05.jpeg",
      "assets/Innocent.Paws/Colored/06.jpeg"
    ],
    defaultMarket: "us",
    asin: "B0HFGBJW8Y"
  },
  {
    id: "killer-paws",
    title: "Killer Paws",
    subtitle: "A Cozy Murder Coloring Book | Darkly Humorous Murder Scenes in Cozy Everyday Settings for Adults and Teens",
    author: "Isaac McClour",
    language: "English",
    langCode: "en",
    cover: "assets/Killer.Paws/Front.Cover.png",
    preview: [
      "assets/Killer.Paws/Front.Cover.png",
      "assets/Killer.Paws/2.png",
      "assets/Killer.Paws/4.png",
      "assets/Killer.Paws/8.png",
      "assets/Killer.Paws/10.png",
      "assets/Killer.Paws/12.png",
      "assets/Killer.Paws/Back.Cover.png"
    ],
    colored: [
      "assets/Killer.Paws/Colored/01.jpeg",
      "assets/Killer.Paws/Colored/02.jpeg",
      "assets/Killer.Paws/Colored/03.jpeg",
      "assets/Killer.Paws/Colored/04.jpeg"
    ],
    defaultMarket: "us",
    asin: "B0HGGQ3GZ8"
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
    colored: [
      "assets/Non.Rompetemi.I.Coglioni/Colored/01.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/02.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/03.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/04.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/05.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/06.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/07.jpeg",
      "assets/Non.Rompetemi.I.Coglioni/Colored/08.jpeg"
    ],
    defaultMarket: "it",
    asin: "B0HF7WZBYD"
  }
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
    filterEn: "English",
    filterIt: "Italiano",
    selectStore: "Seleziona Store Amazon",
    viewOn: (market) => `VEDI SU ${market.toUpperCase()}`,
    byAuthor: "di",
    previewBtn: "📖 Anteprima",
    previewBadge: "📖 Anteprima Pagine",
    coloredBtn: "🎨 Guarda a colori",
    coloredBadge: "🎨 Disegni Colorati",
    coloredHeadline: "Ecco cosa puoi fare con questo libro!",
    coloredPageLabel: "Disegno Colorato",
    tabPages: "📖 Pagine",
    tabColored: "🎨 A Colori",
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
    filterEn: "English",
    filterIt: "Italian",
    selectStore: "Select Amazon Store",
    viewOn: (market) => `VIEW ON ${market.toUpperCase()}`,
    byAuthor: "by",
    previewBtn: "📖 Preview",
    previewBadge: "📖 Sample Preview",
    coloredBtn: "🎨 See it colored",
    coloredBadge: "🎨 Colored Artworks",
    coloredHeadline: "Here's what you can create with this book!",
    coloredPageLabel: "Colored Artwork",
    tabPages: "📖 Pages",
    tabColored: "🎨 Colored",
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
  },
  de: {
    pageTitle: "Cozy Coloring Chaos | Gemütliche, Lustige & Chaotische Malbücher",
    metaDesc: "Entdecke gemütliche Malbücher mit einer Prise schwarzem Humor und wunderschönem Chaos. Wähle deinen Amazon Store und bestelle dein Exemplar!",
    brandSubtitle: "Gemütliches Ausmalen. Schwarzer Humor. Wundervolles Chaos.",
    sectionTitle: "WÄHLE DEIN CHAOS",
    filterAll: "Alle",
    filterEn: "Englisch",
    filterIt: "Italienisch",
    selectStore: "Amazon Store wählen",
    viewOn: (market) => `AUF ${market.toUpperCase()} ANSEHEN`,
    byAuthor: "von",
    previewBtn: "📖 Vorschau",
    previewBadge: "📖 Buchvorschau",
    coloredBtn: "🎨 Bunt ansehen",
    coloredBadge: "🎨 Ausgemalte Kunstwerke",
    coloredHeadline: "Das kannst du aus diesem Buch machen!",
    coloredPageLabel: "Farbiges Kunstwerk",
    tabPages: "📖 Seiten",
    tabColored: "🎨 In Farbe",
    frontCoverLabel: "Vorderseite (Cover)",
    backCoverLabel: "Rückseite (Back)",
    pageLabel: "Seite",
    footerTagline: "Gemacht für alle, die Malbücher gerne ein wenig unkonventionell mögen. ✨",
    footerCopyright: "Alle Rechte vorbehalten.",
    followTikTok: "Folge uns auf TikTok",
    tiktokAria: "Folge @cozycoloringchaos auf TikTok (öffnet in neuem Tab)",
    noBooksFound: "Keine Bücher für diese Sprache gefunden. Wechsle zu 'Alle', um die Kollektion zu sehen!",
    ariaSelectMarket: (title) => `Amazon Marketplace für ${title} wählen`,
    ariaViewMarket: (title, market) => `${title} auf ${market} ansehen (öffnet in neuem Tab)`
  },
  fr: {
    pageTitle: "Cozy Coloring Chaos | Livres de Coloriage Cozy, Drôles & Chaotiques",
    metaDesc: "Découvrez des livres de coloriage cozy avec une touche d'humour noir et un magnifique chaos. Choisissez votre boutique Amazon et commandez votre exemplaire !",
    brandSubtitle: "Coloriage cozy. Humour noir. Magnifique chaos.",
    sectionTitle: "CHOISISSEZ VOTRE CHAOS",
    filterAll: "Tous",
    filterEn: "Anglais",
    filterIt: "Italien",
    selectStore: "Sélectionner la boutique Amazon",
    viewOn: (market) => `VOIR SUR ${market.toUpperCase()}`,
    byAuthor: "par",
    previewBtn: "📖 Aperçu",
    previewBadge: "📖 Aperçu du livre",
    coloredBtn: "🎨 Voir en couleur",
    coloredBadge: "🎨 Modèles Coloriés",
    coloredHeadline: "Voici ce que vous pouvez créer avec ce livre !",
    coloredPageLabel: "Œuvre Coloriée",
    tabPages: "📖 Pages",
    tabColored: "🎨 En Couleur",
    frontCoverLabel: "Première de couverture",
    backCoverLabel: "Quatrième de couverture",
    pageLabel: "Page",
    footerTagline: "Créé pour ceux qui aiment les livres de coloriage un brin décalés. ✨",
    footerCopyright: "Tous droits réservés.",
    followTikTok: "Suivez-nous sur TikTok",
    tiktokAria: "Suivre @cozycoloringchaos sur TikTok (ouvre un nouvel onglet)",
    noBooksFound: "Aucun livre trouvé pour cette langue. Cliquez sur 'Tous' pour voir la collection !",
    ariaSelectMarket: (title) => `Sélectionner le marketplace Amazon pour ${title}`,
    ariaViewMarket: (title, market) => `Voir ${title} sur ${market} (ouvre un nouvel onglet)`
  },
  es: {
    pageTitle: "Cozy Coloring Chaos | Libros para Colorear Cozy, Divertidos y Caóticos",
    metaDesc: "Descubre libros para colorear cozy con un toque de humor negro y caos creativo. ¡Elige tu tienda Amazon y pide tu copia!",
    brandSubtitle: "Colorear cozy. Humor negro. Hermoso caos.",
    sectionTitle: "ELIGE TU CAOS",
    filterAll: "Todos",
    filterEn: "Inglés",
    filterIt: "Italiano",
    selectStore: "Seleccionar tienda Amazon",
    viewOn: (market) => `VER EN ${market.toUpperCase()}`,
    byAuthor: "de",
    previewBtn: "📖 Vista previa",
    previewBadge: "📖 Vista previa",
    coloredBtn: "🎨 Ver a color",
    coloredBadge: "🎨 Ilustraciones Coloreadas",
    coloredHeadline: "¡Mira lo que puedes crear con este libro!",
    coloredPageLabel: "Ilustración a Color",
    tabPages: "📖 Páginas",
    tabColored: "🎨 A Color",
    frontCoverLabel: "Portada",
    backCoverLabel: "Contraportada",
    pageLabel: "Página",
    footerTagline: "Creado para quienes aman los libros para colorear un poco diferentes. ✨",
    footerCopyright: "Todos los derechos reservados.",
    followTikTok: "Síguenos en TikTok",
    tiktokAria: "Seguir a @cozycoloringchaos en TikTok (abre en nueva pestaña)",
    noBooksFound: "No se encontraron libros en este idioma. ¡Cambia a 'Todos' para ver la colección!",
    ariaSelectMarket: (title) => `Seleccionar tienda Amazon para ${title}`,
    ariaViewMarket: (title, market) => `Ver ${title} en ${market} (abre en nueva pestaña)`
  },
  nl: {
    pageTitle: "Cozy Coloring Chaos | Gezellige, Grappige & Chaotische Kleurboeken",
    metaDesc: "Ontdek cozy kleurboeken met een vleugje zwarte humor en prachtige chaos. Kies je Amazon-winkel en bestel jouw exemplaar!",
    brandSubtitle: "Gezellig kleuren. Zwarte humor. Prachtige chaos.",
    sectionTitle: "KIES JE CHAOS",
    filterAll: "Alle",
    filterEn: "Engels",
    filterIt: "Italiaans",
    selectStore: "Selecteer Amazon-winkel",
    viewOn: (market) => `BEKIJK OP ${market.toUpperCase()}`,
    byAuthor: "door",
    previewBtn: "📖 Voorbeeld",
    previewBadge: "📖 Voorbeeldweergave",
    coloredBtn: "🎨 Bekijk in kleur",
    coloredBadge: "🎨 Ingekleurde Tekeningen",
    coloredHeadline: "Kijk wat je kunt maken met dit boek!",
    coloredPageLabel: "Ingekleurd Kunstwerk",
    tabPages: "📖 Pagina's",
    tabColored: "🎨 In Kleur",
    frontCoverLabel: "Voorkant",
    backCoverLabel: "Achterkant",
    pageLabel: "Pagina",
    footerTagline: "Gemaakt voor wie houdt van kleurboeken die net even anders zijn. ✨",
    footerCopyright: "Alle rechten voorbehouden.",
    followTikTok: "Volg op TikTok",
    tiktokAria: "Volg @cozycoloringchaos op TikTok (opent in een nieuw tabblad)",
    noBooksFound: "Geen boeken gevonden voor deze taal. Ga naar 'Alle' om de collectie te bekijken!",
    ariaSelectMarket: (title) => `Selecteer Amazon-marktplaats voor ${title}`,
    ariaViewMarket: (title, market) => `Bekijk ${title} op ${market} (opent in een nieuw tabblad)`
  },
  pl: {
    pageTitle: "Cozy Coloring Chaos | Przytulne, Zabawne i Chaotyczne Kolorowanki",
    metaDesc: "Odkryj przytulne kolorowanki z nutą czarnego humoru i pięknego chaosu. Wybierz swój sklep Amazon i zamów swój egzemplarz!",
    brandSubtitle: "Przytulne kolorowanie. Czarny humor. Piękny chaos.",
    sectionTitle: "WYBIERZ SWÓJ CHAOS",
    filterAll: "Wszystkie",
    filterEn: "Angielski",
    filterIt: "Włoski",
    selectStore: "Wybierz sklep Amazon",
    viewOn: (market) => `ZOBACZ NA ${market.toUpperCase()}`,
    byAuthor: "autorstwa",
    previewBtn: "📖 Podgląd",
    previewBadge: "📖 Podgląd książki",
    coloredBtn: "🎨 Zobacz w kolorze",
    coloredBadge: "🎨 Pokolorowane Prace",
    coloredHeadline: "Zobacz, co możesz stworzyć z tą książką!",
    coloredPageLabel: "Pokolorowana Praca",
    tabPages: "📖 Strony",
    tabColored: "🎨 W Kolorze",
    frontCoverLabel: "Okładka przednia",
    backCoverLabel: "Okładka tylna",
    pageLabel: "Strona",
    footerTagline: "Stworzone dla tych, którzy lubią kolorowanki z odrobiną szaleństwa. ✨",
    footerCopyright: "Wszelkie prawa zastrzeżone.",
    followTikTok: "Obserwuj na TikToku",
    tiktokAria: "Obserwuj @cozycoloringchaos na TikToku (otwiera w nowej karcie)",
    noBooksFound: "Nie znaleziono książek w tym języku. Przejdź do 'Wszystkie', aby przejrzeć kolekcję!",
    ariaSelectMarket: (title) => `Wybierz sklep Amazon dla ${title}`,
    ariaViewMarket: (title, market) => `Zobacz ${title} na ${market} (otwiera w nowej karcie)`
  },
  sv: {
    pageTitle: "Cozy Coloring Chaos | Mysiga, Roliga & Kaotiska Målarböcker",
    metaDesc: "Upptäck mysiga målarböcker med en twist av mörk humor och vackert kaos. Välj din Amazon-butik och beställ ditt exemplar!",
    brandSubtitle: "Mysig färgläggning. Mörk humor. Vackert kaos.",
    sectionTitle: "VÄLJ DITT KAOS",
    filterAll: "Alla",
    filterEn: "Engelska",
    filterIt: "Italienska",
    selectStore: "Välj Amazon-butik",
    viewOn: (market) => `VISA PÅ ${market.toUpperCase()}`,
    byAuthor: "av",
    previewBtn: "📖 Förhandsvisning",
    previewBadge: "📖 Förhandsvisning",
    coloredBtn: "🎨 Se i färg",
    coloredBadge: "🎨 Färglagda Teckningar",
    coloredHeadline: "Här är vad du kan skapa med den här boken!",
    coloredPageLabel: "Färglagt Konstverk",
    tabPages: "📖 Sidor",
    tabColored: "🎨 I Färg",
    frontCoverLabel: "Framsida",
    backCoverLabel: "Baksida",
    pageLabel: "Sida",
    footerTagline: "Skapat för dig som gillar målarböcker som sticker ut. ✨",
    footerCopyright: "Alla rättigheter förbehållna.",
    followTikTok: "Följ på TikTok",
    tiktokAria: "Följ @cozycoloringchaos på TikTok (öppnas i ny flik)",
    noBooksFound: "Inga böcker hittades för detta språk. Välj 'Alla' för att utforska samlingen!",
    ariaSelectMarket: (title) => `Välj Amazon-marknadsplats för ${title}`,
    ariaViewMarket: (title, market) => `Visa ${title} på ${market} (öppnas i ny flik)`
  },
  ja: {
    pageTitle: "Cozy Coloring Chaos | コージーでシュールな大人の塗り絵",
    metaDesc: "ブラックユーモアと心地よいカオスが詰まったコージーな塗り絵ブック。Amazonストアを選んで今すぐ手に入れよう！",
    brandSubtitle: "コージーな塗り絵。ブラックユーモア。愛すべきカオス。",
    sectionTitle: "カオスを選ぼう",
    filterAll: "すべて",
    filterEn: "英語",
    filterIt: "イタリア語",
    selectStore: "Amazonストアを選択",
    viewOn: (market) => `${market.toUpperCase()} で見る`,
    byAuthor: "著者:",
    previewBtn: "📖 プレビュー",
    previewBadge: "📖 サンプルプレビュー",
    coloredBtn: "🎨 彩色ギャラリー",
    coloredBadge: "🎨 塗り絵の完成見本",
    coloredHeadline: "この本でこんな素敵な作品が作れます！",
    coloredPageLabel: "完成見本",
    tabPages: "📖 ページ",
    tabColored: "🎨 完成見本",
    frontCoverLabel: "表紙",
    backCoverLabel: "裏表紙",
    pageLabel: "ページ",
    footerTagline: "ひと味違うユニークな塗り絵を楽しみたいあなたへ。✨",
    footerCopyright: "無断転載を禁じます。",
    followTikTok: "TikTokでフォロー",
    tiktokAria: "TikTokで@cozycoloringchaosをフォロー（新しいタブで開く）",
    noBooksFound: "この言語の本は見つかりませんでした。「すべて」に切り替えてコレクションをご覧ください！",
    ariaSelectMarket: (title) => `${title} のAmazonマーケットプレイスを選択`,
    ariaViewMarket: (title, market) => `${market} で ${title} を表示（新しいタブで開く）`
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
 */
function getDefaultMarketForLanguage(book, lang) {
  const marketMap = {
    it: 'it',
    en: 'us',
    de: 'de',
    fr: 'fr',
    es: 'es',
    nl: 'nl',
    pl: 'pl',
    sv: 'se',
    se: 'se',
    ja: 'jp',
    jp: 'jp'
  };
  if (marketMap[lang] && AMAZON_MARKETS[marketMap[lang]]) {
    return marketMap[lang];
  }
  return book.defaultMarket || 'us';
}

/**
 * Detects browser local language or retrieves user preference from localStorage.
 * 
 * Geographic routing rules:
 * - Spain (es-ES, ca-ES, gl-ES, eu-ES) -> Spanish ('es') & Amazon.es
 * - Venezuela and all Latin America / Americas Spanish locales (es-VE, es-419, es-AR, es-CO, es-MX, es-CL, es-PE, etc.)
 *   buy from Amazon.com (US) -> English ('en') & Amazon.com (US)
 * - All other international visitors without their own dedicated marketplace store default to English ('en') & Amazon.com (US)
 */
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem('ccc_site_lang');
    if (saved && TRANSLATIONS[saved]) {
      return saved;
    }
  } catch (e) {
    // Local storage access might be restricted in some environments
  }

  // Detect browser language
  const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage || ''];
  for (const lang of browserLangs) {
    if (typeof lang === 'string') {
      const lower = lang.toLowerCase().trim();

      // Explicit Latin American & Caribbean Spanish locales, and Spanish in the US:
      // Customers in these regions purchase from Amazon.com (US), so default them to English ('en')
      const isLatinAmericanSpanish = (
        lower.startsWith('es-ve') || // Venezuela
        lower.startsWith('es-419') || // Latin America & Caribbean generic
        lower.startsWith('es-ar') || // Argentina
        lower.startsWith('es-bo') || // Bolivia
        lower.startsWith('es-cl') || // Chile
        lower.startsWith('es-co') || // Colombia
        lower.startsWith('es-cr') || // Costa Rica
        lower.startsWith('es-cu') || // Cuba
        lower.startsWith('es-do') || // Dominican Republic
        lower.startsWith('es-ec') || // Ecuador
        lower.startsWith('es-gt') || // Guatemala
        lower.startsWith('es-hn') || // Honduras
        lower.startsWith('es-mx') || // Mexico
        lower.startsWith('es-ni') || // Nicaragua
        lower.startsWith('es-pa') || // Panama
        lower.startsWith('es-pe') || // Peru
        lower.startsWith('es-pr') || // Puerto Rico
        lower.startsWith('es-py') || // Paraguay
        lower.startsWith('es-sv') || // El Salvador
        lower.startsWith('es-uy') || // Uruguay
        lower.startsWith('es-us') || // United States (Spanish)
        lower.startsWith('es-bz') || // Belize
        lower.startsWith('es-gq') || // Equatorial Guinea
        lower.startsWith('es-ph') || // Philippines
        (lower.startsWith('es-') && !lower.startsWith('es-es')) // Any other non-Spain Spanish subtag
      );

      if (isLatinAmericanSpanish) {
        return 'en';
      }

      // Spain Spanish (only Spain residents use Amazon.es)
      if (
        lower === 'es-es' ||
        lower.startsWith('es-es') ||
        lower.startsWith('ca-es') ||
        lower.startsWith('gl-es') ||
        lower.startsWith('eu-es')
      ) {
        return 'es';
      }

      if (lower.startsWith('it')) return 'it';
      if (lower.startsWith('de')) return 'de';
      if (lower.startsWith('fr')) return 'fr';
      if (lower.startsWith('nl')) return 'nl';
      if (lower.startsWith('pl')) return 'pl';
      if (lower.startsWith('sv') || lower.startsWith('se')) return 'sv';
      if (lower.startsWith('ja') || lower.startsWith('jp')) return 'ja';
      if (lower.startsWith('en')) return 'en';

      // Fallback for bare 'es' without region subtag: default to English/US store
      // because the vast majority (>90%) of worldwide Spanish speakers are in the Americas (Amazon.com)
      if (lower === 'es') return 'en';
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
  const key = (marketKey === 'com') ? 'us' : marketKey;
  if (book.asin && AMAZON_MARKETS[key]) {
    return `https://www.${AMAZON_MARKETS[key].domain}/dp/${book.asin}`;
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
  currentLanguage = TRANSLATIONS[lang] ? lang : 'en';
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

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
let activePreviewMode = 'preview'; // 'preview' or 'colored'
let currentPreviewIndex = 0;

window.openSampleModal = function(bookId, mode = 'preview') {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  activePreviewBook = book;
  activePreviewMode = (mode === 'colored' && Array.isArray(book.colored) && book.colored.length > 0)
    ? 'colored'
    : 'preview';
  currentPreviewIndex = 0;

  const modal = document.getElementById('sample-modal');
  const titleEl = document.getElementById('sample-modal-title');
  const footerEl = document.getElementById('sample-modal-footer');
  const tabsContainer = document.getElementById('modal-mode-tabs');
  const tabPreview = document.getElementById('modal-tab-preview');
  const tabColored = document.getElementById('modal-tab-colored');
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (titleEl) titleEl.textContent = book.title;

  const hasColored = Array.isArray(book.colored) && book.colored.length > 0;
  const hasPreview = Array.isArray(book.preview) && book.preview.length > 0;

  if (tabsContainer) {
    if (hasColored && hasPreview) {
      tabsContainer.style.display = 'inline-flex';
      if (tabPreview) tabPreview.textContent = t.tabPages || "📖 Pages";
      if (tabColored) tabColored.textContent = t.tabColored || "🎨 Colored";
    } else {
      tabsContainer.style.display = 'none';
    }
  }

  if (footerEl) {
    let marketKey = selectedMarketState[book.id];
    if (!marketKey || !AMAZON_MARKETS[marketKey]) {
      marketKey = getDefaultMarketForLanguage(book, currentLanguage);
    }
    const targetUrl = getBookUrlForMarket(book, marketKey);
    const marketInfo = AMAZON_MARKETS[marketKey] || { name: 'Amazon', buttonLabel: 'Amazon' };
    const label = marketInfo.buttonLabel || marketInfo.name;
    const buttonText = (typeof t.viewOn === 'function') ? t.viewOn(label) : `VIEW ON ${label.toUpperCase()}`;
    const ariaText = (typeof t.ariaViewMarket === 'function') ? t.ariaViewMarket(book.title, marketInfo.name) : `View ${book.title} on Amazon`;

    footerEl.innerHTML = `
      <a 
        href="${targetUrl}" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="btn-buy" 
        style="max-width: 380px;" 
        aria-label="${ariaText}"
      >
        <span class="btn-buy-text">${buttonText}</span>
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

window.switchModalMode = function(mode) {
  if (!activePreviewBook) return;
  if (mode === 'colored' && (!activePreviewBook.colored || activePreviewBook.colored.length === 0)) return;
  activePreviewMode = mode;
  currentPreviewIndex = 0;
  updateSampleViewer();
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
  if (!activePreviewBook) return;
  const isColored = (activePreviewMode === 'colored');
  const pages = isColored && Array.isArray(activePreviewBook.colored) && activePreviewBook.colored.length > 0
    ? activePreviewBook.colored
    : ((Array.isArray(activePreviewBook.preview) && activePreviewBook.preview.length > 0)
      ? activePreviewBook.preview
      : [activePreviewBook.cover]);

  const newIndex = currentPreviewIndex + delta;
  if (newIndex >= 0 && newIndex < pages.length) {
    currentPreviewIndex = newIndex;
    updateSampleViewer();
  }
};

function updateSampleViewer() {
  if (!activePreviewBook) return;

  const isColored = (activePreviewMode === 'colored');
  const pages = isColored && Array.isArray(activePreviewBook.colored) && activePreviewBook.colored.length > 0
    ? activePreviewBook.colored
    : ((Array.isArray(activePreviewBook.preview) && activePreviewBook.preview.length > 0)
      ? activePreviewBook.preview
      : [activePreviewBook.cover]);

  const total = pages.length;
  const imgEl = document.getElementById('sample-page-img');
  const labelEl = document.getElementById('sample-page-label');
  const counterEl = document.getElementById('sample-page-counter');
  const prevBtn = document.getElementById('sample-prev-btn');
  const nextBtn = document.getElementById('sample-next-btn');
  const badgeEl = document.getElementById('sample-modal-badge');
  const inspirationBanner = document.getElementById('modal-inspiration-banner');
  const inspirationText = document.getElementById('modal-inspiration-text');
  const tabPreview = document.getElementById('modal-tab-preview');
  const tabColored = document.getElementById('modal-tab-colored');
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (tabPreview) tabPreview.classList.toggle('active', !isColored);
  if (tabColored) tabColored.classList.toggle('active', isColored);

  if (badgeEl) {
    badgeEl.textContent = isColored
      ? (t.coloredBadge || "🎨 Disegni Colorati")
      : (t.previewBadge || "📖 Anteprima Pagine");
  }

  if (inspirationBanner) {
    inspirationBanner.style.display = isColored ? 'flex' : 'none';
    if (inspirationText) inspirationText.textContent = t.coloredHeadline || "Ecco cosa puoi fare con questo libro!";
  }

  const currentSrc = pages[currentPreviewIndex];

  if (imgEl) {
    imgEl.src = currentSrc;
    imgEl.alt = `${activePreviewBook.title} - ${isColored ? 'Colored' : 'Page'} ${currentPreviewIndex + 1}`;
  }

  if (labelEl) {
    if (isColored) {
      labelEl.textContent = `${t.coloredPageLabel || "Opera"} ${currentPreviewIndex + 1}`;
    } else {
      if (currentPreviewIndex === 0) {
        labelEl.textContent = t.frontCoverLabel || "Front Cover";
      } else if (currentPreviewIndex === total - 1) {
        labelEl.textContent = t.backCoverLabel || "Back Cover";
      } else {
        labelEl.textContent = `${t.pageLabel || "Pagina"} ${currentPreviewIndex + 1}`;
      }
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
  const marketInfo = AMAZON_MARKETS[selectedMarketKey] || { name: 'Amazon', buttonLabel: 'Amazon' };
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  if (btnBuy) {
    btnBuy.href = targetUrl;
    if (typeof t.ariaViewMarket === 'function') {
      btnBuy.setAttribute('aria-label', t.ariaViewMarket(book.title, marketInfo.name));
    }
  }

  if (btnText) {
    const label = marketInfo.buttonLabel || marketInfo.name;
    btnText.textContent = (typeof t.viewOn === 'function') ? t.viewOn(label) : `VIEW ON ${label.toUpperCase()}`;
  }
}

/**
 * Generates HTML for a single book card.
 */
function createBookCard(book, index) {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const safeTitle = escapeHtml(book.title || 'Untitled Book');
  const safeSubtitle = book.subtitle ? escapeHtml(book.subtitle) : '';
  const safeAuthor = book.author ? escapeHtml(book.author) : '';
  const safeLang = book.language ? escapeHtml(book.language) : '';
  const safeCover = book.cover ? escapeHtml(book.cover) : '';
  const hasPreview = Array.isArray(book.preview) && book.preview.length > 0;
  const hasColored = Array.isArray(book.colored) && book.colored.length > 0;

  // Determine selected market based on state or website language
  let initialMarketKey = selectedMarketState[book.id];
  if (!initialMarketKey || !AMAZON_MARKETS[initialMarketKey]) {
    initialMarketKey = getDefaultMarketForLanguage(book, currentLanguage);
  }
  selectedMarketState[book.id] = initialMarketKey;

  const initialUrl = getBookUrlForMarket(book, initialMarketKey);
  const initialMarketInfo = AMAZON_MARKETS[initialMarketKey] || { name: 'Amazon', flag: '🛒', buttonLabel: 'Amazon' };
  const initialLabel = initialMarketInfo.buttonLabel || initialMarketInfo.name;
  const buyButtonText = (typeof t.viewOn === 'function') ? t.viewOn(initialLabel) : `VIEW ON ${initialLabel.toUpperCase()}`;
  const buyButtonAria = (typeof t.ariaViewMarket === 'function') ? t.ariaViewMarket(safeTitle, initialMarketInfo.name) : `View ${safeTitle} on Amazon`;

  // Language Badge
  const langBadgeHtml = safeLang 
    ? `<span class="book-lang-badge" aria-label="Language: ${safeLang}">${safeLang}</span>` 
    : '';

  // Preview Chip Button
  const previewChipHtml = hasPreview 
    ? `<button type="button" class="chip-preview-btn" onclick="openSampleModal('${escapeJs(book.id)}', 'preview')" aria-label="${t.previewBtn} - ${safeTitle}">
        <span>${t.previewBtn}</span>
       </button>`
    : '';

  // Colored Preview Chip Button ("See it colored")
  const coloredChipHtml = hasColored
    ? `<button type="button" class="chip-colored-btn" onclick="openSampleModal('${escapeJs(book.id)}', 'colored')" aria-label="${t.coloredBtn} - ${safeTitle}">
        <span>${t.coloredBtn}</span>
       </button>`
    : '';

  // Localized Author prefix ("di" / "by")
  const authorPrefix = t.byAuthor || 'by';
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
        class="book-cover-container ${hasPreview || hasColored ? 'has-preview' : ''}"
        ${hasPreview || hasColored ? `onclick="openSampleModal('${escapeJs(book.id)}', '${hasColored ? 'colored' : 'preview'}')" title="${hasColored ? t.coloredBtn : t.previewBtn} - ${safeTitle}" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')openSampleModal('${escapeJs(book.id)}', '${hasColored ? 'colored' : 'preview'})"` : ''}
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
        ${hasPreview || hasColored ? `<div class="cover-preview-overlay"><span class="cover-preview-badge">${hasColored ? t.coloredBtn : t.previewBtn}</span></div>` : ''}
      </div>

      <!-- Book Info -->
      <div class="book-details">
        <div class="book-header-row">
          <h3 class="book-title">${safeTitle}</h3>
          ${langBadgeHtml}
        </div>

        <div class="book-meta-row">
          ${previewChipHtml}
          ${coloredChipHtml}
        </div>
        
        ${authorHtml}
        ${subtitleHtml}

        <!-- Amazon Marketplace Selector & Action Area -->
        <div class="book-action-area">
          <div class="market-selector-wrapper">
            <label for="market-select-${index}" class="market-label">
              <span>${t.selectStore || "Select Amazon Store"}</span>
              <span>🌍</span>
            </label>
            <div class="market-select-container">
              <select 
                id="market-select-${index}" 
                class="market-select" 
                onchange="onMarketChange(this, '${escapeHtml(book.id)}')"
                aria-label="${(typeof t.ariaSelectMarket === 'function') ? t.ariaSelectMarket(safeTitle) : `Select store for ${safeTitle}`}"
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
            aria-label="${buyButtonAria}"
          >
            <span class="btn-buy-text">${buyButtonText}</span>
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
