-- ============================================================================
-- COZY COLORING CHAOS - DATABASE SCHEMA (SUPABASE / POSTGRESQL)
-- ============================================================================
-- Table: fan_videos
-- Metadata storage for TikTok community showcase videos.
-- (No video files are hosted; only official TikTok references and metadata)
-- ============================================================================

CREATE TABLE IF NOT EXISTS fan_videos (
  id TEXT PRIMARY KEY,
  tiktok_url TEXT NOT NULL UNIQUE,
  tiktok_video_id TEXT NOT NULL,
  creator_username TEXT NOT NULL,
  creator_name TEXT NOT NULL,
  creator_profile_url TEXT NOT NULL,
  creator_avatar_url TEXT DEFAULT '',
  caption TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  book_slug TEXT NOT NULL DEFAULT 'unassigned',
  category TEXT NOT NULL DEFAULT 'other',
  language TEXT NOT NULL DEFAULT 'en',
  featured BOOLEAN NOT NULL DEFAULT false,
  published BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices for rapid sorting & filtering
CREATE INDEX IF NOT EXISTS idx_fan_videos_published_sort ON fan_videos (published, sort_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fan_videos_book_slug ON fan_videos (book_slug);
CREATE INDEX IF NOT EXISTS idx_fan_videos_category ON fan_videos (category);

-- Row Level Security (RLS) policies for Supabase:
-- Public can only READ published videos
ALTER TABLE fan_videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published fan videos"
  ON fan_videos
  FOR SELECT
  USING (published = true);

-- Service role has full access (for Admin API)
CREATE POLICY "Service role has full management access"
  ON fan_videos
  FOR ALL
  USING (auth.role() = 'service_role');
