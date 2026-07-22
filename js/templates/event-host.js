// Template: Event Host
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "event-host",
  "label": "Event Host",
  "emoji": "🎙️",
  "cat": "people",
  "thumbBg": "linear-gradient(135deg,#0D2145,#1A3A8F)",
  "desc": "Professional MC/host presenter card"
});
window.CONTROLS_CONFIG['event-host'] = [
  {
    "type": "section",
    "label": "Host"
  },
  {
    "type": "text",
    "id": "hostName",
    "label": "Host/MC Name"
  },
  {
    "type": "text",
    "id": "hostTitle",
    "label": "Title"
  },
  {
    "type": "text",
    "id": "eventDate",
    "label": "Event Date"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "uploadedImg",
    "label": "Photo"
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
window.RENDERERS['event-host'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">` : `<div style="width:100%;height:100%;background:rgba(255,255,255,0.05);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:40px;">🎙️</div>`;
  let photoW = w * 0.45;
  let photoH = photoW * 1.25;
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(160deg,#0D2145,#08172E);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at top right,rgba(212,175,55,0.1),transparent 50%);z-index:0;"></div>
      
      <div style="font-size:11px;color:${gold};letter-spacing:3px;font-weight:bold;margin-bottom:15px;z-index:2;">YOUR HOST</div>
      
      <div style="width:${photoW}px;height:${photoH}px;border:2px solid ${gold};border-radius:8px;padding:4px;margin-bottom:25px;z-index:2;box-sizing:border-box;">
        ${photo}
      </div>
      
      <div style="z-index:2;">
        <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;margin-bottom:6px;">${s.hostName}</div>
        <div style="font-size:12px;opacity:0.7;letter-spacing:1px;text-transform:uppercase;margin-bottom:15px;">${s.hostTitle}</div>
        
        <div style="width:40px;height:2px;background:rgba(255,255,255,0.2);margin:0 auto 15px;"></div>
        
        <div style="font-size:12px;font-weight:600;letter-spacing:1px;">${s.eventDate}</div>
      </div>
      
      <div style="position:absolute;bottom:25px;font-size:10px;color:${gold};letter-spacing:2px;font-weight:bold;z-index:2;">
        RAFA Season 2
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
