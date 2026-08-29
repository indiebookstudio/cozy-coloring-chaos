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
    samplePdf: "assets/Impossible.Worlds/Sample/Free.Sample.pdf",
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
    samplePdf: "assets/Italian.Girls/Sample/Free.Sample.pdf",
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
    samplePdf: "assets/Innocent.Paws/Sample/Free.Sample.pdf",
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
    samplePdf: "assets/Killer.Paws/Sample/Free.Sample.pdf",
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
    samplePdf: "assets/Non.Rompetemi.I.Coglioni/Sample/Free.Sample.pdf",
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
// COUNTRY DEFINITIONS & MAPPING FOR FREE SAMPLE FORM
// ============================================================================
const SAMPLE_COUNTRIES = [
  { code: "it", name: "Italia", flagCode: "it", flag: "🇮🇹", lang: "it", market: "it" },
  { code: "us", name: "United States", flagCode: "us", flag: "🇺🇸", lang: "en", market: "us" },
  { code: "gb", name: "United Kingdom", flagCode: "gb", flag: "🇬🇧", lang: "en", market: "uk" },
  { code: "de", name: "Deutschland", flagCode: "de", flag: "🇩🇪", lang: "de", market: "de" },
  { code: "fr", name: "France", flagCode: "fr", flag: "🇫🇷", lang: "fr", market: "fr" },
  { code: "es", name: "España", flagCode: "es", flag: "🇪🇸", lang: "es", market: "es" },
  { code: "ca", name: "Canada", flagCode: "ca", flag: "🇨🇦", lang: "en", market: "ca" },
  { code: "au", name: "Australia", flagCode: "au", flag: "🇦🇺", lang: "en", market: "au" },
  { code: "nl", name: "Nederland", flagCode: "nl", flag: "🇳🇱", lang: "nl", market: "nl" },
  { code: "pl", name: "Polska", flagCode: "pl", flag: "🇵🇱", lang: "pl", market: "pl" },
  { code: "se", name: "Sverige", flagCode: "se", flag: "🇸🇪", lang: "sv", market: "se" },
  { code: "be", name: "Belgique / België", flagCode: "be", flag: "🇧🇪", lang: "fr", market: "be" },
  { code: "ie", name: "Ireland", flagCode: "ie", flag: "🇮🇪", lang: "en", market: "ie" },
  { code: "jp", name: "Japan (日本)", flagCode: "jp", flag: "🇯🇵", lang: "ja", market: "jp" },
  { code: "at", name: "Österreich", flagCode: "at", flag: "🇦🇹", lang: "de", market: "de" },
  { code: "ch", name: "Schweiz / Suisse", flagCode: "ch", flag: "🇨🇭", lang: "de", market: "de" },
  { code: "mx", name: "México", flagCode: "mx", flag: "🇲🇽", lang: "es", market: "us" },
  { code: "br", name: "Brasil", flagCode: "br", flag: "🇧🇷", lang: "es", market: "us" },
  { code: "other", name: "Other / International", flagCode: "un", flag: "🌍", lang: "en", market: "us" }
];

