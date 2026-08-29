/**
 * ============================================================================
 * COZY COLORING CHAOS - SERVERLESS BACKEND HANDLER
 * ============================================================================
 * 
 * Endpoint: POST /api/send-free-sample
 * Compatible with: Vercel Serverless Functions, Netlify Functions, and Node.js
 * 
 * Security:
 * - Reads BREVO_API_KEY exclusively from process.env
 * - Zero secrets exposed to browser or client
 * - Restrictive CORS (indiebookstudio.github.io & localhost)
 * - Anti-spam honeypot detection
 * - In-memory IP rate limiting
 * - Server-side email and input validation
 * - Dynamic PDF retrieval from disk / CDN
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================
const CONFIG = {
  brandName: "Cozy Coloring Chaos",
  senderEmail: "cozycoloringchaos@gmail.com",
  adminCcEmail: "cozycoloringchaos@gmail.com",
  siteUrl: "https://indiebookstudio.github.io/cozy-coloring-chaos/",
  allowedOrigins: [
    "https://indiebookstudio.github.io",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:8080",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5500",
    "http://127.0.0.1:8080"
  ]
};

// Rate limiter: Map<ip, Array<timestamp>>
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 10; // max 10 requests per 10 min window per IP

// 14 Official Amazon Markets
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

// Books Catalog Definition
const BOOKS = [
  {
    id: "impossible-worlds",
    title: "Impossible Worlds",
    subtitle: "Cozy & Easy Coloring Book | Adorable Animals, Absurd Places, and Wonderfully Impossible Surprises",
    author: "Isaac McClour",
    cover: "assets/Impossible.Worlds/Front.Cover.png",
    samplePdf: "assets/Impossible.Worlds/Sample/Free.Sample.pdf",
    defaultMarket: "us",
    asin: "B0HFZZ2TMH"
  },
  {
    id: "italian-girls",
    title: "Italian Girls",
    subtitle: "Cozy & Easy Coloring Book | Cute Italian Girls, Relaxing Coloring Pages, Italian Lifestyle, Fashion & Everyday Moments",
    author: "Isaac McClour",
    cover: "assets/Italian.Girls/Front.Cover.png",
    samplePdf: "assets/Italian.Girls/Sample/Free.Sample.pdf",
    defaultMarket: "us",
    asin: "B0HGJBKMGZ"
  },
  {
    id: "innocent-paws",
    title: "Innocent Paws",
    subtitle: "A Cozy Murder Coloring Book | Darkly Humorous Murder Scenes in Cozy Everyday Settings for Adults and Teens",
    author: "Isaac McClour",
    cover: "assets/Innocent.Paws/Front.Cover.png",
    samplePdf: "assets/Innocent.Paws/Sample/Free.Sample.pdf",
    defaultMarket: "us",
    asin: "B0HFGBJW8Y"
  },
  {
    id: "killer-paws",
    title: "Killer Paws",
    subtitle: "A Cozy Murder Coloring Book | Darkly Humorous Murder Scenes in Cozy Everyday Settings for Adults and Teens",
    author: "Isaac McClour",
    cover: "assets/Killer.Paws/Front.Cover.png",
    samplePdf: "assets/Killer.Paws/Sample/Free.Sample.pdf",
    defaultMarket: "us",
    asin: "B0HGGQ3GZ8"
  },
  {
    id: "non-rompetemi-i-coglioni",
    title: "Non Rompetemi i Coglioni",
    subtitle: "Il libro da colorare per sfogarsi senza finire nei guai | Libro antistress kawaii per adulti",
    author: "Lucas C. Morica",
    cover: "assets/Non.Rompetemi.I.Coglioni/Front.Cover.png",
    samplePdf: "assets/Non.Rompetemi.I.Coglioni/Sample/Free.Sample.pdf",
    defaultMarket: "it",
    asin: "B0HF7WZBYD"
  }
];

// Country to Language and Marketplace Mapping
const COUNTRY_MAP = {
  it: { lang: "it", market: "it", name: "Italia" },
  us: { lang: "en", market: "us", name: "United States" },
  gb: { lang: "en", market: "uk", name: "United Kingdom" },
  de: { lang: "de", market: "de", name: "Deutschland" },
  fr: { lang: "fr", market: "fr", name: "France" },
  es: { lang: "es", market: "es", name: "España" },
  ca: { lang: "en", market: "ca", name: "Canada" },
  au: { lang: "en", market: "au", name: "Australia" },
  nl: { lang: "nl", market: "nl", name: "Nederland" },
  pl: { lang: "pl", market: "pl", name: "Polska" },
  se: { lang: "sv", market: "se", name: "Sverige" },
  be: { lang: "fr", market: "be", name: "Belgique / België" },
  ie: { lang: "en", market: "ie", name: "Ireland" },
  jp: { lang: "ja", market: "jp", name: "Japan" },
  at: { lang: "de", market: "de", name: "Österreich" },
  ch: { lang: "de", market: "de", name: "Schweiz / Suisse" },
  mx: { lang: "es", market: "us", name: "México" },
  br: { lang: "es", market: "us", name: "Brasil" }
};

// Multi-Language Email Templates (9 Languages)
const EMAIL_I18N = {
  it: {
    langHtml: "it",
    subject: (title) => `${title} - Download Sample Gratuito 🎨`,
    greeting: (f, l) => `Ciao ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `Hello ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `Hallo ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `Bonjour ${f} ${l} ! 👋`.trim(),
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
    greeting: (f, l) => `¡Hola ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `Hallo ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `Cześć ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `Hej ${f} ${l}! 👋`.trim(),
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
    greeting: (f, l) => `こんにちは、${l ? l + ' ' : ''}${f} 様 👋`.trim(),
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

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket ? req.socket.remoteAddress : (req.connection ? req.connection.remoteAddress : '127.0.0.1');
}

function checkRateLimit(ip) {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

function getRecipientEmailLanguage(countryCode, lang) {
  const code = (countryCode || '').toLowerCase();
  if (code === 'it') return 'it';
  if (code === 'de' || code === 'at' || code === 'ch') return 'de';
  if (code === 'fr' || code === 'be') return 'fr';
  if (code === 'es' || code === 'mx' || code === 'br') return 'es';
  if (code === 'nl') return 'nl';
  if (code === 'pl') return 'pl';
  if (code === 'se') return 'sv';
  if (code === 'jp') return 'ja';
  if (lang && EMAIL_I18N[lang]) return lang;
  return 'en';
}

function getBookAmazonUrl(book, marketKey) {
  const key = (marketKey === 'com' || !marketKey) ? (book.defaultMarket || 'us') : marketKey;
  if (book.asin && AMAZON_MARKETS[key]) {
    return `https://www.${AMAZON_MARKETS[key].domain}/dp/${book.asin}`;
  }
  return `https://www.amazon.com/dp/${book.asin || 'B0HFZZ2TMH'}`;
}

async function loadPdfAttachmentBase64(pdfRelativePath) {
  // 1. Try resolving from local filesystem
  const possiblePaths = [
    path.join(process.cwd(), pdfRelativePath),
    path.resolve(__dirname, '..', pdfRelativePath),
    path.resolve(__dirname, pdfRelativePath)
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const fileBuffer = fs.readFileSync(p);
        return fileBuffer.toString('base64');
      } catch (err) {
        console.warn(`[PDF Loader] Could not read local file ${p}:`, err.message);
      }
    }
  }

  // 2. Fallback: Fetch from public GitHub Pages CDN if serverless bundle does not include asset
  const cdnUrl = `${CONFIG.siteUrl}${pdfRelativePath.replace(/^\/+/, '')}`;
  try {
    const res = await fetch(cdnUrl);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer).toString('base64');
    }
  } catch (err) {
    console.error(`[PDF Loader] Failed to fetch PDF from CDN (${cdnUrl}):`, err.message);
  }

  return null;
}

function buildEmailHtml({ firstName, lastName, book, amazonUrl, marketInfo, countryCode, lang }) {
  const emailLangKey = getRecipientEmailLanguage(countryCode, lang);
  const et = EMAIL_I18N[emailLangKey] || EMAIL_I18N.en;
  const safeTitle = escapeHtml(book.title || 'Cozy Coloring Book');
  const absoluteCoverUrl = `${CONFIG.siteUrl}${book.cover.replace(/^\/+/, '')}`;
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
          <a href="${CONFIG.siteUrl}" target="_blank" style="display: inline-block; color: #FF5436; font-weight: 700; text-decoration: none; font-size: 14px;">
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

// ============================================================================
// MAIN SERVERLESS HANDLER
// ============================================================================

module.exports = async function handler(req, res) {
  // 1. CORS Headers
  const origin = req.headers['origin'] || req.headers['Origin'] || '';
  const isAllowedOrigin = CONFIG.allowedOrigins.some(allowed => 
    origin === allowed || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')
  );

  if (origin && isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Non-browser or same-origin requests
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Content-Type', 'application/json');

  // 2. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // 3. Enforce POST Method
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.statusCode = 405;
    res.end(JSON.stringify({ success: false, error: "Method Not Allowed. Use POST." }));
    return;
  }

  // 4. Rate Limiting Check
  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    res.statusCode = 429;
    res.end(JSON.stringify({ 
      success: false, 
      error: "Too many requests. Please wait a few minutes before trying again." 
    }));
    return;
  }

  // 5. Parse Request Body if needed (Express/Vercel auto-parses req.body, plain Node needs stream)
  let body = req.body;
  if (!body && typeof req.on === 'function') {
    try {
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const rawData = Buffer.concat(buffers).toString();
      body = rawData ? JSON.parse(rawData) : {};
    } catch (parseErr) {
      res.statusCode = 400;
      res.end(JSON.stringify({ success: false, error: "Malformed JSON payload" }));
      return;
    }
  }

  body = body || {};

  // 6. Anti-Spam Honeypot Check
  // If honeypot fields are filled by bot, silently return success without sending email
  if (body.honeypot || body.website_hp || body._hp) {
    console.log(`[Anti-Spam] Honeypot triggered by IP ${clientIp}. Silently ignoring.`);
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: "Sample request received." }));
    return;
  }

  // 7. Input Validation
  const email = (body.email || '').trim().toLowerCase();
  const firstName = (body.firstName || body.first_name || '').trim().substring(0, 100);
  const lastName = (body.lastName || body.last_name || '').trim().substring(0, 100);
  const countryCode = (body.countryCode || body.country || 'us').trim().toLowerCase().substring(0, 10);
  const requestedLang = (body.lang || body.language || '').trim().toLowerCase().substring(0, 10);
  const bookId = (body.bookId || body.book_id || 'impossible-worlds').trim().toLowerCase();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email) || email.length > 254) {
    res.statusCode = 400;
    res.end(JSON.stringify({ success: false, error: "Please provide a valid email address." }));
    return;
  }

  // 8. Find Book and Country Information
  const book = BOOKS.find(b => b.id === bookId) || BOOKS[0];
  const countryInfo = COUNTRY_MAP[countryCode] || COUNTRY_MAP.us;
  const marketKey = countryInfo.market || book.defaultMarket || 'us';
  const marketInfo = AMAZON_MARKETS[marketKey] || AMAZON_MARKETS.us;
  const amazonUrl = getBookAmazonUrl(book, marketKey);
  const emailLangKey = countryInfo.lang || getRecipientEmailLanguage(countryCode, requestedLang);
  const et = EMAIL_I18N[emailLangKey] || EMAIL_I18N.en;
  const emailSubject = et.subject(book.title);

  // 9. Check BREVO_API_KEY from environment
  const brevoApiKey = process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.trim() : '';
  if (!brevoApiKey) {
    console.error("[Brevo Error] BREVO_API_KEY environment variable is not configured.");
    res.statusCode = 500;
    res.end(JSON.stringify({ 
      success: false, 
      error: "Email service is temporarily unavailable. Please try again later." 
    }));
    return;
  }

  // 10. Load PDF Attachment
  const pdfPath = book.samplePdf || 'assets/Impossible.Worlds/Sample/Free.Sample.pdf';
  const sampleFileName = `${book.title.replace(/[^a-zA-Z0-9]/g, '-')}-Free-Sample.pdf`;
  const pdfBase64 = await loadPdfAttachmentBase64(pdfPath);

  // 11. Generate Localized HTML Email Body
  const emailHtml = buildEmailHtml({
    firstName,
    lastName,
    book,
    amazonUrl,
    marketInfo,
    countryCode,
    lang: emailLangKey
  });

  // 12. Build Brevo API Payload
  const recipientName = `${firstName} ${lastName}`.trim() || "Coloring Friend";
  const brevoPayload = {
    sender: {
      name: CONFIG.brandName,
      email: CONFIG.senderEmail
    },
    to: [
      { email: email, name: recipientName }
    ],
    subject: emailSubject,
    htmlContent: emailHtml
  };

  // Add CC to admin only if recipient is not the admin email
  if (email.toLowerCase() !== CONFIG.adminCcEmail.toLowerCase()) {
    brevoPayload.cc = [
      { email: CONFIG.adminCcEmail, name: "Cozy Coloring Chaos Team" }
    ];
  }

  // Add PDF Attachment if available
  if (pdfBase64 && pdfBase64.length > 50) {
    brevoPayload.attachment = [
      {
        name: sampleFileName,
        content: pdfBase64
      }
    ];
  }

  // 13. Dispatch Email via Brevo REST API
  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': brevoApiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify(brevoPayload)
    });

    if (brevoResponse.ok || brevoResponse.status === 201) {
      const resData = await brevoResponse.json().catch(() => ({}));
      console.log(`✅ [Brevo] Free sample email sent successfully to ${email} (MessageId: ${resData.messageId || 'N/A'})`);
      res.statusCode = 200;
      res.end(JSON.stringify({ 
        success: true, 
        message: "Free sample sent successfully!" 
      }));
      return;
    } else {
      const errData = await brevoResponse.json().catch(() => ({}));
      console.error('❌ [Brevo API Error]:', brevoResponse.status, errData);
      res.statusCode = 502;
      res.end(JSON.stringify({ 
        success: false, 
        error: "Unable to send sample at this time. Please try again later." 
      }));
      return;
    }
  } catch (networkErr) {
    console.error('❌ [Brevo Network Error]:', networkErr.message);
    res.statusCode = 503;
    res.end(JSON.stringify({ 
      success: false, 
      error: "Network error communicating with email service. Please try again." 
    }));
    return;
  }
};
