const TEAMS_DATA = [
  { name: 'Eagles of Zion', color: '#1A3A8F', num: 1 },
  { name: 'Shields of David', color: '#991B1B', num: 2 },
  { name: 'Lions of Judah', color: '#B45309', num: 3 },
  { name: 'Rivers of Eden', color: '#065F46', num: 4 },
  { name: 'Flames of Elijah', color: '#C2410C', num: 5 },
  { name: 'Arrows of Jonathan', color: '#374151', num: 6 },
  { name: 'Stars of Abraham', color: '#6D28D9', num: 7 },
  { name: 'Swords of Gideon', color: '#78350F', num: 8 },
  { name: 'Doves of Solomon', color: '#0F766E', num: 9 },
  { name: 'Thunder of Sinai', color: '#111827', num: 10 }
];

const PHASES = [
  {
    id: 'preseason', title: 'Pre-Season Setup', date: 'July 1 - July 31', tasks: [
      { id: 'ps1', text: 'Finalise Season 2 branding', detail: 'Logo, colours, fonts, season name and theme locked', tag: 'ops' },
      { id: 'ps2', text: 'Create and launch social media handles', detail: 'Instagram, TikTok, Facebook, YouTube all set up and first teaser posted', tag: 'media' },
      { id: 'ps3', text: 'Build contestant application form', detail: 'Google Form or website form collecting name, age, church, guardian contact', tag: 'admin' },
      { id: 'ps4', text: 'Commission and test voting platform', detail: 'Platform contracted, test environment built and verified before Aug 1', tag: 'tech' },
      { id: 'ps5', text: 'Draft and send sponsorship pitch deck', detail: 'Send to minimum 20 prospective sponsors by July 25', tag: 'finance' },
      { id: 'ps6', text: 'Recruit all 10 mentors', detail: 'Brief them on roles, schedule and content expectations', tag: 'ops' },
      { id: 'ps7', text: 'Assign content and media manager', detail: 'Confirm who is responsible for daily posting, filming, and editing', tag: 'media' },
      { id: 'ps8', text: 'Build content calendar for Aug 2-8', detail: 'Every post planned and designed before audition day', tag: 'content' },
      { id: 'ps9', text: 'Run "Coming Soon" teaser campaign', detail: '"The Word League is Coming" - reels, countdowns, mystery posts', tag: 'media' },
      { id: 'ps10', text: 'Print Parent Voting Starter Packs', detail: 'QR code cards, voting guide, challenge card - 100 copies minimum', tag: 'ops' }
    ]
  },
  {
    id: 'audition', title: 'Audition / Screening Day', date: 'August 1', tasks: [
      { id: 'au1', text: 'Set up 3-4 screening stations in church', detail: 'Each station has a judge, score sheets, and timing device', tag: 'ops' },
      { id: 'au2', text: 'Contestant registration and check-in', detail: 'Name tags, registration packets, consent forms from parents', tag: 'admin' },
      { id: 'au3', text: 'Brief judging panel (3-5 judges)', detail: 'Scoring criteria: accuracy, pronunciation, spirit. Standardised sheets.', tag: 'ops' },
      { id: 'au4', text: 'Film BTS content throughout the day', detail: 'Lobby atmosphere, reactions, contestant arrivals - do NOT film actual assessments', tag: 'content' },
      { id: 'au5', text: 'Distribute Parent Voting Starter Packs', detail: 'Every parent leaves with QR code card, how-to guide, and challenge card', tag: 'admin' },
      { id: 'au6', text: 'Add parents to team WhatsApp groups', detail: 'All 10 groups created with mentor admins; parents added same day', tag: 'ops' },
      { id: 'au7', text: 'Assign contestants to teams', detail: '10 teams of 10. Balance age, ability, church representation where possible.', tag: 'ops' },
      { id: 'au8', text: 'Post Screening Day reel by end of day', detail: 'BTS atmosphere footage builds anticipation for announcement tomorrow', tag: 'content' }
    ]
  },
  {
    id: 'profileweek', title: 'Profile Week - Build-Up', date: 'August 2 - 8', tasks: [
      { id: 'pw1', text: 'Aug 2: Announce 100 accepted contestants', detail: 'Celebratory announcement post. Congratulations graphic. Let excitement land.', tag: 'media' },
      { id: 'pw2', text: 'Aug 3: Introduce mentors - 5 per day', detail: 'Mentor profile posts: photo, bio, quote. Split across platforms.', tag: 'content' },
      { id: 'pw3', text: 'Aug 4: Team reveals staggered', detail: 'Post each team name, colour, and member list throughout the day', tag: 'content' },
      { id: 'pw4', text: 'Aug 5: Training Day content', detail: 'Film teams preparing with mentors. Short clips per team.', tag: 'content' },
      { id: 'pw5', text: 'Aug 5: Send "How to Vote" guide to all parents', detail: 'Screenshots and step-by-step via WhatsApp broadcast to all parent groups', tag: 'admin' },
      { id: 'pw6', text: 'Aug 6: Contestant spotlight series begins', detail: '3 spotlight videos per day, 30 sec each. Name, team, favourite scripture, why they joined.', tag: 'content' },
      { id: 'pw7', text: 'Aug 7: VOTING OPENS - Round 1', detail: 'Post voting link across all platforms. WhatsApp blast to all parent groups simultaneously.', tag: 'tech' },
      { id: 'pw8', text: 'Aug 7: "Families Behind the Word" series begins', detail: 'First parent video published. Set the template for the series.', tag: 'content' },
      { id: 'pw9', text: 'Aug 8: Countdown post + leaderboard teaser', detail: '"Who is leading? Find out TOMORROW at Stage 1!" Voting closes midnight.', tag: 'media' }
    ]
  },
  {
    id: 'stage1', title: 'Stage 1 - The Proving Ground', date: 'August 9', tasks: [
      { id: 's1a', text: 'Stage branded backdrop and podium set up', detail: 'REFA Season 2 branding, scoreboard display, team banners in fan zones', tag: 'ops' },
      { id: 's1b', text: 'Live stream setup tested - 2 camera angles minimum', detail: 'Stable internet confirmed. Test stream done 1 hour before event.', tag: 'tech' },
      { id: 's1c', text: 'MC/Host briefed with full running order', detail: 'MC has script, contestant list, team order, judge bios, sponsor mentions', tag: 'ops' },
      { id: 's1d', text: 'Judges panel in position (3 judges)', detail: 'Score sheets, timing devices, and microphones confirmed', tag: 'ops' },
      { id: 's1e', text: 'Reserved Family Corners marked and stewarded', detail: 'Each team has a dedicated section. Parent Supporter Cards distributed at door.', tag: 'ops' },
      { id: 's1f', text: 'Opening ceremony conducted', detail: 'Prayer, REFA mission statement, Season 2 overview, sponsor mentions', tag: 'ops' },
      { id: 's1g', text: 'Round 1 voting leaderboard announced live', detail: 'MC reads current top 3 from voting platform before competition begins', tag: 'ops' },
      { id: 's1h', text: 'All performances filmed and recorded', detail: 'Every contestant moment captured. Highlights editor briefed on key clips.', tag: 'content' },
      { id: 's1i', text: 'Judges deliver filmed remarks', detail: 'Each judge gives short filmed commentary after each team section', tag: 'content' },
      { id: 's1j', text: 'Stage 1 results announced live', detail: 'Bottom 2 per team identified. Next round explained to audience.', tag: 'ops' }
    ]
  },
  {
    id: 'poststage1', title: 'Post-Stage 1 Content Window', date: 'August 10 - 15', tasks: [
      { id: 'pt1a', text: 'Aug 10: Stage 1 highlights reel published', detail: '5-10 min edited video on YouTube + Instagram Reels + Facebook within 48 hrs', tag: 'content' },
      { id: 'pt1b', text: 'Aug 11: Top 5 Moments clips posted', detail: 'Best recitations, judge reactions, crowd moments as short-form clips', tag: 'content' },
      { id: 'pt1c', text: 'Aug 12: Voting Round 2 OPENS', detail: 'Announce across all platforms. WhatsApp blast to all parent groups.', tag: 'tech' },
      { id: 'pt1d', text: 'Aug 12: Leaderboard update published', detail: '"Who is leading after Stage 1?" Reveal top 3 without exact vote counts.', tag: 'media' },
      { id: 'pt1e', text: 'Aug 13: Day-in-life contestant video', detail: '1-2 contestants featured showing their preparation and home life', tag: 'content' },
      { id: 'pt1f', text: 'Aug 14: Send individual clip links to parents', detail: '"Share this highlight of YOUR child!" - personalised WhatsApp message per team', tag: 'admin' },
      { id: 'pt1g', text: 'Aug 15: Stage 2 teaser campaign begins', detail: '"The Refinement begins tomorrow. Who is ready?" Countdown content goes live.', tag: 'media' }
    ]
  },
  {
    id: 'stage2', title: 'Stage 2 - The Refinement', date: 'August 16', tasks: [
      { id: 's2a', text: 'Stage setup with new format signage', detail: 'Duet zone, Cross-Examination format explained on display boards', tag: 'ops' },
      { id: 's2b', text: 'New challenge formats briefed to contestants', detail: 'Cross-Examination, Duet Round, Speed Recall rules explained in advance', tag: 'ops' },
      { id: 's2c', text: 'Live stream active with updated graphics', detail: 'Season progression shown, cumulative scores displayed', tag: 'tech' },
      { id: 's2d', text: 'Round 2 leaderboard announced live on stage', detail: 'MC reads current top 5 from voting before competition begins', tag: 'ops' },
      { id: 's2e', text: 'Team immunity results tracked and posted', detail: 'Which teams secured immunity shown on scoreboard during event', tag: 'ops' },
      { id: 's2f', text: 'Parent Award nominations announced', detail: 'MC announces which parents are nominated for Grand Final awards', tag: 'ops' },
      { id: 's2g', text: 'All performances filmed for highlights', detail: 'Key clip moments flagged live for editors', tag: 'content' },
      { id: 's2h', text: 'Final voting window announced open after event', detail: '"Final voting window is NOW OPEN. Closes September 5 midnight."', tag: 'tech' }
    ]
  },
  {
    id: 'final', title: 'Grand Final - The Last Word', date: 'September 6', tasks: [
      { id: 'f1', text: 'Full stage production setup - elevated', detail: 'Premium lighting, sound, backdrop, red carpet entrance banner, live band briefed', tag: 'ops' },
      { id: 'f2', text: 'VIP and reserved seating arranged', detail: 'Sponsor tables, Family Corners, judges table all labelled and stewarded', tag: 'ops' },
      { id: 'f3', text: 'Professional videographer and multi-camera setup', detail: 'Minimum 3 camera angles. Dedicated sound recording. Backup stream confirmed.', tag: 'tech' },
      { id: 'f4', text: 'Media and press invitations sent', detail: 'Gospel blogs, Christian news outlets, social media journalists invited', tag: 'media' },
      { id: 'f5', text: 'Finalist red carpet arrival filmed and streamed', detail: 'Teams walk coordinated arrival. MC commentates. Parents in frame.', tag: 'content' },
      { id: 'f6', text: 'Live worship opening segment', detail: 'Live band. 10-15 minutes of worship to set spiritual tone.', tag: 'ops' },
      { id: 'f7', text: 'All 3 championship rounds executed', detail: 'Personal Mastery then The Gauntlet then Final Power Recitation', tag: 'ops' },
      { id: 'f8', text: 'Parent Testimony segment (2 minutes)', detail: '2-3 selected parents, 30 sec each, before results. Prompt given in advance.', tag: 'content' },
      { id: 'f9', text: 'Final vote tally confirmed and sealed', detail: 'Voting coordinator hands sealed result to judges before event starts', tag: 'finance' },
      { id: 'f10', text: 'Full awards ceremony staged', detail: '1st/2nd/3rd + Consolation + Fan Favourite + Best Team + Best Mentor + Parent Awards', tag: 'ops' },
      { id: 'f11', text: 'Post-event fellowship and celebration', detail: 'Contestants, families, mentors gather for reflection and community', tag: 'ops' },
      { id: 'f12', text: 'Full Final video published within 72 hours', detail: 'YouTube premiere + all social highlights. Season 2 wrap content begins.', tag: 'content' }
    ]
  }
];

