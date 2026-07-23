let countdownInterval;
let remainingTime = 0;
let isWarning = false;

// Custom uploaded image URL
let uploadedImageUrl = '';

// Broadcast channel for pop-out sync
const cdChannel = new BroadcastChannel('countdown_sync');

// Audio context and nodes
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playBeep(frequency, duration, type = 'sine', volume = 0.5) {
  if (!audioCtx) return;
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
}

function playWarningTick() {
  const isMuted = document.getElementById('cd-mute')?.checked;
  if (isMuted) return;
  playBeep(800, 0.15, 'square', 0.3);
}

function playAlarm() {
  const isMuted = document.getElementById('cd-mute')?.checked;
  if (isMuted) return;
  playBeep(1200, 0.4, 'square', 0.5);
  setTimeout(() => playBeep(1200, 0.4, 'square', 0.5), 500);
  setTimeout(() => playBeep(1200, 0.8, 'square', 0.5), 1000);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Store drag positions
const positions = {
  'cd-display': { x: 0, y: 0 },
  'cd-title': { x: 0, y: 0 },
  'cd-desc': { x: 0, y: 0 },
  'cd-footer': { x: 0, y: 0 }
};

function broadcastState() {
  cdChannel.postMessage({
    timeText: formatTime(remainingTime),
    isWarning: isWarning,
    background: document.getElementById('cd-container')?.style.background || '',
    backgroundColor: document.getElementById('cd-container')?.style.backgroundColor || '',
    backgroundImage: document.getElementById('cd-container')?.style.backgroundImage || '',
    backgroundSize: document.getElementById('cd-container')?.style.backgroundSize || '',
    backgroundPosition: document.getElementById('cd-container')?.style.backgroundPosition || '',
    
    fontFamily: document.getElementById('cd-font-family')?.value || "'Oswald', sans-serif",
    overlayOpacity: document.getElementById('cd-overlay-opacity')?.value || 60,
    
    titleText: document.getElementById('cd-title-input')?.value || '',
    titleColor: document.getElementById('cd-title-color')?.value || '#ffffff',
    titleSize: document.getElementById('cd-title-size')?.value || 4,
    
    descText: document.getElementById('cd-desc-input')?.value || '',
    descColor: document.getElementById('cd-desc-color')?.value || '#ffffff',
    descSize: document.getElementById('cd-desc-size')?.value || 2,
    
    footerText: document.getElementById('cd-footer-input')?.value || '',
    footerColor: document.getElementById('cd-footer-color')?.value || '#ffffff',
    footerSize: document.getElementById('cd-footer-size')?.value || 1.5,
    
    timerColor: document.getElementById('cd-timer-color')?.value || '#ffffff',
    timerSize: document.getElementById('cd-text-size')?.value || 15,
    
    positions: positions
  });
}

function updateDisplay() {
  const display = document.getElementById('cd-display');
  if (!display) return;
  
  display.textContent = formatTime(remainingTime);
  
  if (remainingTime <= 10 && remainingTime > 0) {
    if (!isWarning) {
      isWarning = true;
      display.classList.add('warning');
    }
  } else {
    isWarning = false;
    display.classList.remove('warning');
  }
  
  broadcastState();
}

function startCountdown() {
  initAudio();
  if (countdownInterval) return;
  if (remainingTime <= 0) {
    const mins = parseInt(document.getElementById('cd-min').value) || 0;
    const secs = parseInt(document.getElementById('cd-sec').value) || 0;
    remainingTime = (mins * 60) + secs;
    if (remainingTime <= 0) return;
  }
  
  updateDisplay();
  
  countdownInterval = setInterval(() => {
    remainingTime--;
    updateDisplay();
    
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      countdownInterval = null;
      playAlarm();
    } else if (remainingTime <= 10) {
      playWarningTick();
    }
  }, 1000);
}

function pauseCountdown() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

function resetCountdown() {
  pauseCountdown();
  const mins = parseInt(document.getElementById('cd-min').value) || 0;
  const secs = parseInt(document.getElementById('cd-sec').value) || 0;
  remainingTime = (mins * 60) + secs;
  updateDisplay();
  isWarning = false;
  const display = document.getElementById('cd-display');
  if(display) display.classList.remove('warning');
  broadcastState();
}

function updateTextElements() {
  const title = document.getElementById('cd-title');
  if(title) {
    title.textContent = document.getElementById('cd-title-input').value;
    title.style.color = document.getElementById('cd-title-color').value;
    title.style.fontSize = document.getElementById('cd-title-size').value + 'vw';
  }

  const desc = document.getElementById('cd-desc');
  if(desc) {
    desc.textContent = document.getElementById('cd-desc-input').value;
    desc.style.color = document.getElementById('cd-desc-color').value;
    desc.style.fontSize = document.getElementById('cd-desc-size').value + 'vw';
  }

  const footer = document.getElementById('cd-footer');
  if(footer) {
    footer.textContent = document.getElementById('cd-footer-input').value;
    footer.style.color = document.getElementById('cd-footer-color').value;
    footer.style.fontSize = document.getElementById('cd-footer-size').value + 'vw';
  }
  
  const timer = document.getElementById('cd-display');
  if(timer && !isWarning) {
    timer.style.color = document.getElementById('cd-timer-color').value;
  }
  if(timer) {
    timer.style.fontSize = document.getElementById('cd-text-size').value + 'vw';
  }

  const font = document.getElementById('cd-font-family').value;
  document.querySelectorAll('.cd-text-element').forEach(el => {
    el.style.fontFamily = font;
  });

  const overlay = document.getElementById('cd-overlay');
  if(overlay) {
    const opacity = document.getElementById('cd-overlay-opacity').value;
    if (opacity > 0) {
      overlay.style.display = 'block';
      overlay.style.background = `rgba(0,0,0,${opacity / 100})`;
    } else {
      overlay.style.display = 'none';
    }
  }

  broadcastState();
}

