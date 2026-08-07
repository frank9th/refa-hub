/**
 * Registration Module
 * Handles multi-step form logic, validation, event configuration injection, 
 * simulated payment, and Firestore database writes.
 */

let activeEvent = null;
let currentStep = 1;
const TOTAL_STEPS = 5;
let generatedContestantId = null;

const initRegistration = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event');

  if (!eventId) {
    console.error('[Registration] No event ID in URL. Add ?event=<id> to the page URL.');
    alert('Registration is not available — no event was specified. Please use a valid registration link.');
    return;
  }
  
  if (window.REFA_FIREBASE) {
    activeEvent = await window.REFA_FIREBASE.getEvent(eventId);
    if (activeEvent) {
      window.REFA_EVENTS.setActiveEvent(activeEvent);
      populateUI();

      // ── Showtime Handoff Detection ─────────────────────────────────────
      // If the user was redirected here from Showtime's profile completion page,
      // ?from=showtime will be in the URL with pre-filled data and an HMAC sig.
      if (urlParams.get('from') === 'showtime') {
        await handleShowtimeHandoff(urlParams);
      }

    } else {
      console.error('[Registration] Event config not found:', eventId);
      alert('Registration closed or event not found. Please use a valid registration link.');
    }
  }
};

if (window.REFA_FIREBASE) {
  initRegistration();
} else {
  window.addEventListener('firebase-ready', initRegistration);
}

/**
 * Handles the Showtime → REFA handoff:
 * 1. Verifies the HMAC signature via the proxy
 * 2. Pre-fills Step 1 fields
 * 3. Shows a continuation banner
 * 4. Auto-advances to Step 2
 */
async function handleShowtimeHandoff(urlParams) {
  const handoffData = {
    from:           urlParams.get('from') || '',
    name:           urlParams.get('name') || '',
    phone:          urlParams.get('phone') || '',
    email:          urlParams.get('email') || '',
    dob:            urlParams.get('dob') || '',
    state:          urlParams.get('state') || '',
    guardian:       urlParams.get('guardian') || '',
    photo_url:      urlParams.get('photo_url') || '',
    ref:            urlParams.get('ref') || '',
    showtime_code:  urlParams.get('showtime_code') || '',
    chanel_id:      urlParams.get('chanel_id') || '',
    sig:            urlParams.get('sig') || '',
  };

  // If no name/email/phone from handoff, this is not a handoff redirect
  if (!handoffData.name && !handoffData.email && !handoffData.phone) return;

  // ── 1. Verify HMAC signature via proxy ──────────────────────────────
  let isSignatureInvalid = false;
  try {
    const configSnap = await getShowtimeConfig();
    if (configSnap) {
      const verifyRes = await fetch('/api/showtime-proxy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verifyHandoff',
          payload: handoffData,
          apiUrl: configSnap.apiUrl,
          apiKey: configSnap.apiKey,
        }),
      });
      if (verifyRes.ok) {
        const verifyJson = await verifyRes.json();
        if (verifyJson.valid === false) {
          isSignatureInvalid = true;
          console.warn('[Registration] Showtime handoff signature invalid — prefill rejected.', verifyJson);
        }
      } else {
        console.warn(`[Registration] Handoff proxy returned status ${verifyRes.status}. Proceeding with graceful prefill.`);
      }
    }
  } catch (err) {
    console.warn('[Registration] Handoff verification network error (non-fatal):', err.message);
  }

  // Reject prefill ONLY if signature check explicitly failed with valid === false
  if (isSignatureInvalid) return;

  // ── 2. Prefill Step 1 fields ─────────────────────────────────────────
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.value = val;
  };
  setVal('reg-name',     handoffData.name);
  setVal('reg-phone',    handoffData.phone);
  setVal('reg-email',    handoffData.email);
  setVal('reg-dob',      handoffData.dob);
  setVal('reg-state',    handoffData.state);
  setVal('reg-guardian', handoffData.guardian);

  // If photo_url was passed from Showtime, display the passport preview in Step 3
  if (handoffData.photo_url) {
    const previewContainer = document.getElementById('photo-preview-container');
    const previewImg = document.getElementById('photo-preview-img');
    const photoIcon = document.getElementById('photo-icon');
    const photoText = document.getElementById('photo-text');
    const photoSub = document.getElementById('photo-sub');

    if (previewImg) {
      previewImg.src = handoffData.photo_url;
      if (previewContainer) previewContainer.style.display = 'block';
      if (photoIcon) photoIcon.style.display = 'none';
      if (photoText) {
        photoText.textContent = '✓ Passport Photo Imported from Quinsty';
        photoText.style.color = '#34d399';
        photoText.style.fontWeight = '700';
      }
      if (photoSub) {
        photoSub.textContent = 'Click to replace with a different photo (Optional)';
      }
    }
  }

  // Store handoff metadata for use in processPayment
  window._showtimeHandoff = handoffData;

  // ── 3. Show continuation banner ──────────────────────────────────────
  showContinuationBanner(handoffData.name);

  // ── 4. Auto-advance to Step 2 ────────────────────────────────────────
  // Small delay so the banner is visible before transition
  setTimeout(() => {
    if (typeof nextStep === 'function') nextStep(2);
  }, 800);
}

