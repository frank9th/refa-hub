/**
 * Event Day Live Run Sheet
 * Real-time MC cue system and stage coordination.
 */

let activeEvent = null;
let isLiveMode = false;
let cues = [];

const DEFAULT_CUES = [
  { id: 'cue-01', time: '16:00', segment: 'Crew Call & Soundcheck', note: 'All mics hot. Lighting cues locked.', crew: 'Stage Manager' },
  { id: 'cue-02', time: '17:30', segment: 'Doors Open / Red Carpet', note: 'DJ play background track #4. VIP escort active.', crew: 'Ushering & Media' },
  { id: 'cue-03', time: '18:00', segment: 'Show Start / Opening Hype', note: 'MC entrance from Stage Left. "Welcome to the Grand Finale!"', crew: 'MC / Audio' },
  { id: 'cue-04', time: '18:10', segment: 'Judges Introduction', note: 'Introduce all 3 judges. Camera pan to judges table.', crew: 'MC / Camera 1' },
  { id: 'cue-05', time: '18:15', segment: 'Round 1: Top 10 Performances', note: 'Contestants 1 to 5. 2 mins each.', crew: 'Stage Manager' },
  { id: 'cue-06', time: '19:00', segment: 'Parent Testimony Segment', note: 'Call up Mr. & Mrs. Okafor. Emotional lighting.', crew: 'MC / Lighting' },
  { id: 'cue-07', time: '19:15', segment: 'Round 2: Top 5', note: 'Final push. High stakes.', crew: 'Stage Manager' },
  { id: 'cue-08', time: '19:50', segment: 'Voting Closes & Collation', note: 'Voting portal locked. Acknowledge sponsors while counting.', crew: 'MC / Tech Booth' },
  { id: 'cue-09', time: '20:10', segment: 'Winner Announcement', note: 'Dim lights. Drumroll track.', crew: 'MC / Audio' },
  { id: 'cue-10', time: '20:30', segment: 'Closing & Photos', note: 'Confetti drop. Stage open for photos.', crew: 'All Crew' }
];

const runRunsheetInit = () => {
  startClock();
  setTimeout(() => {
    activeEvent = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
    initRunsheet();
  }, 300);
};

if (window.REFA_FIREBASE) {
  runRunsheetInit();
} else {
  window.addEventListener('firebase-ready', runRunsheetInit);
}

function startClock() {
  setInterval(() => {
    const el = document.getElementById('rs-clock');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
  }, 1000);
}

function initRunsheet() {
  if (!activeEvent || !activeEvent.id) return;
  
  if (window.REFA_FIREBASE && window.REFA_FIREBASE.subscribeToRunsheet) {
    window.REFA_FIREBASE.subscribeToRunsheet(activeEvent.id, (dbCues) => {
      // If DB is empty, use default cues
      if (dbCues.length === 0) {
        cues = DEFAULT_CUES.map(c => ({ ...c, status: 'pending' }));
      } else {
        // Sort by cue ID to keep order
        cues = dbCues.sort((a, b) => a.id.localeCompare(b.id));
      }
      renderRunsheet();
    });
  } else {
    // Fallback if no firebase
    cues = DEFAULT_CUES.map(c => ({ ...c, status: 'pending' }));
    renderRunsheet();
  }
}

function renderRunsheet() {
  const tbody = document.getElementById('runsheet-body');
  if (!tbody) return;
  
  tbody.innerHTML = '';
  
  let nextCueFound = false;
  
  cues.forEach(cue => {
    const isDone = cue.status === 'done';
    const isNext = !isDone && !nextCueFound;
    if (isNext) nextCueFound = true;
    
    let rowStyle = 'border-bottom: 1px solid rgba(255,255,255,0.05); transition: all 0.3s;';
    if (isDone) rowStyle += ' opacity: 0.4; background: rgba(0,0,0,0.4);';
    if (isNext) rowStyle += ' background: rgba(var(--brand-primary-rgb, 124,58,237), 0.15); border-left: 4px solid var(--brand-primary, #7c3aed);';
    
    let actionHtml = '';
    if (isDone) {
      actionHtml = '<span style="color:#34d399; font-weight:700; font-size:12px;">✓ DONE</span>';
    } else {
      actionHtml = `<button onclick="markCueDone('${cue.id}')" style="background: rgba(255,255,255,0.1); color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: ${isLiveMode ? 'pointer' : 'not-allowed'}; opacity: ${isLiveMode ? '1' : '0.5'};">Mark Done</button>`;
    }
    
    tbody.innerHTML += `
      <tr style="${rowStyle}">
        <td style="padding: 16px; font-weight: 700; color: ${isNext ? '#fff' : 'rgba(255,255,255,0.7)'};">${cue.time}</td>
        <td style="padding: 16px;">
          <div style="font-weight: 700; color: #fff; margin-bottom: 4px;">${cue.segment}</div>
          ${isNext ? '<div style="font-size:10px; background:var(--brand-primary, #7c3aed); color:#fff; display:inline-block; padding:2px 6px; border-radius:4px; text-transform:uppercase; font-weight:bold;">Next Up</div>' : ''}
        </td>
        <td style="padding: 16px; font-size: 13px; color: rgba(255,255,255,0.7); max-width: 300px; line-height: 1.4;">${cue.note}</td>
        <td style="padding: 16px; font-size: 12px; color: var(--brand-accent, #D4AF37); font-weight: 600;">${cue.crew}</td>
        <td style="padding: 16px; text-align: right;">${actionHtml}</td>
      </tr>
    `;
  });
}

function toggleRunsheetLiveMode() {
  isLiveMode = !isLiveMode;
  const btn = document.getElementById('btn-toggle-live-mode');
  if (isLiveMode) {
    btn.textContent = 'Live Mode: ACTIVE';
    btn.style.background = '#ef4444';
    btn.style.boxShadow = '0 0 15px rgba(239,68,68,0.4)';
  } else {
    btn.textContent = 'Enable Live Mode';
    btn.style.background = 'var(--brand-primary, #7c3aed)';
    btn.style.boxShadow = 'none';
  }
  renderRunsheet();
}

async function markCueDone(cueId) {
  if (!isLiveMode) {
    alert("Enable Live Mode first to mark cues as done.");
    return;
  }
  
  const cueIndex = cues.findIndex(c => c.id === cueId);
  if (cueIndex > -1) {
    // Optimistic UI update
    cues[cueIndex].status = 'done';
    renderRunsheet();
    
    if (activeEvent && window.REFA_FIREBASE && window.REFA_FIREBASE.updateRunsheetCue) {
      await window.REFA_FIREBASE.updateRunsheetCue(activeEvent.id, cueId, {
        ...cues[cueIndex],
        completedAt: new Date().toISOString()
      });
    }
  }
}

window.toggleRunsheetLiveMode = toggleRunsheetLiveMode;
window.markCueDone = markCueDone;
