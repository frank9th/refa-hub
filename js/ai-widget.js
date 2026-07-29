// js/ai-widget.js
// Logic for the Floating AI Event Strategist Widget

document.addEventListener('DOMContentLoaded', () => {
  // 1. Check RBAC (Role-Based Access Control)
  // We assume the session is stored in sessionStorage as 'refa_session'
  const sessionData = sessionStorage.getItem('refa_session');
  let allowed = false;
  if (sessionData) {
    try {
      const session = JSON.parse(sessionData);
      if (session.role === 'admin' || session.role === 'ops') {
        allowed = true; // Allow admins and ops (directors) to see the AI widget
      }
    } catch (e) {}
  } else {
    // For development convenience, we'll allow it if there's no auth active
    allowed = true; 
  }

  if (!allowed) return;

  // 2. Inject the HTML for the Widget
  const widgetHtml = `
    <div id="ai-widget-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 9999; font-family: 'Inter', sans-serif;">
      <!-- Chat Window -->
      <div id="ai-chat-window" style="display: none; width: 360px; height: 500px; background: rgba(15, 23, 42, 0.95); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 16px; flex-direction: column; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.5); backdrop-filter: blur(12px); margin-bottom: 16px; animation: slideUp 0.3s ease;">
        
        <!-- Header -->
        <div style="background: #0B1120; padding: 16px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🤖</span>
            <div>
              <div style="font-size: 14px; font-weight: 700; color: #fff;">AI Strategist</div>
              <div style="font-size: 10px; color: rgba(255,255,255,0.7); text-transform: uppercase; letter-spacing: 0.5px;" id="ai-widget-event-name">Loading...</div>
            </div>
          </div>
          <button id="ai-close-btn" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; opacity: 0.7; transition: opacity 0.2s;">&times;</button>
        </div>
        
        <!-- Messages Area -->
        <div id="ai-chat-messages" style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px;">
          <div class="ai-msg">
            Hello! I am your AI Strategist. I can see the exact page you're working on. What would you like to review or plan?
          </div>
        </div>
        
        <!-- Input Area -->
        <div style="padding: 12px; background: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px;">
          <input type="text" id="ai-chat-input" placeholder="Ask about tasks, finances..." style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 10px 14px; color: #fff; font-size: 13px; outline: none; transition: border-color 0.2s;" autocomplete="off" />
          <button id="ai-send-btn" style="background: #1E293B; border: none; width: 40px; height: 40px; border-radius: 50%; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      </div>
      
      <!-- Floating Button -->
      <button id="ai-fab" style="width: 60px; height: 60px; border-radius: 50%; background: #0B1120; border: 2px solid rgba(255, 255, 255, 0.15); color: #fff; font-size: 24px; cursor: pointer; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; margin-left: auto; transition: transform 0.3s, box-shadow 0.3s;">
        🤖
      </button>
    </div>
    <style>
      @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      #ai-chat-input:focus { border-color: rgba(139, 92, 246, 0.5); box-shadow: 0 0 10px rgba(139, 92, 246, 0.2); }
      #ai-fab:hover { transform: scale(1.05) translateY(-2px); box-shadow: 0 12px 28px rgba(124, 58, 237, 0.5); }
      #ai-close-btn:hover { opacity: 1 !important; }
      #ai-send-btn:hover { transform: scale(1.05); }
      
      .ai-msg { background: rgba(139, 92, 246, 0.15); border: 1px solid rgba(139, 92, 246, 0.3); padding: 12px; border-radius: 12px 12px 12px 0; color: #e2e8f0; font-size: 13px; line-height: 1.5; align-self: flex-start; max-width: 85%; }
      .user-msg { background: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); padding: 12px; border-radius: 12px 12px 0 12px; color: #fff; font-size: 13px; line-height: 1.5; align-self: flex-end; max-width: 85%; }
      .ai-msg strong { color: #a78bfa; }
      .ai-msg p { margin: 0 0 8px 0; }
      .ai-msg p:last-child { margin: 0; }
      .ai-msg ul { margin: 0 0 8px 0; padding-left: 20px; }
      .ai-thinking-dots { display: flex; gap: 4px; padding: 12px; }
      .ai-thinking-dots span { width: 6px; height: 6px; background: #a78bfa; border-radius: 50%; animation: pulse-dot 1.4s infinite ease-in-out both; }
      .ai-thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
      .ai-thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
      @keyframes pulse-dot { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
    </style>
  `;

  document.body.insertAdjacentHTML('beforeend', widgetHtml);

  // 3. Widget Interactions
  const fab = document.getElementById('ai-fab');
  const chatWindow = document.getElementById('ai-chat-window');
  const closeBtn = document.getElementById('ai-close-btn');
  const sendBtn = document.getElementById('ai-send-btn');
  const chatInput = document.getElementById('ai-chat-input');
  const messagesArea = document.getElementById('ai-chat-messages');
  const eventNameLabel = document.getElementById('ai-widget-event-name');

  let chatHistory = [];

  fab.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    fab.style.display = 'none';
    chatInput.focus();
    
    // Update event name label
    const event = window.REFA_EVENTS && window.REFA_EVENTS.getActiveEvent();
    if (event) {
      eventNameLabel.textContent = event.name || 'Unknown Event';
    }
  });

  closeBtn.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    fab.style.display = 'flex';
  });

  // 4. Send Message Logic
  const sendMessage = async () => {
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = '';

    appendMessage('user', text);
    chatHistory.push({ role: 'user', content: text });

    const thinkingId = 'thinking-' + Date.now();
    messagesArea.insertAdjacentHTML('beforeend', `
      <div id="${thinkingId}" class="ai-msg ai-thinking-dots">
        <span></span><span></span><span></span>
      </div>
    `);
    messagesArea.scrollTop = messagesArea.scrollHeight;

    const event = window.REFA_EVENTS && window.REFA_EVENTS.getActiveEvent();
    const globalContext = event ? {
      id: event.id,
      name: event.name,
      tagline: event.tagline,
      season: event.season,
      budget: event.details?.budget
    } : {};

    let currentViewName = 'Unknown';
    let focusedContext = {};
    const activePage = document.querySelector('.page.active');
    
    if (activePage && event) {
      currentViewName = activePage.id;
      if (currentViewName === 'page-tasks' || currentViewName === 'page-operations') {
        focusedContext = { phases: event.phases };
      } else if (currentViewName === 'page-finance' || currentViewName === 'page-revenue') {
        focusedContext = { financials: event.financials };
      } else if (currentViewName === 'page-studio' || currentViewName === 'page-letters') {
        focusedContext = { letterTemplates: event.letterTemplates, productionKits: event.productionKits };
      } else if (currentViewName === 'page-social') {
        focusedContext = { contentSchedule: event.contentSchedule };
      } else {
        focusedContext = { details: event.details, dates: event.dates };
      }
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: chatHistory.slice(0, -1),
          eventContext: globalContext,
          focusedContext,
          currentViewName
        })
      });

      const data = await res.json();
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) thinkingEl.remove();

      if (data.success) {
        appendMessage('model', data.text);
        chatHistory.push({ role: 'model', content: data.text });
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      const thinkingEl = document.getElementById(thinkingId);
      if (thinkingEl) thinkingEl.remove();
      appendMessage('model', `*Error: ${err.message}. Ensure the server is running.* `);
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function appendMessage(role, text) {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\n/g, '<br>');

    const className = role === 'user' ? 'user-msg' : 'ai-msg';
    messagesArea.insertAdjacentHTML('beforeend', `<div class="${className}">${html}</div>`);
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }
});
