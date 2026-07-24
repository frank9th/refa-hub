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
    { id:'s1a', text:'Stage branded backdrop and podium set up', detail:'REFA Season 2 branding, scoreboard display, team banners in fan zones', tag:'ops' },
    { id:'s1b', text:'Live stream setup tested - 2 camera angles minimum', detail:'Stable internet confirmed. Test stream done 1 hour before event.', tag:'tech' },
    { id:'s1c', text:'MC/Host briefed with full running order', detail:'MC has script, contestant list, team order, judge bios, sponsor mentions', tag:'ops' },
    { id:'s1d', text:'Judges panel in position (3 judges)', detail:'Score sheets, timing devices, and microphones confirmed', tag:'ops' },
    { id:'s1e', text:'Reserved Family Corners marked and stewarded', detail:'Each team has a dedicated section. Parent Supporter Cards distributed at door.', tag:'ops' },
    { id:'s1f', text:'Opening ceremony conducted', detail:'Prayer, REFA mission statement, Season 2 overview, sponsor mentions', tag:'ops' },
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

const STORAGE_KEY = 'refa_s2_tasks_v1';
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

Attached is our official Sponsorship Proposal outlining the partnership tiers (Title, Gold, Silver, and Community Partner). 

We would love to schedule a brief 10-minute call or meeting this week to discuss how we can tailor this partnership to benefit your institution.

Warm regards,

[Your Name / Title]
Event Producer, REFA Season 2
Phone: [Insert Phone Number] | Email: [Insert Email]
          </div>
          <button onclick="copyToClipboard(document.getElementById('letter-template-a').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Template A</button>
        </div>

        <div>
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

Please find our complete Sponsorship Tiers attached. Packages start from ₦50,000 up to Title Sponsorship at ₦500,000.

We welcome the opportunity to discuss how [Company Name] can feature prominently in this season's journey.

Best regards,

[Your Name / Title]
REFA Season 2 Production Team
          </div>
          <button onclick="copyToClipboard(document.getElementById('letter-template-b').innerText, this)" style="margin-top:8px;background:var(--navy);color:var(--gold);border:none;padding:6px 14px;border-radius:4px;font-size:11px;font-weight:bold;cursor:pointer;">📋 Copy Template B</button>
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
                <th style="padding:10px;text-align:center;background:#B45309;">TITLE SPONSOR<br/>(₦500,000)</th>
                <th style="padding:10px;text-align:center;background:#D4AF37;color:var(--navy);">GOLD SPONSOR<br/>(₦250,000)</th>
                <th style="padding:10px;text-align:center;background:#475569;">SILVER SPONSOR<br/>(₦100,000)</th>
                <th style="padding:10px;text-align:center;background:#1E293B;">COMMUNITY<br/>(₦50,000)</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Naming Rights</td>
                <td style="padding:10px;text-align:center;background:#FEF3C7;font-weight:bold;">"REFA S2 powered by [Brand]"</td>
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
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Digital Voting Portal</td>
                <td style="padding:10px;text-align:center;">Header Banner Placement</td>
                <td style="padding:10px;text-align:center;">Featured Logo on Page</td>
                <td style="padding:10px;text-align:center;">Logo on Supporter List</td>
                <td style="padding:10px;text-align:center;">Name Listed</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Live Stream Commercial</td>
                <td style="padding:10px;text-align:center;">Watermark + 30s Commercial</td>
                <td style="padding:10px;text-align:center;">Lower-Third Logo Overlay</td>
                <td style="padding:10px;text-align:center;">Verbal MC Mention</td>
                <td style="padding:10px;text-align:center;">Rolling End Credits</td>
              </tr>
              <tr style="border-bottom:1px solid #E2E8F0;">
                <td style="padding:10px;font-weight:bold;">Social Media Features</td>
                <td style="padding:10px;text-align:center;">5 Dedicated Posts + Reels</td>
                <td style="padding:10px;text-align:center;">2 Dedicated Posts</td>
                <td style="padding:10px;text-align:center;">1 Group Sponsor Post</td>
                <td style="padding:10px;text-align:center;">Thank You Post</td>
              </tr>
              <tr>
                <td style="padding:10px;font-weight:bold;">VIP Seating (Grand Final)</td>
                <td style="padding:10px;text-align:center;font-weight:bold;">VIP Table (10 Seats)</td>
                <td style="padding:10px;text-align:center;">Reserved (6 Seats)</td>
                <td style="padding:10px;text-align:center;">Reserved (2 Seats)</td>
                <td style="padding:10px;text-align:center;">Regular Seating</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="preview-box">
        <h4 style="color:var(--navy);font-size:17px;border-bottom:2px solid var(--gold);padding-bottom:6px;margin-bottom:14px;">📝 4. OFFICIAL SPONSORSHIP AGREEMENT FORM</h4>
        <div style="background:#FFFBEB;padding:18px;border-radius:8px;border:1px solid #F59E0B;font-size:13px;line-height:1.8;">
          <strong>SPONSOR INFORMATION:</strong><br/>
          Organization Name: __________________________________________________<br/>
          Contact Person: ______________________ Position/Title: ___________________<br/>
          Phone: ______________________________ Email: ________________________<br/><br/>
          
          <strong>SELECTED SPONSORSHIP TIER:</strong><br/>
          [ ] Title Sponsor (₦500,000) &nbsp;&nbsp;&nbsp; [ ] Gold Sponsor (₦250,000)<br/>
          [ ] Silver Sponsor (₦100,000) &nbsp;&nbsp;&nbsp; [ ] Community Supporter (₦50,000)<br/>
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

document.addEventListener('DOMContentLoaded', function() {
  renderDashboard();
  renderDashboardProgress();
  renderTasks();
  renderTeams();
  updateGlobalProgress();
  initStudio();
});
