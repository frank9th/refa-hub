/* GRAPHICS STUDIO ENGINE v2.0 */

const SIZE_PRESETS = {
  'ig-post':   { w: 540, h: 540, label: 'IG Post', ratio: '1:1' },
  'ig-story':  { w: 540, h: 960, label: 'IG Story', ratio: '9:16' },
  'fb-cover':  { w: 820, h: 462, label: 'FB Cover', ratio: '16:9' },
  'a4-poster': { w: 620, h: 877, label: 'A4 Poster', ratio: 'A4' },
  'twitter':   { w: 600, h: 338, label: 'Twitter/X', ratio: '16:9' },
  'yt-thumb':  { w: 640, h: 360, label: 'YouTube', ratio: '16:9' },
  'wa-status': { w: 540, h: 960, label: 'WhatsApp', ratio: '9:16' },
};

const TEMPLATE_CATEGORIES = [
  { id: 'all', label: 'All Templates', icon: '✨' },
  { id: 'event', label: 'Event Promos', icon: '🔥' },
  { id: 'contestant', label: 'Contestant', icon: '🎽' },
  { id: 'voting', label: 'Voting', icon: '🗳️' },
  { id: 'social', label: 'Announcements', icon: '📱' },
  { id: 'people', label: 'People & Teams', icon: '👥' },
  { id: 'promo', label: 'Countdown', icon: '⏱️' },
];

const TEAM_COLORS = {
  'Eagles of Zion': '#1A3A8F',
  'Shields of David': '#991B1B',
  'Lions of Judah': '#B45309',
  'Rivers of Eden': '#065F46',
  'Flames of Elijah': '#C2410C',
  'Arrows of Jonathan': '#374151',
  'Stars of Abraham': '#6D28D9',
  'Swords of Gideon': '#78350F',
  'Doves of Solomon': '#0F766E',
  'Thunder of Sinai': '#111827'
};

let studioState = {
  templateId: 'stage-promo',
  sizePreset: 'ig-post',
  activeCategory: 'all',
  exportScale: 4,
  exportFormat: 'png',
  exportQuality: 92,
  name: 'David Solomon',
  team: 'Eagles of Zion',
  verse: 'Philippians 4:13',
  teamNumber: '4',
  votingLink: 'vote.refacontest.org/DS04',
  eventDate: 'Saturday, 9th August 2026',
  stage: 'Stage 1 — The Proving Ground',
  stageNum: '60',
  stageTime: '2',
  round: 'Round One',
  accentColor: '#D4AF37',
  bgColor: '#08172E',
  uploadedImg: null,
  logoImg: null,
  guestName: 'Warri Mama',
  guestRole: 'Special Guest Artist',
  hostName: 'MC Champion',
  hostTitle: 'Your Host',
  teamRole: 'Event Coordinator',
  crewRole: 'Camera Operator',
  btsCaption: 'Rehearsal Day — Backstage Moments',
  prizeFirst: '₦300,000',
  prizeSecond: '₦200,000',
  prizeThird: '₦100,000',
  location: 'Evidence Chapel, Assemblies of God Nigeria, Edjeba-Warri',
  broadcastLine: 'Watch Exclusively on REFA TV',
  leaderPosition: '1st',
  leaderTeam: 'Eagles of Zion',
  leaderVotes: '2,347',
  sponsorName: 'Your Brand Name',
  sponsorTier: 'Gold Partner',
  daysToGo: '15',
  contactPhone: '08069695021, 08035031968',
  contactEmail: 'refinersoffaithacademy@gmail.com',
};

window.TEMPLATES = window.TEMPLATES || [];
window.CONTROLS_CONFIG = window.CONTROLS_CONFIG || {};
window.RENDERERS = window.RENDERERS || {};