// ============================================================================
// EMAIL DISPATCH CONFIGURATION (SECURE SERVERLESS BACKEND)
// ============================================================================
// The Brevo API key is stored exclusively as a server-side environment variable.
// Zero secrets are ever included in the frontend or Git repository.
const EMAIL_CONFIG = {
  ccEmail: "cozycoloringchaos@gmail.com",
  siteUrl: "https://indiebookstudio.github.io/cozy-coloring-chaos/",
  brandName: "Cozy Coloring Chaos",
  
  // Serverless backend endpoint
  // In local development, it routes to /api/send-free-sample on the local server.
  // In production, configure window.COZY_BACKEND_URL or use the default serverless URL.
  apiEndpoint: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "/api/send-free-sample"
    : (window.COZY_BACKEND_URL || "https://cozy-coloring-chaos.vercel.app/api/send-free-sample")
};

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
    freeSampleBtn: "🎁 Sample Gratuito",
    freeSampleModalTitle: "Ricevi il Free Sample PDF",
    freeSampleModalDesc: "Inserisci i tuoi dati per ricevere gratuitamente via email il file PDF con una selezione di pagine da colorare in alta definizione allegate alla mail!",
    formFirstName: "Nome",
    formLastName: "Cognome",
    formCountry: "Paese",
    formEmail: "Indirizzo Email",
    formSubmitBtn: "Invia il Free Sample PDF",
    formPrivacy: "🔒 Niente spam. La tua email sarà usata solo per inviarti il sample e novità sui nostri libri.",
    formLoadingTitle: "Preparazione e invio in corso...",
    formLoadingDesc: "Stiamo allegando il PDF del sample alla mail per te.",
    formSuccessTitle: "Sample inviato con successo! 🎉",
    formSuccessDesc: (title, email) => `Abbiamo inviato l'email con il PDF di <strong>${title}</strong> allegato all'indirizzo <strong>${email}</strong>.<br>Controlla la tua casella di posta (e anche la cartella Spam o Promozioni)!`,
    formSuccessBuyTag: "Ti piace questo libro? Ordina la copia completa cartacea:",
    formSuccessClose: "Torna al catalogo",
    formErrorTitle: "Oops! Qualcosa è andato storto",
    formErrorDesc: "Non siamo riusciti a inviare la mail in questo momento. Riprova più tardi.",
    formRetry: "Riprova",
    pdfAttachedViaEmail: "PDF allegato via email",
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
    freeSampleBtn: "🎁 Free Sample",
    freeSampleModalTitle: "Get Your Free Sample PDF",
    freeSampleModalDesc: "Enter your details to receive a free PDF sample with selected coloring pages attached to your email!",
    formFirstName: "First Name",
    formLastName: "Last Name",
    formCountry: "Country",
    formEmail: "Email Address",
    formSubmitBtn: "Send Free Sample PDF",
    formPrivacy: "🔒 No spam. Your email will only be used to deliver your sample and book news.",
    formLoadingTitle: "Preparing & sending email...",
    formLoadingDesc: "Attaching your coloring book sample PDF to the email.",
    formSuccessTitle: "Sample Sent Successfully! 🎉",
    formSuccessDesc: (title, email) => `We sent the free sample PDF of <strong>${title}</strong> to <strong>${email}</strong>.<br>Please check your inbox (and spam or promotions folder)!`,
    formSuccessBuyTag: "Love this book? Order the full paperback on Amazon:",
    formSuccessClose: "Back to Catalog",
    formErrorTitle: "Oops! Something went wrong",
    formErrorDesc: "We couldn't send the email right now. Please try again in a few moments.",
    formRetry: "Try Again",
    pdfAttachedViaEmail: "PDF attached via email",
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
    freeSampleBtn: "🎁 Gratis-Leseprobe",
    freeSampleModalTitle: "Kostenlose PDF-Probe erhalten",
    freeSampleModalDesc: "Trage deine Daten ein, um eine kostenlose PDF-Leseprobe mit Ausmalseiten direkt als E-Mail-Anhang zu erhalten!",
    formFirstName: "Vorname",
    formLastName: "Nachname",
    formCountry: "Land",
    formEmail: "E-Mail-Adresse",
    formSubmitBtn: "Gratis Sample per E-Mail senden",
    formPrivacy: "🔒 Kein Spam. Deine E-Mail wird nur für das Sample und Buch-Neuigkeiten verwendet.",
    formLoadingTitle: "E-Mail wird gesendet...",
    formLoadingDesc: "Wir hängen das Sample-PDF an die E-Mail an.",
    formSuccessTitle: "Sample erfolgreich gesendet! 🎉",
    formSuccessDesc: (title, email) => `Wir haben das PDF von <strong>${title}</strong> als Anhang an <strong>${email}</strong> gesendet.<br>Bitte prüfe deinen Posteingang!`,
    formSuccessBuyTag: "Gefällt dir das Buch? Bestelle das vollständige Taschenbuch auf Amazon:",
    formSuccessClose: "Zurück zur Übersicht",
    formErrorTitle: "Etwas ist schiefgelaufen",
    formErrorDesc: "Wir konnten die E-Mail derzeit nicht senden. Bitte versuche es später noch einmal.",
    formRetry: "Erneut versuchen",
    pdfAttachedViaEmail: "PDF im E-Mail-Anhang",
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
    freeSampleBtn: "🎁 Extrait Gratuit",
    freeSampleModalTitle: "Recevoir l'Extrait Gratuit PDF",
    freeSampleModalDesc: "Entrez vos coordonnées pour recevoir gratuitement par email un extrait PDF avec des pages à colorier en pièce jointe !",
    formFirstName: "Prénom",
    formLastName: "Nom",
    formCountry: "Pays",
    formEmail: "Adresse email",
    formSubmitBtn: "Envoyer l'Extrait PDF",
    formPrivacy: "🔒 Aucun spam. Votre email sera utilisé uniquement pour l'envoi de l'extrait.",
    formLoadingTitle: "Envoi de l'email en cours...",
    formLoadingDesc: "Nous préparons le fichier PDF en pièce jointe.",
    formSuccessTitle: "Extrait envoyé avec succès ! 🎉",
    formSuccessDesc: (title, email) => `Nous avons envoyé l'email avec le PDF de <strong>${title}</strong> en pièce jointe à <strong>${email}</strong>.<br>Vérifiez votre boîte de réception !`,
    formSuccessBuyTag: "Vous aimez ce livre ? Commandez la version complète sur Amazon :",
    formSuccessClose: "Retour au catalogue",
    formErrorTitle: "Une erreur est survenue",
    formErrorDesc: "Impossible d'envoyer l'email pour le moment. Veuillez réessayer plus tard.",
    formRetry: "Réessayer",
    pdfAttachedViaEmail: "PDF en pièce jointe",
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
    freeSampleBtn: "🎁 Muestra Gratis",
    freeSampleModalTitle: "Recibe tu Muestra Gratis PDF",
    freeSampleModalDesc: "¡Ingresa tus datos para recibir gratis por correo electrónico una muestra en PDF con páginas para colorear adjuntas al email!",
    formFirstName: "Nombre",
    formLastName: "Apellido",
    formCountry: "País",
    formEmail: "Correo Electrónico",
    formSubmitBtn: "Enviar Muestra Gratis PDF",
    formPrivacy: "🔒 Sin spam. Tu correo solo se usará para enviarte la muestra y novedades.",
    formLoadingTitle: "Enviando correo...",
    formLoadingDesc: "Estamos adjuntando el archivo PDF a tu correo electrónico.",
    formSuccessTitle: "¡Muestra enviada con éxito! 🎉",
    formSuccessDesc: (title, email) => `Hemos enviado el correo con el PDF de <strong>${title}</strong> adjunto a <strong>${email}</strong>.<br>¡Revisa tu bandeja de entrada!`,
    formSuccessBuyTag: "¿Te gusta este libro? Pide la versión completa en Amazon:",
    formSuccessClose: "Volver al catálogo",
    formErrorTitle: "Ocurrió un error",
    formErrorDesc: "No se pudo enviar el correo en este momento. Inténtalo de nuevo más tarde.",
    formRetry: "Reintentar",
    pdfAttachedViaEmail: "PDF adjunto por email",
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
    freeSampleBtn: "🎁 Gratis Sample",
    freeSampleModalTitle: "Ontvang je Gratis PDF Sample",
    freeSampleModalDesc: "Vul je gegevens in om gratis een PDF-proefexemplaar met kleurpagina's als bijlage in je e-mail te ontvangen!",
    formFirstName: "Voornaam",
    formLastName: "Achternaam",
    formCountry: "Land",
    formEmail: "E-mailadres",
    formSubmitBtn: "Stuur Gratis Sample PDF",
    formPrivacy: "🔒 Geen spam. Je e-mailadres wordt alleen gebruikt voor het sample.",
    formLoadingTitle: "E-mail verzenden...",
    formLoadingDesc: "We voegen het PDF-bestand toe aan de e-mail.",
    formSuccessTitle: "Sample succesvol verzonden! 🎉",
    formSuccessDesc: (title, email) => `We hebben de e-mail met de PDF van <strong>${title}</strong> als bijlage verstuurd naar <strong>${email}</strong>.<br>Controleer je inbox!`,
    formSuccessBuyTag: "Vind je dit boek leuk? Bestel het volledige boek op Amazon:",
    formSuccessClose: "Terug naar catalogus",
    formErrorTitle: "Er is iets misgegaan",
    formErrorDesc: "We konden de e-mail op dit moment niet verzenden. Probeer het later opnieuw.",
    formRetry: "Opnieuw proberen",
    pdfAttachedViaEmail: "PDF als bijlage in e-mail",
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
    freeSampleBtn: "🎁 Darmowa Próbka",
    freeSampleModalTitle: "Odbierz darmowy fragment PDF",
    freeSampleModalDesc: "Wpisz swoje dane, aby otrzymać darmowy fragment PDF z wybranymi stronami do kolorowania jako załącznik w wiadomości e-mail!",
    formFirstName: "Imię",
    formLastName: "Nazwisko",
    formCountry: "Kraj",
    formEmail: "Adres e-mail",
    formSubmitBtn: "Wyślij darmową próbkę PDF",
    formPrivacy: "🔒 Zero spamu. Twój e-mail posłuży tylko do przesłania próbki.",
    formLoadingTitle: "Wysyłanie wiadomości...",
    formLoadingDesc: "Dołączamy plik PDF jako załącznik do e-maila.",
    formSuccessTitle: "Próbka wysłana pomyślnie! 🎉",
    formSuccessDesc: (title, email) => `Wysłaliśmy e-mail z załączonym plikiem PDF książki <strong>${title}</strong> na adres <strong>${email}</strong>.<br>Sprawdź swoją skrzynkę odbiorczą!`,
    formSuccessBuyTag: "Podoba Ci się ta książka? Zamów pełną wersję na Amazon:",
    formSuccessClose: "Wróć do katalogu",
    formErrorTitle: "Coś poszło nie tak",
    formErrorDesc: "Nie udało się teraz wysłać wiadomości e-mail. Spróbuj ponownie później.",
    formRetry: "Spróbuj ponownie",
    pdfAttachedViaEmail: "PDF załączony w mailu",
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
    freeSampleBtn: "🎁 Gratis Prov",
    freeSampleModalTitle: "Få ditt gratis PDF-prov",
    freeSampleModalDesc: "Fyll i dina uppgifter för att få ett gratis PDF-prov med utvalda målarbokssidor bifogat i ett e-postmeddelande!",
    formFirstName: "Förnamn",
    formLastName: "Efternamn",
    formCountry: "Land",
    formEmail: "E-postadress",
    formSubmitBtn: "Skicka Gratis PDF-prov",
    formPrivacy: "🔒 Ingen skräppost. Din e-post används endast för provet.",
    formLoadingTitle: "Skickar e-post...",
    formLoadingDesc: "Vi bifogar PDF-filen till ditt e-postmeddelande.",
    formSuccessTitle: "Provet har skickats! 🎉",
    formSuccessDesc: (title, email) => `Vi har skickat e-postmeddelandet med PDF-filen för <strong>${title}</strong> bifogad till <strong>${email}</strong>.<br>Kolla din inkorg!`,
    formSuccessBuyTag: "Gillar du boken? Beställ hela boken på Amazon:",
    formSuccessClose: "Tillbaka till katalogen",
    formErrorTitle: "Något gick fel",
    formErrorDesc: "Kunde inte skicka e-postmeddelandet just nu. Försök igen senare.",
    formRetry: "Försök igen",
    pdfAttachedViaEmail: "PDF bifogad i e-post",
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
    freeSampleBtn: "🎁 無料サンプル",
    freeSampleModalTitle: "無料PDFサンプルを受け取る",
    freeSampleModalDesc: "お名前とメールアドレスをご入力いただくと、厳選された塗り絵ページのPDFをメール添付にてお届けします！",
    formFirstName: "名（First Name）",
    formLastName: "姓（Last Name）",
    formCountry: "国・地域",
    formEmail: "メールアドレス",
    formSubmitBtn: "無料PDFサンプルを送信",
    formPrivacy: "🔒 スパムは一切送信しません。サンプルのお届けにのみ使用します。",
    formLoadingTitle: "メールを送信中...",
    formLoadingDesc: "PDFファイルを添付してメールを送信しています。",
    formSuccessTitle: "送信が完了しました！ 🎉",
    formSuccessDesc: (title, email) => `<strong>${email}</strong> 宛てに <strong>${title}</strong> のPDF添付メールを送信しました。<br>受信トレイをご確認ください！`,
    formSuccessBuyTag: "この本が気に入りましたか？ Amazonで完全版を購入できます：",
    formSuccessClose: "カタログに戻る",
    formErrorTitle: "送信エラーが発生しました",
    formErrorDesc: "現在メールを送信できませんでした。しばらくしてからもう一度お試しください。",
    formRetry: "再試行",
    pdfAttachedViaEmail: "PDF添付メール",
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

  // Update Free Sample modal translations
  updateFreeSampleModalTranslations(t);

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
 * Synchronizes translations inside the Free Sample Modal.
 */
