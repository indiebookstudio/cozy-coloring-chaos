/**
 * ============================================================================
 * COZY COLORING CHAOS - DATABASE ADAPTER (SUPABASE REST / LOCAL JSON FALLBACK)
 * ============================================================================
 * Supports:
 * 1. Supabase / PostgreSQL REST API (zero npm dependencies, pure fetch, Edge-ready)
 * 2. Local JSON file storage (data/fan-videos.json) for instant local development
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, '..', '..', 'data', 'fan-videos.json');

function isSupabaseConfigured() {
  return !!(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY));
}

function getSupabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  return {
    'apikey': key,
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  };
}

// ----------------------------------------------------------------------------
// LOCAL FILE STORAGE IMPLEMENTATION
// ----------------------------------------------------------------------------

function readLocalVideos() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return [];
    }
    const content = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(content) || [];
  } catch (err) {
    console.error('Error reading local fan-videos.json:', err);
    return [];
  }
}

function writeLocalVideos(videos) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(videos, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing local fan-videos.json:', err);
    return false;
  }
}

// ----------------------------------------------------------------------------
// UNIFIED CRUD API
// ----------------------------------------------------------------------------

/**
 * Retrieves all videos, optionally filtered by published status.
 * Sorted by sort_order ascending, then created_at descending.
 */
export async function getAllVideos({ includeUnpublished = false } = {}) {
  if (isSupabaseConfigured()) {
    try {
      let url = `${process.env.SUPABASE_URL}/rest/v1/fan_videos?select=*&order=sort_order.asc,created_at.desc`;
      if (!includeUnpublished) {
        url += '&published=eq.true';
      }
      const res = await fetch(url, { headers: getSupabaseHeaders() });
      if (!res.ok) {
        throw new Error(`Supabase query failed: ${res.status} ${await res.text()}`);
      }
      return await res.json();
    } catch (err) {
      console.error('Supabase error, falling back to local file:', err);
    }
  }

  // Local JSON fallback
  const videos = readLocalVideos();
  const filtered = includeUnpublished ? videos : videos.filter(v => v.published);

  return filtered.sort((a, b) => {
    const orderA = a.sort_order ?? 0;
    const orderB = b.sort_order ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

/**
 * Finds a video by ID.
 */
export async function getVideoById(id) {
  if (isSupabaseConfigured()) {
    try {
      const url = `${process.env.SUPABASE_URL}/rest/v1/fan_videos?id=eq.${encodeURIComponent(id)}&select=*`;
      const res = await fetch(url, { headers: getSupabaseHeaders() });
      if (res.ok) {
        const rows = await res.json();
        return rows[0] || null;
      }
    } catch (err) {
      console.error('Supabase getVideoById error:', err);
    }
  }

  const videos = readLocalVideos();
  return videos.find(v => v.id === id) || null;
}

/**
 * Finds a video by normalized TikTok URL.
 */
export async function getVideoByUrl(tiktokUrl) {
  const normUrl = (tiktokUrl || '').trim().replace(/\/+$/, '').toLowerCase();

  if (isSupabaseConfigured()) {
    try {
      const url = `${process.env.SUPABASE_URL}/rest/v1/fan_videos?tiktok_url=eq.${encodeURIComponent(normUrl)}&select=*`;
      const res = await fetch(url, { headers: getSupabaseHeaders() });
      if (res.ok) {
        const rows = await res.json();
        return rows[0] || null;
      }
    } catch (err) {
      console.error('Supabase getVideoByUrl error:', err);
    }
  }

  const videos = readLocalVideos();
  return videos.find(v => (v.tiktok_url || '').trim().replace(/\/+$/, '').toLowerCase() === normUrl) || null;
}

/**
 * Creates a new video record.
 */
export async function createVideo(videoData) {
  const now = new Date().toISOString();
  const record = {
    id: videoData.id || `video-${videoData.tiktok_video_id || Date.now()}`,
    tiktok_url: videoData.tiktok_url,
    tiktok_video_id: videoData.tiktok_video_id,
    creator_username: videoData.creator_username || '',
    creator_name: videoData.creator_name || videoData.creator_username || '',
    creator_profile_url: videoData.creator_profile_url || `https://www.tiktok.com/@${videoData.creator_username}`,
    creator_avatar_url: videoData.creator_avatar_url || '',
    caption: videoData.caption || '',
    thumbnail_url: videoData.thumbnail_url || '',
    book_slug: videoData.book_slug || 'unassigned',
    category: videoData.category || 'other',
    language: videoData.language || 'en',
    featured: !!videoData.featured,
    published: videoData.published !== undefined ? !!videoData.published : true,
    sort_order: parseInt(videoData.sort_order ?? 0, 10) || 0,
    created_at: now,
    updated_at: now
  };

  if (isSupabaseConfigured()) {
    try {
      const url = `${process.env.SUPABASE_URL}/rest/v1/fan_videos`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          ...getSupabaseHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(record)
      });
      if (res.ok) {
        const created = await res.json();
        return created[0] || record;
      }
      throw new Error(`Failed to insert into Supabase: ${res.status} ${await res.text()}`);
    } catch (err) {
      console.error('Supabase createVideo error, falling back to local storage:', err);
    }
  }

  const videos = readLocalVideos();
  videos.unshift(record);
  writeLocalVideos(videos);
  return record;
}

/**
 * Updates an existing video record by ID.
 */
export async function updateVideo(id, videoData) {
  const now = new Date().toISOString();

  if (isSupabaseConfigured()) {
    try {
      const url = `${process.env.SUPABASE_URL}/rest/v1/fan_videos?id=eq.${encodeURIComponent(id)}`;
      const payload = { ...videoData, updated_at: now };
      delete payload.id;

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          ...getSupabaseHeaders(),
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updated = await res.json();
        return updated[0] || null;
      }
    } catch (err) {
      console.error('Supabase updateVideo error:', err);
    }
  }

  const videos = readLocalVideos();
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) return null;

  videos[idx] = {
    ...videos[idx],
    ...videoData,
    id: videos[idx].id,
    updated_at: now
  };
  writeLocalVideos(videos);
  return videos[idx];
}

/**
 * Deletes a video record by ID.
 */
export async function deleteVideo(id) {
  if (isSupabaseConfigured()) {
    try {
      const url = `${process.env.SUPABASE_URL}/rest/v1/fan_videos?id=eq.${encodeURIComponent(id)}`;
      const res = await fetch(url, {
        method: 'DELETE',
        headers: getSupabaseHeaders()
      });
      if (res.ok) return true;
    } catch (err) {
      console.error('Supabase deleteVideo error:', err);
    }
  }

  const videos = readLocalVideos();
  const filtered = videos.filter(v => v.id !== id);
  if (filtered.length === videos.length) return false;

  writeLocalVideos(filtered);
  return true;
}
