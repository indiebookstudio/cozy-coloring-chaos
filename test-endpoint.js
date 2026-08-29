/**
 * ============================================================================
 * COZY COLORING CHAOS - ENDPOINT & SECURITY TEST SUITE (Edge Compatible)
 * ============================================================================
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3099;
process.env.PORT = PORT.toString();

import handler from './api/send-free-sample.js';

function makeRequest({ method, path, headers = {}, body = null }) {
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      },
      (res) => {
        let raw = '';
        res.on('data', chunk => { raw += chunk; });
        res.on('end', () => {
          let json = null;
          try { json = JSON.parse(raw); } catch (e) {}
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: raw,
            json: json
          });
        });
      }
    );
    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting Cozy Coloring Chaos Test Suite (Edge Runtime)...\n');

  const server = http.createServer(async (req, res) => {
    if (req.url === '/api/send-free-sample') {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();

      const edgeReq = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') ? undefined : raw
      });

      const edgeRes = await handler(edgeReq);
      res.statusCode = edgeRes.status;
      edgeRes.headers.forEach((v, k) => res.setHeader(k, v));
      const resBody = await edgeRes.text();
      res.end(resBody);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`📡 Test server running on http://127.0.0.1:${PORT}\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name} ${details ? '- ' + details : ''}`);
      failed++;
    }
  }

  try {
    console.log('--- Test 1: Method validation ---');
    const resGet = await makeRequest({ method: 'GET', path: '/api/send-free-sample' });
    assert(resGet.statusCode === 405, 'GET request rejected with HTTP 405', `Got ${resGet.statusCode}`);
    assert(resGet.json && resGet.json.success === false, 'GET response includes success: false');

    console.log('\n--- Test 2: Email validation ---');
    const resInvalidEmail = await makeRequest({
      method: 'POST',
      path: '/api/send-free-sample',
      body: { email: 'abc', firstName: 'Mario', lastName: 'Rossi', bookId: 'impossible-worlds' }
    });
    assert(resInvalidEmail.statusCode === 400, 'Invalid email rejected with HTTP 400', `Got ${resInvalidEmail.statusCode}`);
    assert(resInvalidEmail.json && resInvalidEmail.json.success === false, 'Invalid email returns success: false');

    console.log('\n--- Test 3: Anti-Spam Honeypot ---');
    const resHoneypot = await makeRequest({
      method: 'POST',
      path: '/api/send-free-sample',
      body: { 
        email: 'spammer@bot.com', 
        firstName: 'Bot', 
        lastName: 'Spam',
        website_hp: 'http://spam-link.com' 
      }
    });
    assert(resHoneypot.statusCode === 200, 'Honeypot returns HTTP 200 to fool bot', `Got ${resHoneypot.statusCode}`);
    assert(resHoneypot.json && resHoneypot.json.success === true, 'Honeypot returns success: true without sending');

    console.log('\n--- Test 4: Missing API Key Error Handling ---');
    const originalKey = process.env.BREVO_API_KEY;
    delete process.env.BREVO_API_KEY;
    const resNoKey = await makeRequest({
      method: 'POST',
      path: '/api/send-free-sample',
      body: { email: 'valid@example.com', firstName: 'Mario', lastName: 'Rossi', bookId: 'impossible-worlds' }
    });
    assert(resNoKey.statusCode === 500, 'Missing key returns HTTP 500', `Got ${resNoKey.statusCode}`);
    assert(resNoKey.json && resNoKey.json.success === false, 'Missing key returns success: false');
    process.env.BREVO_API_KEY = originalKey;

    console.log('\n--- Test 5: Frontend Security Scan ---');
    const filesToAudit = ['index.html', 'script.js', 'style.css'];
    let securityClean = true;
    for (const f of filesToAudit) {
      const fullPath = path.join(__dirname, f);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        if (content.includes('xkeysib-') || content.includes('eGtleXNpYi0')) {
          console.error(`🚨 Security Alert: Found exposed Brevo key pattern in ${f}!`);
          securityClean = false;
        }
      }
    }
    assert(securityClean, 'No Brevo API keys or Base64 keys found in frontend files');

    console.log('\n--- Test 6: CORS Policy ---');
    const resCors = await makeRequest({
      method: 'OPTIONS',
      path: '/api/send-free-sample',
      headers: { 'Origin': 'https://indiebookstudio.github.io' }
    });
    assert(resCors.statusCode === 204, 'Preflight OPTIONS returns HTTP 204', `Got ${resCors.statusCode}`);
    assert(resCors.headers['access-control-allow-origin'] === '*', 'CORS wildcard or origin allowed');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
  }

  console.log('\n====================================================');
  console.log(`📊 TEST RESULTS: ${passed} passed, ${failed} failed`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
