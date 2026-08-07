require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = 3000;

// Ensure uploads directory exists (use /tmp on Vercel serverless)
const UPLOADS_DIR = process.env.VERCEL ? '/tmp/uploads' : path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  } catch (e) {
    console.error("Warning: Could not create uploads directory (expected in serverless):", e.message);
  }
}

// Helper: Determine file category from extension
function getFileCategory(filename) {
  const ext = path.extname(filename).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.tiff'].includes(ext)) {
    return 'image';
  }
  if (['.mp4', '.mov', '.avi', '.mkv', '.webm', '.m4v', '.3gp'].includes(ext)) {
    return 'video';
  }
  if (['.mp3', '.wav', '.m4a', '.aac', '.ogg', '.flac'].includes(ext)) {
    return 'audio';
  }
  if (['.pdf', '.doc', '.docx', '.txt', '.zip', '.rar', '.7z', '.psd', '.ai'].includes(ext)) {
    return 'document';
  }
  return 'other';
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    // Clean up original filename & add unique timestamp prefix
    const cleanOriginal = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    cb(null, uniqueSuffix + '-' + cleanOriginal);
  }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// ── Clean URL middleware ───────────────────────────────────────────────────────
// Matches Vercel/Firebase cleanUrls behaviour locally:
// /register → register.html, /events → events.html, etc.
app.use((req, res, next) => {
  // Only handle extensionless paths (skip /api/*, assets, etc.)
  if (!req.path.includes('.') && req.path !== '/' && !req.path.startsWith('/api')) {
    const htmlFile = path.join(__dirname, req.path + '.html');
    if (fs.existsSync(htmlFile)) return res.sendFile(htmlFile);
    // Also try index.html inside a matching directory
    const dirIndex = path.join(__dirname, req.path, 'index.html');
    if (fs.existsSync(dirIndex)) return res.sendFile(dirIndex);
  }
  next();
});

// Mount AI Handlers
const chatHandler = require('./api/chat.js');
const previewStrategyHandler = require('./api/preview-strategy.js');
const generateEventStrategyHandler = require('./api/generate-event-strategy.js');
const refineStrategyHandler = require('./api/refine-strategy.js');

app.post('/api/chat', chatHandler);
app.options('/api/chat', chatHandler);

app.post('/api/preview-strategy', previewStrategyHandler);
app.options('/api/preview-strategy', previewStrategyHandler);

app.post('/api/generate-event-strategy', generateEventStrategyHandler);
app.options('/api/generate-event-strategy', generateEventStrategyHandler);

app.post('/api/refine-strategy', refineStrategyHandler);
app.options('/api/refine-strategy', refineStrategyHandler);

// Serve the uploads directory so files can be viewed and downloaded
app.use('/uploads', express.static(UPLOADS_DIR));

// API Endpoint: Upload a file
app.post('/api/upload', upload.single('mediaFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  
  const uploaderName = req.body.uploaderName || 'Anonymous';
  
  res.json({
    message: 'File uploaded successfully',
    file: req.file.filename,
    uploader: uploaderName
  });
});