function changeBackground() {
  const bgType = document.getElementById('cd-bg-type').value;
  const container = document.getElementById('cd-container');
  if (!container) return;
  
  // Toggle UI visibility
  document.getElementById('cd-gradient-opts').style.display = (bgType === 'gradient') ? 'block' : 'none';
  document.getElementById('cd-image-opts').style.display = (bgType === 'image') ? 'block' : 'none';

  // Reset backgrounds
  container.style.background = '';
  container.style.backgroundImage = '';
  container.style.backgroundColor = '';
  
  if (bgType === 'transparent') {
    container.style.backgroundColor = '#00FF00';
  } else if (bgType === 'solid') {
    container.style.backgroundColor = '#08172E';
  } else if (bgType === 'gradient') {
    container.style.background = document.getElementById('cd-gradient-type').value;
  } else if (bgType === 'image') {
    if (uploadedImageUrl) {
      container.style.backgroundImage = `url("${uploadedImageUrl}")`;
      container.style.backgroundSize = 'cover';
      container.style.backgroundPosition = 'center';
    } else {
      container.style.backgroundImage = 'url("https://via.placeholder.com/1920x1080.png?text=REFA+Timer+Background")';
      container.style.backgroundSize = 'cover';
      container.style.backgroundPosition = 'center';
    }
  }
  broadcastState();
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      uploadedImageUrl = evt.target.result;
      if (document.getElementById('cd-bg-type').value === 'image') {
        changeBackground();
      }
    };
    reader.readAsDataURL(file);
  }
}

function openCountdownPopout() {
  broadcastState(); 
  window.open('countdown-display.html', '_blank', 'width=1280,height=720,menubar=no,toolbar=no,location=no,status=no');
  setTimeout(broadcastState, 1000);
}

// Drag & Drop logic for independent text elements
function initDrag(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;

  el.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX - positions[elementId].x;
    dragStartY = e.clientY - positions[elementId].y;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    positions[elementId].x = e.clientX - dragStartX;
    positions[elementId].y = e.clientY - dragStartY;
    el.style.transform = `translate(${positions[elementId].x}px, ${positions[elementId].y}px)`;
    broadcastState();
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const bgSelect = document.getElementById('cd-bg-type');
  if(bgSelect) bgSelect.addEventListener('change', changeBackground);
  
  const gradSelect = document.getElementById('cd-gradient-type');
  if(gradSelect) gradSelect.addEventListener('change', changeBackground);
  
  const fileInput = document.getElementById('cd-bg-upload');
  if(fileInput) fileInput.addEventListener('change', handleImageUpload);
  
  ['title', 'desc', 'footer'].forEach(id => {
    const textInput = document.getElementById(`cd-${id}-input`);
    const colorInput = document.getElementById(`cd-${id}-color`);
    const sizeInput = document.getElementById(`cd-${id}-size`);
    
    if(textInput) textInput.addEventListener('input', updateTextElements);
    if(colorInput) colorInput.addEventListener('input', updateTextElements);
    if(sizeInput) sizeInput.addEventListener('input', updateTextElements);
  });

  const timerColor = document.getElementById('cd-timer-color');
  if(timerColor) timerColor.addEventListener('input', updateTextElements);
  const timerSize = document.getElementById('cd-text-size');
  if(timerSize) timerSize.addEventListener('input', updateTextElements);

  const fontSelect = document.getElementById('cd-font-family');
  if(fontSelect) fontSelect.addEventListener('change', updateTextElements);

  const overlayOpacity = document.getElementById('cd-overlay-opacity');
  if(overlayOpacity) overlayOpacity.addEventListener('input', updateTextElements);
  
  // Init drag for all elements
  initDrag('cd-display');
  initDrag('cd-title');
  initDrag('cd-desc');
  initDrag('cd-footer');

  // Trigger initial paint
  updateTextElements();
});

function exportCountdownGraphic() {
  const container = document.getElementById('cd-container');
  const btn = event.currentTarget;
  const originalText = btn.textContent;
  btn.textContent = '?? EXPORTING...';
  btn.style.opacity = '0.7';

  // Scale up the display temporarily for high-res export
  const scale = 4;

  html2canvas(container, {
    scale: scale,
    useCORS: true,
    backgroundColor: null
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = 'REFA_Timer_Graphic_' + Date.now() + '.png';
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
    
    btn.textContent = originalText;
    btn.style.opacity = '1';
  }).catch(err => {
    console.error('Export failed', err);
    btn.textContent = '? EXPORT FAILED';
    setTimeout(() => { btn.textContent = originalText; btn.style.opacity = '1'; }, 2000);
  });
}
