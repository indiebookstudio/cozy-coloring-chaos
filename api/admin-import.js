/**
 * ============================================================================
 * ADMIN API: /api/admin-import
 * ============================================================================
 * Imports official metadata from TikTok for a given TikTok video URL.
 * Universal handler: runs in Vercel Node Serverless (req, res) & Web standards.
 */

import { isAuthenticated } from './lib/auth.js';
import { getAllVideos } from './lib/db.js';
import { fetchTikTokOEmbed, parseTikTokUrl } from './lib/tiktok.js';
import { getRequestBody, sendJson, handleOptions } from './lib/http.js';

// Known books slug mapping for heuristic detection
const BOOK_HINTS = [
  { slug: 'the-horror-pixel-show', keywords: ['horror pixel', 'pixel show', 'pixel art', 'mystery mosaic', 'diamond-shaped'] },
  { slug: 'the-cyberpunk-pixel-show', keywords: ['cyberpunk', 'cyber dreams', 'cyberpunk pixel', 'cyber sogni'] },
  { slug: 'cozy-and-doomed', keywords: ['cozy & doomed', 'cozy and doomed', 'cozy doomed', 'doomed', 'catastrophic'] },
  { slug: 'cozy-terror', keywords: ['cozy terror', 'terror', 'dark & cozy horror', 'nightmares to color'] },
  { slug: 'the-black-sword', keywords: ['black sword', 'dark fantasy', 'black & white'] },
  { slug: 'homer-in-circles', keywords: ['homer in circles', 'homer', 'greek myths', 'miti greci', 'iliad', 'odyssey'] },
  { slug: 'innocent-paws', keywords: ['innocent paws', 'innoncent paws', 'innocent', 'innoncent', 'paws', 'patte', 'gatti', 'cats', 'cute animals'] },
  { slug: 'killer-paws', keywords: ['killer paws', 'killer cat'] },
  { slug: 'impossible-worlds', keywords: ['impossible worlds', 'mondi impossibili', 'surreal'] },
  { slug: 'crazy-cozy', keywords: ['crazy cozy', 'pazzo cozy'] },
  { slug: 'italian-girls', keywords: ['italian girls', 'ragazze italiane'] },
  { slug: 'non-rompetemi-i-coglioni', keywords: ['non rompetemi', 'coglioni', 'insulti', 'parolacce'] },
  { slug: 'non-mi-ricordo-mai-un-cazzo', keywords: ['non mi ricordo mai', 'non mi ricordo'] },
  { slug: 'i-cant-remember-jack-shit', keywords: ['cant remember jack shit', "can't remember jack shit", 'jack shit'] },
  { slug: 'jai-une-memoire-de-merde', keywords: ['memoire de merde', 'mémoire de merde'] },
  { slug: 'tengo-una-memoria-de-mierda', keywords: ['memoria de mierda', 'tengo una memoria'] }
];

const CATEGORY_HINTS = [
  { category: 'unboxing', keywords: ['unboxing', 'unboxed', 'mail', 'package', 'opened', 'pacco'] },
  { category: 'flip-through', keywords: ['flip through', 'flip-through', 'fliptrough', 'flip trough', 'sfoglio', 'sfogliata', 'browse'] },
  { category: 'coloring', keywords: ['coloring', 'color with me', 'speed color', 'colored', 'coloro', 'colorare', 'colortok', 'coloriage', 'colorier'] },
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

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return handleOptions(req, res);
  }

  const reply = (data, status = 200, cookie = null, extraHeaders = {}) => sendJson(res, data, status, cookie, extraHeaders, req);

  // Server-side authentication check
  if (!isAuthenticated(req)) {
    return reply({ success: false, error: 'Unauthorized. Please log in.' }, 401);
  }

  if (req.method !== 'POST') {
    return reply({ success: false, error: 'Method Not Allowed. Use POST.' }, 405);
  }

  try {
    const body = await getRequestBody(req);
    const url = body.url;

    if (!url || typeof url !== 'string') {
      return reply({ success: false, error: 'TikTok URL is required' }, 400);
    }

    const parsed = await parseTikTokUrl(url);
    if (!parsed) {
      return reply({
        success: false,
        error: 'Formato link TikTok non riconosciuto. Inserisci un link valido (es. https://www.tiktok.com/@creator/video/123456789 o link breve da app).'
      }, 400);
    }

    // Check duplicate in gallery with a single cached dataset lookup
    let allVideos = [];
    try {
      allVideos = await getAllVideos({ includeUnpublished: true });
    } catch (e) {
      console.warn('Could not check duplicates from database:', e.message);
    }

    const normUrl = (url || '').trim().replace(/\/+$/, '').toLowerCase();
    const normCanon = (parsed.canonicalUrl || '').trim().replace(/\/+$/, '').toLowerCase();
    const vidId = String(parsed.videoId || '').trim();

    const isDuplicate = (checkId, checkUrl) => allVideos.some(v => {
      if (checkId && String(v.tiktok_video_id || '').trim() === checkId) return true;
      const vUrl = (v.tiktok_url || '').trim().replace(/\/+$/, '').toLowerCase();
      if (checkUrl && vUrl === checkUrl) return true;
      return false;
    });

    if (isDuplicate(vidId, normCanon) || isDuplicate(vidId, normUrl)) {
      return reply({
        success: false,
        error: 'Questo video TikTok è già presente nella galleria.'
      }, 409);
    }

    // Fetch official and enriched metadata from TikTok
    const metadata = await fetchTikTokOEmbed(url);

    // Double check duplicate if videoId was newly discovered during resolution
    if (metadata.tiktok_video_id && metadata.tiktok_video_id !== parsed.videoId) {
      if (isDuplicate(String(metadata.tiktok_video_id).trim(), null)) {
        return reply({
          success: false,
          error: 'Questo video TikTok è già presente nella galleria.'
        }, 409);
      }
    }

    // Heuristics for book and category
    const suggestedBook = detectBookSlug(metadata.caption);
    const suggestedCategory = detectCategory(metadata.caption);

    return reply({
      success: true,
      metadata: {
        ...metadata,
        suggested_book_slug: suggestedBook,
        suggested_category: suggestedCategory
      },
      warning: metadata.is_partial 
        ? 'Alcuni dettagli (come la didascalia o l\'autore) non sono stati recuperati automaticamente: compilali prima di salvare.' 
        : null
    });
  } catch (err) {
    console.error('TikTok import error:', err);
    return reply({
      success: false,
      error: err.message || 'Failed to import TikTok video. Please check the URL and try again.'
    }, 400);
  }
}
