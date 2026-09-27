/**
 * ============================================================================
 * PUBLIC API: GET /api/fan-videos
 * ============================================================================
 * Returns published fan videos with lightweight metadata for the public gallery.
 * Universal handler: runs in Vercel Node Serverless (req, res) & Web standards.
 */

import { getAllVideos } from './lib/db.js';
import { getQueryParam, sendJson, handleOptions } from './lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return handleOptions(res);
  }

  if (req.method !== 'GET') {
    return sendJson(res, { success: false, error: 'Method Not Allowed' }, 405);
  }

  try {
    const book = getQueryParam(req, 'book');
    const category = getQueryParam(req, 'category');
    const language = getQueryParam(req, 'language');

    let videos = await getAllVideos({ includeUnpublished: false });

    if (book && book !== 'all') {
      videos = videos.filter(v => v.book_slug === book);
    }
    if (category && category !== 'all') {
      videos = videos.filter(v => v.category === category);
    }
    if (language && language !== 'all') {
      videos = videos.filter(v => v.language === language);
    }

    return sendJson(res, {
      success: true,
      count: videos.length,
      videos: videos
    }, 200, null, {
      'Cache-Control': 'public, max-age=60, s-maxage=300'
    });
  } catch (err) {
    console.error('Error fetching fan videos:', err);
    return sendJson(res, { success: false, error: 'Failed to retrieve fan videos' }, 500);
  }
}
