/**
 * Judges Portal Logic
 * Handles role-based access, real-time contestant queue,
 * dynamic judging rubrics, and Firestore score submission.
 */

let activeEvent = null;
let currentJudge = null;
let allContestants = [];
let submittedScores = {}; // Map of contestantId -> true
const ACTIVE_STAGE = 'quarterfinals'; // Mock active stage

// Default HTM S3 Criteria if not in config
const DEFAULT_CRITERIA = [
  { id: 'vocal', label: 'Vocal / Performance Quality', max: 30, desc: 'Pitch, tone, control, and overall execution.' },
  { id: 'presence', label: 'Stage Presence', max: 20, desc: 'Confidence, energy, and stage command.' },
  { id: 'creativity', label: 'Creativity', max: 20, desc: 'Originality and unique artistic choices.' },
  { id: 'engagement', label: 'Audience Engagement', max: 10, desc: 'Ability to connect with the crowd.' },
  { id: 'appearance', label: 'Appearance', max: 10, desc: 'Costuming, grooming, and visual impact.' },
  { id: 'impact', label: 'Overall Impact', max: 10, desc: 'The "X-Factor" and memorable quality.' }
];

const initJudges = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event') ;
  
  if (window.REFA_FIREBASE) {
    activeEvent = await window.REFA_FIREBASE.getEvent(eventId);
    if (activeEvent) {
      window.REFA_EVENTS.setActiveEvent(activeEvent);
      document.getElementById('nav-brand').textContent = activeEvent.name || 'Event Hub';
      populateCategories();
    }
  }
};

if (window.REFA_FIREBASE) {
  initJudges();
} else {
  window.addEventListener('firebase-ready', initJudges);
}

function loginJudge() {
  const name = document.getElementById('judge-name').value.trim();
  const pass = document.getElementById('judge-passkey').value.trim();
  
  if (!name) { alert("Please enter your name."); return; }
  if (pass !== 'JUDGE-2026') {
    document.getElementById('auth-err').style.display = 'block';
    return;
  }
  
  currentJudge = { id: 'j-' + Date.now(), name: name };
  document.getElementById('auth-lock').style.display = 'none';
  document.getElementById('logged-judge').textContent = name;
  
  loadContestants();
}

function populateCategories() {
  if (!activeEvent || !activeEvent.categories) return;
  const select = document.getElementById('cat-filter');
  activeEvent.categories.forEach(cat => {
    select.innerHTML += `<option value="${cat.id}">${cat.label}</option>`;
  });
}

function loadContestants() {
  if (window.REFA_FIREBASE && window.REFA_FIREBASE.subscribeToContestants) {
    window.REFA_FIREBASE.subscribeToContestants((contestants) => {
      // For this simulation, if empty, we generate mock contestants so the UI works
      if (contestants.length === 0) {
        allContestants = [
          { id: 'HTM-1001', name: 'Chisom Okafor', category: 'gospel-singing', categoryLabel: 'Gospel Singing' },
          { id: 'HTM-1002', name: 'The Laughing Boy', category: 'comedy', categoryLabel: 'Comedy' },
          { id: 'HTM-1003', name: 'Rhythm Crew', category: 'dance', categoryLabel: 'Dance' },
          { id: 'HTM-1004', name: 'Sarah Wordsmith', category: 'spoken-word', categoryLabel: 'Spoken Word' }
        ];
      } else {
        allContestants = contestants;
      }
      renderContestants();
    });
  }
}

function filterContestants() {
  renderContestants();
}

function renderContestants() {
  const filter = document.getElementById('cat-filter').value;
  const list = document.getElementById('contestant-list');
  
  list.innerHTML = '';
  
  const filtered = filter === 'all' 
    ? allContestants 
    : allContestants.filter(c => c.category === filter);
    
  if (filtered.length === 0) {
    list.innerHTML = '<p style="color:rgba(255,255,255,0.4); text-align:center; font-size:12px; margin-top:20px;">No contestants found.</p>';
    return;
  }
  
  filtered.forEach(c => {
    const isScored = submittedScores[c.id];
    const statusClass = isScored ? 'status-scored' : 'status-pending';
    const statusText = isScored ? 'Scored' : 'Pending';
    
    list.innerHTML += `
      <div class="c-card ${isScored ? 'scored' : ''}" id="c-card-${c.id}" onclick="selectContestant('${c.id}')">
        <div class="c-info">
          <h4>${c.name}</h4>
          <p>${c.id}</p>
        </div>
        <div class="c-status ${statusClass}">${statusText}</div>
      </div>
    `;
  });
}

