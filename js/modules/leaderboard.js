/**
 * Leaderboard & Voting Logic
 * Handles real-time public leaderboard display, category filtering,
 * and simulated Paystack payment for voting.
 */

let activeEvent = null;
let allContestants = [];
let currentFilter = 'all';

let selectedContestantForVote = null;
let selectedVotePackage = { votes: 10, amount: 2000 };

window.addEventListener('firebase-ready', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event') || 'hit-the-mic-s3';
  
  // Optional pre-select contestant from URL (e.g. from contestant portal copy link)
  const voteTargetId = urlParams.get('vote');
  
  if (window.REFA_FIREBASE) {
    activeEvent = await window.REFA_FIREBASE.getEvent(eventId);
    if (activeEvent) {
      window.REFA_EVENTS.setActiveEvent(activeEvent);
      document.getElementById('nav-brand').textContent = activeEvent.name || 'Event Hub';
      populateCategoryTabs();
      
      // Subscribe to live contestants
      if (window.REFA_FIREBASE.subscribeToContestants) {
        window.REFA_FIREBASE.subscribeToContestants((contestants) => {
          allContestants = contestants;
          renderLeaderboard();
          
          // Auto-open modal if URL param exists and modal isn't already open
          if (voteTargetId && document.getElementById('vote-modal').style.display !== 'flex') {
            const target = contestants.find(c => c.id === voteTargetId);
            if (target) openVoteModal(target.id);
          }
        });
      }
    }
  }
});

function populateCategoryTabs() {
  if (!activeEvent || !activeEvent.categories) return;
  const container = document.getElementById('category-tabs');
  
  activeEvent.categories.forEach(cat => {
    container.innerHTML += `
      <div class="filter-tab" id="tab-${cat.id}" onclick="filterLeaderboard('${cat.id}')">${cat.label}</div>
    `;
  });
}

function filterLeaderboard(catId) {
  currentFilter = catId;
  
  // Update UI Tabs
  document.querySelectorAll('.filter-tab').forEach(el => el.classList.remove('active'));
  
  if (catId === 'all') {
    document.querySelector('.filter-tab:first-child').classList.add('active');
  } else {
    const tab = document.getElementById(`tab-${catId}`);
    if (tab) tab.classList.add('active');
  }
  
  renderLeaderboard();
}

function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  
  // Filter
  let filtered = currentFilter === 'all' 
    ? allContestants 
    : allContestants.filter(c => c.category === currentFilter);
    
  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center; padding: 40px; color:rgba(255,255,255,0.4);">No contestants found in this category.</div>';
    return;
  }
  
  // Sort descending by votes
  filtered.sort((a, b) => (b.publicVotes || 0) - (a.publicVotes || 0));
  
  // Get max votes for progress bar relative scaling
  const maxVotes = filtered.length > 0 ? (filtered[0].publicVotes || 1) : 1;
  
  filtered.forEach((c, index) => {
    const rank = index + 1;
    const votes = c.publicVotes || 0;
    const pct = maxVotes > 0 ? (votes / maxVotes) * 100 : 0;
    
    list.innerHTML += `
      <div class="l-card" data-rank="${rank}">
        <div class="l-rank">#${rank}</div>
        <div class="l-info">
          <div class="l-name">
            ${c.name} 
            <span class="l-cat-badge">${c.categoryLabel || 'General'}</span>
          </div>
          <div class="l-progress-container">
            <div class="l-progress-bar">
              <div class="l-progress-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        </div>
        <div class="l-stats">
          <div class="l-votes">${votes.toLocaleString()}</div>
          <div class="l-label">Votes</div>
        </div>
        <button class="btn-vote" onclick="openVoteModal('${c.id}')">VOTE</button>
      </div>
    `;
  });
}

// --- MODAL & PAYMENT LOGIC ---

function openVoteModal(contestantId) {
  const c = allContestants.find(x => x.id === contestantId);
  if (!c) return;
  
  selectedContestantForVote = c;
  
  document.getElementById('vm-name').textContent = c.name;
  document.getElementById('vm-cat').textContent = c.categoryLabel || 'General';
  
  document.getElementById('vote-modal').style.display = 'flex';
  
  // Reset selection to default (10 votes / N2000)
  const defaultCard = document.querySelector('.p-card');
  if (defaultCard) selectPackage(defaultCard, 10, 2000);
}

function closeVoteModal() {
  document.getElementById('vote-modal').style.display = 'none';
  selectedContestantForVote = null;
  
  // Remove '?vote=' param from URL cleanly so it doesn't auto-reopen on refresh
  const url = new URL(window.location);
  url.searchParams.delete('vote');
  window.history.replaceState({}, '', url);
}

function selectPackage(el, votes, amount) {
  document.querySelectorAll('.p-card').forEach(card => card.classList.remove('selected'));
  el.classList.add('selected');
  
  selectedVotePackage = { votes, amount };
  
  document.getElementById('btn-process-vote').textContent = `Pay ₦${amount.toLocaleString()} via Paystack`;
}

function processVotePayment() {
  if (!selectedContestantForVote) return;
  
  const btn = document.getElementById('btn-process-vote');
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = '⌛ Processing...';
  
  // Simulate network/Paystack delay
  setTimeout(async () => {
    const currentVotes = selectedContestantForVote.publicVotes || 0;
    const newTotal = currentVotes + selectedVotePackage.votes;
    
    if (window.REFA_FIREBASE && window.REFA_FIREBASE.updateContestantInDb) {
      await window.REFA_FIREBASE.updateContestantInDb(selectedContestantForVote.id, {
        publicVotes: newTotal
      });
    } else {
      console.warn("Firestore not connected. UI will not update permanently.");
    }
    
    btn.disabled = false;
    btn.textContent = '✅ Payment Successful!';
    btn.style.background = '#10b981';
    
    // Auto close modal
    setTimeout(() => {
      closeVoteModal();
      btn.style.background = '';
      btn.textContent = originalText;
    }, 1500);
    
  }, 1200);
}

window.filterLeaderboard = filterLeaderboard;
window.openVoteModal = openVoteModal;
window.closeVoteModal = closeVoteModal;
window.selectPackage = selectPackage;
window.processVotePayment = processVotePayment;
