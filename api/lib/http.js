/**
 * ============================================================================
 * COZY COLORING CHAOS - UNIVERSAL HTTP ADAPTER FOR VERCEL & LOCAL DEV
 * ============================================================================
 * Bridges Vercel Node.js Serverless Functions (req: IncomingMessage, res: ServerResponse)
 * and Web Standards (Request / Response) so all API handlers run reliably everywhere.
 */

/**
 * Parses JSON body from Node IncomingMessage, Web Request, or pre-parsed Vercel body.
 */
export async function getRequestBody(req) {
  if (!req) return {};

  // 1. Standard Web Request (req.json())
  if (typeof req.json === 'function') {
    try {
      return await req.json();
    } catch (e) {
      return {};
    }
  }

  // 2. Vercel Node pre-parsed body
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object') return req.body;
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch (e) {
        return {};
      }
    }
  }

  // 3. Raw Node.js stream
  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf-8');
    if (raw && raw.trim()) {
      return JSON.parse(raw);
    }
  } catch (e) {
    return {};
  }

  return {};
}

/**
 * Extracts a query parameter from req.query (Node) or req.url (Web Request).
 */
export function getQueryParam(req, param) {
  if (!req) return null;

  if (req.query && req.query[param] !== undefined) {
    return req.query[param];
  }

  try {
    const urlStr = req.url || '';
    const parsed = new URL(urlStr, 'http://localhost');
    return parsed.searchParams.get(param);
  } catch (e) {
    return null;
  }
}

/**
 * Extracts client IP address safely.
 */
export function getClientIp(req) {
  if (!req) return '127.0.0.1';

  if (req.headers) {
    if (typeof req.headers.get === 'function') {
      const forwarded = req.headers.get('x-forwarded-for');
      if (forwarded) return forwarded.split(',')[0].trim();
      return req.headers.get('x-real-ip') || '127.0.0.1';
    }
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0].trim();
    }
    return req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
  }

  return '127.0.0.1';
}

/**
 * Resolves request origin for CORS headers.
 */
function getRequestOrigin(req, res) {
  let origin = '';
  if (req) {
    if (req.headers) {
      if (typeof req.headers.get === 'function') {
        origin = req.headers.get('origin') || req.headers.get('referer');
      } else {
        origin = req.headers['origin'] || req.headers['referer'];
      }
    }
  }
  if (!origin && res && res.req && res.req.headers) {
    origin = res.req.headers['origin'] || res.req.headers['referer'];
  }

  if (origin && typeof origin === 'string') {
    try {
      if (origin.startsWith('http://') || origin.startsWith('https://')) {
        const parsed = new URL(origin);
        return parsed.origin;
      }
    } catch (e) {}
    return origin;
  }

  return '*';
}

/**
 * Sends unified response supporting both Vercel Node (res) and Web Response.
 */
export function sendJson(res, data, status = 200, cookie = null, extraHeaders = {}, req = null) {
  if (!req) {
    if (res && (typeof res.method === 'string' || (res.headers && typeof res.setHeader !== 'function'))) {
      req = res;
      res = null;
    } else if (res && (res.req || res._req)) {
      req = res.req || res._req;
    }
  }

  const origin = getRequestOrigin(req, res);
  const allowCredentials = (origin !== '*');

  // 1. Vercel Node.js Serverless Function (res is ServerResponse)
  if (res && typeof res.setHeader === 'function') {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', origin);
    if (allowCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cookie, Authorization, X-Requested-With');
    res.setHeader('Vary', 'Origin');
    if (cookie) {
      res.setHeader('Set-Cookie', cookie);
    }
    for (const [k, v] of Object.entries(extraHeaders)) {
      res.setHeader(k, v);
    }
    res.end(JSON.stringify(data));
    return;
  }

  // 2. Web Standards (Edge / Local adapter)
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization, X-Requested-With',
    'Vary': 'Origin',
    ...extraHeaders
  };
  if (allowCredentials) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  if (cookie) {
    headers['Set-Cookie'] = cookie;
  }
  return new Response(JSON.stringify(data), { status, headers });
}

/**
 * Handles CORS preflight OPTIONS request.
 */
export function handleOptions(...args) {
  let req = null;
  let res = null;

  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg.setHeader === 'function') {
      res = arg;
    } else if (typeof arg.method === 'string' || arg.headers) {
      req = arg;
    }
  }

  if (!req && res) {
    req = res.req || res._req;
  }

  const origin = getRequestOrigin(req, res);
  const allowCredentials = (origin !== '*');

  if (res && typeof res.setHeader === 'function') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', origin);
    if (allowCredentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cookie, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Vary', 'Origin');
    res.end();
    return;
  }

  const headers = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Cookie, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
  if (allowCredentials) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return new Response(null, {
    status: 204,
    headers
  });
}
