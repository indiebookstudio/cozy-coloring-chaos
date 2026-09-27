/**
 * ============================================================================
 * PUBLIC API: GET /api/fan-videos
 * ============================================================================
 * Returns published fan videos with lightweight metadata for the public gallery.
 */

import { getAllVideos } from './lib/db.js';

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Cache-Control': 'public, max-age=60, s-maxage=300',
      ...extraHeaders
    }
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
  }

  if (req.method !== 'GET') {
    return jsonResponse({ success: false, error: 'Method Not Allowed' }, 405);
  }

  try {
    const url = new URL(req.url, 'http://localhost');
    const book = url.searchParams.get('book');
    const category = url.searchParams.get('category');
    const language = url.searchParams.get('language');

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

    return jsonResponse({
      success: true,
      count: videos.length,
      videos: videos
    });
  } catch (err) {
    console.error('Error fetching fan videos:', err);
    return jsonResponse({ success: false, error: 'Failed to retrieve fan videos' }, 500);
  }
}
