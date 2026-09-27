/**
 * ============================================================================
 * ADMIN API: /api/admin-videos
 * ============================================================================
 * Protected CRUD endpoint for managing fan videos metadata in CMS.
 * Universal handler: runs in Vercel Node Serverless (req, res) & Web standards.
 */

import { isAuthenticated } from './lib/auth.js';
import { getAllVideos, getVideoById, getVideoByUrl, createVideo, updateVideo, deleteVideo } from './lib/db.js';
import { getRequestBody, getQueryParam, sendJson, handleOptions } from './lib/http.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return handleOptions(res);
  }

  // Server-side authentication check
  if (!isAuthenticated(req)) {
    return sendJson(res, { success: false, error: 'Unauthorized. Please log in.' }, 401);
  }

  try {
    // 1. GET: List all videos (including unpublished)
    if (req.method === 'GET') {
      const id = getQueryParam(req, 'id');

      if (id) {
        const video = await getVideoById(id);
        if (!video) {
          return sendJson(res, { success: false, error: 'Video not found' }, 404);
        }
        return sendJson(res, { success: true, video });
      }

      const videos = await getAllVideos({ includeUnpublished: true });
      return sendJson(res, { success: true, count: videos.length, videos });
    }

    // 2. POST: Create new video record
    if (req.method === 'POST') {
      const body = await getRequestBody(req);

      if (!body.tiktok_url || !body.creator_username) {
        return sendJson(res, { success: false, error: 'TikTok URL and Creator Username are required' }, 400);
      }

      // Check duplicate URL
      const existing = await getVideoByUrl(body.tiktok_url);
      if (existing) {
        return sendJson(res, { success: false, error: 'This TikTok has already been added.' }, 409);
      }

      const created = await createVideo(body);
      return sendJson(res, { success: true, video: created, message: 'Video added successfully' }, 201);
    }

    // 3. PUT: Update existing video
    if (req.method === 'PUT') {
      const body = await getRequestBody(req);
      const id = body.id;

      if (!id) {
        return sendJson(res, { success: false, error: 'Video ID is required for update' }, 400);
      }

      const existing = await getVideoById(id);
      if (!existing) {
        return sendJson(res, { success: false, error: 'Video not found' }, 404);
      }

      const updated = await updateVideo(id, body);
      return sendJson(res, { success: true, video: updated, message: 'Video updated successfully' });
    }

    // 4. DELETE: Remove video record
    if (req.method === 'DELETE') {
      const id = getQueryParam(req, 'id');

      if (!id) {
        return sendJson(res, { success: false, error: 'Video ID is required for deletion' }, 400);
      }

      const existing = await getVideoById(id);
      if (!existing) {
        return sendJson(res, { success: false, error: 'Video not found' }, 404);
      }

      const ok = await deleteVideo(id);
      if (!ok) {
        return sendJson(res, { success: false, error: 'Failed to delete video record' }, 500);
      }

      return sendJson(res, { success: true, message: 'Video removed from gallery successfully' });
    }

    return sendJson(res, { success: false, error: 'Method Not Allowed' }, 405);
  } catch (err) {
    console.error('Admin videos API error:', err);
    return sendJson(res, { success: false, error: err.message || 'Internal Server Error' }, 500);
  }
}