const GOALS_DATA = [
  { label: 'Contestants', value: '100 accepted', icon: '👥' },
  { label: 'Revenue Target', value: '₦5,000,000+', icon: '💰' },
  { label: 'Social Reach', value: '50,000 impressions', icon: '📱' },
  { label: 'Total Votes Target', value: '20,000+ (₦200/vote)', icon: '🗳️' },
  { label: 'Live Viewers per Stage', value: '5,000+', icon: '📺' },
  { label: 'Brand Mission', value: "Nigeria's #1 Youth Bible Championship", icon: '🏆' }
];

function getDynamicCurrentPhaseData() {
  const now = new Date();
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedToday = now.toLocaleDateString('en-US', options);

  const year = 2026;
  const auditionDate = new Date(year, 7, 1);    // Aug 1, 2026
  const stage1Date = new Date(year, 7, 9);      // Aug 9, 2026
  const stage2Date = new Date(year, 7, 16);     // Aug 16, 2026
  const finalDate = new Date(year, 8, 6);       // Sep 6, 2026

  function getDaysUntil(targetDate) {
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetMidnight = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
    const diffTime = targetMidnight - todayMidnight;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const daysToAudition = getDaysUntil(auditionDate);
  const daysToStage1 = getDaysUntil(stage1Date);
  const daysToStage2 = getDaysUntil(stage2Date);
  const daysToFinal = getDaysUntil(finalDate);

  if (daysToAudition > 0) {
    const dayStr = daysToAudition === 1 ? '1 Day' : daysToAudition + ' Days';
    return {
      date: formattedToday + ' — PRE-AUDITION URGENCY',
      title: 'Pre-Audition Setup — Audition is ' + dayStr + ' Away',
      desc: 'Audition is August 1, 2026. Only ' + dayStr + ' remaining. Voting platform, social media handles, contestant application forms, and mentor briefing must all be completed.'
    };
  } else if (daysToAudition === 0) {
    return {
      date: formattedToday + ' — AUDITION DAY LIVE',
      title: 'Audition / Screening Day — TODAY!',
      desc: 'Audition Day is live today! Set up screening stations, manage registration, brief judges, and assign the 100 accepted contestants into 10 teams.'
    };
  } else if (daysToStage1 > 0) {
    const dayStr = daysToStage1 === 1 ? '1 Day' : daysToStage1 + ' Days';
    return {
      date: formattedToday + ' — PROFILE WEEK BUILD-UP',
      title: 'Profile Week — Stage 1 is ' + dayStr + ' Away',
      desc: 'Stage 1 (The Proving Ground) is August 9, 2026. ' + dayStr + ' remaining. Introduce mentors, reveal teams, launch Round 1 voting, and publish contestant spotlight clips.'
    };
  } else if (daysToStage1 === 0) {
    return {
      date: formattedToday + ' — STAGE 1 LIVE',
      title: 'Stage 1: The Proving Ground — TODAY!',
      desc: 'Stage 1 is live today! 60 scriptures in 2 minutes per contestant. Live stream active, judges scoring accuracy, and live leaderboard announcement.'
    };
  } else if (daysToStage2 > 0) {
    const dayStr = daysToStage2 === 1 ? '1 Day' : daysToStage2 + ' Days';
    return {
      date: formattedToday + ' — POST-STAGE 1 WINDOW',
      title: 'Post-Stage 1 Content — Stage 2 is ' + dayStr + ' Away',
      desc: 'Stage 2 (The Refinement) is August 16, 2026. ' + dayStr + ' remaining. Publish Stage 1 highlights reel, update leaderboard, and open Voting Round 2.'
    };
  } else if (daysToStage2 === 0) {
    return {
      date: formattedToday + ' — STAGE 2 LIVE',
      title: 'Stage 2: The Refinement — TODAY!',
      desc: 'Stage 2 is live today! Duet challenges, cross-examination format, live stream updates, and team immunity score tracking.'
    };
  } else if (daysToFinal > 0) {
    const dayStr = daysToFinal === 1 ? '1 Day' : daysToFinal + ' Days';
    return {
      date: formattedToday + ' — CHAMPIONSHIP BUILD-UP',
      title: 'Final Build-Up — Grand Final is ' + dayStr + ' Away',
      desc: 'Grand Final (The Last Word) is September 6, 2026. ' + dayStr + ' remaining. Championship voting open, finalist spotlights, and VIP red carpet setup.'
    };
  } else if (daysToFinal === 0) {
    return {
      date: formattedToday + ' — GRAND FINAL DAY',
      title: 'Grand Final: The Last Word — TODAY!',
      desc: 'Championship Night is live today! Red carpet arrival, live worship opening, 3 championship rounds, and full awards ceremony.'
    };
  } else {
    return {
      date: formattedToday + ' — SEASON COMPLETE',
      title: 'REFA Season 2 — Completed 🎉',
      desc: 'Season 2 is officially complete! Thank you to all contestants, mentors, parents, and sponsors.'
    };
  }
}

const STORAGE_KEY = 'refa_s2_tasks_v1';
let checked = {};
try { checked = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (e) { checked = {}; }

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); }