function updateFreeSampleModalTranslations(t) {
  if (!t) return;
  const badgeEl = document.getElementById('free-sample-modal-badge');
  const titleEl = document.getElementById('free-sample-modal-title');
  const descEl = document.getElementById('free-sample-modal-desc');
  const labelFirstName = document.getElementById('label-firstname');
  const labelLastName = document.getElementById('label-lastname');
  const labelCountry = document.getElementById('label-country');
  const labelEmail = document.getElementById('label-email');
  const inputFirstName = document.getElementById('sample-firstname');
  const inputLastName = document.getElementById('sample-lastname');
  const inputEmail = document.getElementById('sample-email');
  const privacyNote = document.getElementById('form-privacy-note');
  const submitBtnText = document.getElementById('sample-submit-text');
  const loadingTitle = document.getElementById('sample-loading-title');
  const loadingDesc = document.getElementById('sample-loading-desc');
  const pdfNameEl = document.getElementById('sample-form-pdf-name');
  const errorTitle = document.getElementById('sample-error-title');
  const errorDesc = document.getElementById('sample-error-desc');
  const retryBtn = document.getElementById('sample-retry-btn');
  const successTitleEl = document.getElementById('sample-success-title');
  const successAmazonTagline = document.getElementById('success-amazon-tagline');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  if (badgeEl && t.freeSampleBtn) badgeEl.textContent = t.freeSampleBtn;
  if (titleEl && t.freeSampleModalTitle) titleEl.textContent = t.freeSampleModalTitle;
  if (descEl && t.freeSampleModalDesc) descEl.textContent = t.freeSampleModalDesc;
  if (labelFirstName && t.formFirstName) labelFirstName.textContent = t.formFirstName;
  if (labelLastName && t.formLastName) labelLastName.textContent = t.formLastName;
  if (labelCountry && t.formCountry) labelCountry.textContent = t.formCountry;
  if (labelEmail && t.formEmail) labelEmail.textContent = t.formEmail;
  if (privacyNote && t.formPrivacy) privacyNote.textContent = t.formPrivacy;
  if (submitBtnText && t.formSubmitBtn) submitBtnText.textContent = t.formSubmitBtn;
  if (loadingTitle && t.formLoadingTitle) loadingTitle.textContent = t.formLoadingTitle;
  if (loadingDesc && t.formLoadingDesc) loadingDesc.textContent = t.formLoadingDesc;
  if (pdfNameEl && t.pdfAttachedViaEmail) pdfNameEl.textContent = t.pdfAttachedViaEmail;
  if (errorTitle && t.formErrorTitle) errorTitle.textContent = t.formErrorTitle;
  if (errorDesc && t.formErrorDesc) errorDesc.textContent = t.formErrorDesc;
  if (retryBtn && t.formRetry) retryBtn.textContent = t.formRetry;
  if (successTitleEl && t.formSuccessTitle) successTitleEl.textContent = t.formSuccessTitle;
  if (successAmazonTagline && t.formSuccessBuyTag) successAmazonTagline.textContent = t.formSuccessBuyTag;
  if (btnCloseSuccess && t.formSuccessClose) btnCloseSuccess.textContent = t.formSuccessClose;

  // Localized placeholders
  if (inputFirstName) {
    if (t.formFirstNamePlaceholder) inputFirstName.placeholder = t.formFirstNamePlaceholder;
    else if (t.formFirstName) inputFirstName.placeholder = t.formFirstName;
  }
  if (inputLastName) {
    if (t.formLastNamePlaceholder) inputLastName.placeholder = t.formLastNamePlaceholder;
    else if (t.formLastName) inputLastName.placeholder = t.formLastName;
  }
  if (inputEmail) {
    if (t.formEmailPlaceholder) inputEmail.placeholder = t.formEmailPlaceholder;
  }
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
      <div style="display: flex; flex-direction: column; width: 100%; max-width: 380px; gap: 0.6rem; align-items: center;">
        <a 
          href="${targetUrl}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="btn-buy" 
          style="width: 100%;" 
          aria-label="${ariaText}"
        >
          <span class="btn-buy-text">${buttonText}</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
        <button 
          type="button" 
          class="chip-sample-btn" 
          onclick="closeSampleModal(); openFreeSampleModal('${escapeJs(book.id)}');" 
          style="width: 100%; justify-content: center; padding: 0.5rem 1rem; font-size: 0.86rem;"
        >
          <span>${t.freeSampleBtn || '🎁 Free Sample'}</span>
        </button>
      </div>
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
    if (e.target && (e.target.closest('#sample-modal') || e.target.closest('#free-sample-modal') || e.target.closest('.book-cover-container'))) {
      e.preventDefault();
      return false;
    }
  });

  document.addEventListener('dragstart', (e) => {
    if (e.target && (e.target.closest('#sample-modal') || e.target.closest('#free-sample-modal') || e.target.closest('.book-cover-container'))) {
      e.preventDefault();
      return false;
    }
  });
}

