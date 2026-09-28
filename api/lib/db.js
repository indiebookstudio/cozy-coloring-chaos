/**
 * ============================================================================
 * COZY COLORING CHAOS - DATABASE ADAPTER (GITHUB API / SUPABASE / LOCAL JSON)
 * ============================================================================
 * Supports 3 storage engines:
 * 1. GitHub API (auto-commits data/fan-videos.json to repo when GITHUB_TOKEN is set)
 * 2. Supabase / PostgreSQL REST API (when SUPABASE_URL & keys are set)
 * 3. Local JSON file storage (data/fan-videos.json) for local development
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getDataFilePath() {
  const p1 = path.join(process.cwd(), 'data', 'fan-videos.json');
  if (fs.existsSync(p1)) return p1;
  const p2 = path.join(__dirname, '..', '..', 'data', 'fan-videos.json');
  if (fs.existsSync(p2)) return p2;
  return p1;
}

// ----------------------------------------------------------------------------
// STORAGE PROVIDER DETECTION
// ----------------------------------------------------------------------------

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

function isGitHubConfigured() {
  return !!(process.env.GITHUB_TOKEN || process.env.GH_TOKEN);
}

function getGitHubRepo() {
  return process.env.GITHUB_REPO || 'indiebookstudio/cozy-coloring-chaos';
}

function getGitHubHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  return {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'CozyColoringChaos-CMS'
  };
}

// ----------------------------------------------------------------------------
// GITHUB API REPO STORAGE IMPLEMENTATION
// ----------------------------------------------------------------------------

async function fetchFromGitHub() {
  const repo = getGitHubRepo();
  const url = `https://api.github.com/repos/${repo}/contents/data/fan-videos.json`;
  const res = await fetch(url, { headers: getGitHubHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}: ${await res.text()}`);
  }
  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf8');
  return {
    videos: JSON.parse(content),
    sha: data.sha
  };
}

async function commitToGitHub(videos, message) {
  const repo = getGitHubRepo();
  const url = `https://api.github.com/repos/${repo}/contents/data/fan-videos.json`;
  const getRes = await fetch(url, { headers: getGitHubHeaders() });
  if (!getRes.ok) {
    throw new Error(`Failed to read current file SHA from GitHub: ${getRes.status} ${await getRes.text()}`);
  }
  const currentData = await getRes.json();
  const sha = currentData.sha;

  const contentStr = JSON.stringify(videos, null, 2);
  const base64Content = Buffer.from(contentStr, 'utf8').toString('base64');

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: {
      ...getGitHubHeaders(),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message,
      content: base64Content,
      sha: sha,
      branch: 'main'
    })
  });

  if (!putRes.ok) {
    throw new Error(`Failed to commit to GitHub: ${putRes.status} ${await putRes.text()}`);
  }
  return true;
}

// ----------------------------------------------------------------------------
// LOCAL FILE STORAGE IMPLEMENTATION
// ----------------------------------------------------------------------------

function readLocalVideos() {
  try {
    const filePath = getDataFilePath();
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) || [];
  } catch (err) {
    console.error('Error reading local fan-videos.json:', err);
    return [];
  }
}

function writeLocalVideos(videos) {
  try {
    const filePath = getDataFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(videos, null, 2), 'utf-8');
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
  // 1. Supabase
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
      console.error('Supabase error, trying next fallback:', err);
    }
  }

  // 2. GitHub API (if configured)
  if (isGitHubConfigured()) {
    try {
      const { videos } = await fetchFromGitHub();
      const filtered = includeUnpublished ? videos : videos.filter(v => v.published !== false);
      return filtered.sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    } catch (err) {
      console.error('GitHub API query error, falling back to local file:', err);
    }
  }

  // 3. Local JSON fallback
  const videos = readLocalVideos();
  const filtered = includeUnpublished ? videos : videos.filter(v => v.published !== false);

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

  if (isGitHubConfigured()) {
    try {
      const { videos } = await fetchFromGitHub();
      return videos.find(v => v.id === id) || null;
    } catch (err) {
      console.error('GitHub getVideoById error:', err);
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

  if (isGitHubConfigured()) {
    try {
      const { videos } = await fetchFromGitHub();
      return videos.find(v => (v.tiktok_url || '').trim().replace(/\/+$/, '').toLowerCase() === normUrl) || null;
    } catch (err) {
      console.error('GitHub getVideoByUrl error:', err);
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

  // 1. Supabase
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
      console.error('Supabase createVideo error:', err);
      throw err;
    }
  }

  // 2. GitHub API
  if (isGitHubConfigured()) {
    try {
      const { videos } = await fetchFromGitHub();
      videos.unshift(record);
      await commitToGitHub(videos, `chore(cms): add fan video @${record.creator_username}`);
      return record;
    } catch (err) {
      console.error('GitHub API error in createVideo:', err);
      throw new Error(`Salvataggio su repository GitHub fallito: ${err.message}`);
    }
  }

  // 3. Local filesystem fallback
  const videos = readLocalVideos();
  videos.unshift(record);
  const written = writeLocalVideos(videos);
  if (!written) {
    throw new Error('Impossibile salvare il video: il filesystem del server è in sola lettura (Vercel). Per abilitare il salvataggio persistente dal pannello admin, imposta la variabile d\'ambiente GITHUB_TOKEN (Personal Access Token GitHub con permesso repo) o SUPABASE_URL su Vercel.');
  }
  return record;
}

/**
 * Updates an existing video record by ID.
 */