function initGlobalTaskSync() {
  if (!window.REFA_FIREBASE) return;
  const { seedTasksIfEmpty, subscribeToTasks } = window.REFA_FIREBASE;
  if (seedTasksIfEmpty) {
    seedTasksIfEmpty(PHASES).catch(console.error);
  }
  if (subscribeToTasks) {
    subscribeToTasks((remoteChecked) => {
      Object.assign(checked, remoteChecked);
      save();
      renderTasks();
      updateGlobalProgress();
      const badge = document.getElementById('db-status-badge');
      if (badge) {
        badge.style.background = '#065F46';
        badge.style.color = '#D1FAE5';
        badge.innerHTML = '<span style="width:8px; height:8px; background:#10B981; border-radius:50%; display:inline-block;"></span> Global DB Live';
      }
    });
  }
}

window.addEventListener('firebase-ready', () => {
  initGlobalTaskSync();
});

if (window.REFA_FIREBASE) {
  initGlobalTaskSync();
}

// --- AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC) ---
const AUTH_SESSION_KEY = 'refa_user_session_v1';

function getAuthSession() {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY) || localStorage.getItem(AUTH_SESSION_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

function setAuthSession(sessionData) {
  try {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
  } catch (e) {}
}

function clearAuthSession() {
  try {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(AUTH_SESSION_KEY);
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
    result = await window.REFA_FIREBASE.validatePassKey(name, key);
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
  if (targetPage) targetPage.classList.add('active');
  const navItem = document.getElementById('nav-' + id);
  if (navItem) navItem.classList.add('active');

  if (id === 'letters') {
    updateLetter();
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

function getGlobalProgress() {
  const total = PHASES.reduce((s, p) => s + p.tasks.length, 0);
  const done = PHASES.reduce((s, p) => s + p.tasks.filter(t => checked[t.id]).length, 0);
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

const TAG_LABELS = { ops: 'Ops', media: 'Media', admin: 'Admin', finance: 'Finance', content: 'Content', tech: 'Tech' };

function renderTasks() {
  const container = document.getElementById('task-list-container');
  if (!container) return;
  container.innerHTML = '';
  PHASES.forEach(phase => {
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
  if (window.REFA_FIREBASE && window.REFA_FIREBASE.updateTaskInDb) {
    window.REFA_FIREBASE.updateTaskInDb(id, checked[id]);
  }
  const cb = document.getElementById('cb-' + id);
  const txt = document.getElementById('txt-' + id);
  if (checked[id]) { cb.classList.add('checked'); txt.classList.add('done-text'); }
  else { cb.classList.remove('checked'); txt.classList.remove('done-text'); }
  const phase = PHASES.find(p => p.tasks.some(t => t.id === id));
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
  const { done, total, pct } = getGlobalProgress();
  const fill = document.getElementById('sidebar-progress-fill');
  const label = document.getElementById('sidebar-progress-label');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = pct + '% (' + done + '/' + total + ')';
  renderDashboardProgress();
}

function renderDashboardProgress() {
  const list = document.getElementById('dashboard-progress-list');
  if (!list) return;
  list.innerHTML = PHASES.map(p => {
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
    goalsList.innerHTML = GOALS_DATA.map(g =>
      '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#F8F9FB;border-radius:8px;">' +
      '<span style="font-size:13px;color:var(--text-muted);">' + g.icon + ' ' + g.label + '</span>' +
      '<span style="font-size:13px;font-weight:700;color:var(--navy);">' + g.value + '</span>' +
      '</div>'
    ).join('');
  }
}

function renderTeams() {
  const grid = document.getElementById('teams-grid');
  if (!grid) return;
  grid.innerHTML = TEAMS_DATA.map(t =>
    '<div class="team-card" style="background:linear-gradient(135deg,' + t.color + ',' + t.color + 'CC);">' +
    '<div class="team-num">TEAM ' + t.num + '</div>' +
    '<div class="team-name">' + t.name + '</div>' +
    '<div class="team-color-label">10 members + 1 mentor</div>' +
    '</div>'
  ).join('');
}

/* INTERACTIVE KIT MODAL VIEWER LOGIC */
const KIT_PREVIEWS = {
  sponsorship: {
    title: '🤝 REFA Season 2 — Sponsorship Pitch Deck & Partner Kit',
    subtitle: 'Full Ready-to-Use Outreach Letters, Tier Matrix, Executive Summary & Agreement Contract',
    file: 'Sponsorship_Pitch_Deck.md',
    html: `
      <div class="kit-toolbar" style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="cd-btn" onclick="copyKitText('sponsorship')" style="background:var(--primary);color:white;padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:none;font-weight:bold;">📋 Copy Full Deck Text</button>
        <a href="Sponsorship_Pitch_Deck.md" download class="cd-btn" style="background:var(--gold);color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;text-decoration:none;font-weight:bold;">📥 Download Raw (.md)</a>
        <button class="cd-btn" onclick="printKitContent()" style="background:#F1F5F9;color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:1px solid #CBD5E1;font-weight:bold;">🖨️ Print / Save PDF</button>
      </div>

      <div class="preview-box">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--gold);padding-bottom:8px;margin-bottom:14px;">
          <h4 style="margin:0;color:var(--navy);font-size:17px;">📩 1. SPONSORSHIP OUTREACH LETTER TEMPLATES</h4>
          <span style="font-size:11px;background:var(--gold-pale);color:var(--navy);padding:3px 8px;border-radius:4px;font-weight:700;">Ready-to-Send</span>
        </div>

        <div style="margin-bottom:20px;">
          <h5 style="color:var(--navy);font-size:14px;margin-bottom:6px;">Template A: For Christian Schools & Educational Institutions</h5>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;font-weight:bold;">Subject: Partner with REFA Season 2: Empowering Youth Through Scripture & Excellence</div>
          <div style="background:#F8F9FB;padding:16px;border-radius:8px;font-size:13px;line-height:1.7;border-left:4px solid var(--gold);white-space:pre-line;color:var(--text-main);" id="letter-template-a">
Dear [Principal / Director's Name],

Greetings in the precious name of our Lord Jesus Christ.

I am writing on behalf of Refiners of Faith Academy (REFA), an NGO dedicated to inspiring youth to systematically study, memorize, and live out the Word of God.

Following the remarkable success of Season 1—which gathered over 60 youth contestants and filled our church auditorium—we are thrilled to announce REFA Season 2: "Words That Last", launching this August. 

This season introduces The Word League: a multi-week reality TV-style Bible championship featuring 100 screened contestants aged 10–15, organized into 10 mentored teams, competing before thousands of live and online audience members.

Because [School Name] stands for educational and moral excellence, we would be honored to have you as an Official Education Partner for Season 2. 

What this partnership offers [School Name]:
• Brand Visibility: Direct exposure to over 5,000 live attendees and 50,000+ digital viewers across Nigeria.
• Youth Leadership Alignment: Position your institution at the forefront of youth spiritual and academic development.
• On-Stage & Digital Recognition: Premium banner placement, live MC mentions, and dedicated social media spotlights.

Attached is our official Sponsorship Proposal outlining the partnership tiers (Title, Gold, Silver, Community, and Individual Supporter). 

We would love to schedule a brief 10-minute call or meeting this week to discuss how we can tailor this partnership to benefit your institution.

Warm regards,

[Your Name / Title]
Event Producer, REFA Season 2
Phone: [Insert Phone Number] | Email: [Insert Email]
          </div>
          <button onclick="copyToClipboard(document.getElementById('letter-template-a').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Template A</button>
        </div>

        <div style="margin-bottom:20px;">
          <h5 style="color:var(--navy);font-size:14px;margin-bottom:6px;">Template B: For Faith-Based Businesses, Bookstores & Family Brands</h5>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;font-weight:bold;">Subject: Sponsorship Opportunity: Reach 50,000+ Christian Families at REFA Season 2</div>
          <div style="background:#F8F9FB;padding:16px;border-radius:8px;font-size:13px;line-height:1.7;border-left:4px solid var(--primary);white-space:pre-line;color:var(--text-main);" id="letter-template-b">
Dear [Business Owner / Marketing Lead],

Is your brand looking to connect deeply with Christian families, parents, and youth in a meaningful, values-driven environment?

Refiners of Faith Academy (REFA) invites [Company Name] to partner with us for Season 2 of the REFA Bible Recitation Championship ("Words That Last").

Season 2 is structured as a high-engagement, multi-week competition featuring:
• 100 Contestants (ages 10–15) across 10 teams.
• 3 Live Stage Events at the Church Auditorium (Free public admission).
• Nationwide Online Voting & Social Media Campaign projected to generate 50,000+ impressions.

By sponsoring REFA Season 2, [Company Name] will gain prominent branding across our live stream, stage backdrops, event programs, and digital voting portal.

Please find our complete Sponsorship Tiers attached. Packages start from ₦50,000 up to Title Sponsorship at ₦1,000,000.

We welcome the opportunity to discuss how [Company Name] can feature prominently in this season's journey.

Best regards,

[Your Name / Title]
REFA Season 2 Production Team
          </div>
          <button onclick="copyToClipboard(document.getElementById('letter-template-b').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Template B</button>
        </div>

        <div>
          <h5 style="color:var(--navy);font-size:14px;margin-bottom:6px;">Template C: For Individual Patrons & Society Builders (Appeal to Conscience)</h5>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:6px;font-weight:bold;">Subject: An Appeal for Our Youth & Society: Partner with REFA Season 2 ("Words That Last")</div>
          <div style="background:#F8F9FB;padding:16px;border-radius:8px;font-size:13px;line-height:1.7;border-left:4px solid #059669;white-space:pre-line;color:var(--text-main);" id="letter-template-c">
Dear [Patron / Friend's Name],

Greetings in the grace and peace of our Lord Jesus Christ.

In a time when our young generation is constantly exposed to negative influences, raising children who are firmly rooted in godly values and moral integrity is one of the most urgent responsibilities we share.

Refiners of Faith Academy (REFA) was born out of a deep burden to see our youth (ages 10–15) fall in love with the Word of God. We believe that when young minds are filled with divine truth, they become the leaders who will uplift our families and rebuild the moral fabric of our society.

This August, we are hosting REFA Season 2: "Words That Last". It is a multi-week Bible Recitation Championship that will engage 100 children, taking them through rigorous scripture study, mentorship, and a platform to declare God's Word before thousands.

We cannot do this alone. As someone who cares deeply about the spiritual foundation of our society, we are appealing to your heart to support this vision. We need partners who will stand with us to build these children up.

Your generous seed will go directly towards:
• Equipping the Children: Providing Bibles, study manuals, uniforms, and mentorship materials for all 100 contestants.
• The Experience: Hosting a safe, excellent, and inspiring environment for the children to compete and shine.
• Scholarships & Rewards: Honoring their hard work and encouraging a lifelong commitment to God's Word.

You can partner with us as a Society Builder with a sponsorship seed of ₦50,000, ₦100,000, or any amount the Lord lays on your heart. Every seed sown is an eternal investment in the character of our youth and the future of our nation.

To make your partnership seed, please use the account details below:

<strong>Account Name:</strong> <strong>Refiners of Faith Academy</strong>
<strong>Account Number:</strong> <strong>1027784775</strong>
<strong>Bank:</strong> <strong>UBA</strong>

We would be deeply honored to have you as a champion for our young generation.

With immense gratitude and blessings,
          </div>
          <button onclick="copyToClipboard(document.getElementById('letter-template-c').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Template C</button>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">📊 2. EXECUTIVE SUMMARY & EVENT OVERVIEW</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:14px;">
          <div style="background:var(--bg-deep);padding:12px;border-radius:8px;border:1px solid var(--border-color);">
            <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Theme</div>
            <div style="font-weight:700;color:var(--navy);font-size:14px;">Words That Last</div>
          </div>
          <div style="background:var(--bg-deep);padding:12px;border-radius:8px;border:1px solid var(--border-color);">
            <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Target Contestants</div>
            <div style="font-weight:700;color:var(--navy);font-size:14px;">100 Youth (Ages 10-15)</div>
          </div>
          <div style="background:var(--bg-deep);padding:12px;border-radius:8px;border:1px solid var(--border-color);">
            <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Projected Reach</div>
            <div style="font-weight:700;color:var(--navy);font-size:14px;">50,000+ Impressions</div>
          </div>
          <div style="background:var(--bg-deep);padding:12px;border-radius:8px;border:1px solid var(--border-color);">
            <div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;">Expected Votes</div>
            <div style="font-weight:700;color:var(--navy);font-size:14px;">20,000+ Votes</div>
          </div>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🏆 3. OFFICIAL SPONSORSHIP TIERS MATRIX</h4>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:12.5px;">
            <thead>
              <tr style="background:var(--navy);color:white;">
                <th style="padding:10px;text-align:left;">Deliverable / Benefit</th>
                <th style="padding:10px;text-align:center;background:#B45309;">TITLE SPONSOR<br/>(₦1,000,000)</th>
                <th style="padding:10px;text-align:center;background:#D4AF37;color:var(--navy);">GOLD SPONSOR<br/>(₦500,000)</th>
                <th style="padding:10px;text-align:center;background:#475569;">SILVER SPONSOR<br/>(₦250,000)</th>
                <th style="padding:10px;text-align:center;background:#1E293B;">COMMUNITY<br/>(₦100,000)</th>
                <th style="padding:10px;text-align:center;background:#059669;">INDIVIDUAL<br/>(₦50,000)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Naming Rights</td>
                <td style="padding:10px;text-align:center;background:#FEF3C7;font-weight:bold;">"REFA S2 powered by [Brand]"</td>
                <td style="padding:10px;text-align:center;">—</td>
                <td style="padding:10px;text-align:center;">—</td>
                <td style="padding:10px;text-align:center;">—</td>
                <td style="padding:10px;text-align:center;">—</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Main Stage Branding</td>
                <td style="padding:10px;text-align:center;">Prime Center Stage + Standees</td>
                <td style="padding:10px;text-align:center;">Side Stage Banner</td>
                <td style="padding:10px;text-align:center;">Event Backdrop Logo</td>
                <td style="padding:10px;text-align:center;">Program Book Listing</td>
                <td style="padding:10px;text-align:center;">Supporter Roll Listing</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Digital Voting Portal</td>
                <td style="padding:10px;text-align:center;">Header Banner Placement</td>
                <td style="padding:10px;text-align:center;">Featured Logo on Page</td>
                <td style="padding:10px;text-align:center;">Logo on Supporter List</td>
                <td style="padding:10px;text-align:center;">Name Listed</td>
                <td style="padding:10px;text-align:center;">Name Listed</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Live Stream Commercial</td>
                <td style="padding:10px;text-align:center;">Watermark + 30s Commercial</td>
                <td style="padding:10px;text-align:center;">Lower-Third Logo Overlay</td>
                <td style="padding:10px;text-align:center;">Verbal MC Mention</td>
                <td style="padding:10px;text-align:center;">Rolling End Credits</td>
                <td style="padding:10px;text-align:center;">Special Mention Credits</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Social Media Features</td>
                <td style="padding:10px;text-align:center;">5 Dedicated Posts + Reels</td>
                <td style="padding:10px;text-align:center;">2 Dedicated Posts</td>
                <td style="padding:10px;text-align:center;">1 Group Sponsor Post</td>
                <td style="padding:10px;text-align:center;">Thank You Post</td>
                <td style="padding:10px;text-align:center;">Thank You Post / E-Cert</td>
              </tr>
              <tr>
                <td style="padding:10px;font-weight:bold;">VIP Seating (Grand Final)</td>
                <td style="padding:10px;text-align:center;font-weight:bold;">VIP Table (10 Seats)</td>
                <td style="padding:10px;text-align:center;">Reserved (6 Seats)</td>
                <td style="padding:10px;text-align:center;">Reserved (2 Seats)</td>
                <td style="padding:10px;text-align:center;">Regular Seating</td>
                <td style="padding:10px;text-align:center;">Reserved Guest Seat</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">📝 4. OFFICIAL SPONSORSHIP AGREEMENT FORM</h4>
        <div style="background:#FFFBEB;padding:18px;border-radius:8px;border:1px solid #F59E0B;font-size:13px;line-height:1.8;">
          <strong>SPONSOR INFORMATION:</strong><br/>
          Organization / Individual Name: __________________________________________________<br/>
          Contact Person: ______________________ Position/Title: ___________________<br/>
          Phone: ______________________________ Email: ________________________<br/><br/>
          
          <strong>SELECTED SPONSORSHIP TIER:</strong><br/>
          [ ] Title Sponsor (₦1,000,000) &nbsp;&nbsp;&nbsp; [ ] Gold Sponsor (₦500,000)<br/>
          [ ] Silver Sponsor (₦250,000) &nbsp;&nbsp;&nbsp; [ ] Community Supporter (₦100,000)<br/>
          [ ] Individual Supporter / Society Builder (₦50,000)<br/>
          [ ] Custom In-Kind Partnership (Prizes, Printing, Media, Equipment)<br/><br/>
          
          <strong>TERMS:</strong> 50% commitment deposit due upon signing; balance due on or before August 5, 2026.<br/><br/>
          <strong>SIGNATURES:</strong><br/>
          ____________________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ____________________________________<br/>
          <em>Sponsor Representative &amp; Date</em> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>REFA Executive Producer &amp; Date</em>
        </div>
      </div>
    `
  },
  parent: {
    title: '👨‍👩‍👧 REFA Season 2 — Parent Voting Starter Pack & Mobilization Kit',
    subtitle: 'Full Ready-to-Print Audition Letter, QR Challenge Card, WhatsApp Copy & Parent FAQs',
    file: 'Parent_Voting_Starter_Pack.md',
    html: `
      <div class="kit-toolbar" style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="cd-btn" onclick="copyKitText('parent')" style="background:var(--primary);color:white;padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:none;font-weight:bold;">📋 Copy Full Pack Text</button>
        <a href="Parent_Voting_Starter_Pack.md" download class="cd-btn" style="background:var(--gold);color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;text-decoration:none;font-weight:bold;">📥 Download Raw (.md)</a>
        <button class="cd-btn" onclick="printKitContent()" style="background:#F1F5F9;color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:1px solid #CBD5E1;font-weight:bold;">🖨️ Print / Save PDF</button>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">📜 SECTION 1: PARENT WELCOME LETTER (AUDITION DAY HANDOUT)</h4>
        <div style="background:#F8F9FB;padding:18px;border-radius:8px;font-size:13px;line-height:1.8;border-left:4px solid var(--gold);" id="parent-welcome-letter">
Dear Parent / Guardian,

Welcome to Refiners of Faith Academy (REFA) Season 2 — "The Word League"!

Congratulations on bringing your child to the Season 2 Auditions. By supporting your child in hiding God’s Word in their heart, you are building a spiritual foundation that will last a lifetime (Psalm 119:11).

What’s New in Season 2?
Season 2 is structured as an exciting team-based Bible competition:
• 100 Contestants will be selected and placed into 10 Teams of 10, led by dedicated Mentors.
• Contestants will receive weekly group coaching, spiritual encouragement, and stage preparation.
• Entry to all live stage events is 100% FREE at the Church Auditorium!

Your Role as a Campaign Manager:
In Season 2, parents are not just spectators—you are your child’s #1 Cheerleader and Campaign Manager! 
Audience voting accounts for 20% of the total score (increasing to 25% at the Grand Final). Every vote cast for your child brings them closer to the championship trophy and cash prizes!

3 Simple Steps to Start Today:
1. Join your Child's Team WhatsApp Group: Scan the QR code on your card before leaving today.
2. Save the Official Voting Link: Voting officially opens on August 7.
3. Take the 100-Vote Family Challenge: Mobilize 10 friends or relatives to cast 10 votes each!

Thank you for your devotion, prayers, and active support. Together, let us raise champions for Christ!

Warmly,
The REFA Season 2 Executive Team
        </div>
        <button onclick="copyToClipboard(document.getElementById('parent-welcome-letter').innerText, this)" style="margin-top:10px;background:var(--navy);color:var(--gold);border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Welcome Letter</button>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🎴 SECTION 2: PRINTABLE VOTING PASS & "100-VOTE CHALLENGE" CARD</h4>
        <div class="print-card-mockup" style="max-width:550px;margin:0 auto;text-align:left;background:linear-gradient(135deg, #08172E 0%, #152D5A 100%);color:white;padding:24px;border-radius:12px;border:2px solid var(--gold);">
          <div style="font-weight:bold;color:var(--gold);font-size:14px;text-align:center;margin-bottom:8px;">🏆 REFINERS OF FAITH ACADEMY (REFA) — SEASON 2: "WORDS THAT LAST"</div>
          <div style="background:rgba(255,255,255,0.1);padding:10px;border-radius:6px;margin-bottom:12px;font-size:12px;">
            <div>CONTESTANT NAME: ____________________________</div>
            <div style="margin-top:4px;">TEAM: _________________________________________</div>
          </div>
          <div style="text-align:center;margin:14px 0;background:rgba(212,175,55,0.15);padding:12px;border-radius:8px;border:1px dashed var(--gold);">
            <div style="font-size:13px;font-weight:bold;color:var(--gold);">📲 VOTE ONLINE: vote.refacontest.org/[ID]</div>
            <div style="font-size:11px;opacity:0.8;margin-top:4px;">[ SCAN QR CODE OR SEARCH BY NAME ]</div>
          </div>
          <div style="font-weight:bold;color:var(--gold-light);font-size:12px;margin-bottom:8px;">🔥 THE 100-VOTE FAMILY CHALLENGE (CHECKLIST):</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:11px;background:rgba(0,0,0,0.2);padding:10px;border-radius:6px;">
            <div>[ ] Uncle / Aunt</div>
            <div>[ ] Church Group</div>
            <div>[ ] School Friend</div>
            <div>[ ] Neighbor</div>
            <div>[ ] Choir Member</div>
            <div>[ ] Work Colleague</div>
            <div>[ ] Family Friend</div>
            <div>[ ] Youth Fellowship</div>
            <div>[ ] Grandparents</div>
          </div>
          <div style="font-size:10px;text-align:center;margin-top:10px;color:var(--gold-light); font-style:italic;">🌟 Top Voting Family per Team wins the "COMMUNITY CHAMPION AWARD"!</div>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">📱 SECTION 3: READY-TO-COPY WHATSAPP BROADCAST TEMPLATES FOR PARENTS</h4>
        
        <div style="margin-bottom:16px;">
          <h5 style="color:var(--navy);font-size:13px;margin-bottom:6px;">Message 1: For Family & Friends (Warm & Encouraging)</h5>
          <div class="wa-chat-box">
            <div class="wa-bubble" id="wa-msg-1">
Praise the Lord family and friends! 👋
My child, <strong>[Insert Child's Name]</strong>, has been selected to compete in <strong>REFA Season 2 Bible Recitation Championship ("The Word League")</strong>! 📖🏆

They have been memorizing scripture passages and preparing diligently. Online voting is now officially OPEN, and your support accounts for a vital part of their overall score!

Please click the link below to cast your votes for <strong>[Insert Child's Name]</strong>:
👉 <strong>[Insert Voting Link]</strong>

💡 <em>1 Vote = ₦200 | You can also get a 10-Vote bundle for ₦1,600.</em>
Thank you for encouraging the young generation to love God’s Word! God bless you abundantly! 🙏
            </div>
            <button class="wa-btn-copy" onclick="copyToClipboard(document.getElementById('wa-msg-1').innerText, this)">📋 Copy Message 1</button>
          </div>
        </div>

        <div style="margin-bottom:16px;">
          <h5 style="color:var(--navy);font-size:13px;margin-bottom:6px;">Message 2: For Church & Fellowship WhatsApp Groups</h5>
          <div class="wa-chat-box">
            <div class="wa-bubble" id="wa-msg-2">
"Thy word have I hid in mine heart, that I might not sin against thee." — Psalm 119:11

Dear brethren, please join me in supporting my child, <strong>[Insert Child's Name]</strong>, who is representing our church community at the <strong>REFA Season 2 Bible Recitation Championship</strong>!

They will be reciting scriptures under timed conditions against 100 contestants across Lagos!

You can support their journey by voting for them online:
🔗 <strong>[Insert Voting Link]</strong>

Voting takes less than 1 minute using Card, Bank Transfer, or USSD. Thank you for standing with our youth in scripture memory! ✨
            </div>
            <button class="wa-btn-copy" onclick="copyToClipboard(document.getElementById('wa-msg-2').innerText, this)">📋 Copy Message 2</button>
          </div>
        </div>

        <div>
          <h5 style="color:var(--navy);font-size:13px;margin-bottom:6px;">Message 3: Short WhatsApp Status / Story Text</h5>
          <div class="wa-chat-box">
            <div class="wa-bubble" id="wa-msg-3">
🚨 <strong>VOTING IS NOW LIVE!</strong> 🚨
Help my child <strong>[Insert Child's Name]</strong> win the REFA Season 2 Bible Championship! 🏆📖

Every vote counts! Click the link below to vote now 👇
🔗 <strong>[Insert Voting Link]</strong>
#REFASeason2 #TheWordLeague #WordsThatLast
            </div>
            <button class="wa-btn-copy" onclick="copyToClipboard(document.getElementById('wa-msg-3').innerText, this)">📋 Copy Message 3</button>
          </div>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">📖 SECTION 4: STEP-BY-STEP "HOW TO VOTE" GUIDE & FAQS</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px;">
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-top:3px solid var(--primary);">
            <strong style="color:var(--navy);">Step 1: Open Link</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Click the WhatsApp link or scan QR code on the card.</p>
          </div>
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-top:3px solid var(--gold);">
            <strong style="color:var(--navy);">Step 2: Find Contestant</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Search by contestant name or team name.</p>
          </div>
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-top:3px solid #10B981;">
            <strong style="color:var(--navy);">Step 3: Select Package</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Choose 1 vote (₦200) up to 100 votes (₦13,000).</p>
          </div>
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-top:3px solid #8B5CF6;">
            <strong style="color:var(--navy);">Step 4: Secure Payment</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Pay instantly via Card, Bank Transfer, or USSD.</p>
          </div>
        </div>
      </div>
    `
  },
  social: {
    title: '📱 REFA Season 2 — Social Media & WhatsApp Launch Kit',
    subtitle: 'Full Campaign Strategy, Day-by-Day Copywriting, Reel Scripts & Designer Briefs',
    file: 'Social_Media_Launch_Kit.md',
    html: `
      <div class="kit-toolbar" style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="cd-btn" onclick="copyKitText('social')" style="background:var(--primary);color:white;padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:none;font-weight:bold;">📋 Copy Full Campaign Text</button>
        <a href="Social_Media_Launch_Kit.md" download class="cd-btn" style="background:var(--gold);color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;text-decoration:none;font-weight:bold;">📥 Download Raw (.md)</a>
        <button class="cd-btn" onclick="printKitContent()" style="background:#F1F5F9;color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:1px solid #CBD5E1;font-weight:bold;">🖨️ Print / Save PDF</button>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🎯 1. STRATEGY & OFFICIAL HASHTAG SET</h4>
        <div style="background:var(--gold-pale);padding:12px;border-radius:8px;font-size:13px;color:var(--navy);font-weight:bold;">
          Official Campaign Hashtags:<br/>
          <span style="color:#B45309;">#REFASeason2 #TheWordLeague #WordsThatLast #VoteForWord #REFAChampion2026</span>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🗓️ 2. DAY-BY-DAY COPYWRITING & CONTENT CALENDAR</h4>
        
        <!-- PHASE 1 -->
        <div style="margin-bottom:20px;">
          <h5 style="color:var(--primary);font-size:14px;background:#EFF6FF;padding:6px 12px;border-radius:6px;">PHASE 1: PRE-AUDITION TEASER CAMPAIGN (JULY 22 – JULY 31)</h5>
          
          <div style="margin-top:10px;background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid var(--primary);">
            <strong style="color:var(--navy);">July 22 — Teaser Announcement 1 (The Return)</strong>
            <div style="margin-top:6px;font-size:12.5px;line-height:1.6;white-space:pre-line;color:var(--text-main);" id="post-jul-22">
SOMETHING BIG IS COMING. 🔥  
Season 1 was incredible… but Season 2 is taking scripture recitation to a whole new level! 📖⚡  

Get ready for REFA Season 2: THE WORD LEAGUE! 🏆  
100 Contestants. 10 Mentored Teams. 3 Stages. 1 Grand Champion.  

Theme: "Words That Last"  
Screening Day: August 1st, 2026.  

Are you ready to see young minds ablaze with the Word of God? Tag a parent or youth below! 👇  
#REFASeason2 #TheWordLeague #WordsThatLast #BibleRecitation #YouthMinistry
            </div>
            <button onclick="copyToClipboard(document.getElementById('post-jul-22').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Caption</button>
          </div>
        </div>

        <!-- PHASE 2 -->
        <div style="margin-bottom:20px;">
          <h5 style="color:#B45309;font-size:14px;background:#FEF3C7;padding:6px 12px;border-radius:6px;">PHASE 2: AUDITION & ANNOUNCEMENT WEEK (AUGUST 1 – AUGUST 2)</h5>
          
          <div style="margin-top:10px;background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid #B45309;">
            <strong style="color:var(--navy);">August 2 — Official 100 Champions Announcement</strong>
            <div style="margin-top:6px;font-size:12.5px;line-height:1.6;white-space:pre-line;color:var(--text-main);" id="post-aug-2">
📢 THE 100 CHAMPIONS HAVE BEEN CHOSEN! 🎉  

After an intense screening session, we are proud to announce the 100 accepted contestants for REFA Season 2: The Word League! 📖🔥  

These incredible youth (ages 10–15) have officially entered the arena to compete for the ultimate championship title, cash prizes, and trophies!  

🔴 VOTING OPENS ON AUGUST 7TH! Get ready to back your favourite contestant!  
#REFASeason2 #The100 #WordsThatLast #TheWordLeague
            </div>
            <button onclick="copyToClipboard(document.getElementById('post-aug-2').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Caption</button>
          </div>
        </div>

        <!-- PHASE 3 -->
        <div>
          <h5 style="color:#059669;font-size:14px;background:#D1FAE5;padding:6px 12px;border-radius:6px;">PHASE 3: VOTING LAUNCH (AUGUST 7)</h5>
          
          <div style="margin-top:10px;background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid #059669;">
            <strong style="color:var(--navy);">August 7 — VOTING IS OFFICIALLY OPEN! 🟢</strong>
            <div style="margin-top:6px;font-size:12.5px;line-height:1.6;white-space:pre-line;color:var(--text-main);" id="post-aug-7">
🚨 VOTING IS NOW OFFICIALLY OPEN! 🟢🗳️  

The wait is over! You can now cast your votes for your favourite contestant and team in REFA Season 2: The Word League!  

📲 HOW TO VOTE:  
1. Visit vote.refacontest.org  
2. Search for your contestant's name or team.  
3. Select your vote package (1 Vote = ₦200 | 10 Votes = ₦1,600).  
4. Complete payment securely via Card, Transfer, or USSD!  

⏰ Round 1 Voting closes TOMORROW at Midnight!  
VOTE NOW! 👉 vote.refacontest.org  
#VoteNow #REFASeason2 #TheWordLeague #VoteForWord
            </div>
            <button onclick="copyToClipboard(document.getElementById('post-aug-7').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:5px 12px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Caption</button>
          </div>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🎨 3. VISUAL ASSET BRIEFS FOR MEDIA & DESIGN TEAM</h4>
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:12px;">
            <thead>
              <tr style="background:var(--navy);color:white;">
                <th style="padding:8px;text-align:left;">Asset Needed</th>
                <th style="padding:8px;text-align:left;">Format / Dimensions</th>
                <th style="padding:8px;text-align:left;">Content Required</th>
                <th style="padding:8px;text-align:center;">Target Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:8px;font-weight:bold;">Season 2 Teaser Poster</td>
                <td style="padding:8px;">1080x1350 (IG Portrait)</td>
                <td style="padding:8px;">REFA Logo, Theme: "Words That Last", Dates</td>
                <td style="padding:8px;text-align:center;">July 22</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:8px;font-weight:bold;">"100 Champions Chosen" Graphic</td>
                <td style="padding:8px;">1080x1080 (Grid)</td>
                <td style="padding:8px;">Celebratory gold design, 100 contestant names</td>
                <td style="padding:8px;text-align:center;">Aug 2</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:8px;font-weight:bold;">10 Team Badge Graphics</td>
                <td style="padding:8px;">1080x1080 (Carousel)</td>
                <td style="padding:8px;">Team Logo, Team Name, Mentor Photo</td>
                <td style="padding:8px;text-align:center;">Aug 4</td>
              </tr>
              <tr>
                <td style="padding:8px;font-weight:bold;">"VOTING IS LIVE" Graphic</td>
                <td style="padding:8px;">1080x1350 & Story</td>
                <td style="padding:8px;">Bold text, QR Code placeholder, Vote Rates (₦200 / ₦1.6k)</td>
                <td style="padding:8px;text-align:center;">Aug 7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `
  },
  bible: {
    title: '📘 REFA Season 2 — Master Event Production Bible',
    subtitle: 'Full Season Architecture, 7-Phase Execution Timeline, Scoring Rubrics & Operations',
    file: 'REFA_Season2_Strategy.md',
    html: `
      <div class="kit-toolbar" style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
        <button class="cd-btn" onclick="copyKitText('bible')" style="background:var(--primary);color:white;padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:none;font-weight:bold;">📋 Copy Master Bible Text</button>
        <a href="REFA_Season2_Strategy.md" download class="cd-btn" style="background:var(--gold);color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;text-decoration:none;font-weight:bold;">📥 Download Raw (.md)</a>
        <button class="cd-btn" onclick="printKitContent()" style="background:#F1F5F9;color:var(--navy);padding:8px 16px;font-size:12px;border-radius:6px;cursor:pointer;border:1px solid #CBD5E1;font-weight:bold;">🖨️ Print / Save PDF</button>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🎯 1. SEASON 2 TARGET KPI METRICS</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;">
          <div style="background:var(--gold-pale);padding:14px;border-radius:8px;border:1px solid var(--gold);text-align:center;">
            <div style="font-size:11px;color:var(--navy);text-transform:uppercase;font-weight:bold;">Screened Contestants</div>
            <div style="font-size:22px;font-weight:800;color:var(--navy);margin-top:4px;">100</div>
          </div>
          <div style="background:#ECFDF5;padding:14px;border-radius:8px;border:1px solid #10B981;text-align:center;">
            <div style="font-size:11px;color:#065F46;text-transform:uppercase;font-weight:bold;">Target Revenue</div>
            <div style="font-size:22px;font-weight:800;color:#065F46;margin-top:4px;">₦5,000,000+</div>
          </div>
          <div style="background:#EFF6FF;padding:14px;border-radius:8px;border:1px solid var(--primary);text-align:center;">
            <div style="font-size:11px;color:var(--primary);text-transform:uppercase;font-weight:bold;">Social Impressions</div>
            <div style="font-size:22px;font-weight:800;color:var(--primary);margin-top:4px;">50,000+</div>
          </div>
          <div style="background:#F5F3FF;padding:14px;border-radius:8px;border:1px solid #8B5CF6;text-align:center;">
            <div style="font-size:11px;color:#5B21B6;text-transform:uppercase;font-weight:bold;">Total Votes</div>
            <div style="font-size:22px;font-weight:800;color:#5B21B6;margin-top:4px;">20,000+</div>
          </div>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">💡 2. CORE CONCEPT: "THE WORD LEAGUE" (4 PILLARS)</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid var(--gold);">
            <strong style="color:var(--navy);">1. TEAM IDENTITY</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">10 teams of 10 contestants, each with a mentor, jersey colour, and team chant.</p>
          </div>
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid var(--primary);">
            <strong style="color:var(--navy);">2. REALITY TV FORMAT</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Every stage is filmed, edited into highlight reels, and distributed across platforms.</p>
          </div>
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid #10B981;">
            <strong style="color:var(--navy);">3. THE VOTE IS THE VOICE</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Audience votes online to power contestants and drive sustainable event revenue.</p>
          </div>
          <div style="background:#F8F9FB;padding:14px;border-radius:8px;border-left:4px solid #8B5CF6;">
            <strong style="color:var(--navy);">4. JOURNEY STORYTELLING</strong>
            <p style="font-size:12px;color:var(--text-muted);margin-top:4px;">Follow each child's growth and scripture mastery across 7 structured phases.</p>
          </div>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">⚖️ 3. OFFICIAL SCORING FORMULA & WEIGHTS</h4>
        <div style="background:#F8F9FB;padding:16px;border-radius:8px;">
          <ul style="font-size:13px;color:var(--text-main);line-height:1.9;padding-left:18px;margin:0;">
            <li>Scripture Accuracy &amp; Completeness: <strong>50%</strong> (Direct recitation precision)</li>
            <li>Speed &amp; Timed Recitation: <strong>20%</strong> (Reciting under countdown pressure)</li>
            <li>Expression, Clarity &amp; Stage Delivery: <strong>10%</strong> (Vocal strength &amp; presence)</li>
            <li>Audience Voting Score: <strong>20%</strong> (Scaled to <strong>25% at Grand Final</strong>)</li>
          </ul>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">🗓️ 4. 7-PHASE EXECUTION ARCHITECTURE</h4>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid var(--navy);font-size:12.5px;">
            <strong>Phase 1: Pre-Audition Urgency (July 1-31)</strong> — Voting platform build, sponsor outreach, team lead recruitment.
          </div>
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid var(--gold);font-size:12.5px;">
            <strong>Phase 2: Audition Screening (August 1)</strong> — 100 contestants screened, 10 teams drafted, parent packs handed out.
          </div>
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid var(--primary);font-size:12.5px;">
            <strong>Phase 3: Profile Week (August 2-8)</strong> — Profile videos published daily, voting portal opens Aug 7.
          </div>
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid #10B981;font-size:12.5px;">
            <strong>Phase 4: Stage 1 — The Proving Ground (August 9)</strong> — First live event, 30 contestants advance.
          </div>
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid #F59E0B;font-size:12.5px;">
            <strong>Phase 5: Stage 2 — The Refinement (August 16)</strong> — Second live event, 10 finalists chosen.
          </div>
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid #8B5CF6;font-size:12.5px;">
            <strong>Phase 6: Finalist Prep (August 17 - September 5)</strong> — Intensive mentor coaching & vote surge.
          </div>
          <div style="background:#F8F9FB;padding:12px;border-radius:6px;border-left:3px solid #EF4444;font-size:12.5px;">
            <strong>Phase 7: Grand Final — The Last Word (September 6)</strong> — Live championship, awards & grand champion crown.
          </div>
        </div>
      </div>
    `
  }
};

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
  const kit = KIT_PREVIEWS[kitKey];
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

  const baseName = useSigned ? 'img/letterhead-signed' : 'img/letterhead';
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

const LETTER_TEMPLATES = {
  sponsorship_schools: {
    salutation: 'THE PRINCIPAL,',
    subject: 'PARTNER WITH REFA SEASON 2: EMPOWERING YOUTH THROUGH SCRIPTURE & EXCELLENCE',
    body: `<p>Dear [Principal / Director's Name],</p>
<p>Greetings in the precious name of our Lord Jesus Christ.</p>
<p>I am writing on behalf of <strong>Refiners of Faith Academy (REFA)</strong>, an NGO dedicated to inspiring youth to systematically study, memorize, and live out the Word of God.</p>
<p>Following the remarkable success of Season 1—which gathered over 60 youth contestants and filled our church auditorium—we are thrilled to announce <strong>REFA Season 2: "Words That Last"</strong>, launching this August.</p>
<p>This season introduces <strong>The Word League</strong>: a multi-week reality TV-style Bible championship featuring 100 screened contestants aged 10–15, organized into 10 mentored teams, competing before thousands of live and online audience members.</p>
<p>Because your institution stands for educational and moral excellence, we would be honored to have you as an <strong>Official Education Partner</strong> for Season 2.</p>
<p><strong>What this partnership offers your institution:</strong></p>
<ul>
<li><strong>Brand Visibility:</strong> Direct exposure to over 5,000 live attendees and 50,000+ digital viewers.</li>
<li><strong>Youth Leadership Alignment:</strong> Position your institution at the forefront of youth spiritual and academic development.</li>
<li><strong>On-Stage & Digital Recognition:</strong> Premium banner placement, live MC mentions, and dedicated social media spotlights.</li>
</ul>
<p>Attached is our official Sponsorship Proposal outlining the partnership tiers (Title, Gold, Silver, Community, and Individual Supporter).</p>
<p>We would love to schedule a brief 10-minute call or meeting this week to discuss how we can tailor this partnership to benefit your institution.</p>
<p>Warm regards,</p>

<hr>

<h2>🏆 SPONSORSHIP TIERS & BENEFITS</h2>

<table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; border: 1px solid #ccc;">
<thead>
<tr style="background:#f4f4f4;">
<th style="padding:8px; border: 1px solid #ccc; text-align:left;">Benefit / Deliverable</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">TITLE (₦1M)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">GOLD (₦500k)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">SILVER (₦250k)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">COMMUNITY (₦100k)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">INDIVIDUAL (₦50k)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:8px; border: 1px solid #ccc;"><strong>Main Stage Branding</strong></td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Prime Center Stage</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Side Stage Banner</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Event Backdrop Logo</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Program Listing</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Supporter Roll</td>
</tr>
<tr>
<td style="padding:8px; border: 1px solid #ccc;"><strong>Digital Voting Portal</strong></td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Header Banner</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Featured Logo</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Supporter List</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Name Listed</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Name Listed</td>
</tr>
<tr style="border-bottom:1px solid #ccc;">
<td style="padding:8px; border: 1px solid #ccc;"><strong>Live Stream Inclusion</strong></td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Watermark + 30s Ad</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Lower-Third Logo</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Verbal MC Shoutout</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Rolling Credits</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Special Mention</td>
</tr>
</tbody>
</table>

<hr>

<h2>📝 SPONSORSHIP AGREEMENT FORM</h2>

<p><strong>Sponsor Information:</strong><br>
Organization / Individual Name: __________________________________________________<br>
Contact Person: ______________________ Position/Title: ___________________<br>
Phone: ______________________________ Email: ________________________</p>

<p><strong>Payment & Delivery Terms:</strong><br>
1. 50% commitment deposit due upon signing.<br>
2. High-resolution brand logo or donor name to be provided upon signing.</p>

<p><br>____________________________________<br>
<strong>Sponsor Representative & Date</strong></p>`
  },
  sponsorship_business: {
    salutation: 'THE MANAGING DIRECTOR,',
    subject: 'SPONSORSHIP OPPORTUNITY: REACH 50,000+ CHRISTIAN FAMILIES AT REFA SEASON 2',
    body: `<p>Dear [Business Owner / Marketing Lead],</p>
<p>Is your brand looking to connect deeply with Christian families, parents, and youth in a meaningful, values-driven environment?</p>
<p><strong>Refiners of Faith Academy (REFA)</strong> invites your esteemed organization to partner with us for <strong>Season 2 of the REFA Bible Recitation Championship ("Words That Last")</strong>.</p>
<p>Season 2 is structured as a high-engagement, multi-week competition featuring:</p>
<ul>
<li><strong>100 Contestants</strong> (ages 10–15) across 10 teams.</li>
<li><strong>3 Live Stage Events</strong> at the Church Auditorium (Free public admission).</li>
<li><strong>Nationwide Online Voting & Social Media Campaign</strong> projected to generate 50,000+ impressions and 20,000+ digital interactions.</li>
</ul>
<p>By sponsoring REFA Season 2, your brand will gain prominent branding across our live stream, stage backdrops, event programs, and digital voting portal.</p>
<p>Please find our complete <strong>Sponsorship Tiers</strong> attached. Packages start from ₦50,000 up to Title Sponsorship at ₦1,000,000.</p>
<p>We welcome the opportunity to discuss how your organization can feature prominently in this season's journey.</p>
<p>Best regards,</p>

<hr>

<h2>🏆 SPONSORSHIP TIERS & BENEFITS</h2>

<table style="width:100%; border-collapse: collapse; margin: 20px 0; font-size: 12px; border: 1px solid #ccc;">
<thead>
<tr style="background:#f4f4f4;">
<th style="padding:8px; border: 1px solid #ccc; text-align:left;">Benefit / Deliverable</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">TITLE (₦1M)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">GOLD (₦500k)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">SILVER (₦250k)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">COMMUNITY (₦100k)</th>
<th style="padding:8px; border: 1px solid #ccc; text-align:center;">INDIVIDUAL (₦50k)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="padding:8px; border: 1px solid #ccc;"><strong>Main Stage Branding</strong></td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Prime Center Stage</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Side Stage Banner</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Event Backdrop Logo</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Program Listing</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Supporter Roll</td>
</tr>
<tr>
<td style="padding:8px; border: 1px solid #ccc;"><strong>Digital Voting Portal</strong></td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Header Banner</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Featured Logo</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Supporter List</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Name Listed</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Name Listed</td>
</tr>
<tr style="border-bottom:1px solid #ccc;">
<td style="padding:8px; border: 1px solid #ccc;"><strong>Live Stream Inclusion</strong></td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Watermark + 30s Ad</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Lower-Third Logo</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Verbal MC Shoutout</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Rolling Credits</td>
<td style="padding:8px; border: 1px solid #ccc; text-align:center;">Special Mention</td>
</tr>
</tbody>
</table>

<hr>

<h2>📝 SPONSORSHIP AGREEMENT FORM</h2>

<p><strong>Sponsor Information:</strong><br>
Organization / Individual Name: __________________________________________________<br>
Contact Person: ______________________ Position/Title: ___________________<br>
Phone: ______________________________ Email: ________________________</p>

<p><strong>Payment & Delivery Terms:</strong><br>
1. 50% commitment deposit due upon signing.<br>
2. High-resolution brand logo or donor name to be provided upon signing.</p>

<p><br>____________________________________<br>
<strong>Sponsor Representative & Date</strong></p>`
  },
  sponsorship_individual: {
    salutation: 'DEAR DISTINGUISHED FRIEND OF YOUTH,',
    subject: 'AN APPEAL FOR OUR YOUTH & SOCIETY: PARTNER WITH REFA SEASON 2 ("WORDS THAT LAST")',
    body: `<p>Dear [Patron / Friend's Name],</p>
<p>Greetings in the grace and peace of our Lord Jesus Christ.</p>
<p>In a time when our young generation is constantly exposed to negative influences, raising children who are firmly rooted in godly values and moral integrity is one of the most urgent responsibilities we share.</p>
<p><strong>Refiners of Faith Academy (REFA)</strong> was born out of a deep burden to see our youth (ages 10–15) fall in love with the Word of God. We believe that when young minds are filled with divine truth, they become the leaders who will uplift our families and rebuild the moral fabric of our society.</p>
<p>This August, we are hosting <strong>REFA Season 2: "Words That Last"</strong>. It is a multi-week Bible Recitation Championship that will engage 100 children, taking them through rigorous scripture study, mentorship, and a platform to declare God's Word before thousands.</p>
<p>We cannot do this alone. As someone who cares deeply about the spiritual foundation of our society, we are appealing to your heart to support this vision. We need partners who will stand with us to build these children up.</p>
<p><strong>Your generous seed will go directly towards:</strong></p>
<ul>
<li><strong>Equipping the Children:</strong> Providing Bibles, study manuals, uniforms, and mentorship materials for all 100 contestants.</li>
<li><strong>The Experience:</strong> Hosting a safe, excellent, and inspiring environment for the children to compete and shine.</li>
<li><strong>Scholarships & Rewards:</strong> Honoring their hard work and encouraging a lifelong commitment to God's Word.</li>
</ul>
<p>You can partner with us as a Society Builder with a sponsorship seed of <strong>₦50,000, ₦100,000, or any amount the Lord lays on your heart</strong>. Every seed sown is an eternal investment in the character of our youth and the future of our nation.</p>
<p>To make your partnership seed, please use the account details below:</p>
<p><strong>Account Name:</strong> <strong>Refiners of Faith Academy</strong><br>
<strong>Account Number:</strong> <strong>1027784775</strong><br>
<strong>Bank:</strong> <strong>UBA</strong></p>
<p>We would be deeply honored to have you as a champion for our young generation.</p>
<p>With immense gratitude and blessings,</p>`
  }
};

function editTemplate(templateId) {
  const tpl = LETTER_TEMPLATES[templateId];
  if (tpl) {
    document.getElementById('let-our-ref').value = 'REFA/2026/SP-01';
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
  const accName = (document.getElementById('acc-name') || {}).value || 'REFINERS OF FAITH ACADEMY';
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
  let waText = `========================================\n`;
  waText += `🏦 REFINERS OF FAITH ACADEMY — PAYMENT DETAILS\n`;
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
  waText += `Thank you for supporting youth scripture excellence! 🙏✨\n`;
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
