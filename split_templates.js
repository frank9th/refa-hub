const fs = require('fs');

const code = fs.readFileSync('./js/studio.js', 'utf8');

// Stub out browser globals
const stub = `
const document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: () => null
};
const window = {};
`;

// Run the engine code in this context
const evalCode = stub + code + '\n\nglobal.TEMPLATES = TEMPLATES;\nglobal.CONTROLS_CONFIG = CONTROLS_CONFIG;\nglobal.RENDERERS = RENDERERS;';
eval(evalCode);

fs.mkdirSync('./js/templates', { recursive: true });

for (const t of global.TEMPLATES) {
  const id = t.id;
  const config = global.CONTROLS_CONFIG[id];
  const renderer = global.RENDERERS[id];
  
  const content = `// Template: ${t.label}
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push(${JSON.stringify(t, null, 2)});
window.CONTROLS_CONFIG['${id}'] = ${JSON.stringify(config, null, 2)};
window.RENDERERS['${id}'] = ${renderer.toString()};
`;
  
  fs.writeFileSync('./js/templates/' + id + '.js', content);
  console.log('Wrote ' + id + '.js');
}
