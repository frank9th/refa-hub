// Template: Event Team
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "event-team",
  "label": "Event Team",
  "emoji": "👥",
  "cat": "people",
  "thumbBg": "linear-gradient(135deg,#065F46,#0F766E)",
  "desc": "Team member showcase with roles"
});
window.CONTROLS_CONFIG['event-team'] = [
  {
    "type": "section",
    "label": "Member"
  },
  {
    "type": "text",
    "id": "name",
    "label": "Person Name"
  },
  {
    "type": "text",
    "id": "teamRole",
    "label": "Role/Title"
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
window.RENDERERS['event-team'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : `<div style="width:100%;height:100%;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:30px;">👥</div>`;
  let photoSize = Math.min(w, h) * 0.4;
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#065F46,#0D2145);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(rgba(255,255,255,0.15) 1px,transparent 1px);background-size:12px 12px;z-index:0;"></div>
      
      <div style="font-size:11px;color:${gold};letter-spacing:3px;font-weight:bold;margin-bottom:25px;z-index:2;">MEET THE TEAM</div>
      
      <div style="width:${photoSize}px;height:${photoSize}px;border-radius:50%;border:2px solid ${gold};padding:4px;margin-bottom:20px;z-index:2;box-sizing:border-box;">
        ${photo}
      </div>
      
      <div style="z-index:2;">
        <div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:800;margin-bottom:8px;">${s.name}</div>
        <div style="font-size:12px;color:${gold};letter-spacing:2px;font-weight:bold;text-transform:uppercase;margin-bottom:20px;">${s.teamRole}</div>
        <div style="width:30px;height:2px;background:rgba(255,255,255,0.2);margin:0 auto;"></div>
      </div>
      
      <div style="position:absolute;bottom:25px;font-size:10px;opacity:0.8;letter-spacing:2px;z-index:2;">
        RAFA Season 2 · The Word League
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
