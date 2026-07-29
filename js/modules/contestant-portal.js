/**
 * Contestant Portal Logic
 * Handles simulated OTP login, Firestore contestant lookups, 
 * and dynamic dashboard rendering for contestants.
 */

const SESSION_KEY = 'refa_contestant_session_v1';
let activeEvent = null;
let currentContestant = null;

// The standard 8-phase contestant journey
const JOURNEY_PHASES = [
  { id: 'registration', label: 'Registered' },
  { id: 'audition', label: 'Audition' },
  { id: 'callback', label: 'Callback' },
  { id: 'quarterfinals', label: 'Quarter Final' },
  { id: 'semifinals', label: 'Semi Final' },
  { id: 'grandfinal', label: 'Grand Final' }
];

window.addEventListener('firebase-ready', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event') || 'hit-the-mic-s3';
  
  if (window.REFA_FIREBASE) {
    activeEvent = await window.REFA_FIREBASE.getEvent(eventId);
    if (activeEvent) {
      window.REFA_EVENTS.setActiveEvent(activeEvent);
      document.getElementById('nav-brand').textContent = activeEvent.name || 'Event Hub';
      checkSession();
    }
  }
});

function getSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } 
  catch(e) { return null; }
}

function checkSession() {
  const session = getSession();
  if (session && session.id) {
    // Already logged in
    fetchContestantData(session.id);
  } else {
    // Show login view
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'block';
    document.getElementById('btn-logout').style.display = 'none';
  }
}

function requestOTP() {
  const idInput = document.getElementById('login-id').value.trim();
  const phoneInput = document.getElementById('login-phone').value.trim();
  
  if (!idInput || !phoneInput) {
    alert("Please enter both your Contestant ID and Phone Number.");
    return;
  }
  
  document.getElementById('login-step-1').style.display = 'none';
  document.getElementById('login-step-2').style.display = 'block';
}

function cancelOTP() {
  document.getElementById('login-step-2').style.display = 'none';
  document.getElementById('login-step-1').style.display = 'block';
  document.getElementById('login-otp').value = '';
}

async function verifyOTP() {
  const otp = document.getElementById('login-otp').value;
  if (otp !== '1234') {
    alert("Invalid code. For this simulation, please use '1234'.");
    return;
  }

  const idInput = document.getElementById('login-id').value.trim();
  
  if (window.REFA_FIREBASE && window.REFA_FIREBASE.subscribeToContestants) {
    let found = false;
    window.REFA_FIREBASE.subscribeToContestants((contestants) => {
      if (found) return; // prevent multiple triggers
      const c = contestants.find(x => x.id === idInput);
      if (c) {
        found = true;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(c));
        fetchContestantData(c.id);
      } else {
        // Fallback simulation for testing UI without real data
        if (idInput.startsWith('HTM')) {
          found = true;
          const sim = {
            id: idInput,
            name: 'Test Contestant',
            categoryLabel: 'Gospel Singing',
            entryType: 'single',
            stageCurrent: 'audition',
            status: 'Paid & Confirmed',
            createdAt: new Date().toISOString()
          };
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(sim));
          fetchContestantData(sim.id);
        } else {
          alert("Contestant ID not found in database.");
          cancelOTP();
        }
      }
    });
  }
}

function fetchContestantData(contestantId) {
  // In a real app we'd attach a real-time listener here for live vote updates.
  // For now, we load from session.
  currentContestant = getSession();
  
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('dashboard-view').style.display = 'block';
  document.getElementById('btn-logout').style.display = 'block';
  
  renderDashboard();
}

function renderDashboard() {
  if (!currentContestant) return;
  
  // Header
  document.getElementById('dash-name').textContent = currentContestant.name;
  document.getElementById('dash-category').textContent = currentContestant.categoryLabel || 'General';
  document.getElementById('dash-id').textContent = currentContestant.id;
  
  // Stats
  document.getElementById('stat-status').textContent = currentContestant.status || 'Active';
  document.getElementById('stat-type').textContent = currentContestant.entryType === 'group' ? 'Group Entry' : 'Solo Entry';
  
  const d = new Date(currentContestant.createdAt);
  document.getElementById('stat-date').textContent = isNaN(d) ? '-' : d.toLocaleDateString();
  
  // Votes Link
  const linkText = `${window.location.origin}/leaderboard.html?event=${activeEvent.id}&vote=${currentContestant.id}`;
  document.getElementById('vote-link-text').textContent = linkText;
  document.getElementById('vote-link-text').dataset.full = linkText;
  
  // Journey Tracker
  renderJourneyTracker(currentContestant.stageCurrent || 'registration');
  
  // Schedule (Mock for now based on config)
  renderSchedule();
}

function renderJourneyTracker(currentStageId) {
  const container = document.getElementById('journey-bar');
  const fill = document.getElementById('j-fill');
  
  // Keep the lines
  container.innerHTML = '<div class="journey-line"></div><div class="journey-line-fill" id="j-fill"></div>';
  
  let currentIndex = JOURNEY_PHASES.findIndex(p => p.id === currentStageId);
  if (currentIndex === -1) currentIndex = 0;
  
  const totalSteps = JOURNEY_PHASES.length;
  
  JOURNEY_PHASES.forEach((phase, index) => {
    let stateClass = '';
    if (index < currentIndex) stateClass = 'past';
    else if (index === currentIndex) stateClass = 'active';
    
    container.innerHTML += `
      <div class="j-node ${stateClass}">
        <div class="j-dot"></div>
        <div class="j-label">${phase.label}</div>
      </div>
    `;
  });
  
  // Update fill width
  setTimeout(() => {
    const f = document.getElementById('j-fill');
    if (f) {
      const pct = (currentIndex / (totalSteps - 1)) * 100;
      f.style.width = `calc(${pct}% - 20px)`;
    }
  }, 100);
}

function renderSchedule() {
  const list = document.getElementById('schedule-list');
  
  let dates = {};
  if (activeEvent && activeEvent.dates) dates = activeEvent.dates;
  
  list.innerHTML = `
    <div class="event-item">
      <div class="event-date">
        <div class="e-month">SEP</div>
        <div class="e-day">20</div>
      </div>
      <div class="e-details">
        <h4>Physical Auditions</h4>
        <p>Arrive by 8:00 AM at your assigned venue. Bring your registration slip.</p>
        <span class="e-status" style="background:rgba(212,175,55,0.15); color:var(--brand-accent);">UPCOMING</span>
      </div>
    </div>
    
    <div class="event-item">
      <div class="event-date">
        <div class="e-month">OCT</div>
        <div class="e-day">04</div>
      </div>
      <div class="e-details">
        <h4>Callback Round</h4>
        <p>Top performers from auditions will be invited back for deeper assessment.</p>
      </div>
    </div>
  `;
}

function copyVoteLink() {
  const link = document.getElementById('vote-link-text').dataset.full;
  navigator.clipboard.writeText(link).then(() => {
    alert("Voting link copied to clipboard! Share it with your supporters.");
  });
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  currentContestant = null;
  document.getElementById('login-id').value = '';
  document.getElementById('login-phone').value = '';
  cancelOTP();
  checkSession();
}

window.requestOTP = requestOTP;
window.cancelOTP = cancelOTP;
window.verifyOTP = verifyOTP;
window.copyVoteLink = copyVoteLink;
window.logout = logout;
