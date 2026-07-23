// Template: Technical Crew
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "tech-crew",
  "label": "Technical Crew",
  "emoji": "🎥",
  "cat": "people",
  "thumbBg": "linear-gradient(135deg,#111827,#1F2937)",
  "desc": "Behind-the-gear technical team card"
});
window.CONTROLS_CONFIG['tech-crew'] = [
  {
    "type": "section",
    "label": "Crew"
  },
  {
    "type": "text",
    "id": "name",
    "label": "Person Name"
  },
  {
    "type": "text",
    "id": "crewRole",
    "label": "Role"
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
window.RENDERERS['tech-crew'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;filter:grayscale(30%);">` : `<div style="width:100%;height:100%;background:rgba(255,255,255,0.05);display:flex;align-items:center;justify-content:center;font-size:40px;">📷</div>`;
  let photoW = w * 0.55;
  let photoH = photoW * 0.75;
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(180deg,#1a1a1a,#0a0a0a);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background-image:linear-gradient(${gold} 1px,transparent 1px),linear-gradient(90deg,${gold} 1px,transparent 1px);background-size:20px 20px;opacity:0.05;z-index:0;"></div>
      
      <div style="font-size:11px;color:${gold};letter-spacing:4px;font-weight:bold;margin-bottom:25px;z-index:2;display:flex;align-items:center;">
        <span style="font-size:14px;margin-right:8px;">🎥</span> THE ENGINE ROOM
      </div>
      
      <div style="width:${photoW}px;height:${photoH}px;border:1px solid rgba(212,175,55,0.5);margin-bottom:20px;z-index:2;box-sizing:border-box;position:relative;">
        ${photo}
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.2);"></div>
      </div>
      
      <div style="z-index:2;background:rgba(0,0,0,0.5);padding:15px 30px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;">
        <div style="font-size:22px;font-weight:900;letter-spacing:1px;margin-bottom:6px;">${s.name}</div>
        <div style="font-family:'Oswald',sans-serif;font-size:15px;color:${gold};letter-spacing:2px;text-transform:uppercase;">${s.crewRole}</div>
      </div>
      
      <div style="width:40px;height:1px;background:${gold};margin:25px auto 0;opacity:0.5;z-index:2;"></div>
      
      <div style="position:absolute;bottom:25px;font-size:9px;opacity:0.6;letter-spacing:3px;text-transform:uppercase;z-index:2;">
        Technical Team · REFA Season 2
      </div>
    </div>
  `;
};