/**
 * ============================================================================
 * FREE SAMPLE MODAL & EMAIL DELIVERY SYSTEM
 * ============================================================================
 */
let activeSampleBook = null;

/**
 * Fetches the sample PDF as a base64 encoded string for email attachment.
 */
async function fetchPdfAsBase64(pdfUrl) {
  try {
    const response = await fetch(pdfUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const base64 = result.split(',')[1] || result;
          resolve(base64);
        } else {
          resolve(null);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('PDF Base64 conversion warning:', e);
    return null;
  }
}

/**
 * ============================================================================
 * EMAIL MULTI-LANGUAGE TRANSLATIONS (9 LANGUAGES)
 * ============================================================================
 */
const EMAIL_I18N = {
  it: {
    langHtml: "it",
    subject: (title) => `${title} - Download Sample Gratuito 🎨`,
    greeting: (f, l) => `Ciao ${f} ${l}! 👋`,
    intro: (title) => `Grazie per il tuo interesse per <strong>${title}</strong>.<br>In <strong>allegato a questa email</strong> trovi il file PDF del <strong>Sample Gratuito</strong> con alcune delle pagine più rilassanti e divertenti pronte da stampare e colorare!`,
    badge: "📎 File PDF allegato a questa email",
    ctaTitle: "Ti piacciono queste pagine? ✨",
    ctaDesc: "Scopri l'intero libro con tutte le illustrazioni originali in alta qualità ordinate comodamente su Amazon!",
    buyBtn: (m) => `🛒 ACQUISTA SU ${m.toUpperCase()}`,
    morePrompt: "Vuoi scoprire tutti i libri da colorare della nostra collezione?",
    moreLink: "👉 Visita il sito Cozy Coloring Chaos",
    copyright: "Tutti i diritti riservati.",
    disclaimer: "Ricevi questa email perché hai richiesto un sample gratuito su indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  en: {
    langHtml: "en",
    subject: (title) => `${title} - Free Sample Download 🎨`,
    greeting: (f, l) => `Hello ${f} ${l}! 👋`,
    intro: (title) => `Thank you for your interest in <strong>${title}</strong>.<br><strong>Attached to this email</strong> you will find the <strong>Free Sample PDF</strong> with selected cozy coloring pages ready to print and color!`,
    badge: "📎 PDF file attached to this email",
    ctaTitle: "Loving these coloring pages? ✨",
    ctaDesc: "Get the full book with all original high-quality illustrations delivered right to your door on Amazon!",
    buyBtn: (m) => `🛒 BUY ON ${m.toUpperCase()}`,
    morePrompt: "Want to explore more cozy coloring books from our collection?",
    moreLink: "👉 Visit Cozy Coloring Chaos",
    copyright: "All rights reserved.",
    disclaimer: "You are receiving this email because you requested a free sample on indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  de: {
    langHtml: "de",
    subject: (title) => `${title} - Kostenlose Leseprobe Download 🎨`,
    greeting: (f, l) => `Hallo ${f} ${l}! 👋`,
    intro: (title) => `Vielen Dank für dein Interesse an <strong>${title}</strong>.<br>Im <strong>Anhang dieser E-Mail</strong> findest du das <strong>kostenlose PDF-Sample</strong> mit ausgewählten Seiten zum Ausdrucken und Ausmalen!`,
    badge: "📎 PDF-Datei im E-Mail-Anhang",
    ctaTitle: "Gefallen dir diese Malvorlagen? ✨",
    ctaDesc: "Hol dir das komplette Buch mit allen Original-Illustrationen in bester Druckqualität direkt bei Amazon!",
    buyBtn: (m) => `🛒 BEI ${m.toUpperCase()} KAUFEN`,
    morePrompt: "Möchtest du weitere Malbücher unserer Kollektion entdecken?",
    moreLink: "👉 Besuche Cozy Coloring Chaos",
    copyright: "Alle Rechte vorbehalten.",
    disclaimer: "Du erhältst diese E-Mail, weil du eine kostenlose Leseprobe auf indiebookstudio.github.io/cozy-coloring-chaos/ angefordert hast."
  },
  fr: {
    langHtml: "fr",
    subject: (title) => `${title} - Téléchargement de l'Extrait Gratuit 🎨`,
    greeting: (f, l) => `Bonjour ${f} ${l} ! 👋`,
    intro: (title) => `Merci pour votre intérêt pour <strong>${title}</strong>.<br>Vous trouverez en <strong>pièce jointe de cet e-mail</strong> votre <strong>extrait gratuit au format PDF</strong> avec des pages prêtes à imprimer et à colorier !`,
    badge: "📎 Fichier PDF en pièce jointe",
    ctaTitle: "Vous aimez ces coloriages ? ✨",
    ctaDesc: "Commandez le livre complet avec toutes les illustrations originales en haute définition directement sur Amazon !",
    buyBtn: (m) => `🛒 ACHETER SUR ${m.toUpperCase()}`,
    morePrompt: "Envie de découvrir tous les livres de notre collection ?",
    moreLink: "👉 Visiter Cozy Coloring Chaos",
    copyright: "Tous droits réservés.",
    disclaimer: "Vous recevez cet e-mail suite à votre demande d'extrait gratuit sur indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  es: {
    langHtml: "es",
    subject: (title) => `${title} - Descarga de Muestra Gratis 🎨`,
    greeting: (f, l) => `¡Hola ${f} ${l}! 👋`,
    intro: (title) => `Muchas gracias por tu interés en <strong>${title}</strong>.<br><strong>Adjunto a este correo</strong> encontrarás el PDF de la <strong>Muestra Gratuita</strong> con páginas seleccionadas listas para imprimir y colorear.`,
    badge: "📎 Archivo PDF adjunto a este correo",
    ctaTitle: "¿Te encantan estas ilustraciones? ✨",
    ctaDesc: "¡Consigue el libro completo con todas las ilustraciones originales en alta calidad en Amazon!",
    buyBtn: (m) => `🛒 COMPRAR EN ${m.toUpperCase()}`,
    morePrompt: "¿Quieres descubrir todos los libros para colorear de nuestra colección?",
    moreLink: "👉 Visita Cozy Coloring Chaos",
    copyright: "Todos los derechos reservados.",
    disclaimer: "Recibes este correo porque solicitaste una muestra gratuita en indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  nl: {
    langHtml: "nl",
    subject: (title) => `${title} - Gratis Sample Download 🎨`,
    greeting: (f, l) => `Hallo ${f} ${l}! 👋`,
    intro: (title) => `Bedankt voor je interesse in <strong>${title}</strong>.<br>In de <strong>bijlage van deze e-mail</strong> vind je het <strong>gratis PDF-sample</strong> met leuke kleurplaten om direct te printen en in te kleuren!`,
    badge: "📎 PDF-bestand in de bijlage",
    ctaTitle: "Vind je deze kleurplaten leuk? ✨",
    ctaDesc: "Bestel het complete kleurboek met alle originele illustraties eenvoudig op Amazon!",
    buyBtn: (m) => `🛒 KOOP OP ${m.toUpperCase()}`,
    morePrompt: "Wil je meer gezellige kleurboeken ontdekken?",
    moreLink: "👉 Bezoek Cozy Coloring Chaos",
    copyright: "Alle rechten voorbehouden.",
    disclaimer: "Je ontvangt deze e-mail omdat je een gratis sample hebt aangevraagd op indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  pl: {
    langHtml: "pl",
    subject: (title) => `${title} - Pobierz Darmową Próbkę 🎨`,
    greeting: (f, l) => `Cześć ${f} ${l}! 👋`,
    intro: (title) => `Dziękujemy za zainteresowanie książką <strong>${title}</strong>.<br>W <strong>załączniku do tej wiadomości</strong> znajdziesz <strong>darmową próbkę PDF</strong> ze stronami gotowymi do wydrukowania i kolorowania!`,
    badge: "📎 Plik PDF w załączniku",
    ctaTitle: "Podobają Ci się te ilustracje? ✨",
    ctaDesc: "Zamów pełną książkę ze wszystkimi oryginalnymi ilustracjami w wysokiej jakości na Amazon!",
    buyBtn: (m) => `🛒 KUP NA ${m.toUpperCase()}`,
    morePrompt: "Chcesz poznać wszystkie nasze kolorowanki?",
    moreLink: "👉 Odwiedź Cozy Coloring Chaos",
    copyright: "Wszelkie prawa zastrzeżone.",
    disclaimer: "Otrzymujesz tę wiadomość, ponieważ poprosiłeś o darmową próbkę na indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  sv: {
    langHtml: "sv",
    subject: (title) => `${title} - Ladda ner Gratis Prov 🎨`,
    greeting: (f, l) => `Hej ${f} ${l}! 👋`,
    intro: (title) => `Tack för ditt intresse för <strong>${title}</strong>.<br>I <strong>bilagan till detta e-postmeddelande</strong> hittar du ditt <strong>gratis PDF-prov</strong> med mysiga målarbilder redo att skrivas ut och färgläggas!`,
    badge: "📎 PDF-fil bifogad i detta mejl",
    ctaTitle: "Gillar du dessa målarbilder? ✨",
    ctaDesc: "Beställ hela boken med alla originalillustrationer i högsta kvalitet direkt från Amazon!",
    buyBtn: (m) => `🛒 KÖP PÅ ${m.toUpperCase()}`,
    morePrompt: "Vill du utforska fler målarböcker från vår kollektion?",
    moreLink: "👉 Besök Cozy Coloring Chaos",
    copyright: "Alla rättigheter förbehållna.",
    disclaimer: "Du får detta e-postmeddelande eftersom du begärde ett gratis prov på indiebookstudio.github.io/cozy-coloring-chaos/"
  },
  ja: {
    langHtml: "ja",
    subject: (title) => `${title} - 無料サンプルダウンロード 🎨`,
    greeting: (f, l) => `こんにちは、${l ? l + ' ' : ''}${f} 様 👋`,
    intro: (title) => `『<strong>${title}</strong>』にご興味をお持ちいただきありがとうございます。<br>このメールに<strong>無料サンプルPDF</strong>を<strong>添付</strong>いたしました。印刷してすぐにぬりえをお楽しみいただけます！`,
    badge: "📎 PDFファイルを添付しています",
    ctaTitle: "これらのイラストを気に入っていただけましたか？ ✨",
    ctaDesc: "すべてのオリジナル高画質イラストが収録された完全版をAmazonでお求めいただけます！",
    buyBtn: (m) => `🛒 ${m.toUpperCase()} で購入する`,
    morePrompt: "他のぬりえ本コレクションも見てみませんか？",
    moreLink: "👉 Cozy Coloring Chaos 公式サイトへ",
    copyright: "無断転載を禁じます。",
    disclaimer: "このメールは indiebookstudio.github.io/cozy-coloring-chaos/ にて無料サンプルをご請求いただいた方にお送りしています。"
  }
};

/**
 * Determines the best language for the email based on recipient's country & site language.
 */
function getRecipientEmailLanguage(countryCode, siteLang) {
  const code = (countryCode || '').toLowerCase();
  if (code === 'it') return 'it';
  if (code === 'de' || code === 'at' || code === 'ch') return 'de';
  if (code === 'fr' || code === 'be') return 'fr';
  if (code === 'es' || code === 'mx') return 'es';
  if (code === 'nl') return 'nl';
  if (code === 'pl') return 'pl';
  if (code === 'se') return 'sv';
  if (code === 'jp') return 'ja';
  if (siteLang && EMAIL_I18N[siteLang]) return siteLang;
  return 'en';
}

/**
 * Builds the responsive HTML email template for the book sample delivery.
 */
function buildSampleEmailHtml({ firstName, lastName, book, amazonUrl, marketInfo, countryCode, siteLang }) {
  const emailLangKey = getRecipientEmailLanguage(countryCode, siteLang);
  const et = EMAIL_I18N[emailLangKey] || EMAIL_I18N.en;
  const safeTitle = escapeHtml(book.title || 'Cozy Coloring Book');
  const absoluteCoverUrl = new URL(book.cover, EMAIL_CONFIG.siteUrl).href;
  const marketLabel = marketInfo ? (marketInfo.buttonLabel || marketInfo.name) : 'Amazon';
  const currentYear = new Date().getFullYear();
  const safeFirst = escapeHtml(firstName || '');
  const safeLast = escapeHtml(lastName || '');

  return `
<!DOCTYPE html>
<html lang="${et.langHtml || 'en'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(et.subject(book.title || 'Cozy Coloring Book'))}</title>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #FCFAF7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1C1917;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 580px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 1px solid #E7E5E4;">
    <tr>
      <td align="center" style="background-color: #1C1917; padding: 28px 20px;">
        <h1 style="color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: 0.04em;">COZY COLORING CHAOS</h1>
        <p style="color: #FF5436; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0;">Cozy coloring &bull; Dark humor &bull; Beautiful chaos</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px 28px; text-align: center;">
        <h2 style="font-size: 22px; font-weight: 800; color: #1C1917; margin: 0 0 12px 0;">${et.greeting(safeFirst, safeLast)}</h2>
        
        <p style="font-size: 15px; line-height: 1.6; color: #44403C; margin: 0 0 24px 0;">
          ${et.intro(safeTitle)}
        </p>

        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 20px auto; max-width: 240px;">
          <tr>
            <td align="center" style="border-radius: 12px; overflow: hidden; box-shadow: 0 12px 28px rgba(0,0,0,0.2); border: 1px solid #E7E5E4;">
              <a href="${amazonUrl}" target="_blank" style="display: block; text-decoration: none;">
                <img src="${absoluteCoverUrl}" alt="${safeTitle}" width="240" style="width: 100%; max-width: 240px; height: auto; display: block; border: 0;" />
              </a>
            </td>
          </tr>
        </table>

        <div style="margin: 20px 0 26px 0;">
          <span style="display: inline-block; background-color: #ECFDF5; border: 1.5px solid #A7F3D0; color: #065F46; font-size: 13px; font-weight: 700; padding: 7px 16px; border-radius: 50px;">
            ${et.badge}
          </span>
        </div>

        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #FFF7ED; border: 1.5px solid #FFEDD5; border-radius: 14px; margin: 24px 0;">
          <tr>
            <td style="padding: 24px 20px; text-align: center;">
              <h3 style="margin: 0 0 8px 0; color: #9A3412; font-size: 17px; font-weight: 800;">${et.ctaTitle}</h3>
              <p style="margin: 0 0 18px 0; color: #7C2D12; font-size: 14px; line-height: 1.5;">
                ${et.ctaDesc}
              </p>
              <a href="${amazonUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #FF5436 0%, #E03E22 100%); background-color: #FF5436; color: #FFFFFF !important; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 28px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.05em; box-shadow: 0 4px 14px rgba(255,84,54,0.35);">
                ${et.buyBtn(escapeHtml(marketLabel))}
              </a>
            </td>
          </tr>
        </table>

        <div style="margin-top: 28px; padding-top: 24px; border-top: 1px solid #F5F5F4;">
          <p style="font-size: 14px; color: #57534E; margin: 0 0 8px 0;">${et.morePrompt}</p>
          <a href="${EMAIL_CONFIG.siteUrl}" target="_blank" style="display: inline-block; color: #FF5436; font-weight: 700; text-decoration: none; font-size: 14px;">
            ${et.moreLink}
          </a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background-color: #F5F5F4; padding: 20px 24px; text-align: center; border-top: 1px solid #E7E5E4;">
        <p style="font-size: 12px; color: #78716C; margin: 0 0 6px 0;">
          &copy; ${currentYear} Cozy Coloring Chaos. ${et.copyright}
        </p>
        <p style="font-size: 11px; color: #A8A29E; margin: 0;">
          ${et.disclaimer}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Populates the custom country dropdown in the sample form with flag images.
 */
function populateCountrySelect(selectedCode) {
  const customSelect = document.getElementById('custom-country-select');
  const menuEl = document.getElementById('country-dropdown-menu');
  const nativeSelect = document.getElementById('sample-country');
  const selectedFlagImg = document.getElementById('country-selected-flag');
  const selectedNameSpan = document.getElementById('country-selected-name');

  const currentCode = selectedCode ? selectedCode.toLowerCase() : 'it';
  const activeCountry = SAMPLE_COUNTRIES.find(c => c.code === currentCode) || SAMPLE_COUNTRIES[0];

  if (selectedFlagImg) {
    selectedFlagImg.src = `https://flagcdn.com/24x18/${activeCountry.flagCode || 'un'}.png`;
    selectedFlagImg.srcset = `https://flagcdn.com/48x36/${activeCountry.flagCode || 'un'}.png 2x`;
    selectedFlagImg.alt = activeCountry.name;
  }
  if (selectedNameSpan) {
    selectedNameSpan.textContent = activeCountry.name;
  }

  // Populate hidden native select for form serialization
  if (nativeSelect) {
    nativeSelect.innerHTML = SAMPLE_COUNTRIES.map((c) => {
      const isSelected = (c.code.toLowerCase() === currentCode) ? 'selected' : '';
      return `<option value="${c.code}" ${isSelected}>${c.name}</option>`;
    }).join('');
    nativeSelect.value = activeCountry.code;
  }

  // Populate custom dropdown menu with flag images
  if (menuEl) {
    menuEl.innerHTML = SAMPLE_COUNTRIES.map((c) => {
      const isSelected = (c.code.toLowerCase() === currentCode);
      return `
        <div class="country-option ${isSelected ? 'selected' : ''}" data-country-code="${c.code}" role="option" aria-selected="${isSelected ? 'true' : 'false'}" onclick="selectCountryOption('${c.code}')">
          <img src="https://flagcdn.com/24x18/${c.flagCode || 'un'}.png" srcset="https://flagcdn.com/48x36/${c.flagCode || 'un'}.png 2x" alt="" width="22" height="16" class="country-option-flag" loading="lazy">
          <span class="country-option-name">${escapeHtml(c.name)}</span>
          ${isSelected ? '<span class="country-option-check">✓</span>' : ''}
        </div>
      `;
    }).join('');
  }
}

