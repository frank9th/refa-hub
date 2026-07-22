// Template: Countdown
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "event-countdown",
  "label": "Countdown",
  "emoji": "⏱️",
  "cat": "promo",
  "thumbBg": "linear-gradient(135deg,#C2410C,#7C2D12)",
  "desc": "Countdown with flip-clock day blocks"
});
window.CONTROLS_CONFIG['event-countdown'] = [
  {
    "type": "section",
    "label": "Countdown"
  },
  {
    "type": "text",
    "id": "daysToGo",
    "label": "Days To Go"
  },
  {
    "type": "text",
    "id": "stage",
    "label": "Event Name"
  },
  {
    "type": "text",
    "id": "eventDate",
    "label": "Full Date"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "color",
    "id": "accentColor",
    "label": "Accent Color"
  },
  {
    "type": "color",
    "id": "bgColor",
    "label": "Background Color"
  }
];
window.RENDERERS['event-countdown'] = function(w, h, s, gold, bg, tc, img, logo) {
  let digits = s.daysToGo.toString().split('');
  let blocks = digits.map(d => `
    <div style="background:${gold};width:65px;height:80px;border-radius:6px;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(0,0,0,0.5);margin:0 5px;">
      <div style="font-family:'Oswald',sans-serif;font-size:48px;font-weight:bold;color:white;line-height:1;text-shadow:0 2px 4px rgba(0,0,0,0.3);">${d}</div>
    </div>
  `).join('');
  
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(160deg,#111111,#1a1000);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;">
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;">
        <div style="font-family:'Oswald',sans-serif;font-size:14px;color:${gold};letter-spacing:3px;margin-bottom:10px;">COUNTDOWN TO</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:2px;margin-bottom:30px;">${s.stage}</div>
        
        <div style="display:flex;justify-content:center;margin-bottom:10px;">
          ${blocks}
        </div>
        <div style="display:flex;justify-content:center;width:100%;margin-bottom:30px;">
          <div style="font-size:10px;font-weight:900;color:#888;letter-spacing:4px;">DAYS TO GO</div>
        </div>
        
        <div style="font-size:13px;font-weight:600;letter-spacing:1px;opacity:0.9;">${s.eventDate}</div>
        <div style="width:40px;height:2px;background:${gold};margin:20px auto 0;"></div>
      </div>
      
      <div style="height:40px;background:#0D2145;display:flex;align-items:center;justify-content:center;font-size:10px;color:${gold};font-weight:bold;letter-spacing:1px;">
        📍 ${s.contactPhone} &nbsp;·&nbsp; ${s.contactEmail}
      </div>
    </div>
  `;
};