export async function updateVideo(id, videoData) {
  const now = new Date().toISOString();

  // 1. Supabase
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
      throw err;
    }
  }

  // 2. GitHub API
  if (isGitHubConfigured()) {
    try {
      const { videos } = await fetchFromGitHub();
      const idx = videos.findIndex(v => v.id === id);
      if (idx === -1) return null;

      videos[idx] = {
        ...videos[idx],
        ...videoData,
        id: videos[idx].id,
        updated_at: now
      };
      await commitToGitHub(videos, `chore(cms): update fan video @${videos[idx].creator_username}`);
      return videos[idx];
    } catch (err) {
      console.error('GitHub updateVideo error:', err);
      throw new Error(`Aggiornamento su repository GitHub fallito: ${err.message}`);
    }
  }

  // 3. Local filesystem fallback
  const videos = readLocalVideos();
  const idx = videos.findIndex(v => v.id === id);
  if (idx === -1) return null;

  videos[idx] = {
    ...videos[idx],
    ...videoData,
    id: videos[idx].id,
    updated_at: now
  };
  const written = writeLocalVideos(videos);
  if (!written) {
    throw new Error('Impossibile aggiornare il video: il filesystem del server è in sola lettura. Imposta GITHUB_TOKEN o SUPABASE_URL nelle Environment Variables di Vercel.');
  }
  return videos[idx];
}

/**
 * Deletes a video record by ID.
 */
export async function deleteVideo(id) {
  // 1. Supabase
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
      throw err;
    }
  }

  // 2. GitHub API
  if (isGitHubConfigured()) {
    try {
      const { videos } = await fetchFromGitHub();
      const filtered = videos.filter(v => v.id !== id);
      if (filtered.length === videos.length) return false;

      await commitToGitHub(filtered, `chore(cms): delete fan video ${id}`);
      return true;
    } catch (err) {
      console.error('GitHub deleteVideo error:', err);
      throw new Error(`Cancellazione su repository GitHub fallita: ${err.message}`);
    }
  }

  // 3. Local filesystem fallback
  const videos = readLocalVideos();
  const filtered = videos.filter(v => v.id !== id);
  if (filtered.length === videos.length) return false;

  const written = writeLocalVideos(filtered);
  if (!written) {
    throw new Error('Impossibile eliminare il video: il filesystem del server è in sola lettura. Imposta GITHUB_TOKEN o SUPABASE_URL nelle Environment Variables di Vercel.');
  }
  return true;
}