/**
 * Handles selecting an option in the custom country dropdown.
 */
window.selectCountryOption = function(code) {
  const customSelect = document.getElementById('custom-country-select');
  const menuEl = document.getElementById('country-dropdown-menu');
  const triggerBtn = document.getElementById('country-trigger');
  const nativeSelect = document.getElementById('sample-country');
  const selectedFlagImg = document.getElementById('country-selected-flag');
  const selectedNameSpan = document.getElementById('country-selected-name');

  const country = SAMPLE_COUNTRIES.find(c => c.code === code) || SAMPLE_COUNTRIES[0];
  if (selectedFlagImg) {
    selectedFlagImg.src = `https://flagcdn.com/24x18/${country.flagCode || 'un'}.png`;
    selectedFlagImg.srcset = `https://flagcdn.com/48x36/${country.flagCode || 'un'}.png 2x`;
    selectedFlagImg.alt = country.name;
  }
  if (selectedNameSpan) {
    selectedNameSpan.textContent = country.name;
  }
  if (nativeSelect) {
    nativeSelect.value = country.code;
  }

  // Update selected class in menu
  if (menuEl) {
    menuEl.querySelectorAll('.country-option').forEach(opt => {
      const isMatch = (opt.getAttribute('data-country-code') === country.code);
      opt.classList.toggle('selected', isMatch);
      opt.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      const checkEl = opt.querySelector('.country-option-check');
      if (isMatch && !checkEl) {
        opt.insertAdjacentHTML('beforeend', '<span class="country-option-check">✓</span>');
      } else if (!isMatch && checkEl) {
        checkEl.remove();
      }
    });
    menuEl.style.display = 'none';
  }
  if (customSelect) customSelect.classList.remove('open');
  if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');

  // AUTOMATIC LIVE FORM TRANSLATION ON COUNTRY CHANGE:
  const targetLang = country.lang || getRecipientEmailLanguage(country.code, currentLanguage);
  const t = TRANSLATIONS[targetLang] || TRANSLATIONS.en;
  updateFreeSampleModalTranslations(t);
};

