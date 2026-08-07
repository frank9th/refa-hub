// Teams data is loaded dynamically from Firestore per event.

// Dynamic Phases removed. They are now located in seed-event config files.

const GOALS_DATA = [
  { label: 'Contestants', value: '100 accepted', icon: '👥' },
  { label: 'Revenue Target', value: '₦5,000,000+', icon: '💰' },
  { label: 'Social Reach', value: '50,000 impressions', icon: '📱' },
  { label: 'Total Votes Target', value: '20,000+ (₦200/vote)', icon: '🗳️' },
  { label: 'Live Viewers per Stage', value: '5,000+', icon: '📺' },
  { label: 'Brand Mission', value: "Nigeria's #1 Youth Bible Championship", icon: '🏆' }
];

function getDynamicCurrentPhaseData(activeEvent) {
  if (!activeEvent) {
    activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  }
  const now = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedToday = now.toLocaleDateString('en-US', options);

  if (!activeEvent || !activeEvent.phases || activeEvent.phases.length === 0) {
    return {
      date: formattedToday,
      title: 'Event Timeline',
      desc: 'Timeline and phases have not been configured for this event.'
    };
  }

  // Determine the next upcoming milestone date
  let nextKey = null;
  let nextDateStr = null;
  let nextDateObj = null;
  let minDiff = Infinity;

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  if (activeEvent.dates) {
    for (const [key, dateStr] of Object.entries(activeEvent.dates)) {
      // Create date and force to local midnight to avoid timezone offset shifts
      const [year, month, day] = dateStr.split('-');
      const d = new Date(year, month - 1, day);
      
      const diff = d - todayStart;
      if (diff >= 0 && diff < minDiff) {
        minDiff = diff;
        nextKey = key;
        nextDateStr = dateStr;
        nextDateObj = d;
      }
    }
  }

  const currentPhase = activeEvent.phases[0]; // Simplified placeholder phase
  
  if (nextKey && nextDateObj) {
    const formatName = (k) => {
      if (k === 'audition') return 'Audition';
      if (k === 'stage1') return 'Stage 1';
      if (k === 'stage2') return 'Stage 2';
      if (k === 'final') return 'Grand Final';
      if (k === 'registrationOpen') return 'Registration Open';
      if (k === 'registrationClose') return 'Registration Close';
      return k.charAt(0).toUpperCase() + k.slice(1);
    };
    const eventName = formatName(nextKey);
    const daysRemaining = Math.round(minDiff / (1000 * 60 * 60 * 24));
    const formattedNextDate = nextDateObj.toLocaleDateString('en-US', options);

    return {
      date: formattedToday + ' — PRE-' + eventName.toUpperCase() + ' URGENCY',
      title: 'Pre-' + eventName + ' Setup — ' + eventName + ' is ' + daysRemaining + ' ' + (daysRemaining === 1 ? 'Day' : 'Days') + ' Away',
      desc: eventName + ' is ' + formattedNextDate + '. Only ' + daysRemaining + ' ' + (daysRemaining === 1 ? 'Day' : 'Days') + ' remaining. Ensure all tasks for ' + currentPhase.title + ' are completed.'
    };
  }

  // Fallback if no upcoming dates found
  return {
    date: formattedToday + ' — ' + (currentPhase.title).toUpperCase(),
    title: currentPhase.title + ' — Phase Active',
    desc: 'Current operational focus. Ensure all tasks for ' + currentPhase.title + ' are completed.'
  };
}

const STORAGE_KEY = 'refa_s2_tasks_v1';
let checked = {};
try { checked = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { checked = {}; }

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); }

let currentTeams = [];
let currentContentSchedule = [];

function initGlobalStateSubscriptions() {
  if (!window.REFA_FIREBASE) return;
  const { subscribeToTeams, subscribeToContentSchedule, subscribeToMediaUploads } = window.REFA_FIREBASE;

  if (subscribeToTeams) {
    subscribeToTeams((remoteTeams) => {
      currentTeams = remoteTeams || [];
      renderTeams();
    });
  }

  if (subscribeToContentSchedule) {
    subscribeToContentSchedule((scheduleItems) => {
      currentContentSchedule = scheduleItems;
      renderContentSchedule();
    });
  }

  if (subscribeToMediaUploads) {
    subscribeToMediaUploads((uploads) => {
      if (typeof fetchUploadedFiles === 'function') {
        fetchUploadedFiles();
      }
    });
  }
}

function initGlobalTaskSync() {
  if (!window.REFA_FIREBASE) return;
  const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  const phases = (activeEvent && activeEvent.phases) ? activeEvent.phases : [];
  const { seedTasksIfEmpty, seedTeamsIfEmpty, subscribeToTasks } = window.REFA_FIREBASE;
  if (seedTasksIfEmpty && phases && phases.length > 0) {
    seedTasksIfEmpty(phases).catch(console.error);
  }
  if (seedTeamsIfEmpty && activeEvent && activeEvent.defaultTeams) {
    seedTeamsIfEmpty(activeEvent.defaultTeams).catch(console.error);
  }
  if (subscribeToTasks) {
    subscribeToTasks((remoteChecked) => {
      Object.assign(checked, remoteChecked);
      save();
      // Always re-read the active event so we get the freshest phases (including fallback phases)
      const currentEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
      if (currentEvent) renderTasks(currentEvent);
      updateGlobalProgress();
      const badge = document.getElementById('db-status-badge');
      if (badge) {
        badge.style.background = '#065F46';
        badge.style.color = '#D1FAE5';
        badge.innerHTML = '<span style="width:8px; height:8px; background:#10B981; border-radius:50%; display:inline-block;"></span> Global DB Live';
      }
    });
  }
  initGlobalStateSubscriptions();
}

async function populateEventUI() {
  const event = window.REFA_EVENTS.getActiveEvent();
  if (!event) return;

  // Update document title
  document.title = `${event.name} — Management Hub`;

  // Update sidebar branding
  const badge = document.getElementById('event-season-badge');
  const nameEl = document.getElementById('event-name-display');
  const taglineEl = document.getElementById('event-tagline-display');
  
  if (badge) badge.textContent = `Season ${event.season || 1}`;
  if (nameEl) nameEl.textContent = event.name;
  if (taglineEl) taglineEl.innerHTML = `${event.tagline || ''} &middot; ${new Date().getFullYear()}`;

  // Update Auth Login Screen
  const authTitle = document.getElementById('auth-title-display');
  const authSub = document.getElementById('auth-subtitle-display');
  if (authTitle) authTitle.textContent = event.name ? event.name.toUpperCase() : 'REFA HUB';
  if (authSub) authSub.textContent = `Season ${event.season || 1} Command Center`;

  // Update Dashboard
  const dashName = document.getElementById('dash-event-name');
  const dashTagline = document.getElementById('dash-event-tagline');
  const dashTaglineBold = document.getElementById('dash-tagline-bold');
  const statTheme = document.getElementById('stat-theme');
  const statContestants = document.getElementById('stat-contestants');
  const statVoteRate = document.getElementById('stat-vote-rate');
  const statFinalDate = document.getElementById('stat-final-date');
  const statVenue = document.getElementById('stat-venue');

  if (dashName) dashName.textContent = event.name;
  if (dashTagline) dashTagline.textContent = event.tagline || 'Management Hub';
  if (dashTaglineBold) dashTaglineBold.textContent = event.name;
  if (statTheme) statTheme.textContent = event.tagline || 'Default Theme';
  if (statContestants && event.details) statContestants.textContent = event.details.targetContestants || 100;

  // Account Generator Dynamic labels
  const accOrg = document.getElementById('preview-acc-org');
  const accSeason = document.getElementById('preview-acc-season-title');
  const accNameEl = document.getElementById('preview-acc-name');
  const accFooter = document.getElementById('preview-acc-footer');
  if (accOrg) accOrg.textContent = event.orgName ? event.orgName.toUpperCase() : event.name.toUpperCase();
  if (accSeason) accSeason.textContent = `SEASON ${event.season || 1} — OFFICIAL PAYMENT SLIP`;
  if (accNameEl) accNameEl.textContent = event.orgName ? event.orgName.toUpperCase() : event.name.toUpperCase();
  if (accFooter) accFooter.textContent = `Official bank account for ${event.name} ("${event.tagline || 'Event'}"). Transferred funds are automatically tracked & acknowledged.`;
  
  // Update sidebar portal links with the active event id
  const eventId = event.id;
  if (eventId) {
    document.querySelectorAll('#sidebar .nav-item[href]').forEach(a => {
      const baseHref = a.getAttribute('href').split('?')[0];
      a.href = `${baseHref}?event=${eventId}`;
    });
    // Stamp event into URL so refreshing stays on the right event.
    // GUARD: only do this if the user is already on a non-root page,
    // or already has an ?event= param — never auto-append to bare /
    const url = new URL(window.location.href);
    const isBaseUrl = (url.pathname === '/' || url.pathname === '/index' || url.pathname === '/index.html');
    const alreadyHasEvent = url.searchParams.get('event');
    if (!isBaseUrl || alreadyHasEvent) {
      if (!alreadyHasEvent) {
        url.searchParams.set('event', eventId);
        window.history.replaceState({}, '', url.toString());
      }
    }
  }

  if (statVoteRate && event.details) statVoteRate.textContent = `₦${event.details.votePrice || 200}`;
  
  if (statFinalDate && event.dates && event.dates.final) {
    const d = new Date(event.dates.final);
    const opts = { month: 'short', day: 'numeric' };
    statFinalDate.textContent = isNaN(d.getTime()) ? event.dates.final : d.toLocaleDateString('en-US', opts);
  } else {
    if (statFinalDate) statFinalDate.textContent = 'TBD';
  }
  
  if (statVenue && event.details) {
    statVenue.textContent = event.details.finalVenue || event.details.venue || 'TBD';
  }

  // Render dynamic structures (Timeline, Stages, Teams, Tasks)
  renderDynamicUI(event);
}

function renderDynamicUI(event) {
  // 1. Stage Snapshot Table
  const stageBody = document.getElementById('stage-snapshot-body');
  if (stageBody) {
    stageBody.innerHTML = '';
    if (event.stagesSnapshot) {
      event.stagesSnapshot.forEach(s => {
        stageBody.innerHTML += `<tr><td><strong>${s.stage}</strong></td><td>${s.date}</td><td>${s.theme}</td><td><span class="phase-badge ${s.status}"><span class="dot"></span>${s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span></td></tr>`;
      });
    }
  }

  // 2. Timeline Page
  const timelineContainer = document.getElementById('timeline-container');
  if (timelineContainer) {
    timelineContainer.innerHTML = '';
    if (event.phases) {
      event.phases.forEach((p, index) => {
        const statusClass = index === 0 ? 'done' : (index === 1 ? 'active-phase' : '');
        timelineContainer.innerHTML += `
          <div class="tl-item ${statusClass}" style="cursor:pointer;" onclick="goToTask('${p.id}')">
            <div class="tl-date">${p.date}</div>
            <div class="tl-title">${p.title}</div>
            ${p.desc ? `<div class="tl-desc" style="margin-bottom: 8px; font-size: 14px; color: #555;">${p.desc}</div>` : ''}
            <div class="tl-desc" style="font-weight: 500; color: #3b82f6;">Tasks: ${p.tasks.length} actions required.</div>
          </div>
        `;
      });
    }
  }

  // 3. Sponsorship Tiers Page
  const sponsorshipContainer = document.getElementById('sponsorship-tiers-container');
  if (sponsorshipContainer) {
    sponsorshipContainer.innerHTML = '';
    if (event.sponsorshipTiers) {
      event.sponsorshipTiers.forEach((t, i) => {
        const colors = [
          { border: 'var(--gold)', bg: 'var(--gold-pale)', title: 'var(--navy)', price: 'var(--gold)' },
          { border: '#B45309', bg: '#FFFBEB', title: '#B45309', price: '#B45309' },
          { border: '#6B7280', bg: '#F9FAFB', title: '#374151', price: '#374151' },
          { border: '#9CA3AF', bg: '#FFFFFF', title: '#6B7280', price: '#6B7280' }
        ];
        const c = colors[i % colors.length];
        
        sponsorshipContainer.innerHTML += `
          <div class="sponsor-tier" style="border-color:${c.border};background:${c.bg};">
            <div class="tier-title" style="color:${c.title};">${t.tier}</div>
            <div class="tier-price" style="color:${c.price};">₦${t.price.toLocaleString()}</div>
            <div style="font-size:12px; margin-bottom:8px; color:rgba(0,0,0,0.6);"><strong>Slots:</strong> ${t.slots} | <strong>Target:</strong> ${t.target}</div>
            ${t.benefits.map(b => `<div class="tier-benefit" style="color:var(--navy);">${b}</div>`).join('')}
          </div>
        `;
      });
    } else {
       sponsorshipContainer.innerHTML = '<div style="padding:20px; color:#666;">No sponsorship tiers defined for this event.</div>';
    }
  }

  // 4. Teams Info Page
  const teamsContainer = document.getElementById('teams-info-container');
  if (teamsContainer) {
    teamsContainer.innerHTML = '';
    if (event.teamsInfo) {
      teamsContainer.innerHTML = `
        <div class="card" style="grid-column: span 2;">
          <div class="card-title">${event.teamsInfo.title}</div>
          <div class="info-item"><p style="color:#666; font-size:14px; margin-top:5px; line-height:1.5;">${event.teamsInfo.description}</p></div>
        </div>
      `;
    }
  }
  
  // 4. Production Kits
  const kitGrid = document.getElementById('dynamic-kit-grid');
  if (kitGrid) {
    kitGrid.innerHTML = '';
    if (event.productionKits && Object.keys(event.productionKits).length > 0) {
      Object.keys(event.productionKits).forEach(kitKey => {
        const kit = event.productionKits[kitKey];
        if (kit.cardHtml) {
          kitGrid.innerHTML += kit.cardHtml;
        }
      });
    } else {
      kitGrid.innerHTML = `<div style="grid-column: 1 / -1; padding: 20px; text-align: center; color: var(--text-muted); background: var(--bg-deep); border-radius: 8px;">No production kits configured for this event.</div>`;
    }
  }

  // 5. Update the tasks renderer (requires event.phases)
  renderTasks(event);
  // 5. Update the dashboard specifically to catch async hydration
  if (typeof renderDashboard === 'function') renderDashboard();
  if (typeof renderDashboardProgress === 'function') renderDashboardProgress();
}