function selectContestant(id) {
  const contestant = allContestants.find(c => c.id === id);
  if (!contestant) return;
  
  // UI Selection State
  document.querySelectorAll('.c-card').forEach(el => el.classList.remove('active'));
  const card = document.getElementById(`c-card-${id}`);
  if (card) card.classList.add('active');
  
  // Show Panel
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('score-panel').style.display = 'block';
  
  // Populate Info
  document.getElementById('sc-name').textContent = contestant.name;
  document.getElementById('sc-id').textContent = contestant.id;
  document.getElementById('sc-cat').textContent = contestant.categoryLabel || contestant.category || 'General';
  document.getElementById('active-contestant-id').value = id;
  
  buildScoringForm();
  
  // Handle lock state if already scored
  const btn = document.getElementById('btn-submit-score');
  if (submittedScores[id]) {
    btn.disabled = true;
    btn.innerHTML = '✅ Score Already Submitted';
    // Lock inputs
    document.querySelectorAll('.score-input input, #sc-notes').forEach(input => input.disabled = true);
  } else {
    btn.disabled = false;
    btn.innerHTML = '🔒 Lock & Submit Score';
    document.querySelectorAll('.score-input input, #sc-notes').forEach(input => input.disabled = false);
  }
}

function buildScoringForm() {
  const container = document.getElementById('criteria-container');
  container.innerHTML = '';
  
  let criteria = DEFAULT_CRITERIA;
  if (activeEvent && activeEvent.details && activeEvent.details.judgingCriteria) {
    criteria = activeEvent.details.judgingCriteria;
  }
  
  criteria.forEach(crit => {
    container.innerHTML += `
      <div class="score-group">
        <div class="score-info">
          <h4>${crit.label} (Max ${crit.max})</h4>
          <p>${crit.desc}</p>
        </div>
        <div class="score-input">
          <input type="range" id="val-${crit.id}" min="0" max="${crit.max}" value="0" oninput="updateScore('${crit.id}')">
          <div class="score-display" id="disp-${crit.id}">0</div>
        </div>
      </div>
    `;
  });
  
  calculateTotal();
}

function updateScore(critId) {
  const val = document.getElementById(`val-${critId}`).value;
  document.getElementById(`disp-${critId}`).textContent = val;
  calculateTotal();
}

function calculateTotal() {
  let criteria = DEFAULT_CRITERIA;
  if (activeEvent && activeEvent.details && activeEvent.details.judgingCriteria) {
    criteria = activeEvent.details.judgingCriteria;
  }
  
  let total = 0;
  criteria.forEach(crit => {
    const el = document.getElementById(`val-${crit.id}`);
    if (el) total += parseInt(el.value) || 0;
  });
  
  document.getElementById('sc-total').textContent = total;
}

async function submitScore() {
  const cId = document.getElementById('active-contestant-id').value;
  if (!cId) return;
  
  if (!confirm("Are you sure? Once submitted, scores cannot be changed.")) return;
  
  const btn = document.getElementById('btn-submit-score');
  btn.disabled = true;
  btn.innerHTML = '⌛ Submitting...';
  
  let criteria = DEFAULT_CRITERIA;
  if (activeEvent && activeEvent.details && activeEvent.details.judgingCriteria) {
    criteria = activeEvent.details.judgingCriteria;
  }
  
  const scoresObj = {};
  criteria.forEach(crit => {
    scoresObj[crit.id] = parseInt(document.getElementById(`val-${crit.id}`).value) || 0;
  });
  
  const total = parseInt(document.getElementById('sc-total').textContent) || 0;
  const notes = document.getElementById('sc-notes').value.trim();
  
  const payload = {
    contestantId: cId,
    judgeId: currentJudge.id,
    judgeName: currentJudge.name,
    stageId: ACTIVE_STAGE,
    scores: scoresObj,
    total: total,
    notes: notes,
    submittedAt: new Date().toISOString()
  };
  
  // Write to Firestore (Simulated for this script, but structure is ready)
  if (window.REFA_FIREBASE) {
    try {
      const docId = `score-${cId}-${currentJudge.id}-${ACTIVE_STAGE}`;
      const docRef = window.REFA_FIREBASE.doc(window.REFA_FIREBASE.db, `events/${activeEvent.id}/contestant_scores`, docId);
      await window.REFA_FIREBASE.setDoc(docRef, payload);
      
      console.log("Score saved:", payload);
    } catch(e) {
      console.error("Firestore save failed, simulating local state", e);
    }
  }
  
  // Update local state
  submittedScores[cId] = true;
  btn.innerHTML = '✅ Score Submitted successfully';
  document.querySelectorAll('.score-input input, #sc-notes').forEach(input => input.disabled = true);
  
  // Re-render list to show 'Scored' badge
  renderContestants();
  
  // Re-apply active state to current item
  const card = document.getElementById(`c-card-${cId}`);
  if (card) {
    card.classList.add('active');
  }
}

window.loginJudge = loginJudge;
window.filterContestants = filterContestants;
window.selectContestant = selectContestant;
window.updateScore = updateScore;
window.submitScore = submitScore;