// API Endpoint: Proxy to Showtime backend (bypasses browser CORS)
app.all('/api/showtime-proxy', async (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { action, payload, apiUrl, apiKey } = req.body || {};
  
  if (!apiUrl) {
    return res.status(400).json({ error: 'Missing apiUrl in request' });
  }

  let endpoint = apiUrl.replace(/\/$/, '');
  
  let method = 'POST';
  if (action === 'createChannel') {
    endpoint += '/api/v/chanel/create/';
  } else if (action === 'updateMember') {
    endpoint += `/api/v/chanel/${payload.pk}/contestant/update/`;
    method = 'PUT';
  } else if (action === 'updateChannel') {
    endpoint += `/api/v/chanel/${payload.pk}/update/`;
    method = 'PUT';
  } else if (action === 'addMember') {
    endpoint += `/api/v/chanel/${payload.pk}/add_contestant/`;
  } else if (action === 'getChannel' || action === 'testConnection') {
    endpoint += `/api/v/chanel/${payload?.pk || 3}/`;
    method = 'GET';
  } else if (action === 'fetchContestants') {
    endpoint += `/api/v/chanel/${payload?.pk || 3}/contestant/`;
    method = 'GET';
  } else if (action === 'fetchTickets') {
    endpoint += `/api/v/chanel/${payload?.pk || 3}/ticket/`;
    method = 'GET';
  } else if (action === 'verifyHandoff') {
    endpoint += '/api/v/handoff/verify/';
  } else if (action === 'findChannel') {
    const params = new URLSearchParams();
    if (payload.rafa_event_id) params.append('rafa_event_id', payload.rafa_event_id);
    if (payload.slug) params.append('slug', payload.slug);
    if (payload.name) params.append('name', payload.name);
    endpoint += `/api/v/chanel/find/?${params.toString()}`;
    method = 'GET';
  } else if (action === 'testCustom') {
    endpoint += payload.path;
    method = 'GET';
  } else {
    return res.status(400).json({ error: `Unknown action: ${action}` });
  }

  // Abort the upstream request after 8 s so the client gets a clean error
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const fetchOptions = {
      method,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Api-Key ${apiKey}`,
        'X-Api-Key': apiKey
      }
    };
    if (method === 'POST') {
      fetchOptions.body = JSON.stringify(action === 'createChannel' ? payload : (payload.data || payload));
    }

    const showtimeRes = await fetch(endpoint, fetchOptions);
    clearTimeout(timeoutId);

    // If showtime doesn't return JSON for a 404/500, handle gracefully
    const contentType = showtimeRes.headers.get('content-type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await showtimeRes.json();
    } else {
      data = { text: await showtimeRes.text() };
    }

    if (!showtimeRes.ok) {
      return res.status(showtimeRes.status).json(data);
    }

    return res.json(data);
  } catch (err) {
    clearTimeout(timeoutId);

    // Classify the error so the client dashboard can show a clear message
    const isTimeout = err.name === 'AbortError'
      || (err.cause && err.cause.code === 'UND_ERR_CONNECT_TIMEOUT')
      || (err.message && err.message.includes('Connect Timeout'));

    const isNetworkError = !isTimeout && (
      (err.cause && ['ECONNREFUSED', 'ENOTFOUND', 'ECONNRESET'].includes(err.cause.code))
      || err.name === 'TypeError'
    );

    let friendlyMessage;
    if (isTimeout) {
      friendlyMessage = `Connection to Showtime API timed out after 8 seconds. The remote server at ${apiUrl} may be down or unreachable. Check the API URL in Settings and ensure the server is running.`;
    } else if (isNetworkError) {
      const code = err.cause?.code || 'NETWORK_ERROR';
      friendlyMessage = `Could not reach Showtime API (${code}). The server at ${apiUrl} is unreachable. Check your network and the API URL in Settings.`;
    } else {
      friendlyMessage = err.message || 'Unexpected proxy error';
    }

    console.error('[Showtime Proxy] Error:', err.message, err.cause?.code || '');
    return res.status(503).json({ error: friendlyMessage, code: err.cause?.code || err.name });
  }
});

// API Endpoint: Get host network endpoints for Connection Guide
app.get('/api/endpoints', (req, res) => {
  const networkInterfaces = os.networkInterfaces();
  const endpoints = [];
  
  endpoints.push({
    name: 'Localhost (This Computer)',
    ip: '127.0.0.1',
    url: `http://localhost:${PORT}`
  });

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        endpoints.push({
          name: interfaceName,
          ip: iface.address,
          url: `http://${iface.address}:${PORT}`
        });
      }
    }
  }

  res.json({
    port: PORT,
    hostname: os.hostname(),
    endpoints: endpoints,
    smbPath: `\\\\${os.hostname()}\\uploads`
  });
});

// API Endpoint: List all uploaded files with rich metadata
app.get('/api/files', (req, res) => {
  fs.readdir(UPLOADS_DIR, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read uploads directory' });
    }

    const fileDetails = files.map(file => {
      const filePath = path.join(UPLOADS_DIR, file);
      let stats;
      try {
        stats = fs.statSync(filePath);
      } catch (e) {
        return null;
      }
      
      if (!stats.isFile()) return null;

      // Extract original display name by removing timestamp prefix if present
      let displayName = file;
      const parts = file.split('-');
      if (parts.length > 2 && !isNaN(parts[0])) {
        displayName = parts.slice(2).join('-');
      }

      // Calculate file size in MB or KB
      let sizeStr = '';
      if (stats.size >= 1024 * 1024) {
        sizeStr = (stats.size / (1024 * 1024)).toFixed(2) + ' MB';
      } else {
        sizeStr = (stats.size / 1024).toFixed(1) + ' KB';
      }
      
      const category = getFileCategory(file);

      return {
        name: file,
        displayName: displayName,
        size: sizeStr,
        bytes: stats.size,
        category: category,
        url: `/uploads/${encodeURIComponent(file)}`,
        uploadTime: stats.mtime
      };
    }).filter(Boolean);
    
    // Sort by newest first
    fileDetails.sort((a, b) => new Date(b.uploadTime) - new Date(a.uploadTime));

    res.json(fileDetails);
  });
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==============================================`);
  console.log(`🚀 REFA Local Network Drop Server Running!`);
  console.log(`==============================================\n`);
  console.log(`You can access the dashboard on this computer at:`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`\nTo allow other devices to upload files without internet,`);
  console.log(`have them connect to the same Wi-Fi router and go to:\n`);
  
  // Get and print local IP addresses
  const networkInterfaces = os.networkInterfaces();
  const ipList = [];
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`  👉 http://${iface.address}:${PORT}`);
        ipList.push(iface.address);
      }
    }
  }
  console.log(`\nUploaded files directory: ${UPLOADS_DIR}`);
  console.log(`Local SMB Network Path: \\\\${os.hostname()}\\uploads or \\\\${ipList[0] || 'localhost'}\\uploads`);
  console.log(`==============================================\n`);
});