/**
 * Opens the Free Sample Request Modal.
 */
window.openFreeSampleModal = function(bookId) {
  const book = BOOKS.find(b => b.id === bookId);
  if (!book) return;

  activeSampleBook = book;
  const modal = document.getElementById('free-sample-modal');

  // Preselect user's country based on site language or browser language
  let defaultCountryCode = 'us';
  if (currentLanguage === 'it') defaultCountryCode = 'it';
  else if (currentLanguage === 'de') defaultCountryCode = 'de';
  else if (currentLanguage === 'fr') defaultCountryCode = 'fr';
  else if (currentLanguage === 'es') defaultCountryCode = 'es';
  else if (currentLanguage === 'nl') defaultCountryCode = 'nl';
  else if (currentLanguage === 'pl') defaultCountryCode = 'pl';
  else if (currentLanguage === 'sv') defaultCountryCode = 'se';
  else if (currentLanguage === 'ja') defaultCountryCode = 'jp';

  const defaultCountry = SAMPLE_COUNTRIES.find(c => c.code === defaultCountryCode) || SAMPLE_COUNTRIES[0];
  const targetLang = defaultCountry.lang || currentLanguage;
  const t = TRANSLATIONS[targetLang] || TRANSLATIONS.en;

  // Populate book preview strip
  const coverImg = document.getElementById('sample-form-book-cover');
  const titleEl = document.getElementById('sample-form-book-title');
  const subtitleEl = document.getElementById('sample-form-book-subtitle');
  const pdfNameEl = document.getElementById('sample-form-pdf-name');

  if (coverImg) {
    coverImg.src = book.cover;
    coverImg.alt = book.title;
  }
  if (titleEl) titleEl.textContent = book.title;
  if (subtitleEl) subtitleEl.textContent = book.subtitle || `${book.language || 'Coloring Book'} - by ${book.author}`;
  if (pdfNameEl) pdfNameEl.textContent = t.pdfAttachedViaEmail || "PDF allegato via email";

  populateCountrySelect(defaultCountryCode);
  updateFreeSampleModalTranslations(t);
  resetFreeSampleForm();

  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus on first name input
    setTimeout(() => {
      const firstInput = document.getElementById('sample-firstname');
      if (firstInput) firstInput.focus();
    }, 100);
  }
};

