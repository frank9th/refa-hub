const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'js', 'templates');

const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(templatesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  content = content.replace(/#08172E/g, '${s.bgColor}');
  content = content.replace(/#D4AF37/g, '${s.accentColor}');
  content = content.replace(/REFA Season 2/g, '${s.eventName}');
  content = content.replace(/Season 2/g, '${s.season}');
  content = content.replace(/Words That Last/g, '${s.tagline}');
  
  fs.writeFileSync(filePath, content);
  console.log('Processed', file);
});
console.log('All templates updated.');
