/**
 * ============================================================================
 * ADMIN API: /api/admin-import
 * ============================================================================
 * Imports official metadata from TikTok oEmbed for a given TikTok video URL.
 * Checks for duplicates before fetching to avoid redundant work.
 * Requires valid admin session.
 */

import { isAuthenticated } from './lib/auth.js';
import { getVideoByUrl } from './lib/db.js';
import { fetchTikTokOEmbed, parseTikTokUrl } from './lib/tiktok.js';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie'
    }
  });
}

// Known books slug mapping for heuristic detection
const BOOK_HINTS = [
  { slug: 'the-horror-pixel-show', keywords: ['horror pixel', 'pixel show', 'pixel art', 'mystery mosaic', 'diamond-shaped'] },
  { slug: 'cozy-terror', keywords: ['cozy terror', 'terror', 'dark & cozy horror', 'nightmares to color'] },
  { slug: 'the-black-sword', keywords: ['black sword', 'dark fantasy', 'black & white'] },
  { slug: 'innocent-paws', keywords: ['innocent paws', 'paws', 'gatti', 'cats', 'cute animals'] },
  { slug: 'killer-paws', keywords: ['killer paws', 'killer cat'] },
  { slug: 'impossible-worlds', keywords: ['impossible worlds', 'mondi impossibili', 'surreal'] },
  { slug: 'crazy-cozy', keywords: ['crazy cozy', 'pazzo cozy'] },
  { slug: 'italian-girls', keywords: ['italian girls', 'ragazze italiane'] },
  { slug: 'non-rompetemi-i-coglioni', keywords: ['non rompetemi', 'coglioni', 'insulti', 'parolacce'] }
];

const CATEGORY_HINTS = [
  { category: 'unboxing', keywords: ['unboxing', 'unboxed', 'mail', 'package', 'opened', 'pacco'] },
  { category: 'flip-through', keywords: ['flip through', 'flip-through', 'fliptrough', 'flip trough', 'sfoglio', 'sfogliata', 'browse'] },
  { category: 'coloring', keywords: ['coloring', 'color with me', 'speed color', 'colored', 'coloro', 'colorare', 'colortok'] },
  { category: 'review', keywords: ['review', 'recensione', 'opinion', 'gifted', 'honest review', 'thoughts on'] },
  { category: 'collection', keywords: ['collection', 'collezione', 'all my books', 'shelf'] }
];

function detectBookSlug(text) {
  const lower = (text || '').toLowerCase();
  for (const item of BOOK_HINTS) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return item.slug;
      }
    }
  }
  return 'unassigned';
}

function detectCategory(text) {
  const lower = (text || '').toLowerCase();
  for (const item of CATEGORY_HINTS) {
    for (const kw of item.keywords) {
      if (lower.includes(kw)) {
        return item.category;
      }
    }
  }
  return 'other';
}

function detectLanguage(text) {
  const lower = (text || '').toLowerCase();
  if (lower.includes('#dutchtiktok') || lower.includes('nederlands') || lower.includes('dutch')) return 'nl';
  if (lower.includes('#italiantiktok') || lower.includes('italiano') || lower.includes('ciao') || lower.includes('grazie')) return 'it';
  if (lower.includes('deutsch') || lower.includes('german')) return 'de';
  if (lower.includes('français') || lower.includes('french')) return 'fr';
  if (lower.includes('español') || lower.includes('spanish')) return 'es';
  return 'en';
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Cookie'
      }
    });
  }

  // Server-side authentication check
  if (!isAuthenticated(req)) {
    return jsonResponse({ success: false, error: 'Unauthorized. Please log in.' }, 401);
  }

  if (req.method !== 'POST') {
    return jsonResponse({ success: false, error: 'Method Not Allowed. Use POST.' }, 405);
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return jsonResponse({ success: false, error: 'TikTok URL is required' }, 400);
    }

    const parsed = await parseTikTokUrl(url);
    if (!parsed) {
      return jsonResponse({
        success: false,
        error: 'Formato link TikTok non riconosciuto. Inserisci un link valido (es. https://www.tiktok.com/@creator/video/123456789 o link da app vm.tiktok.com).'
      }, 400);
    }

    // Check if duplicate already in database (check both raw and canonical URL)
    const existing = await getVideoByUrl(parsed.canonicalUrl) || await getVideoByUrl(url);
    if (existing) {
      return jsonResponse({
        success: false,
        error: 'Questo video TikTok è già presente nella galleria.'
      }, 409);
    }

    // Fetch official oEmbed metadata from TikTok
    const metadata = await fetchTikTokOEmbed(url);

    // Heuristics for book, category, and language
    const suggestedBook = detectBookSlug(metadata.caption);
    const suggestedCategory = detectCategory(metadata.caption);
    const suggestedLang = detectLanguage(metadata.caption);

    return jsonResponse({
      success: true,
      metadata: {
        ...metadata,
        suggested_book_slug: suggestedBook,
        suggested_category: suggestedCategory,
        suggested_language: suggestedLang
      },
      warning: metadata.is_partial 
        ? 'Link riconosciuto e ID video estratto! TikTok non ha restituito i dettagli automatici per questo video: inserisci la didascalia e seleziona il libro prima di salvare.' 
        : null
    });
  } catch (err) {
    console.error('TikTok import error:', err);
    return jsonResponse({
      success: false,
      error: err.message || 'Failed to import TikTok video. Please check the URL and try again.'
    }, 400);
  }
}
