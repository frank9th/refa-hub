require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = 3000;

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
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
