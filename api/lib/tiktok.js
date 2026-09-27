/**
 * ============================================================================
 * COZY COLORING CHAOS - TIKTOK OEMBED & PARSER
 * ============================================================================
 * Fetches official metadata from TikTok oEmbed service.
 * Zero scrapers: uses official public TikTok oEmbed API only, with robust fallback.
 */

/**
 * Normalizes and extracts video information from any TikTok URL, shortlink, or raw video ID.
 */
export async function parseTikTokUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  let url = rawUrl.trim();

  // 1. Raw numeric video ID (15 to 22 digits)
  if (/^\d{15,22}$/.test(url)) {
    return {
      isValid: true,
      username: 'creator',
      videoId: url,
      canonicalUrl: `https://www.tiktok.com/@tiktok/video/${url}`
    };
  }

  // 2. Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  // 3. Remove query parameters and hash for clean matching
  let cleanUrl = url.split('?')[0].split('#')[0].replace(/\/+$/, '');

  // 4. Standard video format: https://www.tiktok.com/@username/video/1234567890123456789
  const stdMatch = cleanUrl.match(/tiktok\.com\/@([^/?#]+)\/video\/(\d+)/i);
  if (stdMatch) {
    return {
      isValid: true,
      username: stdMatch[1],
      videoId: stdMatch[2],
      canonicalUrl: `https://www.tiktok.com/@${stdMatch[1]}/video/${stdMatch[2]}`
    };
  }

  // 5. Mobile web format: https://m.tiktok.com/v/123456789.html
  const mobileMatch = cleanUrl.match(/tiktok\.com\/v\/(\d+)/i);
  if (mobileMatch) {
    return {
      isValid: true,
      username: 'creator',
      videoId: mobileMatch[1],
      canonicalUrl: `https://www.tiktok.com/@tiktok/video/${mobileMatch[1]}`
    };
  }

  // 6. Short URLs: vm.tiktok.com, vt.tiktok.com, tiktok.com/t/
  if (/(?:vm|vt)\.tiktok\.com|tiktok\.com\/t\//i.test(url)) {
    try {
      const resp = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
        }
      });
      const resolved = resp.url || url;
      const resolvedClean = resolved.split('?')[0].split('#')[0].replace(/\/+$/, '');
      const resMatch = resolvedClean.match(/tiktok\.com\/@([^/?#]+)\/video\/(\d+)/i);
      if (resMatch) {
        return {
          isValid: true,
          username: resMatch[1],
          videoId: resMatch[2],
          canonicalUrl: `https://www.tiktok.com/@${resMatch[1]}/video/${resMatch[2]}`
        };
      }
    } catch (e) {
      console.warn('Failed to resolve TikTok shortlink redirect:', e);
    }
  }

  // 7. General fallback: look for any 15-22 digit sequence as video ID
  const anyIdMatch = url.match(/\/(\d{15,22})/);
  const anyUserMatch = url.match(/@([a-zA-Z0-9_.-]+)/);
  if (anyIdMatch) {
    const user = anyUserMatch ? anyUserMatch[1] : 'creator';
    return {
      isValid: true,
      username: user,
      videoId: anyIdMatch[1],
      canonicalUrl: `https://www.tiktok.com/@${user}/video/${anyIdMatch[1]}`
    };
  }

  return null;
}

/**
 * Cleans HTML entities and tags from TikTok caption.
 */
export function cleanCaption(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calls official TikTok oEmbed endpoint, with graceful fallback if oEmbed is unavailable.
 */
export async function fetchTikTokOEmbed(url) {
  const parsed = await parseTikTokUrl(url);
  if (!parsed || !parsed.isValid) {
    throw new Error('Formato URL TikTok non valido. Inserisci un link valido (es. https://www.tiktok.com/@creator/video/123456789 o link da app vm.tiktok.com).');
  }

  let oembedData = null;
  try {
    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(parsed.canonicalUrl)}`;
    const res = await fetch(oembedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (res.ok) {
      oembedData = await res.json();
    } else {
      console.warn(`TikTok oEmbed HTTP ${res.status} for ${parsed.canonicalUrl}`);
    }
  } catch (err) {
    console.warn('Network error reaching TikTok oEmbed:', err);
  }

  const videoId = oembedData?.embed_product_id || parsed.videoId || extractVideoIdFromHtml(oembedData?.html);
  const username = oembedData?.author_unique_id || (parsed.username !== 'creator' ? parsed.username : '') || extractUsernameFromUrl(oembedData?.author_url);
  const displayName = oembedData?.author_name || username || '';

  return {
    tiktok_url: parsed.canonicalUrl,
    tiktok_video_id: videoId || '',
    creator_username: username || '',
    creator_name: displayName,
    creator_profile_url: oembedData?.author_url || (username ? `https://www.tiktok.com/@${username}` : ''),
    creator_avatar_url: '',
    caption: cleanCaption(oembedData?.title || ''),
    thumbnail_url: oembedData?.thumbnail_url || '',
    html: oembedData?.html || '',
    is_partial: !oembedData
  };
}

function extractVideoIdFromHtml(html) {
  if (!html) return null;
  const match = html.match(/data-video-id="(\d+)"/i);
  return match ? match[1] : null;
}

function extractUsernameFromUrl(url) {
  if (!url) return null;
  const match = url.match(/@([^/?#]+)/);
  return match ? match[1] : null;
}
