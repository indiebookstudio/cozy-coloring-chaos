/**
 * ============================================================================
 * ADMIN API: /api/admin-auth
 * ============================================================================
 * Handles login, session verification, and logout for the single-admin CMS.
 * Secure HttpOnly cookie session with HMAC signing and server-side password hash comparison.
 */

import { verifyPassword, createSessionToken, isAuthenticated, buildLoginCookie, buildLogoutCookie } from './lib/auth.js';

function jsonResponse(data, status = 200, cookie = null) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  if (cookie) {
    headers['Set-Cookie'] = cookie;
  }
  return new Response(JSON.stringify(data), {
    status: status,
    headers: headers
  });
}

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

export default async function handler(req) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }

  // 1. Session check: GET
  if (req.method === 'GET') {
    const valid = isAuthenticated(req);
    return jsonResponse({
      success: true,
      authenticated: valid
    });
  }

  // 2. Logout: DELETE
  if (req.method === 'DELETE') {
    const isProd = process.env.NODE_ENV === 'production';
    const cookie = buildLogoutCookie(isProd);
    return jsonResponse({ success: true, message: 'Logged out successfully' }, 200, cookie);
  }

  // 3. Login or Logout: POST
  if (req.method === 'POST') {
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      body = {};
    }

    if (body.action === 'logout') {
      const isProd = process.env.NODE_ENV === 'production';
      const cookie = buildLogoutCookie(isProd);
      return jsonResponse({ success: true, message: 'Logged out successfully' }, 200, cookie);
    }

    const ip = req.headers.get ? (req.headers.get('x-forwarded-for') || 'local') : 'local';
    if (!checkRateLimit(ip)) {
      return jsonResponse({
        success: false,
        error: 'Too many failed login attempts. Please wait 15 minutes before trying again.'
      }, 429);
    }

    const { password } = body;
    if (!password) {
      return jsonResponse({ success: false, error: 'Password is required' }, 400);
    }

    const isValid = verifyPassword(password);
    if (!isValid) {
      recordFailedAttempt(ip);
      return jsonResponse({ success: false, error: 'Invalid password. Please try again.' }, 401);
    }

    resetFailedAttempt(ip);
    const token = createSessionToken();
    const isProd = process.env.NODE_ENV === 'production';
    const cookie = buildLoginCookie(token, isProd);

    return jsonResponse({
      success: true,
      message: 'Authentication successful'
    }, 200, cookie);
  }

  return jsonResponse({ success: false, error: 'Method Not Allowed' }, 405);
}
