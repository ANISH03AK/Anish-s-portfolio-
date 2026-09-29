const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=UTF-8',
  '.pdf': 'application/pdf'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url);

  // Endpoint to permanently save user profile photo to disk (profile.jpg)
  if (req.method === 'POST' && (parsedUrl.pathname === '/api/save-profile-photo' || parsedUrl.pathname === '/api/upload-photo')) {
    const body = [];
    req.on('data', chunk => body.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(body).toString();
        const json = JSON.parse(raw);
        if (json.imageBase64) {
          const base64Data = json.imageBase64.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');
          
          // Write to project root profile.jpg
          const rootProfilePath = path.join(__dirname, 'profile.jpg');
          fs.writeFileSync(rootProfilePath, buffer);

          // Also write to dist/profile.jpg if dist exists
          const distProfilePath = path.join(__dirname, 'dist', 'profile.jpg');
          if (fs.existsSync(path.join(__dirname, 'dist'))) {
            fs.writeFileSync(distProfilePath, buffer);
          }

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Saved as permanent profile.jpg file on disk' }));
          return;
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
        return;
      }
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'No image data provided' }));
    });
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }
  let pathname = decodeURIComponent(parsedUrl.pathname || '/');

  // Root path serves index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }

  let filePath = path.join(__dirname, pathname);

  // If requested file does not exist directly, check dist/ directory or app.js alias
  if (!fs.existsSync(filePath)) {
    if (pathname === '/app.js' && fs.existsSync(path.join(__dirname, 'dist', 'app.js'))) {
      filePath = path.join(__dirname, 'dist', 'app.js');
    } else {
      const distCandidate = path.join(__dirname, 'dist', pathname);
      if (fs.existsSync(distCandidate)) {
        filePath = distCandidate;
      }
    }
  }

  // Security check to avoid path traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Cache-Control': 'no-cache'
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const stream = fs.createReadStream(filePath);
      stream.on('error', (streamErr) => {
        console.error('Stream error:', streamErr);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        }
      });
      stream.pipe(res);
      return;
    }

    // SPA fallback: If requesting HTML or route path that doesn't exist as a static asset
    const indexPath = path.join(__dirname, 'index.html');
    fs.stat(indexPath, (indexErr, indexStats) => {
      if (!indexErr && indexStats.isFile()) {
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=UTF-8',
          'Content-Length': indexStats.size,
          'Cache-Control': 'no-cache'
        });
        if (req.method === 'HEAD') {
          res.end();
          return;
        }
        fs.createReadStream(indexPath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      }
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
