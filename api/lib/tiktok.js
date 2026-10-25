/**
 * ============================================================================
 * COZY COLORING CHAOS - TIKTOK METADATA & PARSER
 * ============================================================================
 * Multi-layer TikTok parser and metadata resolver:
 * 1. Handles full links, shortened links (vm.tiktok.com, vt.tiktok.com, tiktok.com/t/),
 *    app share links without creator names (/video/ID, /v/ID, /share/video/ID), and raw IDs.
 * 2. Multi-tier metadata fetching:
 *    - Tier 1: TikWM API (retrieves full captions, hashtags, real creator handle, avatar, cover)
 *    - Tier 2: Official TikTok oEmbed (retrieves official iframe embed & author/title fallbacks)
 *    - Tier 3: OpenGraph social crawler scraping (extracts og:title, og:image, og:description)
 */

const BOT_UA = 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

/**
 * Normalizes and extracts video information from any TikTok URL, shortlink, or raw video ID.
 */
export async function parseTikTokUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  let url = rawUrl.trim();

  // If text contains a URL (e.g. copied from app share sheet with description text), extract URL
  const urlInText = url.match(/https?:\/\/[^\s"'<>]+/i);
  if (urlInText) {
    url = urlInText[0];
  }

  // 1. Raw numeric video ID (15 to 22 digits)
  if (/^\d{15,22}$/.test(url)) {
    return {
      isValid: true,
      username: '',
      videoId: url,
      canonicalUrl: `https://www.tiktok.com/@tiktok/video/${url}`
    };
  }

  // 2. Add protocol if missing
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  // 3. Remove query parameters and hash for preliminary pattern matching
  const cleanUrl = url.split('?')[0].split('#')[0].replace(/\/+$/, '');

  // 4. Standard video format: https://www.tiktok.com/@username/video/1234567890123456789
  const stdMatch = cleanUrl.match(/tiktok\.com\/@([^/?#]+)\/video\/(\d+)/i);
  if (stdMatch && stdMatch[1] && stdMatch[1] !== 'tiktok') {
    return {
      isValid: true,
      username: stdMatch[1],
      videoId: stdMatch[2],
      canonicalUrl: `https://www.tiktok.com/@${stdMatch[1]}/video/${stdMatch[2]}`
    };
  }

  // 5. Video format WITHOUT username (e.g. copied from app or share):
  //    https://www.tiktok.com/video/1234567890123456789
  //    https://www.tiktok.com/@/video/1234567890123456789
  //    https://www.tiktok.com/share/video/1234567890123456789
  const noUserMatch = cleanUrl.match(/tiktok\.com\/(?:@\/|share\/)?video\/(\d+)/i);
  if (noUserMatch) {
    return {
      isValid: true,
      username: '',
      videoId: noUserMatch[1],
      canonicalUrl: `https://www.tiktok.com/video/${noUserMatch[1]}`
    };
  }

  // 6. Mobile web format: https://m.tiktok.com/v/123456789.html or /v/123456789
  const mobileMatch = cleanUrl.match(/tiktok\.com\/v\/(\d+)/i);
  if (mobileMatch) {
    return {
      isValid: true,
      username: '',
      videoId: mobileMatch[1],
      canonicalUrl: `https://www.tiktok.com/video/${mobileMatch[1]}`
    };
  }

  // 7. Embed / player format: https://www.tiktok.com/player/v1/123456789 or /embed/v3/123456789
  const playerMatch = cleanUrl.match(/tiktok\.com\/(?:player\/v\d+|embed\/v\d+)\/(\d+)/i);
  if (playerMatch) {
    return {
      isValid: true,
      username: '',
      videoId: playerMatch[1],
      canonicalUrl: `https://www.tiktok.com/video/${playerMatch[1]}`
    };
  }

  // 8. Short URLs: vm.tiktok.com, vt.tiktok.com, tiktok.com/t/
  if (/(?:vm|vt)\.tiktok\.com|tiktok\.com\/t\//i.test(url)) {
    try {
      const resp = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        headers: {
          'User-Agent': BOT_UA,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: AbortSignal.timeout(6000)
      });
      let resolved = resp.url || url;

      // If TikTok redirected to login with redirect_url param, decode it
      if (resolved.includes('redirect_url=')) {
        try {
          const u = new URL(resolved);
          const redir = u.searchParams.get('redirect_url');
          if (redir) resolved = decodeURIComponent(redir);
        } catch (e) {}
      }

      const resolvedClean = resolved.split('?')[0].split('#')[0].replace(/\/+$/, '');
      const resMatch = resolvedClean.match(/tiktok\.com\/@([^/?#]+)\/video\/(\d+)/i);
      if (resMatch && resMatch[1] !== 'tiktok') {
        return {
          isValid: true,
          username: resMatch[1],
          videoId: resMatch[2],
          canonicalUrl: `https://www.tiktok.com/@${resMatch[1]}/video/${resMatch[2]}`
        };
      }

      const resNoUser = resolvedClean.match(/tiktok\.com\/(?:@\/|share\/)?video\/(\d+)/i) || 
                        resolvedClean.match(/tiktok\.com\/v\/(\d+)/i);
      if (resNoUser) {
        return {
          isValid: true,
          username: '',
          videoId: resNoUser[1],
          canonicalUrl: `https://www.tiktok.com/video/${resNoUser[1]}`
        };
      }

      // If still unresolved, inspect HTML content of the redirected page for og:url or video ID
      const html = await resp.text();
      const ogUrlMatch = html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:url["']/i);
      if (ogUrlMatch) {
        const ogUrl = ogUrlMatch[1];
        const m = ogUrl.match(/tiktok\.com\/@([^/?#]+)\/video\/(\d+)/i);
        if (m && m[1] !== 'tiktok') {
          return {
            isValid: true,
            username: m[1],
            videoId: m[2],
            canonicalUrl: `https://www.tiktok.com/@${m[1]}/video/${m[2]}`
          };
        }
        const mNoUser = ogUrl.match(/\/video\/(\d+)/i);
        if (mNoUser) {
          return {
            isValid: true,
            username: '',
            videoId: mNoUser[1],
            canonicalUrl: `https://www.tiktok.com/video/${mNoUser[1]}`
          };
        }
      }
    } catch (e) {
      console.warn('Failed to resolve TikTok shortlink redirect:', e);
    }
  }

  // 9. General fallback: look for any 15-22 digit sequence as video ID
  const anyIdMatch = url.match(/\/(\d{15,22})/);
  const anyUserMatch = url.match(/@([a-zA-Z0-9_.-]+)/);
  if (anyIdMatch) {
    const user = anyUserMatch && anyUserMatch[1] && anyUserMatch[1] !== 'tiktok' ? anyUserMatch[1] : '';
    return {
      isValid: true,
      username: user,
      videoId: anyIdMatch[1],
      canonicalUrl: user 
        ? `https://www.tiktok.com/@${user}/video/${anyIdMatch[1]}` 
        : `https://www.tiktok.com/video/${anyIdMatch[1]}`
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
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calls multi-tier TikTok metadata resolver:
 * 1. TikWM API (primary: returns full caption, hashtags, real creator handle, avatar, cover)
 * 2. Official TikTok oEmbed (official iframe player embed, author/title fallback)
 * 3. OpenGraph Social Crawler (social scraper fallback for title, thumbnail)
 */
export async function fetchTikTokOEmbed(url) {
  const parsed = await parseTikTokUrl(url);
  if (!parsed || !parsed.isValid) {
    throw new Error('Formato URL TikTok non valido. Inserisci un link valido (es. https://www.tiktok.com/@creator/video/123456789 o link da app vm.tiktok.com).');
  }

  let videoId = parsed.videoId || '';
  let username = parsed.username || '';
  let displayName = '';
  let caption = '';
  let thumbnailUrl = '';
  let avatarUrl = '';
  let embedHtml = '';

  // -------------------------------------------------------------
  // SOURCE 1: TikWM Public API
  // -------------------------------------------------------------
  try {
    const tikwmTarget = videoId ? `https://www.tiktok.com/@tiktok/video/${videoId}` : parsed.canonicalUrl;
    const tikwmUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(tikwmTarget)}`;
    const twRes = await fetch(tikwmUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(6000)
    });
    if (twRes.ok) {
      const twData = await twRes.json();
      if (twData.code === 0 && twData.data) {
        const item = twData.data;
        if (item.id) videoId = String(item.id);
        if (item.title) caption = cleanCaption(item.title);
        if (item.author?.unique_id) username = item.author.unique_id;
        if (item.author?.nickname) displayName = item.author.nickname;
        if (item.author?.avatar) avatarUrl = item.author.avatar;
        if (item.cover || item.origin_cover) thumbnailUrl = item.cover || item.origin_cover;
      }
    }
  } catch (err) {
    console.warn('TikWM fetch warning:', err.message);
  }

  // -------------------------------------------------------------
  // SOURCE 2: Official TikTok oEmbed
  // -------------------------------------------------------------
  try {
    const oembedTarget = (username && videoId)
      ? `https://www.tiktok.com/@${username}/video/${videoId}`
      : (videoId ? `https://www.tiktok.com/@tiktok/video/${videoId}` : parsed.canonicalUrl);

    const oembedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(oembedTarget)}`;
    const oeRes = await fetch(oembedUrl, {
      headers: {
        'User-Agent': BROWSER_UA,
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(4000)
    });

    if (oeRes.ok) {
      const oeData = await oeRes.json();
      if (!videoId) videoId = oeData.embed_product_id || extractVideoIdFromHtml(oeData.html) || '';
      if (!caption && oeData.title) caption = cleanCaption(oeData.title);
      if (!username && oeData.author_unique_id) username = oeData.author_unique_id;
      if (!displayName && oeData.author_name) displayName = oeData.author_name;
      if (!thumbnailUrl && oeData.thumbnail_url) thumbnailUrl = oeData.thumbnail_url;
      if (oeData.html) embedHtml = oeData.html;
    }
  } catch (err) {
    console.warn('TikTok oEmbed warning:', err.message);
  }

  // -------------------------------------------------------------
  // SOURCE 3: OpenGraph Bot Scrape Fallback
  // -------------------------------------------------------------
  if (!thumbnailUrl || !caption || !username) {
    try {
      const scrapeTarget = videoId 
        ? `https://www.tiktok.com/@${username || 'a'}/video/${videoId}` 
        : parsed.canonicalUrl;
      const scrapeRes = await fetch(scrapeTarget, {
        headers: {
          'User-Agent': BOT_UA,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: AbortSignal.timeout(4000)
      });
      if (scrapeRes.ok) {
        const html = await scrapeRes.text();
        if (!thumbnailUrl) {
          const ogImg = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i) ||
                        html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:image["']/i);
          if (ogImg) thumbnailUrl = ogImg[1].replace(/&amp;/g, '&');
        }
        if (!displayName) {
          const ogTitle = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i) ||
                          html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:title["']/i);
          if (ogTitle) {
            displayName = ogTitle[1].replace(/^TikTok\s*·\s*/i, '').trim();
          }
        }
        if (!caption) {
          const ogDesc = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i) ||
                         html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:description["']/i);
          if (ogDesc && !ogDesc[1].toLowerCase().includes('log in or sign up')) {
            caption = cleanCaption(ogDesc[1]);
          }
        }
      }
    } catch (err) {
      console.warn('Scrape fallback warning:', err.message);
    }
  }

  // Canonical TikTok URL with confirmed creator username
  const finalCanonicalUrl = (username && videoId)
    ? `https://www.tiktok.com/@${username}/video/${videoId}`
    : (videoId ? `https://www.tiktok.com/video/${videoId}` : parsed.canonicalUrl);

  // Fallback player iframe if oEmbed didn't provide one
  if (!embedHtml && videoId) {
    embedHtml = `<iframe height="578" width="325" src="https://www.tiktok.com/player/v1/${videoId}?autoplay=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
  }

  const isPartial = !caption || !thumbnailUrl || !username;

  return {
    tiktok_url: finalCanonicalUrl,
    tiktok_video_id: videoId || '',
    creator_username: username || '',
    creator_name: displayName || username || '',
    creator_profile_url: username ? `https://www.tiktok.com/@${username}` : '',
    creator_avatar_url: avatarUrl || '',
    caption: caption || '',
    thumbnail_url: thumbnailUrl || '',
    html: embedHtml || '',
    is_partial: isPartial
  };
}

function extractVideoIdFromHtml(html) {
  if (!html) return null;
  const match = html.match(/data-video-id="(\d+)"/i) || html.match(/\/player\/v\d+\/(\d+)/i);
  return match ? match[1] : null;
}