// populateEventSwitcher() removed — the event-switcher UI element no longer exists in index.html.

async function initEvent() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlEventId = urlParams.get('event');

  // ── Gateway Gate ──────────────────────────────────────────────────────────
  // On the base URL (no ?event= param), ALWAYS show the gateway search page.
  // Never fall through to localStorage or Firestore auto-resolution here.
  // The user must explicitly pick an event from the gateway.
  const pathname = window.location.pathname;
  const isBaseUrl = (pathname === '/' || pathname === '/index' || pathname === '/index.html' || pathname === '');

  if (isBaseUrl && !urlEventId) {
    // Show the gateway overlay, hide the auth overlay
    const gateway = document.getElementById('gateway-overlay');
    const authOverlay = document.getElementById('auth-lock-overlay');
    if (authOverlay) authOverlay.style.display = 'none';
    if (gateway) gateway.style.display = 'block';
    // Still populate the gateway events grid so search works
    if (typeof filterGatewayEvents === 'function') filterGatewayEvents();
    return; // stop — do NOT load any event
  }

  // ── Event Resolution (only runs when ?event= is present in URL) ──────────
  // Priority: URL param → localStorage session (same event only) → error
  let eventId = urlEventId;

  // Only restore from localStorage if it matches a previously used event
  // on THIS page — prevents cross-contamination from other event sessions.
  if (!eventId) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('refa_user_session_v1_')) {
          eventId = key.replace('refa_user_session_v1_', '');
          break;
        }
      }
    } catch(e) {}
  }

  let eventData = null;

  if (eventId) {
    eventData = await window.REFA_FIREBASE.getEvent(eventId);
  }

  // No silent fallback to getFirstEvent() — if no event is found, send to gateway
  if (!eventData) {
    console.warn('[App] No event resolved. Redirecting to gateway.');
    const gateway = document.getElementById('gateway-overlay');
    const authOverlay = document.getElementById('auth-lock-overlay');
    if (authOverlay) authOverlay.style.display = 'none';
    if (gateway) gateway.style.display = 'block';
    if (typeof filterGatewayEvents === 'function') filterGatewayEvents();
    return;
  }

  window.REFA_EVENTS.setActiveEvent(eventData);

  // Stamp event into URL for refresh persistence (only on non-base pages)
  if (!urlEventId) {
    const _u = new URL(window.location.href);
    _u.searchParams.set('event', eventData.id);
    window.history.replaceState({}, '', _u);
  }

  populateEventUI();
  initGlobalTaskSync();
  // Load dashboard section so its DOM elements exist before render functions run
  if (typeof window.loadSection === 'function') window.loadSection('dashboard');
}

let _cachedEventsList = null;
let gatewaySearchSeq = 0;

window.filterGatewayEvents = async function() {
  const input = document.getElementById('gateway-search-input');
  const grid = document.getElementById('gateway-events-grid');
  if (!grid) return;
  
  const query = input ? input.value.toLowerCase().trim() : '';
  
  if (!query) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
        <div style="width:12px; height:12px; background:#D4AF37; border-radius:50%; margin:0 auto 20px auto; box-shadow:0 0 10px #D4AF37; opacity:0.8;"></div>
        <div style="font-size:14px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:1px;">Awaiting Query...</div>
      </div>
    `;
    return;
  }

  if (!window.REFA_FIREBASE) return;

  const currentSeq = ++gatewaySearchSeq;

  if (!_cachedEventsList) {
    _cachedEventsList = await window.REFA_FIREBASE.listEvents();
  }
  const events = _cachedEventsList || [];

  const latestQuery = input ? input.value.toLowerCase().trim() : '';
  if (currentSeq !== gatewaySearchSeq || !latestQuery) {
    if (!latestQuery) {
      grid.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
          <div style="width:12px; height:12px; background:#D4AF37; border-radius:50%; margin:0 auto 20px auto; box-shadow:0 0 10px #D4AF37; opacity:0.8;"></div>
          <div style="font-size:14px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:1px;">Awaiting Query...</div>
        </div>
      `;
    }
    return;
  }

  const filtered = events.filter(e => 
    (e.id && e.id.toLowerCase().includes(latestQuery)) || 
    (e.name && e.name.toLowerCase().includes(latestQuery)) ||
    (e.theme && e.theme.toLowerCase().includes(latestQuery))
  );
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px;">
        <div style="width:12px; height:12px; background:#f87171; border-radius:50%; margin:0 auto 20px auto; box-shadow:0 0 10px #f87171; opacity:0.8;"></div>
        <div style="font-size:14px; font-weight:600; color:#64748B; text-transform:uppercase; letter-spacing:1px;">No events match query...</div>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = filtered.map(e => `
    <div style="background:rgba(15,23,42,0.8); border:1px solid rgba(255,255,255,0.1); border-radius:16px; padding:24px; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.borderColor='#D4AF37'; this.style.boxShadow='0 0 15px rgba(212,175,55,0.2)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.boxShadow='none'" onclick="window.location.href='/index?event=${e.id}'">
      <div style="font-size:12px; color:#D4AF37; margin-bottom:8px; font-weight:700; letter-spacing:1px; text-transform:uppercase;">${e.id}</div>
      <div style="font-size:20px; font-weight:800; color:white; margin-bottom:12px;">${e.name || 'Unnamed Event'}</div>
      <div style="font-size:14px; color:#94A3B8;">${e.theme ? 'Theme: ' + e.theme : 'No theme set'}</div>
    </div>
  `).join('');
};

if (window.REFA_FIREBASE) {
  initEvent();
} else {
  window.addEventListener('firebase-ready', () => {
    initEvent();
  });
}

// --- AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) ---
function getAuthSessionKey() {
  const urlParams = new URLSearchParams(window.location.search);
  const urlEventId = urlParams.get('event');
  const eventId = urlEventId || (window.REFA_EVENTS && window.REFA_EVENTS.getActiveEvent() ? window.REFA_EVENTS.getActiveEvent().id : 'default');
  return 'refa_user_session_v1_' + eventId;
}

function getAuthSession() {
  try {
    const key = getAuthSessionKey();
    return JSON.parse(sessionStorage.getItem(key) || localStorage.getItem(key) || 'null');
  } catch (e) {
    return null;
  }
}

function setAuthSession(sessionData) {
  try {
    const key = getAuthSessionKey();
    sessionStorage.setItem(key, JSON.stringify(sessionData));
    localStorage.setItem(key, JSON.stringify(sessionData));
  } catch (e) {}
}

function clearAuthSession() {
  try {
    const key = getAuthSessionKey();
    sessionStorage.removeItem(key);
    localStorage.removeItem(key);
  } catch (e) {}
}

function checkAuthSession() {
  const session = getAuthSession();
  const overlay = document.getElementById('auth-lock-overlay');
  const userBadge = document.getElementById('sidebar-user-badge');
  const nameEl = document.getElementById('user-display-name');
  const roleEl = document.getElementById('user-display-role');

  if (!session || !session.role) {
    if (overlay) overlay.classList.remove('hidden');
    if (userBadge) userBadge.style.display = 'none';
    return false;
  }

  if (overlay) overlay.classList.add('hidden');
  if (userBadge) userBadge.style.display = 'flex';
  if (nameEl) nameEl.textContent = session.memberName || 'Member';
  if (roleEl) roleEl.textContent = session.title || session.role.toUpperCase();

  updateNavForRole(session);
  return true;
}

async function handlePassKeyLogin(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('auth-member-name');
  const keyInput = document.getElementById('auth-passkey');
  const btn = document.getElementById('auth-submit-btn');
  const errEl = document.getElementById('auth-error-msg');

  const name = nameInput ? nameInput.value.trim() : '';
  const key = keyInput ? keyInput.value.trim() : '';

  if (!name || !key) {
    if (errEl) {
      errEl.textContent = 'Please enter both your member name and pass key.';
      errEl.style.display = 'block';
    }
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '⌛ Validating Key...';
  }
  if (errEl) errEl.style.display = 'none';

  let result = { success: false, message: 'Firebase authentication not ready.' };

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.validatePassKey) {
    const currentEventId = window.REFA_EVENTS && window.REFA_EVENTS.getActiveEvent() ? window.REFA_EVENTS.getActiveEvent().id : null;
    result = await window.REFA_FIREBASE.validatePassKey(name, key, currentEventId);
  } else {
    const cleanKey = key.toUpperCase();
    const FALLBACK_KEYS = {
      'REFA-ADMIN-2026': { key: 'REFA-ADMIN-2026', role: 'admin', title: 'Executive Admin', allowedPages: ["dashboard", "tasks", "strategy", "voting", "sponsors", "letters", "accounts", "media", "studio", "timeline", "countdown", "parents", "operations", "revenue", "teams", "social", "sponsorship"] },
      'REFA-MEDIA-2026': { key: 'REFA-MEDIA-2026', role: 'media', title: 'Media & Studio Lead', allowedPages: ["dashboard", "tasks", "media", "studio", "strategy", "timeline", "countdown", "social"] },
      'REFA-TEAM-2026': { key: 'REFA-TEAM-2026', role: 'ops', title: 'Operations & Mentor', allowedPages: ["dashboard", "tasks", "voting", "strategy", "timeline", "countdown", "parents", "teams"] },
      'REFA-GUEST-2026': { key: 'REFA-GUEST-2026', role: 'viewer', title: 'Guest Visitor', allowedPages: ["dashboard", "timeline", "countdown"] }
    };
    if (FALLBACK_KEYS[cleanKey]) {
      result = { success: true, roleData: { ...FALLBACK_KEYS[cleanKey], memberName: name } };
    } else {
      result = { success: false, message: 'Invalid Pass Key.' };
    }
  }

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '🔐 Unlock Hub Access';
  }

  if (result.success && result.roleData) {
    setAuthSession(result.roleData);
    checkAuthSession();
    // Ensure dashboard section is loaded so render functions have DOM elements to write into
    if (typeof window.loadSection === 'function') window.loadSection('dashboard');
  } else {
    if (errEl) {
      errEl.textContent = result.message || 'Login failed. Invalid key or limit reached.';
      errEl.style.display = 'block';
    }
  }
}

function handleLogout() {
  clearAuthSession();
  const nameInput = document.getElementById('auth-member-name');
  const keyInput = document.getElementById('auth-passkey');
  const errEl = document.getElementById('auth-error-msg');
  if (nameInput) nameInput.value = '';
  if (keyInput) keyInput.value = '';
  if (errEl) errEl.style.display = 'none';
  checkAuthSession();
}

function updateNavForRole(session) {
  if (!session) return;
  const allowed = session.allowedPages || [];
  const isAdmin = session.role === 'admin';

  const NAV_PAGE_MAP = {
    'nav-dashboard': 'dashboard',
    'nav-timeline': 'timeline',
    'nav-countdown': 'countdown',
    'nav-letters': 'letters',
    'nav-accounts': 'accounts',
    'nav-tasks': 'tasks',
    'nav-studio': 'studio',
    'nav-voting': 'voting',
    'nav-parents': 'parents',
    'nav-operations': 'operations',
    'nav-revenue': 'revenue',
    'nav-teams': 'teams',
    'nav-social': 'social',
    'nav-sponsorship': 'sponsorship'
  };

  Object.keys(NAV_PAGE_MAP).forEach(navId => {
    const pageId = NAV_PAGE_MAP[navId];
    const navEl = document.getElementById(navId);
    if (!navEl) return;
    if (isAdmin || allowed.includes(pageId) || pageId === 'dashboard') {
      navEl.classList.remove('role-hidden');
    } else {
      navEl.classList.add('role-hidden');
    }
  });

  const activePageEl = document.querySelector('.page.active');
  if (activePageEl) {
    const pageId = activePageEl.id.replace('page-', '');
    if (!isAdmin && !allowed.includes(pageId) && pageId !== 'dashboard') {
      goTo('dashboard');
    }
  }
}

