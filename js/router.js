/**
 * REFA Section Router
 * Lazy-loads section HTML partials on demand.
 * Integrates with the existing goTo() function in app.js.
 */

const _sectionCache = {};
let _currentSection = null;

// Expose cache-clear so app.js can call it when the active event changes.
// This forces fresh HTML fetches, ensuring the next load re-runs _onSectionLoad
// with the correct event data rather than serving a stale cache.
window.clearSectionCache = function() {
  Object.keys(_sectionCache).forEach(k => delete _sectionCache[k]);
  _currentSection = null;
};

// Sections that now live in /sections/*.html partials.
// Keys match the bare IDs used in goTo() calls from the nav.
const SECTION_MAP = {
  'dashboard':   'dashboard',
  'timeline':    'dashboard',
  'tasks':       'dashboard',
  'voting':      'dashboard',
  'parents':     'dashboard',
  
  'operations':  'operations',
  'runsheet':    'operations',
  
  'finance':     'finance',
  'revenue':     'finance',
  'teams':       'finance',
  
  'social':      'social',
  
  'studio':      'studio',
  'sponsorship': 'studio',
  'countdown':   'studio',
  'letters':     'studio',
  'accounts':    'studio',
};

// Expose SECTION_MAP globally so app.js can resolve sub-section parent mappings
window.SECTION_MAP = SECTION_MAP;

async function loadSection(name) {
  const container = document.getElementById('section-content');
  if (!container) return;

  // Resolve the partial file name (sub-sections share a parent partial)
  const fileName = SECTION_MAP[name] || name;

  // If same partial already loaded, just fire the init hook (e.g. switching sub-tabs)
  if (_currentSection === fileName) {
    _afterSectionLoad(name);
    return;
  }
  _currentSection = fileName;

  // Show skeleton loader while fetching
  container.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;padding:60px 0;opacity:0.4;">
      <span style="font-size:13px;letter-spacing:1px;color:var(--text-muted,#888);">Loading...</span>
    </div>`;

  try {
    if (_sectionCache[fileName]) {
      container.innerHTML = _sectionCache[fileName];
      _afterSectionLoad(name);
      return;
    }

    let res = await fetch(`/sections/${fileName}.html`);
    if (!res.ok) {
      res = await fetch(`/sections/${fileName}`);
    }
    if (!res.ok) throw new Error(`Section not found: ${fileName} (status: ${res.status})`);
    const html = await res.text();
    _sectionCache[fileName] = html;
    container.innerHTML = html;
    _afterSectionLoad(name);
  } catch (err) {
    console.error('[Router] Failed to load section:', fileName, err);
    container.innerHTML = `<div style="padding:40px;text-align:center;color:#f87171;">
      Failed to load this section. Please refresh.
    </div>`;
  }
}

// Expose loadSection globally so app.js can trigger section loads directly
window.loadSection = loadSection;

let _appGoTo = null;

function _afterSectionLoad(name) {
  if (typeof window._onSectionLoad === 'function') {
    window._onSectionLoad(name);
  }

  if (typeof _appGoTo === 'function') {
    _appGoTo(name);
  } else {
    // Fallback UI activation if _appGoTo is not captured yet
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById('page-' + name);
    if (targetPage) targetPage.classList.add('active');

    document.querySelectorAll('.nav-item[id^="nav-"]').forEach(el => {
      const elId = el.id.replace('nav-', '');
      el.classList.toggle('active', elId === name);
    });
  }

  const main = document.getElementById('main');
  if (main) main.scrollTop = 0;
}

// Patch goTo AFTER DOMContentLoaded so app.js has already defined it.
// router.js loads before app.js in the <script> order, so we defer.
document.addEventListener('DOMContentLoaded', () => {
  _appGoTo = window.goTo; // capture app.js's goTo

  window.goTo = function(id) {
    if (Object.prototype.hasOwnProperty.call(SECTION_MAP, id)) {
      loadSection(id);
    } else if (typeof _appGoTo === 'function') {
      _appGoTo(id); // fall through for any ID not in the map
    }
  };

  // Load dashboard on first paint only if an event is active or not on bare base gateway
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const isBaseUrl = (pathname === '/' || pathname === '/index' || pathname === '/index.html' || pathname === '');
  const urlEventId = urlParams.get('event');

  if (!isBaseUrl || urlEventId) {
    loadSection('dashboard');
  }
});