const TEMPLATES = window.TEMPLATES;
const CONTROLS_CONFIG = window.CONTROLS_CONFIG;
const RENDERERS = window.RENDERERS;
function renderCategoryTabs() {
  const container = document.getElementById('studio-cats');
  if(!container) return;
  container.innerHTML = TEMPLATE_CATEGORIES.map(cat => 
    `<div class="studio-cat ${studioState.activeCategory === cat.id ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
      ${cat.icon} ${cat.label}
    </div>`
  ).join('');
}

function renderTemplatePicker() {
  const container = document.getElementById('studio-gallery');
  if(!container) return;
  
  const filtered = studioState.activeCategory === 'all' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.cat === studioState.activeCategory);
    
  container.innerHTML = filtered.map(t => 
    `<div class="tmpl-card ${studioState.templateId === t.id ? 'active' : ''}" onclick="selectTemplate('${t.id}')" title="${t.desc}">
      <div class="tmpl-card-preview" style="background:${t.thumbBg}">
        ${t.emoji}
      </div>
      <div class="tmpl-card-info">
        <div class="name">${t.label}</div>
        <div class="desc">${t.desc}</div>
      </div>
    </div>`
  ).join('');
}

function renderControlsPanel() {
  const container = document.getElementById('controls-body');
  const title = document.getElementById('controls-title');
  if(!container || !title) return;
  
  const tmpl = TEMPLATES.find(t => t.id === studioState.templateId);
  if(tmpl) title.innerText = tmpl.label;
  
  const config = CONTROLS_CONFIG[studioState.templateId] || [];
  
  container.innerHTML = config.map(ctrl => {
    if(ctrl.type === 'section') {
      return `<div class="ctrl-section">${ctrl.label}</div>`;
    }
    
    if(ctrl.type === 'text') {
      return `
        <div class="ctrl-group">
          <label>${ctrl.label}</label>
          <input type="text" class="ctrl-input" value="${studioState[ctrl.id] || ''}" oninput="studioState['${ctrl.id}'] = this.value; updateStudio();">
        </div>
      `;
    }
    
    if(ctrl.type === 'select') {
      const opts = ctrl.opts.map(o => `<option value="${o}" ${studioState[ctrl.id] === o ? 'selected' : ''}>${o}</option>`).join('');
      return `
        <div class="ctrl-group">
          <label>${ctrl.label}</label>
          <select class="ctrl-input" onchange="studioState['${ctrl.id}'] = this.value; updateStudio();">
            ${opts}
          </select>
        </div>
      `;
    }
    
    if(ctrl.type === 'color') {
      return `
        <div class="ctrl-group">
          <label>${ctrl.label}</label>
          <div style="display:flex;align-items:center;gap:10px;">
            <input type="color" class="ctrl-color" value="${studioState[ctrl.id]}" oninput="studioState['${ctrl.id}'] = this.value; updateStudio();">
            <input type="text" class="ctrl-input" value="${studioState[ctrl.id]}" oninput="studioState['${ctrl.id}'] = this.value; updateStudio();" style="flex:1;">
          </div>
        </div>
      `;
    }
    
    if(ctrl.type === 'image') {
      return `
        <div class="ctrl-group">
          <label>${ctrl.label}</label>
          <input type="file" accept="image/*" class="ctrl-input" style="padding:6px;" onchange="loadStudioImage(this, '${ctrl.id}')">
          ${studioState[ctrl.id] ? `<div style="font-size:11px;margin-top:4px;color:green;">Image loaded. <a href="#" onclick="studioState['${ctrl.id}'] = null; renderControlsPanel(); updateStudio(); return false;" style="color:#d44;">Remove</a></div>` : ''}
        </div>
      `;
    }
    
    return '';
  }).join('');
}

function loadStudioImage(input, stateKey) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      studioState[stateKey] = e.target.result;
      renderControlsPanel();
      updateStudio();
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function renderSizePicker() {
  const container = document.getElementById('size-picker');
  if(!container) return;
  
  container.innerHTML = Object.keys(SIZE_PRESETS).map(key => {
    const s = SIZE_PRESETS[key];
    return `<div class="size-opt ${studioState.sizePreset === key ? 'active' : ''}" onclick="selectSize('${key}')">
      ${s.label} <span style="font-size:10px;opacity:0.6;display:block;">${s.ratio}</span>
    </div>`;
  }).join('');
}