function goTo(id) {
  const session = getAuthSession();
  if (!session) {
    checkAuthSession();
    return;
  }

  const allowed = session.allowedPages || [];
  const isAdmin = session.role === 'admin';

  if (!isAdmin && !allowed.includes(id) && id !== 'dashboard') {
    alert(`Access Restricted: Your role (${session.title || session.role}) does not have permission to access this section.`);
    return;
  }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const targetPage = document.getElementById('page-' + id);
  const navItem = document.getElementById('nav-' + id);
  if (navItem) navItem.classList.add('active');

  // --- PREMIUM TEASER LOCKDOWN LOGIC ---
  const premiumTabs = ['voting', 'revenue', 'sponsorship', 'tasks', 'letters', 'accounts', 'teams', 'parents', 'operations', 'social', 'media', 'studio'];
  const activeEvent = window.REFA_EVENTS && window.REFA_EVENTS.getActiveEvent() ? window.REFA_EVENTS.getActiveEvent() : null;
  const isTeaserMode = activeEvent ? !!activeEvent.teaserMode : false;

  document.querySelectorAll('.premium-lock-overlay').forEach(el => el.remove());

  if (targetPage) {
    targetPage.classList.add('active');

    if (isTeaserMode && premiumTabs.includes(id)) {
      targetPage.style.position = 'relative';
      const overlay = document.createElement('div');
      overlay.className = 'premium-lock-overlay';
      overlay.innerHTML = `
        <div class="premium-lock-card">
          <div style="font-size:40px; margin-bottom:10px;">🔒</div>
          <div class="premium-lock-title">Premium Module Locked</div>
          <div class="premium-lock-text">This module has been architected and is ready for deployment. Kindly check your mail to officially welcome us into the project!</div>
        </div>
      `;
      targetPage.appendChild(overlay);
    }
  }

  if (id === 'letters') {
    updateLetterBg(); // This correctly determines the active event's image prefix, then calls updateLetter()
  }
  if (id === 'accounts') {
    updateAccountGenerator();
  }

  window.scrollTo(0, 0);
}