function showContinuationBanner(name) {
  const banner = document.createElement('div');
  banner.id = 'showtime-banner';
  banner.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
    background: linear-gradient(90deg, #f59e0b, #d97706);
    color: #000; font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px; font-weight: 700; letter-spacing: 0.2px;
    padding: 10px 20px; text-align: center;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 2px 12px rgba(245,158,11,0.4);
    animation: slideDown 0.4s cubic-bezier(.4,0,.2,1);
  `;
  banner.innerHTML = `
    <span>✅</span>
    <span>Welcome back${name ? ', ' + name.split(' ')[0] : ''}!</span>
    <span style="font-weight:400;opacity:0.8;">Your basic info was carried over from Quinsty — just pick your category to continue.</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:16px;padding:0 4px;color:#000;margin-left:8px;">×</button>
  `;
  // Inject keyframe
  if (!document.getElementById('showtime-banner-style')) {
    const style = document.createElement('style');
    style.id = 'showtime-banner-style';
    style.textContent = '@keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }';
    document.head.appendChild(style);
  }
  document.body.prepend(banner);
  setTimeout(() => banner.remove(), 8000);
}

// Expose for use in getShowtimeConfig (imported from showtime-proxy context is not available here,
// so we fetch the config from Firestore directly in registration.js)
async function getShowtimeConfig() {
  try {
    if (!window.REFA_FIREBASE) return null;
    // Use the firebase db instance
    const { getFirestore, doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
    const db = getFirestore();
    const snap = await getDoc(doc(db, 'rafa_config', 'showtime'));
    return snap.exists() ? snap.data() : null;
  } catch (e) {
    return null;
  }
}


function populateUI() {
  if (!activeEvent) return;

  // Header texts
  document.getElementById('page-title').textContent = activeEvent.name || 'Contestant Registration';
  document.getElementById('page-tagline').textContent = activeEvent.tagline || 'Join the competition.';
  document.getElementById('nav-brand').textContent = activeEvent.name || 'Event Hub';
  
  // Categories
  const categoryGrid = document.getElementById('category-grid');
  if (activeEvent.categories && activeEvent.categories.length > 0) {
    categoryGrid.innerHTML = activeEvent.categories.map(cat => `
      <div class="category-card" id="cat-card-${cat.id}" onclick="selectCategory('${cat.id}', '${cat.label}', ${cat.groupAllowed})">
        <div class="category-icon">${cat.icon || '🎤'}</div>
        <div class="category-name">${cat.label}</div>
        <div class="category-meta">${cat.groupAllowed ? 'Solo or Group' : 'Solo Only'}</div>
      </div>
    `).join('');
  } else {
    // Fallback if no categories
    categoryGrid.innerHTML = `<div class="category-card selected" onclick="selectCategory('general', 'General Entry', false)">
      <div class="category-name">General Entry</div>
    </div>`;
    selectCategory('general', 'General Entry', false);
  }
}

function selectCategory(id, label, groupAllowed) {
  // Update UI
  document.querySelectorAll('.category-card').forEach(el => el.classList.remove('selected'));
  const card = document.getElementById(`cat-card-${id}`);
  if (card) card.classList.add('selected');
  
  // Set hidden value
  document.getElementById('reg-category').value = id;
  document.getElementById('reg-category').dataset.label = label;
  
  // Restrict entry type if group not allowed
  const typeSelect = document.getElementById('reg-entry-type');
  if (!groupAllowed) {
    typeSelect.value = 'single';
    typeSelect.disabled = true;
  } else {
    typeSelect.disabled = false;
  }
  toggleGroupFields();
}

function toggleGroupFields() {
  const type = document.getElementById('reg-entry-type').value;
  const groupFields = document.getElementById('group-fields');
  if (type === 'group') {
    groupFields.style.display = 'block';
  } else {
    groupFields.style.display = 'none';
  }
}

function handleFile(input, textElementId) {
  const textEl = document.getElementById(textElementId);
  if (input.files && input.files[0]) {
    const file = input.files[0];
    if (file.size > 2 * 1024 * 1024) {
      alert("File is too large. Max 2MB allowed.");
      input.value = '';
      return;
    }
    textEl.textContent = file.name;
    textEl.style.color = '#34d399';

    if (input.id === 'file-photo') {
      const previewContainer = document.getElementById('photo-preview-container');
      const previewImg = document.getElementById('photo-preview-img');
      const photoIcon = document.getElementById('photo-icon');
      const reader = new FileReader();
      reader.onload = function(e) {
        if (previewImg) previewImg.src = e.target.result;
        if (previewContainer) previewContainer.style.display = 'block';
        if (photoIcon) photoIcon.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }
}

function validateStep(step) {
  if (step === 1) {
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const dob = document.getElementById('reg-dob').value;
    if (!name || !phone || !dob) {
      alert("Please fill out Name, Date of Birth, and Phone Number.");
      return false;
    }
  } else if (step === 2) {
    const cat = document.getElementById('reg-category').value;
    if (!cat) {
      alert("Please select a contest category.");
      return false;
    }
    const type = document.getElementById('reg-entry-type').value;
    if (type === 'group') {
      const gName = document.getElementById('reg-group-name').value.trim();
      if (!gName) {
        alert("Please provide a Group Name for group entries.");
        return false;
      }
    }
  } else if (step === 3) {
    // In a real app we'd require the photo upload, but we can bypass for now
  }
  return true;
}

function nextStep(targetStep) {
  if (!validateStep(currentStep)) return;
  
  if (targetStep === 4) {
    preparePaymentSummary();
  }

  document.getElementById(`step-${currentStep}`).classList.remove('active');
  document.getElementById(`step-${targetStep}`).classList.add('active');
  
  updateStepper(targetStep);
  currentStep = targetStep;
  window.scrollTo(0, 0);
}

function prevStep(targetStep) {
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  document.getElementById(`step-${targetStep}`).classList.add('active');
  
  updateStepper(targetStep);
  currentStep = targetStep;
  window.scrollTo(0, 0);
}

function updateStepper(step) {
  for (let i = 1; i <= 4; i++) {
    const nav = document.getElementById(`step-nav-${i}`);
    if (i < step) {
      nav.className = 'step-item completed';
    } else if (i === step) {
      nav.className = 'step-item active';
    } else {
      nav.className = 'step-item';
    }
  }
}

function preparePaymentSummary() {
  const name = document.getElementById('reg-name').value;
  const catLabel = document.getElementById('reg-category').dataset.label;
  const type = document.getElementById('reg-entry-type').value;
  
  document.getElementById('pay-name').textContent = name;
  document.getElementById('pay-category').textContent = catLabel;
  document.getElementById('pay-type').textContent = type === 'single' ? 'Solo Entry' : 'Group Entry';
  
  // Calculate Fee based on config
  let fee = 5000; // fallback default
  if (activeEvent && activeEvent.details) {
    fee = type === 'single' ? (activeEvent.details.registrationFeeSingle || 5000) : (activeEvent.details.registrationFeeGroup || 10000);
  }

  const payAmountEl = document.getElementById('pay-amount');
  const payBtnEl = document.getElementById('btn-process-pay');

  if (window._showtimeHandoff) {
    // Show carried over contestant code in summary if available
    if (window._showtimeHandoff.showtime_code) {
      const rowCode = document.getElementById('pay-row-code');
      const valCode = document.getElementById('pay-code');
      if (rowCode) rowCode.style.display = 'flex';
      if (valCode) valCode.textContent = window._showtimeHandoff.showtime_code;
    }

    // Waive fee if they came from a paid Quinsty membership ticket
    if (payAmountEl) {
      payAmountEl.textContent = 'Pre-paid (Quinsty Ticket)';
      payAmountEl.dataset.val = 0;
      payAmountEl.style.color = '#10B981'; // green to indicate paid
    }
    if (payBtnEl) {
      payBtnEl.innerHTML = 'Complete Registration';
    }
  } else {
    if (payAmountEl) {
      payAmountEl.textContent = '₦' + fee.toLocaleString();
      payAmountEl.dataset.val = fee;
      payAmountEl.style.color = '';
    }
    if (payBtnEl) {
      payBtnEl.innerHTML = '🔒 Pay Securely';
    }
  }
}

async function processPayment() {
  const btn = document.getElementById('btn-process-pay');
  btn.disabled = true;
  btn.innerHTML = '⌛ Processing...';

  // Simulate payment gateway delay (Paystack)
  setTimeout(async () => {
    // Generate unique ID / Sync with carry-over Showtime contestant code
    if (window._showtimeHandoff && window._showtimeHandoff.showtime_code) {
      generatedContestantId = window._showtimeHandoff.showtime_code;
    } else {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      generatedContestantId = `HTM-${randomNum}`;
    }

    // Collect data
    const contestantData = {
      id: generatedContestantId,
      code: generatedContestantId,
      eventId: activeEvent ? activeEvent.id : null,
      name: document.getElementById('reg-name').value.trim(),
      dob: document.getElementById('reg-dob').value,
      phone: document.getElementById('reg-phone').value.trim(),
      email: document.getElementById('reg-email').value.trim(),
      state: document.getElementById('reg-state').value,
      guardianName: document.getElementById('reg-guardian').value.trim(),
      category: document.getElementById('reg-category').value,
      categoryLabel: document.getElementById('reg-category').dataset.label,
      entryType: document.getElementById('reg-entry-type').value,
      groupName: document.getElementById('reg-group-name').value.trim(),
      groupSize: parseInt(document.getElementById('reg-group-size').value) || 1,
      bio: document.getElementById('reg-bio').value.trim(),
      videoLink: document.getElementById('reg-video-link').value.trim(),
      stageCurrent: 'audition',
      status: 'Paid & Confirmed',
      amountPaid: parseInt(document.getElementById('pay-amount').dataset.val),
      paymentRef: `sim_pay_${Date.now()}`
    };

    // ── Attach Showtime cross-reference if this is a handoff ────────────
    if (window._showtimeHandoff) {
      const h = window._showtimeHandoff;
      contestantData.showtimeCode   = h.showtime_code || null;   // Links to Showtime Member.code
      contestantData.showtimeChanelId = h.chanel_id || null;     // Showtime channel PK
      contestantData.showtimeRef    = h.ref || null;             // Paystack ref from ticket
      contestantData.photoUrl       = h.photo_url || null;       // Photo uploaded on Showtime
      contestantData.registeredVia  = 'showtime_handoff';
      contestantData.paymentRef     = h.ref || contestantData.paymentRef;
    }

    // Save to Firestore
    if (window.REFA_FIREBASE && window.REFA_FIREBASE.addContestantToDb) {
      await window.REFA_FIREBASE.addContestantToDb(contestantData);
    } else {
      console.warn("Firestore not connected. Simulating success.");
    }

    // Populate Slip
    document.getElementById('slip-event-name').textContent = activeEvent ? activeEvent.name : 'Event';
    document.getElementById('slip-id').textContent = generatedContestantId;
    document.getElementById('slip-name').textContent = contestantData.name;
    document.getElementById('slip-cat').textContent = contestantData.categoryLabel;
    document.getElementById('slip-type').textContent = contestantData.entryType === 'single' ? 'Solo' : 'Group';

    // Move to step 5
    document.getElementById('stepper').style.display = 'none';
    document.getElementById('step-4').classList.remove('active');
    document.getElementById('step-5').classList.add('active');
    window.scrollTo(0, 0);

  }, 1500);
}

function downloadSlip() {
  const slipElement = document.getElementById('confirmation-slip');
  html2canvas(slipElement, { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new window.jspdf.jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    // Add header text to PDF to make it look official
    pdf.setFontSize(10);
    pdf.setTextColor(150);
    pdf.text("Official Registration Document", 10, 10);
    
    pdf.addImage(imgData, 'JPEG', 10, 20, pdfWidth - 20, pdfHeight - (20 * imgProps.height / imgProps.width));
    pdf.save(`${generatedContestantId || 'contestant'}-registration-slip.pdf`);
  });
}

// Expose navigation methods
window.nextStep = nextStep;
window.prevStep = prevStep;
window.selectCategory = selectCategory;
window.toggleGroupFields = toggleGroupFields;
window.handleFile = handleFile;
window.processPayment = processPayment;
window.downloadSlip = downloadSlip;
