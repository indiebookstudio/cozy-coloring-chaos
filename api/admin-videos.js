/**
 * ============================================================================
 * ADMIN API: /api/admin-videos
 * ============================================================================
 * Protected CRUD endpoint for managing fan videos metadata in CMS.
 * Requires valid admin session.
 */

import { isAuthenticated } from './lib/auth.js';
import { getAllVideos, getVideoById, getVideoByUrl, createVideo, updateVideo, deleteVideo } from './lib/db.js';

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Cookie'
    }
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Cookie'
      }
    });
  }

  // Server-side authentication check
  if (!isAuthenticated(req)) {
    return jsonResponse({ success: false, error: 'Unauthorized. Please log in.' }, 401);
  }

  try {
    // 1. GET: List all videos (including unpublished)
    if (req.method === 'GET') {
      const url = new URL(req.url, 'http://localhost');
      const id = url.searchParams.get('id');

      if (id) {
        const video = await getVideoById(id);
        if (!video) {
          return jsonResponse({ success: false, error: 'Video not found' }, 404);
        }
        return jsonResponse({ success: true, video });
      }

      const videos = await getAllVideos({ includeUnpublished: true });
      return jsonResponse({ success: true, count: videos.length, videos });
    }

    // 2. POST: Create new video record
    if (req.method === 'POST') {
      const body = await req.json();

      if (!body.tiktok_url || !body.creator_username) {
        return jsonResponse({ success: false, error: 'TikTok URL and Creator Username are required' }, 400);
      }

      // Check duplicate URL
      const existing = await getVideoByUrl(body.tiktok_url);
      if (existing) {
        return jsonResponse({ success: false, error: 'This TikTok has already been added.' }, 409);
      }

      const created = await createVideo(body);
      return jsonResponse({ success: true, video: created, message: 'Video added successfully' }, 201);
    }

    // 3. PUT: Update existing video
    if (req.method === 'PUT') {
      const body = await req.json();
      const id = body.id;

      if (!id) {
        return jsonResponse({ success: false, error: 'Video ID is required for update' }, 400);
      }

      const existing = await getVideoById(id);
      if (!existing) {
        return jsonResponse({ success: false, error: 'Video not found' }, 404);
      }

      const updated = await updateVideo(id, body);
      return jsonResponse({ success: true, video: updated, message: 'Video updated successfully' });
    }

    // 4. DELETE: Remove video record
    if (req.method === 'DELETE') {
      const url = new URL(req.url, 'http://localhost');
      const id = url.searchParams.get('id');

      if (!id) {
        return jsonResponse({ success: false, error: 'Video ID is required for deletion' }, 400);
      }

      const existing = await getVideoById(id);
      if (!existing) {
        return jsonResponse({ success: false, error: 'Video not found' }, 404);
      }

      const ok = await deleteVideo(id);
      if (!ok) {
        return jsonResponse({ success: false, error: 'Failed to delete video record' }, 500);
      }

      return jsonResponse({ success: true, message: 'Video removed from gallery successfully' });
    }

    return jsonResponse({ success: false, error: 'Method Not Allowed' }, 405);
  } catch (err) {
    console.error('Admin videos API error:', err);
    return jsonResponse({ success: false, error: err.message || 'Internal Server Error' }, 500);
  }
}
