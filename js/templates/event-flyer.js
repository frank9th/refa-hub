// Template: Event Flyer
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "event-flyer",
  "label": "Event Flyer",
  "emoji": "📋",
  "cat": "event",
  "thumbBg": "linear-gradient(135deg,#0D2145,#1A3A8F)",
  "desc": "Full-detail flyer with prizes, dates & venue"
});
window.CONTROLS_CONFIG['event-flyer'] = [
  {
    "type": "section",
    "label": "Event"
  },
  {
    "type": "text",
    "id": "stage",
    "label": "Event Title"
  },
  {
    "type": "text",
    "id": "eventDate",
    "label": "Key Dates Summary"
  },
  {
    "type": "text",
    "id": "location",
    "label": "Location"
  },
  {
    "type": "section",
    "label": "Prizes"
  },
  {
    "type": "text",
    "id": "prizeFirst",
    "label": "1st Prize"
  },
  {
    "type": "text",
    "id": "prizeSecond",
    "label": "2nd Prize"
  },
  {
    "type": "text",
    "id": "prizeThird",
    "label": "3rd Prize"
  },
  {
    "type": "section",
    "label": "Contact"
  },
  {
    "type": "text",
    "id": "contactPhone",
    "label": "Contact Phone"
  },
  {
    "type": "text",
    "id": "contactEmail",
    "label": "Contact Email"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "logoImg",
    "label": "Logo Upload"
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
window.RENDERERS['event-flyer'] = function(w, h, s, gold, bg, tc, img, logo) {
  let logoHtml = logo ? `<img src="${logo}" style="width:50px;height:auto;">` : `<div style="font-size:20px;color:${gold};font-weight:900;">REFA</div>`;
  return `
    <div style="width:${w}px;height:${h}px;background:#0D2145;position:relative;padding:30px;box-sizing:border-box;display:flex;flex-direction:column;color:white;font-family:'Inter',sans-serif;">
      <div style="text-align:center;margin-bottom:20px;">
        ${logoHtml}
        <div style="font-family:'Oswald',sans-serif;font-size:24px;color:${gold};font-weight:600;margin-top:10px;">BIBLE RECITATION COMPETITION</div>
        <div style="display:inline-block;background:${gold};color:#0D2145;font-size:9px;font-weight:bold;padding:2px 8px;border-radius:10px;margin-top:5px;">SEASON 2</div>
        <div style="font-size:11px;opacity:0.7;margin-top:8px;">POWERED BY: REFINERS OF FAITH ACADEMY (REFA)</div>
      </div>
      
      <div style="flex:1;">
        <div style="font-size:12px;font-weight:bold;color:${gold};margin-bottom:10px;text-transform:uppercase;">PRIZES</div>
        <div style="background:${gold};color:#0D2145;padding:8px 12px;border-radius:6px;display:flex;justify-content:space-between;font-weight:bold;margin-bottom:6px;font-size:14px;">
          <span>1st Place</span><span>${s.prizeFirst}</span>
        </div>
        <div style="background:#9CA3AF;color:#111;padding:6px 12px;border-radius:6px;display:flex;justify-content:space-between;font-weight:bold;margin-bottom:6px;font-size:13px;">
          <span>2nd Place</span><span>${s.prizeSecond}</span>
        </div>
        <div style="background:#C2410C;color:#fff;padding:6px 12px;border-radius:6px;display:flex;justify-content:space-between;font-weight:bold;margin-bottom:15px;font-size:13px;">
          <span>3rd Place</span><span>${s.prizeThird}</span>
        </div>
        
        <div style="background:rgba(255,255,255,0.05);padding:15px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);">
          <div style="font-size:11px;color:${gold};font-weight:bold;margin-bottom:8px;">KEY DATES</div>
          <div style="font-size:12px;line-height:1.5;">${s.eventDate}</div>
          <div style="width:100%;height:1px;background:rgba(255,255,255,0.1);margin:10px 0;"></div>
          <div style="font-size:11px;color:${gold};font-weight:bold;margin-bottom:5px;">VENUE</div>
          <div style="font-size:11px;line-height:1.4;opacity:0.9;">${s.location}</div>
        </div>
      </div>
      
      <div style="text-align:center;font-size:10px;opacity:0.8;margin-top:20px;border-top:1px solid rgba(255,255,255,0.1);padding-top:15px;">
        📞 ${s.contactPhone} &nbsp;|&nbsp; ✉️ ${s.contactEmail}
      </div>
    </div>
  `;
};
