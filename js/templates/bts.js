// Template: Behind Scenes
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "bts",
  "label": "Behind Scenes",
  "emoji": "🎞️",
  "cat": "people",
  "thumbBg": "linear-gradient(135deg,#92400E,#B45309)",
  "desc": "Documentary-style BTS content frame"
});
window.CONTROLS_CONFIG['bts'] = [
  {
    "type": "section",
    "label": "Content"
  },
  {
    "type": "text",
    "id": "btsCaption",
    "label": "Caption"
  },
  {
    "type": "text",
    "id": "eventDate",
    "label": "Date/Context"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "uploadedImg",
    "label": "BTS Photo"
  },
  {
    "type": "color",
    "id": "accentColor",
    "label": "Accent Color"
  }
];
window.RENDERERS['bts'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">` : `<div style="width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;font-size:30px;">Photo</div>`;
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#3d1c00,#92400E,#5c2800);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;">
      <div style="width:100%;padding:0 20px;box-sizing:border-box;position:relative;z-index:2;">
        <div style="width:100%;height:12px;background:#111;display:flex;justify-content:space-around;align-items:center;border-bottom:2px solid ${gold};">
          ${Array(12).fill('<div style="width:6px;height:6px;background:#333;border-radius:1px;"></div>').join('')}
        </div>
        
        <div style="width:100%;height:${h * 0.55}px;background:#000;position:relative;">
          ${photo}
          <div style="position:absolute;top:10px;right:10px;background:${gold};color:#000;font-size:10px;font-weight:900;padding:4px 10px;border-radius:12px;letter-spacing:1px;">BTS</div>
        </div>
        
        <div style="width:100%;height:12px;background:#111;display:flex;justify-content:space-around;align-items:center;border-top:2px solid ${gold};">
          ${Array(12).fill('<div style="width:6px;height:6px;background:#333;border-radius:1px;"></div>').join('')}
        </div>
      </div>
      
      <div style="text-align:center;margin-top:25px;z-index:2;padding:0 30px;">
        <div style="font-size:14px;font-weight:600;line-height:1.4;margin-bottom:10px;">${s.btsCaption}</div>
        <div style="font-size:11px;opacity:0.7;letter-spacing:1px;text-transform:uppercase;">${s.eventDate}</div>
      </div>
      
      <div style="position:absolute;bottom:25px;font-size:10px;color:${gold};letter-spacing:2px;font-weight:bold;z-index:2;">
        Behind The Scenes · RAFA Season 2
      </div>
    </div>
  `;
};