/**
 * Closes the Free Sample Request Modal.
 */
window.closeFreeSampleModal = function() {
  const modal = document.getElementById('free-sample-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.classList.remove('active');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  activeSampleBook = null;
  resetFreeSampleForm();
};

/**
 * Resets the Free Sample Form to its initial state.
 */
window.resetFreeSampleForm = function() {
  const form = document.getElementById('free-sample-form');
  const stateLoading = document.getElementById('sample-state-loading');
  const stateSuccess = document.getElementById('sample-state-success');
  const stateError = document.getElementById('sample-state-error');
  const bookStrip = document.getElementById('sample-book-strip');

  if (form) {
    form.reset();
    form.style.display = 'block';
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
  }
  if (bookStrip) {
    bookStrip.style.display = 'flex';
  }
  if (stateLoading) stateLoading.style.display = 'none';
  if (stateSuccess) stateSuccess.style.display = 'none';
  if (stateError) stateError.style.display = 'none';
};

/**
 * Handles Free Sample Form Submission.
 */
window.handleFreeSampleSubmit = async function(event) {
  event.preventDefault();
  if (!activeSampleBook) return;

  const form = document.getElementById('free-sample-form');
  const firstNameInput = document.getElementById('sample-firstname');
  const lastNameInput = document.getElementById('sample-lastname');
  const countrySelect = document.getElementById('sample-country');
  const emailInput = document.getElementById('sample-email');

  const firstName = (firstNameInput ? firstNameInput.value : '').trim();
  const lastName = (lastNameInput ? lastNameInput.value : '').trim();
  const countryCode = (countrySelect ? countrySelect.value : 'us').toLowerCase();
  const email = (emailInput ? emailInput.value : '').trim();

  // Basic validation
  if (!firstName || !lastName || !email) {
    if (!firstName && firstNameInput) firstNameInput.classList.add('is-invalid');
    if (!lastName && lastNameInput) lastNameInput.classList.add('is-invalid');
    if (!email && emailInput) emailInput.classList.add('is-invalid');
    return;
  }

  // Remove invalid classes
  if (firstNameInput) firstNameInput.classList.remove('is-invalid');
  if (lastNameInput) lastNameInput.classList.remove('is-invalid');
  if (emailInput) emailInput.classList.remove('is-invalid');

  const stateLoading = document.getElementById('sample-state-loading');
  const stateSuccess = document.getElementById('sample-state-success');
  const stateError = document.getElementById('sample-state-error');
  const bookStrip = document.getElementById('sample-book-strip');

  // Show Loading State
  if (form) form.style.display = 'none';
  if (bookStrip) bookStrip.style.display = 'none';
  if (stateLoading) stateLoading.style.display = 'flex';
  if (stateError) stateError.style.display = 'none';
  if (stateSuccess) stateSuccess.style.display = 'none';

  // Determine marketplace for country
  const countryInfo = SAMPLE_COUNTRIES.find(c => c.code === countryCode) || SAMPLE_COUNTRIES[1];
  const marketKey = countryInfo.market || 'us';
  const amazonUrl = getBookUrlForMarket(activeSampleBook, marketKey);
  const marketInfo = AMAZON_MARKETS[marketKey] || AMAZON_MARKETS.us;

  // Determine localized subject & email language based on selected country
  const emailLangKey = countryInfo.lang || getRecipientEmailLanguage(countryCode, currentLanguage);
  const emailT = EMAIL_I18N[emailLangKey] || EMAIL_I18N.en;
  const localizedSubject = emailT.subject(activeSampleBook.title);

  // Determine PDF file path (for metadata)
  const sampleFileName = `${activeSampleBook.title.replace(/[^a-zA-Z0-9]/g, '-')}-Free-Sample.pdf`;
  const hpInput = document.getElementById('sample-website-hp');
  const honeypot = hpInput ? hpInput.value : '';

  try {
    // Dispatch request to secure serverless endpoint
    const response = await fetch(EMAIL_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        countryCode: countryCode,
        lang: emailLangKey,
        bookId: activeSampleBook.id,
        website_hp: honeypot
      })
    });

    const resData = await response.json().catch(() => ({}));

    if (!response.ok || !resData.success) {
      throw new Error(resData.error || `HTTP ${response.status}`);
    }

    console.log('✅ [Free Sample] Inviato con successo tramite backend serverless!', resData);

    // 5. Render Success State
    const activeT = TRANSLATIONS[emailLangKey] || TRANSLATIONS.en;
    if (stateLoading) stateLoading.style.display = 'none';
    if (stateSuccess) {
      stateSuccess.style.display = 'flex';

      const successTitleEl = document.getElementById('sample-success-title');
      const successDescEl = document.getElementById('sample-success-desc');
      const successAmazonBtn = document.getElementById('success-amazon-btn');
      const successAmazonBtnText = document.getElementById('success-amazon-btn-text');
      const successAmazonTagline = document.getElementById('success-amazon-tagline');
      const btnCloseSuccess = document.getElementById('btn-close-success');

      if (successTitleEl) {
        successTitleEl.textContent = activeT.formSuccessTitle || "Sample inviato con successo! 🎉";
      }

      if (successDescEl) {
        if (typeof activeT.formSuccessDesc === 'function') {
          successDescEl.innerHTML = activeT.formSuccessDesc(escapeHtml(activeSampleBook.title), escapeHtml(email));
        } else {
          successDescEl.innerHTML = `Abbiamo inviato l'email con il PDF di <strong>${escapeHtml(activeSampleBook.title)}</strong> allegato all'indirizzo <strong>${escapeHtml(email)}</strong>.<br>Controlla la tua casella di posta!`;
        }
      }

      if (successAmazonTagline) {
        successAmazonTagline.textContent = activeT.formSuccessBuyTag || "Ti piace questo libro? Ordina la copia completa cartacea:";
      }

      if (successAmazonBtn) {
        successAmazonBtn.href = amazonUrl;
        const marketLabel = marketInfo.buttonLabel || marketInfo.name;
        if (successAmazonBtnText) {
          successAmazonBtnText.textContent = (typeof activeT.viewOn === 'function') ? activeT.viewOn(marketLabel) : `VEDI SU ${marketLabel.toUpperCase()}`;
        }
      }

      if (btnCloseSuccess) {
        btnCloseSuccess.textContent = activeT.formSuccessClose || "Torna al catalogo";
      }
    }
  } catch (err) {
    console.error('Error submitting sample form:', err);
    if (stateLoading) stateLoading.style.display = 'none';
    if (stateError) stateError.style.display = 'flex';
  }
};

