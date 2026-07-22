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
  { id: 'preseason', title: 'Pre-Season Setup', date: 'July 1 - July 31', tasks: [
    { id:'ps1', text:'Finalise Season 2 branding', detail:'Logo, colours, fonts, season name and theme locked', tag:'ops' },
    { id:'ps2', text:'Create and launch social media handles', detail:'Instagram, TikTok, Facebook, YouTube all set up and first teaser posted', tag:'media' },
    { id:'ps3', text:'Build contestant application form', detail:'Google Form or website form collecting name, age, church, guardian contact', tag:'admin' },
    { id:'ps4', text:'Commission and test voting platform', detail:'Platform contracted, test environment built and verified before Aug 1', tag:'tech' },
    { id:'ps5', text:'Draft and send sponsorship pitch deck', detail:'Send to minimum 20 prospective sponsors by July 25', tag:'finance' },
    { id:'ps6', text:'Recruit all 10 mentors', detail:'Brief them on roles, schedule and content expectations', tag:'ops' },
    { id:'ps7', text:'Assign content and media manager', detail:'Confirm who is responsible for daily posting, filming, and editing', tag:'media' },
    { id:'ps8', text:'Build content calendar for Aug 2-8', detail:'Every post planned and designed before audition day', tag:'content' },
    { id:'ps9', text:'Run "Coming Soon" teaser campaign', detail:'"The Word League is Coming" - reels, countdowns, mystery posts', tag:'media' },
    { id:'ps10', text:'Print Parent Voting Starter Packs', detail:'QR code cards, voting guide, challenge card - 100 copies minimum', tag:'ops' }
  ]},
  { id: 'audition', title: 'Audition / Screening Day', date: 'August 1', tasks: [
    { id:'au1', text:'Set up 3-4 screening stations in church', detail:'Each station has a judge, score sheets, and timing device', tag:'ops' },
    { id:'au2', text:'Contestant registration and check-in', detail:'Name tags, registration packets, consent forms from parents', tag:'admin' },
    { id:'au3', text:'Brief judging panel (3-5 judges)', detail:'Scoring criteria: accuracy, pronunciation, spirit. Standardised sheets.', tag:'ops' },
    { id:'au4', text:'Film BTS content throughout the day', detail:'Lobby atmosphere, reactions, contestant arrivals - do NOT film actual assessments', tag:'content' },
    { id:'au5', text:'Distribute Parent Voting Starter Packs', detail:'Every parent leaves with QR code card, how-to guide, and challenge card', tag:'admin' },
    { id:'au6', text:'Add parents to team WhatsApp groups', detail:'All 10 groups created with mentor admins; parents added same day', tag:'ops' },
    { id:'au7', text:'Assign contestants to teams', detail:'10 teams of 10. Balance age, ability, church representation where possible.', tag:'ops' },
    { id:'au8', text:'Post Screening Day reel by end of day', detail:'BTS atmosphere footage builds anticipation for announcement tomorrow', tag:'content' }
  ]},
  { id: 'profileweek', title: 'Profile Week - Build-Up', date: 'August 2 - 8', tasks: [
    { id:'pw1', text:'Aug 2: Announce 100 accepted contestants', detail:'Celebratory announcement post. Congratulations graphic. Let excitement land.', tag:'media' },
    { id:'pw2', text:'Aug 3: Introduce mentors - 5 per day', detail:'Mentor profile posts: photo, bio, quote. Split across platforms.', tag:'content' },
    { id:'pw3', text:'Aug 4: Team reveals staggered', detail:'Post each team name, colour, and member list throughout the day', tag:'content' },
    { id:'pw4', text:'Aug 5: Training Day content', detail:'Film teams preparing with mentors. Short clips per team.', tag:'content' },
    { id:'pw5', text:'Aug 5: Send "How to Vote" guide to all parents', detail:'Screenshots and step-by-step via WhatsApp broadcast to all parent groups', tag:'admin' },
    { id:'pw6', text:'Aug 6: Contestant spotlight series begins', detail:'3 spotlight videos per day, 30 sec each. Name, team, favourite scripture, why they joined.', tag:'content' },
    { id:'pw7', text:'Aug 7: VOTING OPENS - Round 1', detail:'Post voting link across all platforms. WhatsApp blast to all parent groups simultaneously.', tag:'tech' },
    { id:'pw8', text:'Aug 7: "Families Behind the Word" series begins', detail:'First parent video published. Set the template for the series.', tag:'content' },
    { id:'pw9', text:'Aug 8: Countdown post + leaderboard teaser', detail:'"Who is leading? Find out TOMORROW at Stage 1!" Voting closes midnight.', tag:'media' }
  ]},
  { id: 'stage1', title: 'Stage 1 - The Proving Ground', date: 'August 9', tasks: [
    { id:'s1a', text:'Stage branded backdrop and podium set up', detail:'RAFA Season 2 branding, scoreboard display, team banners in fan zones', tag:'ops' },
    { id:'s1b', text:'Live stream setup tested - 2 camera angles minimum', detail:'Stable internet confirmed. Test stream done 1 hour before event.', tag:'tech' },
    { id:'s1c', text:'MC/Host briefed with full running order', detail:'MC has script, contestant list, team order, judge bios, sponsor mentions', tag:'ops' },
    { id:'s1d', text:'Judges panel in position (3 judges)', detail:'Score sheets, timing devices, and microphones confirmed', tag:'ops' },
    { id:'s1e', text:'Reserved Family Corners marked and stewarded', detail:'Each team has a dedicated section. Parent Supporter Cards distributed at door.', tag:'ops' },
    { id:'s1f', text:'Opening ceremony conducted', detail:'Prayer, RAFA mission statement, Season 2 overview, sponsor mentions', tag:'ops' },
    { id:'s1g', text:'Round 1 voting leaderboard announced live', detail:'MC reads current top 3 from voting platform before competition begins', tag:'ops' },
    { id:'s1h', text:'All performances filmed and recorded', detail:'Every contestant moment captured. Highlights editor briefed on key clips.', tag:'content' },
    { id:'s1i', text:'Judges deliver filmed remarks', detail:'Each judge gives short filmed commentary after each team section', tag:'content' },
    { id:'s1j', text:'Stage 1 results announced live', detail:'Bottom 2 per team identified. Next round explained to audience.', tag:'ops' }
  ]},
  { id: 'poststage1', title: 'Post-Stage 1 Content Window', date: 'August 10 - 15', tasks: [
    { id:'pt1a', text:'Aug 10: Stage 1 highlights reel published', detail:'5-10 min edited video on YouTube + Instagram Reels + Facebook within 48 hrs', tag:'content' },
    { id:'pt1b', text:'Aug 11: Top 5 Moments clips posted', detail:'Best recitations, judge reactions, crowd moments as short-form clips', tag:'content' },
    { id:'pt1c', text:'Aug 12: Voting Round 2 OPENS', detail:'Announce across all platforms. WhatsApp blast to all parent groups.', tag:'tech' },
    { id:'pt1d', text:'Aug 12: Leaderboard update published', detail:'"Who is leading after Stage 1?" Reveal top 3 without exact vote counts.', tag:'media' },
    { id:'pt1e', text:'Aug 13: Day-in-life contestant video', detail:'1-2 contestants featured showing their preparation and home life', tag:'content' },
    { id:'pt1f', text:'Aug 14: Send individual clip links to parents', detail:'"Share this highlight of YOUR child!" - personalised WhatsApp message per team', tag:'admin' },
    { id:'pt1g', text:'Aug 15: Stage 2 teaser campaign begins', detail:'"The Refinement begins tomorrow. Who is ready?" Countdown content goes live.', tag:'media' }
  ]},
  { id: 'stage2', title: 'Stage 2 - The Refinement', date: 'August 16', tasks: [
    { id:'s2a', text:'Stage setup with new format signage', detail:'Duet zone, Cross-Examination format explained on display boards', tag:'ops' },
    { id:'s2b', text:'New challenge formats briefed to contestants', detail:'Cross-Examination, Duet Round, Speed Recall rules explained in advance', tag:'ops' },
    { id:'s2c', text:'Live stream active with updated graphics', detail:'Season progression shown, cumulative scores displayed', tag:'tech' },
    { id:'s2d', text:'Round 2 leaderboard announced live on stage', detail:'MC reads current top 5 from voting before competition begins', tag:'ops' },
    { id:'s2e', text:'Team immunity results tracked and posted', detail:'Which teams secured immunity shown on scoreboard during event', tag:'ops' },
    { id:'s2f', text:'Parent Award nominations announced', detail:'MC announces which parents are nominated for Grand Final awards', tag:'ops' },
    { id:'s2g', text:'All performances filmed for highlights', detail:'Key clip moments flagged live for editors', tag:'content' },
    { id:'s2h', text:'Final voting window announced open after event', detail:'"Final voting window is NOW OPEN. Closes September 5 midnight."', tag:'tech' }
  ]},
  { id: 'final', title: 'Grand Final - The Last Word', date: 'September 6', tasks: [
    { id:'f1', text:'Full stage production setup - elevated', detail:'Premium lighting, sound, backdrop, red carpet entrance banner, live band briefed', tag:'ops' },
    { id:'f2', text:'VIP and reserved seating arranged', detail:'Sponsor tables, Family Corners, judges table all labelled and stewarded', tag:'ops' },
    { id:'f3', text:'Professional videographer and multi-camera setup', detail:'Minimum 3 camera angles. Dedicated sound recording. Backup stream confirmed.', tag:'tech' },
    { id:'f4', text:'Media and press invitations sent', detail:'Gospel blogs, Christian news outlets, social media journalists invited', tag:'media' },
    { id:'f5', text:'Finalist red carpet arrival filmed and streamed', detail:'Teams walk coordinated arrival. MC commentates. Parents in frame.', tag:'content' },
    { id:'f6', text:'Live worship opening segment', detail:'Live band. 10-15 minutes of worship to set spiritual tone.', tag:'ops' },
    { id:'f7', text:'All 3 championship rounds executed', detail:'Personal Mastery then The Gauntlet then Final Power Recitation', tag:'ops' },
    { id:'f8', text:'Parent Testimony segment (2 minutes)', detail:'2-3 selected parents, 30 sec each, before results. Prompt given in advance.', tag:'content' },
    { id:'f9', text:'Final vote tally confirmed and sealed', detail:'Voting coordinator hands sealed result to judges before event starts', tag:'finance' },
    { id:'f10', text:'Full awards ceremony staged', detail:'1st/2nd/3rd + Consolation + Fan Favourite + Best Team + Best Mentor + Parent Awards', tag:'ops' },
    { id:'f11', text:'Post-event fellowship and celebration', detail:'Contestants, families, mentors gather for reflection and community', tag:'ops' },
    { id:'f12', text:'Full Final video published within 72 hours', detail:'YouTube premiere + all social highlights. Season 2 wrap content begins.', tag:'content' }
  ]}
];

