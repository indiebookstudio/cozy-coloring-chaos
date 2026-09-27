/**
 * ============================================================================
 * COZY COLORING CHAOS - ADMIN AUTHENTICATION HELPER
 * ============================================================================
 * Handles server-side password verification against ADMIN_PASSWORD_HASH
 * and cryptographic HMAC token generation / verification for session cookies.
 * 
 * Zero external dependencies: uses native Node.js crypto / Web Crypto.
 */

import crypto from 'crypto';

const COOKIE_NAME = 'cozy_admin_session';
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Gets secret key for session HMAC signing.
 */
function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'cozy-coloring-chaos-session-secret-local-dev-2026';
}

/**
 * Gets configured password SHA-256 hash.
 * In local development, defaults to configured admin password hash if not set.
 */
function getPasswordHash() {
  return process.env.ADMIN_PASSWORD_HASH || '140b541899d00d31c420afc7a8a048e0c742d7790c7eb37f96b3ca82f3651355';
}

/**
 * Compares plaintext password with stored SHA-256 hash using timing-safe comparison.
 */
export function verifyPassword(password) {
  if (!password || typeof password !== 'string') return false;
  const hash = crypto.createHash('sha256').update(password.trim()).digest('hex');
  const expectedHash = getPasswordHash();

  if (hash.length !== expectedHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
}

/**
 * Generates an HMAC-signed session token containing expiration timestamp.
 */
export function createSessionToken() {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = `admin:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', getSessionSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}:${hmac}`).toString('base64url');
}

/**
 * Verifies if an HMAC session token is valid and not expired.
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return false;

  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    if (parts.length !== 3) return false;

    const [user, expiresStr, receivedHmac] = parts;
    if (user !== 'admin') return false;

    const expiresAt = parseInt(expiresStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const expectedPayload = `admin:${expiresAt}`;
    const expectedHmac = crypto.createHmac('sha256', getSessionSecret()).update(expectedPayload).digest('hex');

    if (receivedHmac.length !== expectedHmac.length) return false;
    return crypto.timingSafeEqual(Buffer.from(receivedHmac), Buffer.from(expectedHmac));
  } catch (err) {
    return false;
  }
}

/**
 * Extracts session cookie from a Request.
 */
export function getSessionCookie(req) {
  const cookieHeader = req.headers.get ? req.headers.get('cookie') : (req.headers.cookie || '');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  for (const c of cookies) {
    if (c.startsWith(`${COOKIE_NAME}=`)) {
      return c.substring(COOKIE_NAME.length + 1);
    }
  }
  return null;
}

/**
 * Checks if the request comes from an authenticated admin.
 */
export function isAuthenticated(req) {
  const token = getSessionCookie(req);
  return verifySessionToken(token);
}

/**
 * Builds the Set-Cookie header for login.
 */
export function buildLoginCookie(token, isSecure = false) {
  const secureFlag = isSecure ? ' Secure;' : '';
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS};${secureFlag}`;
}

/**
 * Builds the Set-Cookie header for logout.
 */
export function buildLogoutCookie(isSecure = false) {
  const secureFlag = isSecure ? ' Secure;' : '';
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT;${secureFlag}`;
}
