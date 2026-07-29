/**
 * Registration Module
 * Handles multi-step form logic, validation, event configuration injection, 
 * simulated payment, and Firestore database writes.
 */

let activeEvent = null;
let currentStep = 1;
const TOTAL_STEPS = 5;
let generatedContestantId = null;

window.addEventListener('firebase-ready', async () => {
  // Try to get event from URL, default to hit-the-mic-s3 since it's the focus
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get('event') || 'hit-the-mic-s3';
  
  if (window.REFA_FIREBASE) {
    activeEvent = await window.REFA_FIREBASE.getEvent(eventId);
    if (activeEvent) {
      window.REFA_EVENTS.setActiveEvent(activeEvent);
      populateUI();
    } else {
      console.error("Event config not found:", eventId);
      alert("Registration closed or event not found.");
    }
  }
});

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
  document.getElementById('pay-amount').textContent = '₦' + fee.toLocaleString();
  document.getElementById('pay-amount').dataset.val = fee;
}

async function processPayment() {
  const btn = document.getElementById('btn-process-pay');
  btn.disabled = true;
  btn.innerHTML = '⌛ Processing...';

  // Simulate payment gateway delay (Paystack)
  setTimeout(async () => {
    // Generate unique ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    generatedContestantId = `HTM-${randomNum}`;

    // Collect data
    const contestantData = {
      id: generatedContestantId,
      eventId: activeEvent ? activeEvent.id : 'hit-the-mic-s3',
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
