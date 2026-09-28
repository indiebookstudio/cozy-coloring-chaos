/**
 * ============================================================================
 * ADMIN API: /api/admin-auth
 * ============================================================================
 * Handles login, session verification, and logout for the single-admin CMS.
 * Universal handler: runs in Vercel Node Serverless (req, res) & Web standards.
 */

import { verifyPassword, createSessionToken, isAuthenticated, buildLoginCookie, buildLogoutCookie } from './lib/auth.js';
import { getRequestBody, getClientIp, sendJson, handleOptions } from './lib/http.js';

// In-memory rate limiting for login attempts
const failedAttempts = new Map();
const MAX_FAILED = 5;
const LOCKOUT_MS = 15 * 60 * 1000;

function checkRateLimit(ip) {
  const record = failedAttempts.get(ip);
  if (!record) return true;
  if (record.count >= MAX_FAILED) {
    if (Date.now() - record.lastTime < LOCKOUT_MS) {
      return false;
    } else {
      failedAttempts.delete(ip);
      return true;
    }
  }
  return true;
}

function recordFailedAttempt(ip) {
  const record = failedAttempts.get(ip) || { count: 0, lastTime: 0 };
  record.count += 1;
  record.lastTime = Date.now();
  failedAttempts.set(ip, record);
}

function resetFailedAttempt(ip) {
  failedAttempts.delete(ip);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return handleOptions(req, res);
  }

  try {
    // 1. Session check: GET
    if (req.method === 'GET') {
      const valid = isAuthenticated(req);
      return sendJson(res, {
        success: true,
        authenticated: valid
      }, 200, null, {}, req);
    }

    // 2. Logout: DELETE
    if (req.method === 'DELETE') {
      const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
      const cookie = buildLogoutCookie(isProd);
      return sendJson(res, { success: true, message: 'Logged out successfully' }, 200, cookie, {}, req);
    }

    // 3. Login or Logout: POST
    if (req.method === 'POST') {
      const body = await getRequestBody(req);

      if (body.action === 'logout') {
        const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
        const cookie = buildLogoutCookie(isProd);
        return sendJson(res, { success: true, message: 'Logged out successfully' }, 200, cookie, {}, req);
      }

      const ip = getClientIp(req);
      if (!checkRateLimit(ip)) {
        return sendJson(res, {
          success: false,
          error: 'Too many failed login attempts. Please wait 15 minutes before trying again.'
        }, 429, null, {}, req);
      }

      const password = (body.password || '').trim();
      if (!password) {
        return sendJson(res, { success: false, error: 'Password is required' }, 400, null, {}, req);
      }

      const isValid = verifyPassword(password);
      if (!isValid) {
        recordFailedAttempt(ip);
        return sendJson(res, { success: false, error: 'Invalid password. Please try again.' }, 401, null, {}, req);
      }

      resetFailedAttempt(ip);
      const token = createSessionToken();
      const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;
      const cookie = buildLoginCookie(token, isProd);

      return sendJson(res, {
        success: true,
        token: token,
        message: 'Authentication successful'
      }, 200, cookie, {}, req);
    }

    return sendJson(res, { success: false, error: 'Method Not Allowed' }, 405, null, {}, req);
  } catch (err) {
    console.error('Admin Auth Error:', err);
    return sendJson(res, { success: false, error: 'Internal server error: ' + (err.message || 'unknown') }, 500, null, {}, req);
  }
}