function selectCategory(cat) {
  studioState.activeCategory = cat;
  renderCategoryTabs();
  renderTemplatePicker();
}

function selectTemplate(id) {
  studioState.templateId = id;
  renderTemplatePicker();
  renderControlsPanel();
  updateStudio();
}

function selectSize(preset) {
  studioState.sizePreset = preset;
  renderSizePicker();
  updateExportLabel();
  updateStudio();
}

function updateExportLabel() {
  const size = SIZE_PRESETS[studioState.sizePreset];
  const el = document.getElementById('export-size-label');
  if(el && size) {
    const scale = parseInt(document.getElementById('export-scale')?.value || studioState.exportScale);
    el.innerText = `Final Size: ${size.w * scale} × ${size.h * scale}px`;
  }
}

function renderCanvas() {
  const canvas = document.getElementById('graphic-canvas');
  if(!canvas) return;
  
  const preset = SIZE_PRESETS[studioState.sizePreset];
  if(!preset) return;
  
  const { w, h } = preset;
  const renderer = RENDERERS[studioState.templateId];
  if(!renderer) {
    canvas.innerHTML = '<div style="padding:20px;color:red;">Renderer not found</div>';
    return;
  }
  
  const s = studioState;
  const gold = s.accentColor;
  const bg = s.bgColor;
  const tc = TEAM_COLORS[s.team] || '#333';
  
  canvas.innerHTML = renderer(w, h, s, gold, bg, tc, s.uploadedImg, s.logoImg);
  
  const dimLabel = document.getElementById('canvas-dimensions-label');
  if(dimLabel) dimLabel.innerText = `${w} × ${h}px`;
}

function exportGraphic() {
  const canvas = document.getElementById('graphic-canvas');
  if(!canvas) return;
  
  const formatSel = document.getElementById('export-format');
  const scaleSel = document.getElementById('export-scale');
  const qualInp = document.getElementById('quality-val');
  
  const format = formatSel ? formatSel.value : 'png';
  const scale = scaleSel ? parseInt(scaleSel.value) : 4;
  const quality = qualInp ? (parseInt(qualInp.innerText)/100) : 0.92;
  
  if(typeof html2canvas === 'undefined') {
    alert('html2canvas library is not loaded!');
    return;
  }
  
  const originalTransform = canvas.style.transform;
  canvas.style.transform = 'none';
  
  html2canvas(canvas.firstElementChild, {
    scale: scale,
    useCORS: true,
    backgroundColor: null,
    logging: false
  }).then(c => {
    canvas.style.transform = originalTransform;
    const url = format === 'jpeg' ? c.toDataURL('image/jpeg', quality) : c.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `refa-${studioState.templateId}-${Date.now()}.${format}`;
    a.click();
  }).catch(err => {
    canvas.style.transform = originalTransform;
    console.error(err);
    alert('Error exporting graphic: ' + err.message);
  });
}

function updateStudio() {
  renderCanvas();
}

function initStudio() {
  const formatSel = document.getElementById('export-format');
  const scaleSel = document.getElementById('export-scale');
  const qualGroup = document.getElementById('quality-group');
  
  if(formatSel) {
    formatSel.addEventListener('change', (e) => {
      studioState.exportFormat = e.target.value;
      if(qualGroup) qualGroup.style.display = e.target.value === 'jpeg' ? 'block' : 'none';
    });
  }
  
  if(scaleSel) {
    scaleSel.addEventListener('change', (e) => {
      studioState.exportScale = parseInt(e.target.value);
      updateExportLabel();
    });
  }
  
  renderCategoryTabs();
  renderTemplatePicker();
  renderControlsPanel();
  renderSizePicker();
  updateExportLabel();
  renderCanvas();
}

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initStudio);
} else {
  initStudio();
}