/**
 * Initializes events for the Free Sample modal.
 */
function initFreeSampleModalEvents() {
  const modal = document.getElementById('free-sample-modal');
  const customCountrySelect = document.getElementById('custom-country-select');
  const countryTrigger = document.getElementById('country-trigger');
  const countryMenu = document.getElementById('country-dropdown-menu');

  if (countryTrigger && countryMenu) {
    countryTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = (countryMenu.style.display === 'block');
      countryMenu.style.display = isOpen ? 'none' : 'block';
      if (customCountrySelect) customCountrySelect.classList.toggle('open', !isOpen);
      countryTrigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });

    document.addEventListener('click', (e) => {
      if (customCountrySelect && !customCountrySelect.contains(e.target)) {
        countryMenu.style.display = 'none';
        customCountrySelect.classList.remove('open');
        countryTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeFreeSampleModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('free-sample-modal');
    if (modal && (modal.classList.contains('active') || modal.classList.contains('open')) && e.key === 'Escape') {
      closeFreeSampleModal();
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

  // Free Sample Chip Button ("🎁 Free Sample")
  const sampleChipHtml = `
    <button type="button" class="chip-sample-btn" onclick="openFreeSampleModal('${escapeJs(book.id)}')" aria-label="${t.freeSampleBtn || 'Free Sample'} - ${safeTitle}">
      <span>${t.freeSampleBtn || '🎁 Free Sample'}</span>
    </button>
  `;

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
          ${sampleChipHtml}
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

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

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
  initFreeSampleModalEvents();

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

