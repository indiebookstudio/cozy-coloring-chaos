/**
 * ============================================================================
 * COZY COLORING CHAOS - LOCAL DEVELOPMENT SERVER (ESM + Edge Adapter)
 * ============================================================================
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Simple .env parser for local environment
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        let val = trimmed.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    });
    console.log('✅ Loaded environment variables from .env');
  } else {
    console.log('ℹ️ No .env file found. Using default environment.');
  }
}

loadEnv();

const PORT = parseInt(process.env.PORT || '3000', 10);
import apiHandler from './api/send-free-sample.js';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. Route API endpoint (Edge Function adapter)
  if (pathname === '/api/send-free-sample') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const rawBody = Buffer.concat(chunks).toString();

      const edgeReq = new Request(`http://${req.headers.host || 'localhost'}${req.url}`, {
        method: req.method,
        headers: req.headers,
        body: (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') ? undefined : rawBody
      });

      const edgeRes = await apiHandler(edgeReq);
      res.statusCode = edgeRes.status;
      edgeRes.headers.forEach((v, k) => res.setHeader(k, v));
      const resBody = await edgeRes.text();
      res.end(resBody);
    } catch (err) {
      console.error('API Error:', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Internal Server Error' }));
      }
    }
    return;
  }

  // 2. Route Static Files
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  if (!filePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<h1>404 Not Found</h1>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🎨 Cozy Coloring Chaos local server running at:`);
  console.log(`👉 http://localhost:${PORT}`);
  console.log(`📧 Serverless API mounted at: http://localhost:${PORT}/api/send-free-sample`);
  console.log(`🔑 BREVO_API_KEY status: ${process.env.BREVO_API_KEY ? 'Configured ✅' : 'Missing ⚠️'}`);
  console.log('====================================================');
});

export default server;