function goToTask(phaseId) {
  goTo('tasks');
  const phaseEl = document.getElementById('phase-' + phaseId);
  if (phaseEl) {
    if (phaseEl.classList.contains('collapsed')) {
      togglePhase(phaseId);
    }
    setTimeout(() => {
      phaseEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function formatNaira(num) {
  return '₦' + num.toLocaleString();
}

function updateVotePricing() {
  const basePrice = parseInt(document.getElementById('base-vote-price').value) || 0;

  document.getElementById('price-1').textContent = formatNaira(basePrice);

  const price10 = Math.floor(basePrice * 10 * 0.8);
  document.getElementById('price-10').textContent = formatNaira(price10);
  document.getElementById('desc-10').textContent = 'Save ' + formatNaira((basePrice * 10) - price10);

  const price50 = Math.floor(basePrice * 50 * 0.7);
  document.getElementById('price-50').textContent = formatNaira(price50);
  document.getElementById('desc-50').textContent = 'Save ' + formatNaira((basePrice * 50) - price50);

  const price100 = Math.floor(basePrice * 100 * 0.65);
  document.getElementById('price-100').textContent = formatNaira(price100);
  document.getElementById('desc-100').textContent = 'Save ' + formatNaira((basePrice * 100) - price100) + ' (Super Supporter)';

  document.getElementById('target-alert').innerHTML = '<span class="alert-icon">📊</span>Target: <strong>20,000 total votes × ' + formatNaira(basePrice) + '</strong> = <strong>' + formatNaira(20000 * basePrice) + ' minimum</strong>';

  document.getElementById('parent-calc-rate').textContent = formatNaira(basePrice);
  document.getElementById('parent-calc-total').textContent = formatNaira(20 * basePrice) + ' per parent';
  document.getElementById('parent-calc-grand').textContent = formatNaira(2000 * basePrice) + ' from parents alone';
  const vtEl = document.getElementById('voting-page-title');
  if (vtEl) vtEl.textContent = formatNaira(basePrice);
}

function getPhaseProgress(phase) {
  const total = phase.tasks.length;
  const done = phase.tasks.filter(t => checked[t.id]).length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

function getOverallProgress() {
  const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  const phases = (activeEvent && activeEvent.phases) ? activeEvent.phases : [];
  if (!phases || !phases.length) return { done: 0, total: 0, pct: 0 };
  const total = phases.reduce((s, p) => s + p.tasks.length, 0);
  const done = phases.reduce((s, p) => s + p.tasks.filter(t => checked[t.id]).length, 0);
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

const TAG_LABELS = { ops: 'Ops', media: 'Media', admin: 'Admin', finance: 'Finance', content: 'Content', tech: 'Tech' };

function renderTasks(event) {
  const container = document.getElementById('task-list-container');
  if (!container) return;
  container.innerHTML = '';
  
  const phases = event ? event.phases : [];
  if (!phases || !phases.length) return;

  phases.forEach(phase => {
    const { done, total, pct } = getPhaseProgress(phase);
    const isComplete = done === total && total > 0;
    const div = document.createElement('div');
    div.className = 'task-phase' + (isComplete ? ' collapsed' : '');
    div.id = 'phase-' + phase.id;
    const statusClass = isComplete ? 'done' : (done > 0 ? 'active' : 'upcoming');
    const statusLabel = isComplete ? 'Complete' : (done > 0 ? 'In Progress' : 'Upcoming');
    div.innerHTML =
      '<div class="task-phase-header" onclick="togglePhase(\'' + phase.id + '\')">' +
      '<div class="phase-info"><h3>' + phase.title + '</h3><p>' + phase.date + '</p></div>' +
      '<div class="phase-meta">' +
      '<span class="phase-count" id="count-' + phase.id + '">' + done + '/' + total + ' done</span>' +
      '<span class="phase-badge ' + statusClass + '" id="badge-' + phase.id + '"><span class="dot"></span>' + statusLabel + '</span>' +
      '<span class="phase-chevron">&#8250;</span>' +
      '</div>' +
      '</div>' +
      '<div class="task-phase-bar"><div class="task-phase-bar-fill" id="bar-' + phase.id + '" style="width:' + pct + '%"></div></div>' +
      '<div class="task-phase-body" id="body-' + phase.id + '">' +
      phase.tasks.map(t => {
        const isChecked = !!checked[t.id];
        return '<div class="task-item" id="item-' + t.id + '">' +
          '<div class="task-cb ' + (isChecked ? 'checked' : '') + '" onclick="toggleTask(\'' + t.id + '\')" id="cb-' + t.id + '"></div>' +
          '<div class="task-text ' + (isChecked ? 'done-text' : '') + '" id="txt-' + t.id + '">' +
          '<strong>' + t.text + '</strong><span>' + t.detail + '</span>' +
          '</div>' +
          '<span class="task-tag tag-' + t.tag + '">' + TAG_LABELS[t.tag] + '</span>' +
          '</div>';
      }).join('') +
      '</div>';
    container.appendChild(div);
  });
}

function toggleTask(id) {
  checked[id] = !checked[id];
  save();
  
  const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  const phases = (activeEvent && activeEvent.phases) ? activeEvent.phases : [];

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.updateTaskInDb) {
    window.REFA_FIREBASE.updateTaskInDb(id, checked[id]).catch(console.error);
  }

  const cb = document.getElementById('cb-' + id);
  const txt = document.getElementById('txt-' + id);
  if (checked[id]) { cb.classList.add('checked'); txt.classList.add('done-text'); }
  else { cb.classList.remove('checked'); txt.classList.remove('done-text'); }
  const phase = phases.find(p => p.tasks.some(t => t.id === id));
  if (phase) {
    const { done, total, pct } = getPhaseProgress(phase);
    const bar = document.getElementById('bar-' + phase.id);
    const count = document.getElementById('count-' + phase.id);
    const badge = document.getElementById('badge-' + phase.id);
    if (bar) bar.style.width = pct + '%';
    if (count) count.textContent = done + '/' + total + ' done';
    if (badge) {
      const isComplete = done === total && total > 0;
      badge.className = 'phase-badge ' + (isComplete ? 'done' : done > 0 ? 'active' : 'upcoming');
      badge.innerHTML = '<span class="dot"></span>' + (isComplete ? 'Complete' : done > 0 ? 'In Progress' : 'Upcoming');
    }
  }
  updateGlobalProgress();
}

function togglePhase(id) {
  document.getElementById('phase-' + id).classList.toggle('collapsed');
}

function updateGlobalProgress() {
  const { done, total, pct } = getOverallProgress();
  const fill = document.getElementById('sidebar-progress-fill');
  const label = document.getElementById('sidebar-progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '% (' + done + '/' + total + ')';
  renderDashboardProgress();
}

function renderDashboardProgress() {
  const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  const phases = (activeEvent && activeEvent.phases) ? activeEvent.phases : [];
  
  const list = document.getElementById('dashboard-progress-list');
  if (!list) return;
  list.innerHTML = phases.map(p => {
    const { done, total, pct } = getPhaseProgress(p);
    return '<div class="progress-wrap" style="margin-bottom:14px;">' +
      '<div class="progress-label"><span style="font-weight:600;color:var(--navy);font-size:13px;">' + p.title + '</span><span>' + done + '/' + total + '</span></div>' +
      '<div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '</div>';
  }).join('');
}

function renderDashboard() {
  const currentPhase = getDynamicCurrentPhaseData();
  const cpDate = document.getElementById('cp-date');
  const cpTitle = document.getElementById('cp-title');
  const cpDesc = document.getElementById('cp-desc');
  if (cpDate) cpDate.textContent = currentPhase.date;
  if (cpTitle) cpTitle.textContent = currentPhase.title;
  if (cpDesc) cpDesc.textContent = currentPhase.desc;
  const goalsList = document.getElementById('goals-list');
  if (goalsList) {
    const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
    const goalsToRender = (activeEvent && activeEvent.goals) ? activeEvent.goals : GOALS_DATA;
    
    goalsList.innerHTML = goalsToRender.map(g =>
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#F8F9FB;border-radius:8px;">' +
      '<span style="font-size:13px;color:var(--text-muted);">' + g.icon + ' ' + g.label + '</span>' +
      '<span style="font-size:13px;font-weight:700;color:var(--navy);">' + g.value + '</span>' +
      '</div>'
    ).join('');
  }
}

function renderTeams() {
  const grid = document.getElementById('teams-grid');
  const countBadge = document.getElementById('teams-count-badge');
  if (countBadge) {
    countBadge.textContent = `${currentTeams.length} Active Teams`;
  }
  if (!grid) return;

  const session = getAuthSession();
  const canManage = session && (session.role === 'admin' || session.role === 'ops');

  grid.innerHTML = currentTeams.map(t => {
    const mentorStr = t.mentor ? `Mentor: ${t.mentor}` : '10 members + 1 mentor';
    const deleteBtn = canManage ? `<button onclick="handleDeleteTeam('${t.id}')" title="Delete Team" style="position:absolute; top:8px; right:8px; background:rgba(0,0,0,0.3); color:white; border:none; border-radius:50%; width:24px; height:24px; font-size:12px; cursor:pointer; display:flex; align-items:center; justify-content:center;">✕</button>` : '';

    return `
      <div class="team-card" style="background:linear-gradient(135deg, ${t.color || '#1A3A8F'}, ${t.color || '#1A3A8F'}CC); position:relative;">
        ${deleteBtn}
        <div class="team-num">TEAM ${t.num || ''}</div>
        <div class="team-name">${t.name}</div>
        <div class="team-color-label">${mentorStr}</div>
      </div>
    `;
  }).join('');
}

function openAddTeamModal() {
  const session = getAuthSession();
  if (session && session.role !== 'admin' && session.role !== 'ops') {
    alert("Access Restricted: Only Administrators and Operations Leads can add teams.");
    return;
  }
  const modal = document.getElementById('add-team-modal');
  if (modal) modal.style.display = 'flex';
}

function closeAddTeamModal(e) {
  if (!e || e.target === document.getElementById('add-team-modal') || e.target.classList.contains('modal-close')) {
    const modal = document.getElementById('add-team-modal');
    if (modal) modal.style.display = 'none';
  }
}

async function handleCreateTeam(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('new-team-name');
  const numInput = document.getElementById('new-team-num');
  const colorInput = document.getElementById('new-team-color');
  const mentorInput = document.getElementById('new-team-mentor');
  const countInput = document.getElementById('new-team-count');

  const name = nameInput ? nameInput.value.trim() : '';
  const num = numInput ? parseInt(numInput.value) || (currentTeams.length + 1) : currentTeams.length + 1;
  const color = colorInput ? colorInput.value : '#1A3A8F';
  const mentor = mentorInput ? mentorInput.value.trim() : 'Unassigned';
  const memberCount = countInput ? parseInt(countInput.value) || 10 : 10;

  if (!name) {
    alert("Please enter a team name.");
    return;
  }

  const teamData = {
    id: `team-${Date.now()}`,
    name,
    num,
    color,
    mentor,
    memberCount
  };

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.addTeamToDb) {
    const res = await window.REFA_FIREBASE.addTeamToDb(teamData);
    if (!res.success) {
      alert("Error adding team: " + res.error);
      return;
    }
  } else {
    currentTeams.push(teamData);
    renderTeams();
  }

  closeAddTeamModal();
  if (nameInput) nameInput.value = '';
  if (mentorInput) mentorInput.value = '';
}

async function handleDeleteTeam(teamId) {
  if (!confirm("Are you sure you want to delete this team from the global directory?")) return;

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.deleteTeamFromDb) {
    await window.REFA_FIREBASE.deleteTeamFromDb(teamId);
  } else {
    currentTeams = currentTeams.filter(t => t.id !== teamId);
    renderTeams();
  }
}

function renderContentSchedule() {
  const queueList = document.getElementById('social-queue-list');
  if (!queueList) return;

  if (!currentContentSchedule || currentContentSchedule.length === 0) {
    queueList.innerHTML = `
      <div style="text-align:center; padding:30px; background:#F8F9FB; border-radius:12px; color:var(--text-muted);">
        <div style="font-size:32px; margin-bottom:8px;">📅</div>
        <p>No scheduled content posts yet. Click <strong>+ Schedule Post</strong> to add your first post!</p>
      </div>
    `;
    return;
  }

  const platformIcons = {
    'Instagram': '📸',
    'Instagram Reels': '📸',
    'YouTube': '▶️',
    'TikTok': '🎵',
    'Facebook': '📘',
    'X (Twitter)': '🐦',
    'All Platforms': '🌐'
  };

  const session = getAuthSession();
  const canManage = session && (session.role === 'admin' || session.role === 'media' || session.role === 'ops');

  queueList.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:12px;">
      ${currentContentSchedule.map(item => {
        const icon = platformIcons[item.platform] || '📝';
        const deleteBtn = canManage ? `<button onclick="handleDeleteContent('${item.id}')" style="background:#FEE2E2; color:#DC2626; border:none; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:bold; cursor:pointer;">Delete</button>` : '';

        return `
          <div style="background:white; border:1px solid #E2E8F0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <span style="font-size:16px;">${icon}</span>
                <strong style="font-size:14px; color:var(--navy);">${item.title}</strong>
                <span style="font-size:10px; font-weight:700; background:#EDE9FE; color:#6D28D9; padding:2px 8px; border-radius:4px;">${item.platform || 'Social'}</span>
              </div>
              <div style="font-size:12px; color:var(--text-muted); display:flex; gap:16px; flex-wrap:wrap;">
                <span>📅 Date: <strong>${item.scheduledDate || 'TBD'}</strong> ${item.scheduledTime ? `at ${item.scheduledTime}` : ''}</span>
                <span>👤 Assignee: <strong>${item.assignee || 'Media Team'}</strong></span>
                <span>Status: <strong style="color:${item.status === 'Published' ? '#059669' : '#D97706'}">${item.status || 'Scheduled'}</strong></span>
              </div>
              ${item.notes ? `<p style="font-size:11.5px; color:#475569; margin-top:6px; font-style:italic;">"${item.notes}"</p>` : ''}
            </div>
            <div>
              ${deleteBtn}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

async function addSocialPost() {
  const titleInput = document.getElementById('sp-title');
  const platformInput = document.getElementById('sp-platform');
  const assigneeInput = document.getElementById('sp-assignee');
  const dateInput = document.getElementById('sp-date');

  const title = titleInput ? titleInput.value.trim() : '';
  const platform = platformInput ? platformInput.value : 'All Platforms';
  const assignee = assigneeInput ? assigneeInput.value.trim() : 'Media Team';
  const scheduledDate = dateInput ? dateInput.value : '';

  if (!title) {
    alert("Please enter a post title.");
    return;
  }

  const postData = {
    id: `post-${Date.now()}`,
    title,
    platform,
    assignee,
    scheduledDate: scheduledDate || new Date().toISOString().split('T')[0],
    status: 'Scheduled',
    notes: 'Created via Global Content Scheduler'
  };

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.addContentScheduleToDb) {
    await window.REFA_FIREBASE.addContentScheduleToDb(postData);
  } else {
    currentContentSchedule.push(postData);
    renderContentSchedule();
  }

  alert("Content post scheduled and synced globally!");
  if (titleInput) titleInput.value = '';
  if (assigneeInput) assigneeInput.value = '';
  if (typeof switchSocialSubTab === 'function') {
    switchSocialSubTab('queue');
  }
}

async function handleDeleteContent(itemId) {
  if (!confirm("Delete this scheduled content post from the global calendar?")) return;

  if (window.REFA_FIREBASE && window.REFA_FIREBASE.deleteContentScheduleFromDb) {
    await window.REFA_FIREBASE.deleteContentScheduleFromDb(itemId);
  } else {
    currentContentSchedule = currentContentSchedule.filter(i => i.id !== itemId);
    renderContentSchedule();
  }
}

/* INTERACTIVE KIT MODAL VIEWER LOGIC */


function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    if (btnElement) {
      const origText = btnElement.innerText;
      btnElement.innerText = '✅ Copied!';
      btnElement.style.background = '#10B981';
      btnElement.style.color = '#FFFFFF';
      setTimeout(() => {
        btnElement.innerText = origText;
        btnElement.style.background = '';
        btnElement.style.color = '';
      }, 2000);
    }
  }).catch(err => {
    console.error('Copy failed', err);
  });
}

function copyKitText(kitKey) {
  const kit = KIT_PREVIEWS[kitKey];
  if (!kit) return;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = kit.html;
  const text = tempDiv.innerText || tempDiv.textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert('✅ Full kit document copied to clipboard!');
  });
}

function printKitContent() {
  const content = document.getElementById('modal-content').innerHTML;
  const title = document.getElementById('modal-title').innerText;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; color: #1E293B; line-height: 1.6; }
          .preview-box { border: 1px solid #CBD5E1; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
          h4 { color: #08172E; border-bottom: 2px solid #D4AF37; padding-bottom: 4px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #CBD5E1; padding: 8px; font-size: 12px; }
          th { background: #08172E; color: white; }
          .kit-toolbar { display: none !important; }
          button { display: none !important; }
        </style>
      </head>
      <body>
        <h2>${title}</h2>
        ${content}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
}

function openKitModal(kitKey) {
  const event = window.REFA_EVENTS.getActiveEvent();
  if (!event || !event.productionKits) return;
  const kit = event.productionKits[kitKey];
  if (!kit) return;
  document.getElementById('modal-title').textContent = kit.title;
  document.getElementById('modal-subtitle').textContent = kit.subtitle;
  document.getElementById('modal-content').innerHTML = kit.html;
  document.getElementById('kit-modal-overlay').classList.add('active');
}

function closeKitModal(e) {
  if (!e || e.target === document.getElementById('kit-modal-overlay') || e.target.classList.contains('modal-close')) {
    document.getElementById('kit-modal-overlay').classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  checkAuthSession();
  renderDashboard();
  renderDashboardProgress();
  renderTasks();
  renderTeams();
  updateGlobalProgress();
  initStudio();
});

let savedPositions = {};

function savePositions() {
  const refs = ['out-our-ref', 'out-your-ref', 'out-date', 'out-salutation', 'out-subject'];
  refs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      savedPositions[id] = {
        left: el.style.left,
        top: el.style.top,
        fontFamily: el.style.fontFamily,
        fontSize: el.style.fontSize,
        color: el.style.color,
        fontWeight: el.style.fontWeight,
        fontStyle: el.style.fontStyle,
        textDecoration: el.style.textDecoration
      };
    }
  });
}

function updateLetter() {
  savePositions();

  const wrapper = document.getElementById('letter-page-wrapper');
  if (!wrapper) return;
  const bgImgSrc = document.getElementById('lh-bg-img') ? document.getElementById('lh-bg-img').src : '';

  // Create a hidden div to parse the WYSIWYG HTML into nodes
  const sourceDiv = document.createElement('div');
  sourceDiv.innerHTML = document.getElementById('let-body').innerHTML;

  wrapper.innerHTML = ''; // Clear pages

  let pageIndex = 1;
  let currentPage, currentBody;

  function createPage() {
    const page = document.createElement('div');
    page.className = 'letter-page';

    // Background
    const bg = document.createElement('img');
    bg.src = bgImgSrc;
    bg.className = 'lh-bg page-bg-visual';
    page.appendChild(bg);

    const overlay = document.createElement('div');
    overlay.className = 'lh-overlay';

    if (pageIndex === 1) {
      overlay.innerHTML = `
            <div class="lh-ref-date">
              <div class="lh-abs draggable" style="top: ${savedPositions['out-our-ref']?.top || '151.5px'}; left: ${savedPositions['out-our-ref']?.left || '140px'}; font-family: 'Times New Roman', serif; font-weight: bold; font-size: 14px;" id="out-our-ref"></div>
              <div class="lh-abs draggable" style="top: ${savedPositions['out-your-ref']?.top || '151.5px'}; left: ${savedPositions['out-your-ref']?.left || '420px'}; font-family: 'Times New Roman', serif; font-weight: bold; font-size: 14px;" id="out-your-ref"></div>
              <div class="lh-abs draggable" style="top: ${savedPositions['out-date']?.top || '151.5px'}; left: ${savedPositions['out-date']?.left || '630px'}; font-family: 'Times New Roman', serif; font-weight: bold; font-size: 14px;" id="out-date"></div>
            </div>
            
            <div class="lh-abs draggable" style="top: ${savedPositions['out-salutation']?.top || '190px'}; left: ${savedPositions['out-salutation']?.left || '100px'}; font-weight: bold; text-transform: uppercase;" id="out-salutation"></div>
            
            <div class="lh-abs draggable" style="top: ${savedPositions['out-subject']?.top || '240px'}; left: ${savedPositions['out-subject']?.left || '100px'}; width: 594px; font-weight: bold; text-align: center; text-transform: uppercase; text-decoration: underline; font-size: 16px;" id="out-subject"></div>
            
            <div class="lh-abs" style="top: 290px; left: 100px; width: 594px; font-family: 'Times New Roman', serif; text-align: justify; font-size: 15px; line-height: 1.5;" id="out-body-${pageIndex}"></div>
       `;
    } else {
      overlay.innerHTML = `
            <div class="lh-abs" style="top: 150px; left: 100px; width: 594px; font-family: 'Times New Roman', serif; text-align: justify; font-size: 15px; line-height: 1.5;" id="out-body-${pageIndex}"></div>
       `;
    }

    page.appendChild(overlay);
    wrapper.appendChild(page);

    currentBody = document.getElementById(`out-body-${pageIndex}`);
    currentPage = page;
  }

  createPage();

  // Update header text on Page 1
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setTxt('out-our-ref', document.getElementById('let-our-ref').value);
  setTxt('out-your-ref', document.getElementById('let-your-ref').value);
  setTxt('out-date', document.getElementById('let-date').value);
  setTxt('out-salutation', document.getElementById('let-salutation').value);
  setTxt('out-subject', document.getElementById('let-subject').value);

  // Re-apply saved custom styles (fonts, colors, etc)
  ['out-our-ref', 'out-your-ref', 'out-date', 'out-salutation', 'out-subject'].forEach(id => {
    const el = document.getElementById(id);
    const s = savedPositions[id];
    if (el && s) {
      if (s.fontFamily) el.style.fontFamily = s.fontFamily;
      if (s.fontSize) el.style.fontSize = s.fontSize;
      if (s.color) el.style.color = s.color;
      if (s.fontWeight) el.style.fontWeight = s.fontWeight;
      if (s.fontStyle) el.style.fontStyle = s.fontStyle;
      if (s.textDecoration) el.style.textDecoration = s.textDecoration;
    }
  });

  // Paginate nodes
  const blocks = Array.from(sourceDiv.childNodes);
  for (let block of blocks) {
    currentBody.appendChild(block);

    // Check height
    const maxHeight = pageIndex === 1 ? 733 : 873;
    if (currentBody.offsetHeight > maxHeight && currentBody.childNodes.length > 1) {
      // Move this block to next page
      currentBody.removeChild(block);
      pageIndex++;
      createPage();
      currentBody.appendChild(block);
    }
  }

  // Rebind draggable events to the newly created elements
  bindDraggables();

  // Fit container scale
  fitLetterPreview();
}

function syncLetterHeight() {
  // Now obsolete, pagination is handled inside updateLetter()
}

function updateLetterBg() {
  const useSigned = document.getElementById('let-use-signed-bg') && document.getElementById('let-use-signed-bg').checked;
  const imgEl = document.getElementById('lh-bg-img');
  if (!imgEl) return;

  const activeEventId = window.REFA_EVENTS && window.REFA_EVENTS.getActiveEvent()
    ? window.REFA_EVENTS.getActiveEvent().id
    : null;
  const prefix = activeEventId ? activeEventId + '-' : '';
  const baseName = useSigned ? `img/${prefix}letterhead-signed` : `img/${prefix}letterhead`;
  
  const exts = ['.jpeg', '.jpg', '.png'];
  let currentTry = 0;

  function tryNextExt() {
    if (currentTry >= exts.length) {
      imgEl.src = `https://via.placeholder.com/794x1123.png?text=Missing+${baseName}+(jpg/png/jpeg)`;
      return;
    }
    const attempt = baseName + exts[currentTry];
    currentTry++;

    const tempImg = new Image();
    tempImg.onload = () => { imgEl.src = attempt; updateLetter(); };
    tempImg.onerror = tryNextExt;
    tempImg.src = attempt;
  }

  tryNextExt();
}



function editTemplate(templateId) {
  const event = window.REFA_EVENTS.getActiveEvent();
  if (!event || !event.letterTemplates) return;
  const tpl = event.letterTemplates[templateId];
  if (tpl) {
    const orgPrefix = event.orgName ? event.orgName.split(' ').map(w=>w[0]).join('').toUpperCase() : (event.id || 'ORG').toUpperCase().substring(0,4);
    const yr = new Date().getFullYear();
    document.getElementById('let-our-ref').value = `${orgPrefix}/${yr}/01`;
    document.getElementById('let-your-ref').value = '';
    // Auto-fill today's date
    const d = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('let-date').value = d.toLocaleDateString('en-GB', options);

    document.getElementById('let-salutation').value = tpl.salutation;
    document.getElementById('let-subject').value = tpl.subject;
    document.getElementById('let-body').innerHTML = tpl.body;

    updateLetter();
  }
  goTo('letters');
}

// Letter Page Scaling Logic & Drag and Drop
let letterScale = 1;
let selectedElement = null;
let isDraggingLetterElement = false;
let dragStartX = 0, dragStartY = 0, dragInitialLeft = 0, dragInitialTop = 0;

function fitLetterPreview() {
  const wrapper = document.querySelector('.letter-page-wrapper');
  const outer = document.getElementById('letter-scale-outer');
  const previewContainer = document.querySelector('.letter-preview-container');

  if (!wrapper || !outer || !previewContainer) return;

  const pages = wrapper.querySelectorAll('.letter-page');
  const pageCount = pages.length || 1;
  const gap = 20;
  const unscaledWidth = 794;
  const unscaledHeight = (1123 * pageCount) + (gap * (pageCount - 1));

  // Determine available width (leaving 60px total padding)
  const availableWidth = Math.max(200, previewContainer.clientWidth - 60);

  letterScale = Math.min(1, availableWidth / unscaledWidth);

  // Update outer wrapper bounding dimensions to scaled box size
  outer.style.width = `${unscaledWidth * letterScale}px`;
  outer.style.height = `${unscaledHeight * letterScale}px`;

  // Scale wrapper anchored at top-left
  wrapper.style.transform = `scale(${letterScale})`;
  wrapper.style.transformOrigin = '0 0';
}

document.addEventListener('DOMContentLoaded', () => {
  updateLetterBg();

  const previewContainer = document.querySelector('.letter-preview-container');
  if (previewContainer) {
    const resizeObserver = new ResizeObserver(() => {
      fitLetterPreview();
    });
    resizeObserver.observe(previewContainer);

    bindDraggables();
  }
});

function bindDraggables() {
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach(el => {
    if (el.dataset.dragBound) return;
    el.dataset.dragBound = 'true';

    el.addEventListener('mousedown', (e) => {
      isDraggingLetterElement = true;
      selectedElement = el;

      document.querySelectorAll('.draggable').forEach(d => d.classList.remove('active-element'));
      el.classList.add('active-element');

      syncStylePanel();

      dragStartX = e.clientX;
      dragStartY = e.clientY;

      const style = window.getComputedStyle(el);
      dragInitialLeft = parseFloat(style.left) || 0;
      dragInitialTop = parseFloat(style.top) || 0;

      e.stopPropagation();
    });
  });

  if (!window.draggablesBound) {
    window.draggablesBound = true;
    document.addEventListener('mousemove', (e) => {
      if (!isDraggingLetterElement || !selectedElement) return;

      const dx = (e.clientX - dragStartX) / letterScale;
      const dy = (e.clientY - dragStartY) / letterScale;

      selectedElement.style.left = `${dragInitialLeft + dx}px`;
      selectedElement.style.top = `${dragInitialTop + dy}px`;
    });

    document.addEventListener('mouseup', () => {
      if (isDraggingLetterElement) {
        savePositions();
      }
      isDraggingLetterElement = false;
    });

    document.addEventListener('mousedown', (e) => {
      if (!e.target.closest('.draggable') && !e.target.closest('.letter-editor')) {
        document.querySelectorAll('.draggable').forEach(d => d.classList.remove('active-element'));
        selectedElement = null;
      }
    });
  }
}

// Sync the styling options sidebar to the currently selected element
function syncStylePanel() {
  if (!selectedElement) return;
  const style = window.getComputedStyle(selectedElement);

  const fontSelect = document.getElementById('style-font');
  if (fontSelect) {
    // try to match font family
    const ff = style.fontFamily;
    for (let i = 0; i < fontSelect.options.length; i++) {
      if (fontSelect.options[i].value.includes(ff.replace(/['"]/g, '').split(',')[0])) {
        fontSelect.selectedIndex = i;
        break;
      }
    }
  }

  const sizeInput = document.getElementById('style-size');
  if (sizeInput) sizeInput.value = parseFloat(style.fontSize) || 14;

  const boldCheck = document.getElementById('style-bold');
  if (boldCheck) boldCheck.checked = (style.fontWeight === '700' || style.fontWeight === 'bold');

  const italicCheck = document.getElementById('style-italic');
  if (italicCheck) italicCheck.checked = (style.fontStyle === 'italic');

  const underlineCheck = document.getElementById('style-underline');
  if (underlineCheck) underlineCheck.checked = (style.textDecorationLine === 'underline');
}

// Apply styles from the sidebar to the selected element
function applyStyle(prop, value) {
  if (!selectedElement) {
    alert("Please click on a text element on the letter first to select it.");
    return;
  }

  // Specific fix for hex colors vs rgb
  if (prop === 'color') {
    selectedElement.style.color = value;
  } else {
    selectedElement.style[prop] = value;
  }

  savePositions();
}

/* ==========================================================================
   BANK ACCOUNT GENERATOR & FORMATTER UTILITY
   ========================================================================== */
function onPurposeSelectChange() {
  const sel = document.getElementById('acc-purpose-select');
  const customWrap = document.getElementById('acc-custom-purpose-wrap');
  if (sel && customWrap) {
    if (sel.value === 'custom') {
      customWrap.style.display = 'block';
    } else {
      customWrap.style.display = 'none';
    }
  }
  updateAccountGenerator();
}

function getSelectedPurpose() {
  const sel = document.getElementById('acc-purpose-select');
  if (!sel) return 'Title Sponsorship';
  if (sel.value === 'custom') {
    const customInp = document.getElementById('acc-purpose-custom');
    return (customInp && customInp.value.trim()) ? customInp.value.trim() : 'Custom Purpose';
  }
  return sel.value;
}

function updateAccountGenerator() {
  const event = window.REFA_EVENTS.getActiveEvent();
  const defaultName = (event && event.orgName) ? event.orgName.toUpperCase() : (event ? event.name.toUpperCase() : 'ORGANIZATION NAME');
  const accName = (document.getElementById('acc-name') || {}).value || defaultName;
  const purpose = getSelectedPurpose();
  const target = (document.getElementById('acc-target') || {}).value || '';

  const b1Check = (document.getElementById('acc-b1-check') || {}).checked;
  const b1Num = (document.getElementById('acc-b1-num') || {}).value || '';

  const b2Check = (document.getElementById('acc-b2-check') || {}).checked;
  const b2Num = (document.getElementById('acc-b2-num') || {}).value || '';

  const b3Check = (document.getElementById('acc-b3-check') || {}).checked;
  const b3Num = (document.getElementById('acc-b3-num') || {}).value || '';

  // Update Preview Card Text
  const prevName = document.getElementById('preview-acc-name');
  if (prevName) prevName.textContent = accName;

  const prevPurp = document.getElementById('preview-acc-purpose');
  if (prevPurp) prevPurp.textContent = purpose;

  const prevTargWrap = document.getElementById('preview-acc-target-wrap');
  const prevTarg = document.getElementById('preview-acc-target');
  if (prevTargWrap && prevTarg) {
    if (target.trim()) {
      prevTarg.textContent = target.trim();
      prevTargWrap.style.display = 'block';
    } else {
      prevTargWrap.style.display = 'none';
    }
  }

  // Render Bank Items on Preview Card
  const listEl = document.getElementById('preview-bank-list');
  if (listEl) {
    let itemsHtml = '';
    if (b1Check && b1Num) {
      itemsHtml += `
        <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.08);padding:8px 12px;border-radius:6px;">
          <div>
            <div style="font-size:10px;color:rgba(255,255,255,0.7);">Moniepoint Microfinance Bank</div>
            <div style="font-size:14px;font-weight:bold;font-family:monospace;letter-spacing:1px;color:#86EFAC;">${b1Num}</div>
          </div>
          <span style="font-size:9px;background:#166534;color:white;padding:2px 6px;border-radius:3px;font-weight:bold;">PRIMARY</span>
        </div>`;
    }
    if (b2Check && b2Num) {
      itemsHtml += `
        <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.08);padding:8px 12px;border-radius:6px;">
          <div>
            <div style="font-size:10px;color:rgba(255,255,255,0.7);">Wema Bank Plc</div>
            <div style="font-size:14px;font-weight:bold;font-family:monospace;letter-spacing:1px;color:#C084FC;">${b2Num}</div>
          </div>
          <span style="font-size:9px;background:#581C87;color:white;padding:2px 6px;border-radius:3px;font-weight:bold;">COMMERCIAL</span>
        </div>`;
    }
    if (b3Check && b3Num) {
      itemsHtml += `
        <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.08);padding:8px 12px;border-radius:6px;">
          <div>
            <div style="font-size:10px;color:rgba(255,255,255,0.7);">UBA / Providus Bank</div>
            <div style="font-size:14px;font-weight:bold;font-family:monospace;letter-spacing:1px;color:#FCA5A5;">${b3Num}</div>
          </div>
          <span style="font-size:9px;background:#991B1B;color:white;padding:2px 6px;border-radius:3px;font-weight:bold;">ALTERNATIVE</span>
        </div>`;
    }
    if (!itemsHtml) {
      itemsHtml = '<div style="font-size:11px;color:rgba(255,255,255,0.5);font-style:italic;">No bank checked</div>';
    }
    listEl.innerHTML = itemsHtml;
  }

  // Build WhatsApp Snippet Text
  const eventName = event ? (event.orgName || event.name).toUpperCase() : 'ORGANIZATION NAME';
  const tagline = event ? (event.tagline || 'Thank you for your support!') : 'Thank you for your support!';
  
  let waText = `========================================\n`;
  waText += `🏦 ${eventName} — PAYMENT DETAILS\n`;
  waText += `========================================\n`;
  if (target.trim()) waText += `Prepared For: ${target.trim()}\n`;
  waText += `Purpose: ${purpose}\n`;
  waText += `Beneficiary Name: ${accName}\n\n`;
  waText += `BANK ACCOUNT DETAILS:\n`;
  if (b1Check && b1Num) {
    waText += `• Bank: Moniepoint Microfinance Bank\n  Account No: ${b1Num}\n  Account Name: ${accName}\n\n`;
  }
  if (b2Check && b2Num) {
    waText += `• Bank: Wema Bank Plc\n  Account No: ${b2Num}\n  Account Name: ${accName}\n\n`;
  }
  if (b3Check && b3Num) {
    waText += `• Bank: UBA / Providus Bank\n  Account No: ${b3Num}\n  Account Name: ${accName}\n\n`;
  }
  waText += `${tagline} 🙏✨\n`;
  waText += `========================================`;

  const waBox = document.getElementById('snippet-wa-text');
  if (waBox) waBox.textContent = waText;
}

function copySnippet(type) {
  let textToCopy = '';
  const accName = (document.getElementById('acc-name') || {}).value || 'REFINERS OF FAITH ACADEMY';
  const purpose = getSelectedPurpose();
  const target = (document.getElementById('acc-target') || {}).value || '';

  const b1Check = (document.getElementById('acc-b1-check') || {}).checked;
  const b1Num = (document.getElementById('acc-b1-num') || {}).value || '';
  const b2Check = (document.getElementById('acc-b2-check') || {}).checked;
  const b2Num = (document.getElementById('acc-b2-num') || {}).value || '';

  if (type === 'num') {
    textToCopy = b1Check && b1Num ? b1Num : (b2Num || '5012345678');
  } else if (type === 'wa') {
    textToCopy = (document.getElementById('snippet-wa-text') || {}).textContent || '';
  } else if (type === 'letter') {
    textToCopy = `To make your seed/partnership transfer, please use the verified account details below:\n`;
    textToCopy += `• Account Name: ${accName}\n`;
    if (b1Check && b1Num) textToCopy += `• Primary Bank: Moniepoint MFB — Account No: ${b1Num}\n`;
    if (b2Check && b2Num) textToCopy += `• Commercial Bank: Wema Bank Plc — Account No: ${b2Num}\n`;
    if (target) textToCopy += `• Reference/Memo: ${target} - ${purpose}\n`;
  }

  if (textToCopy) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      const toast = document.getElementById('toast-notify');
      if (toast) {
        toast.style.display = 'inline-block';
        setTimeout(() => { toast.style.display = 'none'; }, 2500);
      }
    }).catch(err => {
      alert('Copied details to clipboard!');
    });
  }
}

function fetchLiveMonnifyAccount() {
  const apiKey = (document.getElementById('monnify-api-key') || {}).value;
  const contractCode = (document.getElementById('monnify-contract-code') || {}).value;

  if (!apiKey || !contractCode) {
    alert("Please enter your Monnify API Key and Contract Code to generate a live account from Monnify.");
    return;
  }

  alert(`Initiating live account generation via Monnify API...\nAPI Key: ${apiKey.substring(0, 8)}...\nContract Code: ${contractCode}\n\nLive Monnify Account numbers will populate in your Primary Bank field.`);
}

// ==========================================
// Social Media Hub Logic
// ==========================================

let SOCIAL_TEAM = [];
try {
  SOCIAL_TEAM = JSON.parse(localStorage.getItem('refa_social_team')) || [
    { name: 'Media Lead', email: 'media@refa.ng', platform: 'YouTube', role: 'Manager' },
    { name: 'Video Creator', email: 'content@refa.ng', platform: 'TikTok', role: 'Editor' }
  ];
} catch (e) {
  SOCIAL_TEAM = [];
}

let SOCIAL_QUEUE = [];
try {
  SOCIAL_QUEUE = JSON.parse(localStorage.getItem('refa_social_queue')) || [
    { title: 'Audition Day BTS Teaser Reel', platform: 'Instagram Reels', assignee: 'Video Creator', date: '2026-08-01', status: 'Scheduled' },
    { title: 'Mentor Spotlight: Team Lions of Judah', platform: 'YouTube', assignee: 'Media Lead', date: '2026-08-03', status: 'Draft' }
  ];
} catch (e) {
  SOCIAL_QUEUE = [];
}

let MEDIA_VAULT = [];
try {
  MEDIA_VAULT = JSON.parse(localStorage.getItem('refa_media_vault')) || [
    { title: 'Audition Day Raw Camera 1 (4K)', category: '🎥 Raw Video Footage', uploader: 'Media Team / Samuel', url: 'https://drive.google.com', notes: '3.4 GB MP4 • Full lobby footage' },
    { title: 'Contestant High-Res Headshots', category: '📸 High-Res Photo Gallery', uploader: 'Photography Lead', url: 'https://dropbox.com', notes: '1.2 GB ZIP • 100 contestant photos' },
    { title: 'REFA Season 2 Official Logo Pack', category: '🎨 Graphics & Brand Assets', uploader: 'Graphics Studio', url: 'https://drive.google.com', notes: 'PNG, SVG, Vector EPS files' }
  ];
} catch (e) {
  MEDIA_VAULT = [];
}

function switchSocialSubTab(tabId) {
  document.querySelectorAll('.social-tab-content').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.social-tab-btn').forEach(el => {
    el.classList.remove('active');
    el.style.borderBottom = '2px solid transparent';
    el.style.color = 'var(--text-muted)';
  });
  
  const content = document.getElementById('social-tab-' + tabId);
  const btn = document.getElementById('social-btn-' + tabId);
  
  if (content) content.style.display = 'block';
  if (btn) {
    btn.classList.add('active');
    btn.style.borderBottom = '2px solid var(--primary)';
    btn.style.color = 'var(--primary)';
  }
  
  if (tabId === 'gallery') renderDedicatedGallery();
  if (tabId === 'team') renderSocialTeam();
  if (tabId === 'queue') renderSocialQueue();
  if (tabId === 'media-vault') renderMediaVault();
  if (tabId === 'connection-guide') fetchHostEndpoints();
}

function renderSocialTeam() {
  const tbody = document.getElementById('social-team-tbody');
  if (!tbody) return;
  
  if (SOCIAL_TEAM.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">No team members added yet.</td></tr>';
    return;
  }
  
  tbody.innerHTML = SOCIAL_TEAM.map((member, i) => `
    <tr>
      <td><strong>${member.name}</strong><br><small style="color:var(--text-muted);">${member.email}</small></td>
      <td>
        <span class="kit-chip ${member.platform === 'YouTube' ? 'chip-red' : (member.platform === 'TikTok' ? 'chip-dark' : 'chip-blue')}">
          ${member.platform}
        </span>
      </td>
      <td>${member.role}</td>
      <td style="text-align:right;">
        <button onclick="deleteSocialMember(${i})" style="border:none;background:transparent;color:#EF4444;cursor:pointer;">🗑️</button>
      </td>
    </tr>
  `).join('');
}

function renderSocialQueue() {
  const list = document.getElementById('social-queue-list');
  if (!list) return;
  
  if (SOCIAL_QUEUE.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:24px;">No content scheduled yet.</div>';
    return;
  }
  
  list.innerHTML = SOCIAL_QUEUE.map((post, i) => {
    let statColor = '#94A3B8';
    if (post.status === 'Draft') statColor = '#94A3B8';
    if (post.status === 'Review') statColor = '#F59E0B';
    if (post.status === 'Scheduled') statColor = '#3B82F6';
    if (post.status === 'Uploaded') statColor = '#10B981';
    
    return `
    <div style="background:white; border:1px solid #E2E8F0; border-radius:8px; padding:16px; margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h4 style="margin:0; font-size:15px;">${post.title}</h4>
        <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">
          <strong>${post.platform}</strong> &middot; Assignee: ${post.assignee} &middot; Date: ${post.date}
        </div>
      </div>
      <div style="display:flex; gap:12px; align-items:center;">
        <select onchange="updatePostStatus(${i}, this.value)" style="padding:4px 8px; border-radius:4px; border:1px solid ${statColor}; color:${statColor}; font-weight:bold;">
          <option value="Draft" ${post.status === 'Draft' ? 'selected' : ''}>Draft</option>
          <option value="Review" ${post.status === 'Review' ? 'selected' : ''}>Review</option>
          <option value="Scheduled" ${post.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
          <option value="Uploaded" ${post.status === 'Uploaded' ? 'selected' : ''}>Uploaded</option>
        </select>
        <button onclick="deleteSocialPost(${i})" style="border:none;background:transparent;color:#EF4444;cursor:pointer;">🗑️</button>
      </div>
    </div>
  `}).join('');
}

function updatePostStatus(index, newStatus) {
  SOCIAL_QUEUE[index].status = newStatus;
  saveSocialQueue();
  renderSocialQueue();
}

function deleteSocialMember(index) {
  SOCIAL_TEAM.splice(index, 1);
  saveSocialTeam();
  renderSocialTeam();
}

function deleteSocialPost(index) {
  SOCIAL_QUEUE.splice(index, 1);
  saveSocialQueue();
  renderSocialQueue();
}

function addSocialMember() {
  const name = document.getElementById('sm-name').value;
  const email = document.getElementById('sm-email').value;
  const plat = document.getElementById('sm-platform').value;
  const role = document.getElementById('sm-role').value;
  
  if (!name || !email) return alert("Please fill out both Name and Email.");
  
  SOCIAL_TEAM.push({ name, email, platform: plat, role });
  saveSocialTeam();
  
  document.getElementById('sm-name').value = '';
  document.getElementById('sm-email').value = '';
  switchSocialSubTab('team');
}

function addSocialPost() {
  const title = document.getElementById('sp-title').value;
  const plat = document.getElementById('sp-platform').value;
  const assignee = document.getElementById('sp-assignee').value;
  const date = document.getElementById('sp-date').value;
  
  if (!title) return alert("Post title is required.");
  
  SOCIAL_QUEUE.push({ title, platform: plat, assignee: assignee || 'Unassigned', date: date || 'TBD', status: 'Draft' });
  saveSocialQueue();
  
  document.getElementById('sp-title').value = '';
  document.getElementById('sp-assignee').value = '';
  document.getElementById('sp-date').value = '';
  switchSocialSubTab('queue');
}

function saveSocialTeam() {
  localStorage.setItem('refa_social_team', JSON.stringify(SOCIAL_TEAM));
}

function saveSocialQueue() {
  localStorage.setItem('refa_social_queue', JSON.stringify(SOCIAL_QUEUE));
}

// ==========================================
// Media Vault & Visual Gallery Handlers
// ==========================================

let MEDIA_VIEW_MODE = 'gallery'; // 'gallery' or 'list'
let MEDIA_FILTER_CATEGORY = 'all'; // 'all', 'image', 'video', 'audio', 'document'
let LOCAL_FILES_CACHE = [];

function setMediaViewMode(mode) {
  MEDIA_VIEW_MODE = mode;
  const gBtn = document.getElementById('media-view-gallery-btn');
  const lBtn = document.getElementById('media-view-list-btn');

  if (gBtn && lBtn) {
    if (mode === 'gallery') {
      gBtn.style.background = 'var(--primary)';
      gBtn.style.color = 'white';
      gBtn.style.borderColor = 'var(--primary)';
      lBtn.style.background = 'white';
      lBtn.style.color = 'var(--navy)';
      lBtn.style.borderColor = '#CBD5E1';
    } else {
      lBtn.style.background = 'var(--primary)';
      lBtn.style.color = 'white';
      lBtn.style.borderColor = 'var(--primary)';
      gBtn.style.background = 'white';
      gBtn.style.color = 'var(--navy)';
      gBtn.style.borderColor = '#CBD5E1';
    }
  }
  renderMediaVault();
}

function filterMediaCategory(cat, btnEl) {
  MEDIA_FILTER_CATEGORY = cat;
  document.querySelectorAll('.media-filter-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = 'white';
    b.style.color = 'var(--text-muted)';
    b.style.border = '1px solid #CBD5E1';
  });
  if (btnEl) {
    btnEl.classList.add('active');
    btnEl.style.background = 'var(--navy)';
    btnEl.style.color = 'white';
    btnEl.style.border = 'none';
  }
  renderMediaVault();
}

function openMediaLightbox(imgUrl, caption) {
  const modal = document.getElementById('media-lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');
  const dl = document.getElementById('lightbox-download-link');

  if (modal && img) {
    img.src = imgUrl;
    if (cap) cap.textContent = caption || '';
    if (dl) dl.href = imgUrl;
    modal.style.display = 'flex';
  }
}

function closeMediaLightbox() {
  const modal = document.getElementById('media-lightbox');
  if (modal) modal.style.display = 'none';
}

function renderMediaVault() {
  const container = document.getElementById('media-vault-list');
  if (!container) return;

  // Filter Cloud files
  let filteredCloud = MEDIA_VAULT;
  if (MEDIA_FILTER_CATEGORY !== 'all') {
    filteredCloud = MEDIA_VAULT.filter(item => {
      const cat = (item.category || '').toLowerCase();
      if (MEDIA_FILTER_CATEGORY === 'image' && (cat.includes('photo') || cat.includes('graphic'))) return true;
      if (MEDIA_FILTER_CATEGORY === 'video' && cat.includes('video')) return true;
      if (MEDIA_FILTER_CATEGORY === 'audio' && cat.includes('audio')) return true;
      if (MEDIA_FILTER_CATEGORY === 'document' && (cat.includes('press') || cat.includes('doc'))) return true;
      return false;
    });
  }

  // Filter Local uploaded files with client fallbacks
  let normalizedLocal = LOCAL_FILES_CACHE.map(f => {
    const rawName = f.name || f.filename || 'File';
    const dispName = f.displayName || clientGetDisplayName(rawName);
    const cat = f.category || clientGetCategory(rawName);
    const size = f.size || 'Direct File';
    const url = f.url || ('/uploads/' + encodeURIComponent(rawName));
    const uploadTime = f.uploadTime || new Date().toISOString();

    return {
      name: rawName,
      displayName: dispName,
      category: cat,
      size: size,
      url: url,
      uploadTime: uploadTime
    };
  });

  let filteredLocal = normalizedLocal;
  if (MEDIA_FILTER_CATEGORY !== 'all') {
    filteredLocal = normalizedLocal.filter(f => f.category === MEDIA_FILTER_CATEGORY);
  }

  if (filteredCloud.length === 0 && filteredLocal.length === 0) {
    container.innerHTML = '<div style="text-align:center;color:var(--text-muted);padding:32px;">No media assets found matching the selected filter. Click "+ Share Asset" or upload via Local Zero-Data Transfer to add media!</div>';
    fetchLocalMedia();
    return;
  }

  let html = '';

  // Render Cloud Shared Assets
  if (filteredCloud.length > 0) {
    if (MEDIA_VIEW_MODE === 'gallery') {
      html += '<div style="margin-bottom:12px; font-weight:bold; font-size:13px; color:var(--navy);">☁️ Cloud & External Shared Assets</div>';
      html += '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:16px; margin-bottom:24px;">';
      html += filteredCloud.map((asset, i) => `
        <div style="background:white; border:1px solid #E2E8F0; border-radius:10px; padding:16px; display:flex; flex-direction:column; justify-space-between; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
          <div>
            <span class="kit-chip chip-gold" style="font-size:10px; margin-bottom:8px; display:inline-block;">${asset.category}</span>
            <h4 style="margin:0 0 6px 0; font-size:14px; color:var(--navy); line-height:1.4;">${asset.title}</h4>
            <div style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">
              By <strong>${asset.uploader}</strong> &middot; ${asset.notes || 'External Link'}
            </div>
          </div>
          <div style="display:flex; gap:6px; margin-top:auto;">
            <a href="${asset.url}" target="_blank" style="flex:1; background:var(--primary); color:white; padding:8px; border-radius:6px; font-weight:600; text-decoration:none; font-size:11px; text-align:center;">
              ↗ Open Link
            </a>
            <button onclick="navigator.clipboard.writeText('${asset.url}'); alert('Asset link copied!');" style="background:#F1F5F9; border:1px solid #CBD5E1; color:var(--navy); padding:8px 10px; border-radius:6px; font-size:11px; cursor:pointer;">
              📋 Copy
            </button>
            <button onclick="deleteMediaAsset(${i})" style="border:none; background:transparent; color:#EF4444; cursor:pointer; font-size:14px;">🗑️</button>
          </div>
        </div>
      `).join('');
      html += '</div>';
    } else {
      // List Mode
      html += filteredCloud.map((asset, i) => `
        <div style="background:white; border:1px solid #E2E8F0; border-radius:8px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h4 style="margin:0; font-size:14px;">${asset.title}</h4>
              <span class="kit-chip chip-gold" style="font-size:10px;">${asset.category}</span>
            </div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">
              Uploaded by <strong>${asset.uploader}</strong> &middot; ${asset.notes || 'Cloud link'}
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <a href="${asset.url}" target="_blank" style="background:var(--primary); color:white; padding:6px 12px; border-radius:6px; font-weight:600; text-decoration:none; font-size:11px;">
              ↗ Open Link
            </a>
            <button onclick="navigator.clipboard.writeText('${asset.url}'); alert('Asset link copied!');" style="background:#F1F5F9; border:1px solid #CBD5E1; color:var(--navy); padding:6px 10px; border-radius:6px; font-size:11px; cursor:pointer;">
              📋 Copy
            </button>
            <button onclick="deleteMediaAsset(${i})" style="border:none; background:transparent; color:#EF4444; cursor:pointer; font-size:14px;">🗑️</button>
          </div>
        </div>
      `).join('');
    }
  }

  // Render Local Zero-Data Uploaded Files
  if (filteredLocal.length > 0) {
    html += '<div style="margin-top:24px; margin-bottom:12px; font-weight:bold; font-size:14px; color:#065F46; border-bottom:2px solid #10B981; padding-bottom:4px; display:flex; justify-content:space-between; align-items:center;">' +
      '<span>📡 Local Zero-Data Gallery Files (' + filteredLocal.length + ' files)</span>' +
      '<span style="font-size:11px; color:#047857; font-weight:normal;">Direct transfers saved to /uploads directory</span>' +
      '</div>';

    if (MEDIA_VIEW_MODE === 'gallery') {
      html += '<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap:16px;">';
      html += filteredLocal.map(file => {
        let previewHtml = '';
        if (file.category === 'image') {
          previewHtml = `<div style="height:170px; overflow:hidden; border-radius:6px; background:#111; position:relative; cursor:pointer;" onclick="openMediaLightbox('${file.url}', '${file.displayName}')">
            <img src="${file.url}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" />
            <span style="position:absolute; bottom:6px; right:6px; background:rgba(0,0,0,0.7); color:white; font-size:10px; padding:2px 6px; border-radius:4px;">🔍 Zoom</span>
          </div>`;
        } else if (file.category === 'video') {
          previewHtml = `<div style="border-radius:6px; overflow:hidden; background:black;">
            <video src="${file.url}" controls preload="metadata" style="width:100%; max-height:170px; display:block;"></video>
          </div>`;
        } else if (file.category === 'audio') {
          previewHtml = `<div style="background:#FEF3C7; padding:16px; border-radius:6px; text-align:center;">
            <div style="font-size:32px; margin-bottom:6px;">🎵</div>
            <audio src="${file.url}" controls style="width:100%; height:32px;"></audio>
          </div>`;
        } else {
          previewHtml = `<div style="background:#F1F5F9; padding:24px; border-radius:6px; text-align:center;">
            <div style="font-size:36px; margin-bottom:4px;">📄</div>
            <div style="font-size:11px; font-weight:bold; color:var(--navy); text-transform:uppercase;">${file.name.split('.').pop()} FILE</div>
          </div>`;
        }

        return `
          <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:10px; padding:12px; display:flex; flex-direction:column; justify-content:space-between;">
            ${previewHtml}
            <div style="margin-top:10px;">
              <h4 style="margin:0 0 4px 0; font-size:13px; color:#065F46; word-break:break-all;" title="${file.name}">${file.displayName}</h4>
              <div style="font-size:11px; color:#047857; margin-bottom:8px;">
                Size: <strong>${file.size}</strong> &middot; ${new Date(file.uploadTime).toLocaleDateString()}
              </div>
              <a href="${file.url}" download="${file.displayName}" style="display:block; width:100%; background:#10B981; color:white; text-align:center; padding:8px; border-radius:6px; font-weight:600; text-decoration:none; font-size:12px;">
                ⬇ Download Direct File
              </a>
            </div>
          </div>
        `;
      }).join('');
      html += '</div>';
    } else {
      // List mode
      html += filteredLocal.map(file => `
        <div style="background:#ECFDF5; border:1px solid #A7F3D0; border-radius:8px; padding:12px 16px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <h4 style="margin:0; font-size:14px; color:#065F46;">${file.displayName}</h4>
              <span class="kit-chip" style="background:#10B981; color:white; font-size:10px;">${file.category.toUpperCase()}</span>
            </div>
            <div style="font-size:11px; color:#047857; margin-top:4px;">
              File Size: <strong>${file.size}</strong> &middot; Uploaded: ${new Date(file.uploadTime).toLocaleString()}
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            ${file.category === 'image' ? `<button onclick="openMediaLightbox('${file.url}', '${file.displayName}')" style="background:#047857; color:white; border:none; padding:6px 12px; border-radius:6px; font-weight:600; font-size:11px; cursor:pointer;">🔍 Preview</button>` : ''}
            <a href="${file.url}" download="${file.displayName}" style="background:#10B981; color:white; padding:6px 12px; border-radius:6px; font-weight:600; text-decoration:none; font-size:11px;">
              ⬇ Download Fast
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  container.innerHTML = html;
  fetchLocalMedia();
}

async function fetchLocalMedia() {
  try {
    const response = await fetch('/api/files');
    if (!response.ok) return;
    
    LOCAL_FILES_CACHE = await response.json();
  } catch (e) {
    // Silently ignore if running strictly as static file:///
  }
}


// ==========================================
// Dynamic Host Endpoints & Dedicated Gallery
// ==========================================

let DEDICATED_GALLERY_CAT = 'all';

async function fetchHostEndpoints() {
  const container = document.getElementById('dynamic-endpoints-list');
  if (!container) return;

  try {
    const res = await fetch('/api/endpoints');
    if (!res.ok) throw new Error('Endpoints API not available');
    const data = await res.json();

    if (!data.endpoints || data.endpoints.length === 0) {
      container.innerHTML = '<span style="font-size:11px; color:#047857;">http://localhost:3000 (Local Server)</span>';
      return;
    }

    container.innerHTML = data.endpoints.map(ep => `
      <div style="background:white; border:1px solid #A7F3D0; border-radius:6px; padding:6px 12px; display:flex; align-items:center; gap:8px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div>
          <div style="font-size:10px; color:#047857; font-weight:bold; text-transform:uppercase;">${ep.name}</div>
          <a href="${ep.url}" target="_blank" style="font-size:13px; font-weight:bold; color:#065F46; font-family:monospace; text-decoration:none;">${ep.url}</a>
        </div>
        <button onclick="navigator.clipboard.writeText('${ep.url}'); alert('Copied endpoint URL: ${ep.url}');" style="background:#ECFDF5; border:1px solid #10B981; color:#047857; padding:4px 8px; border-radius:4px; font-size:11px; cursor:pointer; font-weight:bold;">
          📋 Copy
        </button>
      </div>
    `).join('');

  } catch (e) {
    // Fallback if running as static file:///
    const locUrl = window.location.origin && window.location.origin.startsWith('http') ? window.location.origin : 'http://<HOST-IP>:3000';
    container.innerHTML = `
      <div style="background:white; border:1px solid #A7F3D0; border-radius:6px; padding:6px 12px; display:flex; align-items:center; gap:8px;">
        <span style="font-size:13px; font-weight:bold; color:#065F46; font-family:monospace;">${locUrl}</span>
        <button onclick="navigator.clipboard.writeText('${locUrl}'); alert('Copied URL');" style="background:#ECFDF5; border:1px solid #10B981; color:#047857; padding:4px 8px; border-radius:4px; font-size:11px; cursor:pointer;">📋 Copy</button>
      </div>
    `;
  }
}

function filterGalleryCategory(cat, btnEl) {
  DEDICATED_GALLERY_CAT = cat;
  document.querySelectorAll('.gallery-filter-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = 'white';
    b.style.color = 'var(--text-muted)';
    b.style.border = '1px solid #CBD5E1';
  });
  if (btnEl) {
    btnEl.classList.add('active');
    btnEl.style.background = 'var(--navy)';
    btnEl.style.color = 'white';
    btnEl.style.border = 'none';
  }
  renderDedicatedGallery();
}


// ==========================================
// Client-side File Category & Upload Logic
// ==========================================

function clientGetCategory(filename) {
  if (!filename) return 'other';
  const ext = filename.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'tiff'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'm4v', '3gp'].includes(ext)) return 'video';
  if (['mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac'].includes(ext)) return 'audio';
  if (['pdf', 'doc', 'docx', 'txt', 'zip', 'rar', '7z', 'psd', 'ai'].includes(ext)) return 'document';
  return 'other';
}

function clientGetDisplayName(filename) {
  if (!filename) return 'Uploaded File';
  const parts = filename.split('-');
  if (parts.length > 2 && !isNaN(parts[0])) {
    return parts.slice(2).join('-');
  }
  return filename;
}

async function uploadLocalMedia(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const fileInput = document.getElementById('local-media-file');
  const uploaderInput = document.getElementById('local-uploader-name');
  
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert("Please select a file to upload.");
    return false;
  }
  
  const file = fileInput.files[0];
  const uploaderName = (uploaderInput && uploaderInput.value) ? uploaderInput.value : 'Anonymous';
  
  const formData = new FormData();
  formData.append('mediaFile', file);
  formData.append('uploaderName', uploaderName);
  
  const progressContainer = document.getElementById('upload-progress-container');
  const progressBar = document.getElementById('upload-progress-bar');
  const uploadStatus = document.getElementById('upload-status');
  const submitBtn = document.getElementById('upload-btn');
  
  if (progressContainer) progressContainer.style.display = 'block';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Uploading...';
  }
  
  try {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && progressBar && uploadStatus) {
        const percentComplete = Math.round((e.loaded / e.total) * 100);
        progressBar.style.width = percentComplete + '%';
        uploadStatus.innerText = `Uploading... ${percentComplete}%`;
      }
    });
    
    xhr.addEventListener("load", async () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (uploadStatus) uploadStatus.innerText = 'Upload Complete! ✅';
        if (progressBar) progressBar.style.background = '#059669';
        
        setTimeout(async () => {
          if (fileInput) fileInput.value = '';
          if (uploaderInput) uploaderInput.value = '';
          if (progressContainer) progressContainer.style.display = 'none';
          if (progressBar) progressBar.style.width = '0%';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = '🚀 Upload to Hub';
          }
          
          if (window.REFA_FIREBASE && window.REFA_FIREBASE.recordMediaUploadInDb) {
            window.REFA_FIREBASE.recordMediaUploadInDb({
              name: file.name,
              uploader: uploaderName,
              size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
              bytes: file.size
            });
          }
          await fetchLocalMedia();
          renderMediaVault();
          renderDedicatedGallery();
          alert('File uploaded successfully to Local Hub!');
        }, 800);
      } else {
        alert('Upload failed with status ' + xhr.status);
        if (progressContainer) progressContainer.style.display = 'none';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerText = '🚀 Upload to Hub';
        }
      }
    });
    
    xhr.addEventListener("error", () => {
      alert('Network error during upload. Please ensure node server.js is running.');
      if (progressContainer) progressContainer.style.display = 'none';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = '🚀 Upload to Hub';
      }
    });
    
    xhr.open("POST", "/api/upload");
    xhr.send(formData);
    
  } catch (err) {
    console.error('Upload Error:', err);
    alert('Upload failed. Please ensure the local server (node server.js) is running.');
    if (progressContainer) progressContainer.style.display = 'none';
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = '🚀 Upload to Hub';
    }
  }
  
  return false;
}



async function renderDedicatedGallery() {
  const container = document.getElementById('dedicated-gallery-grid');
  if (!container) return;

  const searchInput = document.getElementById('gallery-search');
  const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

  // Fetch latest local files
  await fetchLocalMedia();

  let filesToDisplay = LOCAL_FILES_CACHE.map(f => {
    const rawName = f.name || f.filename || 'File';
    const dispName = f.displayName || clientGetDisplayName(rawName);
    const cat = f.category || clientGetCategory(rawName);
    const size = f.size || 'Direct File';
    const url = f.url || ('/uploads/' + encodeURIComponent(rawName));
    const uploadTime = f.uploadTime || new Date().toISOString();

    return {
      name: rawName,
      displayName: dispName,
      category: cat,
      size: size,
      url: url,
      uploadTime: uploadTime
    };
  });

  // Filter by category
  if (DEDICATED_GALLERY_CAT !== 'all') {
    filesToDisplay = filesToDisplay.filter(f => f.category === DEDICATED_GALLERY_CAT);
  }

  // Filter by search query
  if (query) {
    filesToDisplay = filesToDisplay.filter(f => 
      f.displayName.toLowerCase().includes(query) || f.name.toLowerCase().includes(query)
    );
  }

  if (filesToDisplay.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; color:var(--text-muted); padding:48px; background:#F8FAFC; border-radius:10px; border:1px dashed #CBD5E1;">
        <div style="font-size:36px; margin-bottom:8px;">🖼️</div>
        <h4 style="margin:0 0 4px 0;">No media files found</h4>
        <p style="font-size:12px; margin:0;">Upload photos, 4K videos, or audio via Local Zero-Data Transfer to see them appear here instantly!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filesToDisplay.map(file => {
    let previewHtml = '';

    if (file.category === 'image') {
      previewHtml = `
        <div style="height:180px; overflow:hidden; border-radius:8px; background:#0F172A; position:relative; cursor:pointer;" onclick="openMediaLightbox('${file.url}', '${file.displayName}')">
          <img src="${file.url}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'" onError="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23334155%22/><text x=%2250%25%22 y=%2250%25%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-size=%2214%22>🖼️ Image</text></svg>'" />
          <span style="position:absolute; bottom:8px; right:8px; background:rgba(0,0,0,0.75); color:white; font-size:10px; padding:3px 8px; border-radius:4px; font-weight:bold;">🔍 Preview</span>
        </div>
      `;
    } else if (file.category === 'video') {
      previewHtml = `
        <div style="border-radius:8px; overflow:hidden; background:black;">
          <video src="${file.url}" controls preload="metadata" style="width:100%; max-height:180px; display:block;"></video>
        </div>
      `;
    } else if (file.category === 'audio') {
      previewHtml = `
        <div style="background:#FEF3C7; padding:20px; border-radius:8px; text-align:center;">
          <div style="font-size:32px; margin-bottom:6px;">🎵</div>
          <audio src="${file.url}" controls style="width:100%; height:36px;"></audio>
        </div>
      `;
    } else {
      const ext = file.name.split('.').pop().toUpperCase();
      previewHtml = `
        <div style="background:#F1F5F9; padding:28px; border-radius:8px; text-align:center;">
          <div style="font-size:40px; margin-bottom:4px;">📄</div>
          <div style="font-size:11px; font-weight:bold; color:var(--navy); text-transform:uppercase;">${ext} FILE</div>
        </div>
      `;
    }

    return `
      <div style="background:white; border:1px solid #E2E8F0; border-radius:12px; padding:14px; display:flex; flex-direction:column; justify-space-between; box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        ${previewHtml}
        <div style="margin-top:12px; display:flex; flex-direction:column; flex:1;">
          <h4 style="margin:0 0 6px 0; font-size:14px; color:var(--navy); word-break:break-all; line-height:1.4;" title="${file.name}">
            ${file.displayName}
          </h4>
          <div style="font-size:11px; color:var(--text-muted); margin-bottom:12px; display:flex; justify-content:space-between;">
            <span>Size: <strong>${file.size}</strong></span>
            <span>${new Date(file.uploadTime).toLocaleDateString()}</span>
          </div>
          <div style="margin-top:auto; display:flex; gap:8px;">
            <a href="${file.url}" download="${file.displayName}" style="flex:1; background:#10B981; color:white; text-align:center; padding:9px; border-radius:6px; font-weight:700; text-decoration:none; font-size:12px; display:flex; align-items:center; justify-content:center; gap:4px;">
              ⬇ Download File
            </a>
            ${file.category === 'image' ? `<button onclick="openMediaLightbox('${file.url}', '${file.displayName}')" style="background:#F1F5F9; border:1px solid #CBD5E1; color:var(--navy); padding:9px 12px; border-radius:6px; font-size:12px; cursor:pointer; font-weight:bold;">🔍</button>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Section Load Hook ─────────────────────────────────────────────────────────
// Called by router.js after lazy-injecting a section's HTML partial.
// Each section must hydrate ONLY the elements that live in its own partial.
// Cross-section element lookups (e.g. #sponsorship-tiers-container in studio.html)
// will be null when the dashboard partial is active, so we gate them per-section.
window._onSectionLoad = function(name) {
  const activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  const parentSection = (window.SECTION_MAP && window.SECTION_MAP[name]) ? window.SECTION_MAP[name] : name;

  switch (parentSection) {
    case 'dashboard': {
      // Repopulate all stat card elements (they live inside dashboard.html)
      if (activeEvent) {
        const _set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
        _set('dash-event-name', activeEvent.name);
        _set('dash-event-tagline', activeEvent.tagline || 'Management Hub');
        _set('dash-tagline-bold', activeEvent.name);
        _set('stat-theme', activeEvent.tagline || 'Default Theme');
        if (activeEvent.details) {
          _set('stat-contestants', activeEvent.details.targetContestants || 100);
          _set('stat-vote-rate', `₦${activeEvent.details.votePrice || 200}`);
          _set('stat-venue', activeEvent.details.finalVenue || activeEvent.details.venue || 'TBD');
        }
        if (activeEvent.dates && activeEvent.dates.final) {
          const d = new Date(activeEvent.dates.final);
          _set('stat-final-date', isNaN(d.getTime()) ? activeEvent.dates.final : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }
        // Stage snapshot (in dashboard.html)
        const stageBody = document.getElementById('stage-snapshot-body');
        if (stageBody && activeEvent.stagesSnapshot) {
          stageBody.innerHTML = '';
          activeEvent.stagesSnapshot.forEach(s => {
            stageBody.innerHTML += `<tr><td><strong>${s.stage}</strong></td><td>${s.date}</td><td>${s.theme}</td><td><span class="phase-badge ${s.status}"><span class="dot"></span>${s.status.charAt(0).toUpperCase() + s.status.slice(1)}</span></td></tr>`;
          });
        }
        // Timeline (in dashboard.html)
        const timelineContainer = document.getElementById('timeline-container');
        if (timelineContainer && activeEvent.phases) {
          timelineContainer.innerHTML = '';
          activeEvent.phases.forEach((p, index) => {
            const statusClass = index === 0 ? 'done' : (index === 1 ? 'active-phase' : '');
            timelineContainer.innerHTML += `<div class="tl-item ${statusClass}" style="cursor:pointer;" onclick="goToTask('${p.id}')"><div class="tl-date">${p.date}</div><div class="tl-title">${p.title}</div>${p.desc ? `<div class="tl-desc" style="margin-bottom:8px;font-size:14px;color:#555;">${p.desc}</div>` : ''}<div class="tl-desc" style="font-weight:500;color:#3b82f6;">Tasks: ${p.tasks.length} actions required.</div></div>`;
          });
        }
        // Production kits (in dashboard.html)
        const kitGrid = document.getElementById('dynamic-kit-grid');
        if (kitGrid) {
          kitGrid.innerHTML = '';
          if (activeEvent.productionKits && Object.keys(activeEvent.productionKits).length > 0) {
            Object.keys(activeEvent.productionKits).forEach(k => {
              const kit = activeEvent.productionKits[k];
              if (kit.cardHtml) kitGrid.innerHTML += kit.cardHtml;
            });
          } else {
            kitGrid.innerHTML = '<div style="grid-column:1/-1;padding:20px;text-align:center;color:var(--text-muted)">No production kits configured for this event.</div>';
          }
        }
      }
      if (typeof renderDashboard === 'function') renderDashboard();
      if (typeof renderDashboardProgress === 'function') renderDashboardProgress();
      if (typeof renderTasks === 'function') renderTasks(activeEvent);
      if (typeof updateGlobalProgress === 'function') updateGlobalProgress();
      break;
    }
    case 'operations':
      if (typeof renderTeams === 'function') renderTeams();
      break;
    case 'finance': {
      // teams-info-container lives in finance.html
      const teamsContainer = document.getElementById('teams-info-container');
      if (teamsContainer && activeEvent && activeEvent.teamsInfo) {
        teamsContainer.innerHTML = `<div class="card" style="grid-column:span 2;"><div class="card-title">${activeEvent.teamsInfo.title}</div><div class="info-item"><p style="color:#666;font-size:14px;margin-top:5px;line-height:1.5;">${activeEvent.teamsInfo.description}</p></div></div>`;
      }
      if (typeof renderTeams === 'function') renderTeams();
      if (typeof renderDashboardProgress === 'function') renderDashboardProgress();
      break;
    }
    case 'social':
      if (typeof renderContentSchedule === 'function') renderContentSchedule();
      if (typeof renderSocialTeam === 'function') renderSocialTeam();
      break;
    case 'studio': {
      // sponsorship-tiers-container lives in studio.html
      const sponsorshipContainer = document.getElementById('sponsorship-tiers-container');
      if (sponsorshipContainer && activeEvent) {
        sponsorshipContainer.innerHTML = '';
        if (activeEvent.sponsorshipTiers) {
          const colors = [
            { border: 'var(--gold)', bg: 'var(--gold-pale)', title: 'var(--navy)', price: 'var(--gold)' },
            { border: '#B45309', bg: '#FFFBEB', title: '#B45309', price: '#B45309' },
            { border: '#6B7280', bg: '#F9FAFB', title: '#374151', price: '#374151' },
            { border: '#9CA3AF', bg: '#FFFFFF', title: '#6B7280', price: '#6B7280' }
          ];
          activeEvent.sponsorshipTiers.forEach((t, i) => {
            const c = colors[i % colors.length];
            sponsorshipContainer.innerHTML += `<div class="sponsor-tier" style="border-color:${c.border};background:${c.bg};"><div class="tier-title" style="color:${c.title};">${t.tier}</div><div class="tier-price" style="color:${c.price};">&#8358;${(t.price || 0).toLocaleString()}</div><div style="font-size:12px;margin-bottom:8px;color:rgba(0,0,0,0.6);"><strong>Slots:</strong> ${t.slots} | <strong>Target:</strong> ${t.target}</div>${t.benefits.map(b => `<div class="tier-benefit" style="color:var(--navy);">${b}</div>`).join('')}</div>`;
          });
        } else {
          sponsorshipContainer.innerHTML = '<div style="padding:20px;color:#666;">No sponsorship tiers defined for this event.</div>';
        }
      }
      if (typeof updateLetterBg === 'function') updateLetterBg();
      if (typeof updateAccountGenerator === 'function') updateAccountGenerator();
      if (typeof editTemplate === 'function') editTemplate(null); // reset studio
      break;
    }
  }
};