const GOALS_DATA = [
  { label:'Contestants', value:'100 accepted', icon:'👥' },
  { label:'Revenue Target', value:'₦5,000,000+', icon:'💰' },
  { label:'Social Reach', value:'50,000 impressions', icon:'📱' },
  { label:'Total Votes Target', value:'20,000+ (₦200/vote)', icon:'🗳️' },
  { label:'Live Viewers per Stage', value:'5,000+', icon:'📺' },
  { label:'Brand Mission', value:"Nigeria's #1 Youth Bible Championship", icon:'🏆' }
];

const CURRENT_PHASE_DATA = {
  date: 'July 22, 2026 — PRE-AUDITION URGENCY WEEK',
  title: 'Pre-Audition Setup — Audition is 10 Days Away',
  desc: 'Audition is August 1. Voting platform, social media handles, application form, and sponsorship outreach must all be completed this week. Every day matters.'
};

const STORAGE_KEY = 'rafa_s2_tasks_v1';
let checked = {};
try { checked = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch(e) { checked = {}; }

function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); }

function goTo(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  const navItem = document.getElementById('nav-' + id);
  if (navItem) navItem.classList.add('active');
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

const TAG_LABELS = { ops:'Ops', media:'Media', admin:'Admin', finance:'Finance', content:'Content', tech:'Tech' };

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
  const cpDate = document.getElementById('cp-date');
  const cpTitle = document.getElementById('cp-title');
  const cpDesc = document.getElementById('cp-desc');
  if (cpDate) cpDate.textContent = CURRENT_PHASE_DATA.date;
  if (cpTitle) cpTitle.textContent = CURRENT_PHASE_DATA.title;
  if (cpDesc) cpDesc.textContent = CURRENT_PHASE_DATA.desc;
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
    title: '🤝 Sponsorship Pitch Deck & Partner Kit',
    subtitle: 'Outreach Letters, Tier Matrix & Official Agreement',
    html: `
      <div class="preview-box">
        <h4>📩 Outreach Email Template (For Schools)</h4>
        <p style="font-size:13px;color:var(--text-muted);margin-bottom:10px;">Subject: Partner with RAFA Season 2: Empowering Youth Through Scripture & Excellence</p>
        <div style="background:#F8F9FB;padding:14px;border-radius:8px;font-size:12.5px;line-height:1.6;border-left:3px solid var(--gold);">
          Dear Principal / Director,<br/><br/>
          Greetings in the name of our Lord Jesus Christ.<br/>
          I am writing on behalf of <strong>Refiners of Faith Academy (RAFA)</strong>. Following Season 1's success, we are thrilled to launch <strong>RAFA Season 2: "Words That Last"</strong>...
        </div>
      </div>
      <div class="preview-box">
        <h4>🏆 Sponsorship Tiers Overview</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:10px;">
          <div style="background:var(--gold-pale);padding:12px;border-radius:8px;border:1px solid var(--gold);">
            <strong style="color:var(--navy);">👑 TITLE SPONSOR &mdash; ₦500,000</strong>
            <ul style="font-size:11.5px;margin-top:6px;padding-left:14px;color:var(--text-main);">
              <li>Event Naming Rights</li>
              <li>Prime Center Stage Backdrop</li>
              <li>VIP Table of 10 at Grand Final</li>
            </ul>
          </div>
          <div style="background:#FFFBEB;padding:12px;border-radius:8px;border:1px solid #B45309;">
            <strong style="color:#B45309;">🥇 GOLD SPONSOR &mdash; ₦250,000</strong>
            <ul style="font-size:11.5px;margin-top:6px;padding-left:14px;color:var(--text-main);">
              <li>Side Stage Banner Placement</li>
              <li>2x Social Media Feature Posts</li>
              <li>6 VIP Seats at Grand Final</li>
            </ul>
          </div>
        </div>
      </div>
    `
  },
  parent: {
    title: '👨‍👩‍👧 Parent Voting Starter Pack & Mobilization Kit',
    subtitle: 'Audition Day Handouts, WhatsApp Copy & Printable Cards (₦200/Vote)',
    html: `
      <div class="preview-box">
        <h4>🎴 Printable QR Voting Card (Audition Day Handout)</h4>
        <div class="print-card-mockup">
          <div class="print-card-header">RAFA SEASON 2: WORDS THAT LAST</div>
          <div style="font-size:12px;color:var(--gold-light);">Contestant Card &amp; Voting Pass (₦200/Vote)</div>
          <div class="print-card-qr">[ QR CODE PORTAL ]</div>
          <div style="font-size:11px;opacity:0.9;">🔥 THE 100-VOTE FAMILY CHALLENGE</div>
          <p style="font-size:10px;margin-top:4px;color:var(--gold-light);">Rally 10 friends to buy 10 votes each!</p>
        </div>
      </div>
      <div class="preview-box">
        <h4>📱 WhatsApp Broadcast Copy (Ready to Share)</h4>
        <div class="wa-chat-box">
          <div class="wa-bubble">
            Praise the Lord family! 👋 My child, <strong>[Name]</strong>, has been selected for RAFA Season 2 Bible Championship! 📖🏆<br/><br/>
            Voting is now LIVE! (1 Vote = ₦200 | 10 Votes = ₦1,600)<br/>
            👉 <strong>vote.rafacontest.org/[ID]</strong>
          </div>
          <button class="wa-btn-copy" onclick="navigator.clipboard.writeText('Praise the Lord family! 👋 My child has been selected for RAFA Season 2 Bible Championship! Voting is LIVE! (1 Vote = ₦200 | 10 Votes = ₦1,600). Please vote at: vote.rafacontest.org');alert('Copied to clipboard!')">📋 Copy WhatsApp Text</button>
        </div>
      </div>
    `
  },
  social: {
    title: '📱 Social Media & WhatsApp Launch Kit',
    subtitle: 'Campaign Feed Copy, Reels Scripts & Designer Briefs',
    html: `
      <div class="preview-box">
        <h4>🎬 30-Second Contestant Spotlight Reel Script</h4>
        <div style="background:#F3E8FF;padding:14px;border-radius:8px;font-size:12px;line-height:1.6;border-left:4px solid #6D28D9;">
          <strong>Audio:</strong> Upbeat, inspiring cinematic instrumental.<br/>
          <strong>Visual:</strong> Quick cut of contestant smiling &rarr; practicing scripture &rarr; standing confident.<br/>
          <strong>Overlay Text:</strong> Name: [Contestant Name] | Team: Eagles of Zion | Fav Verse: Phil 4:13<br/>
          <strong>Caption:</strong> "Meet [Name] from Team Eagles of Zion! Voting opens Aug 7!"
        </div>
      </div>
      <div class="preview-box">
        <h4>📅 Campaign Posting Feed Schedule</h4>
        <ul style="font-size:12.5px;color:var(--text-main);line-height:1.8;padding-left:18px;">
          <li><strong>Jul 22:</strong> "Something Big is Coming" Teaser Video</li>
          <li><strong>Aug 2:</strong> "The 100 Champions Chosen" Graphic</li>
          <li><strong>Aug 4:</strong> 10 Team Reveals Carousel</li>
          <li><strong>Aug 7:</strong> 🟢 VOTING IS NOW OPEN Post (₦200/vote)</li>
        </ul>
      </div>
    `
  },
  bible: {
    title: '📘 RAFA Season 2 Master Production Bible',
    subtitle: 'Full Architecture, Rules, Scoring & Workflow',
    html: `
      <div class="preview-box">
        <h4>🏆 "The Word League" Architecture Summary</h4>
        <p style="font-size:13px;color:var(--text-main);line-height:1.6;">
          Season 2 transforms RAFA into a multi-week reality TV-style Bible league. 100 contestants (ages 10-15) compete across 10 mentored teams.
        </p>
      </div>
      <div class="preview-box">
        <h4>⚖️ Official Scoring Formula</h4>
        <ul style="font-size:12.5px;color:var(--text-main);line-height:1.8;padding-left:18px;">
          <li>Scripture Accuracy: <strong>50%</strong></li>
          <li>Speed / Timing: <strong>20%</strong></li>
          <li>Expression &amp; Delivery: <strong>10%</strong></li>
          <li>Audience Voting Score: <strong>20%</strong> (25% at Final)</li>
        </ul>
      </div>
    `
  }
};

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

document.addEventListener('DOMContentLoaded', function() {
  renderDashboard();
  renderDashboardProgress();
  renderTasks();
  renderTeams();
  updateGlobalProgress();
  initStudio();
});
