// Template: Guest Artist
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "guest-artist",
  "label": "Guest Artist",
  "emoji": "🎤",
  "cat": "people",
  "thumbBg": "linear-gradient(135deg,#4C1D95,#7C3AED)",
  "desc": "Elegant showcase for performing artists"
});
window.CONTROLS_CONFIG['guest-artist'] = [
  {
    "type": "section",
    "label": "Artist"
  },
  {
    "type": "text",
    "id": "guestName",
    "label": "Artist Name"
  },
  {
    "type": "text",
    "id": "guestRole",
    "label": "Role/Title"
  },
  {
    "type": "text",
    "id": "eventDate",
    "label": "Event Date"
  },
  {
    "type": "text",
    "id": "stage",
    "label": "Event/Stage"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "uploadedImg",
    "label": "Artist Photo"
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
window.RENDERERS['guest-artist'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">` : `<div style="width:100%;height:100%;border-radius:50%;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;font-size:40px;">♪</div>`;
  let photoSize = Math.min(w, h) * 0.45;
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#2d1054,#4C1D95);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;repeating-linear-gradient(45deg,transparent,transparent 6px,rgba(255,255,255,0.03) 6px,rgba(255,255,255,0.03) 7px);z-index:0;"></div>
      
      <div style="position:absolute;top:20px;left:20px;font-size:24px;color:${gold};opacity:0.2;">♪</div>
      <div style="position:absolute;bottom:30px;right:20px;font-size:28px;color:${gold};opacity:0.2;">♫</div>
      
      <div style="z-index:2;margin-bottom:25px;">
        <span style="font-size:12px;margin-right:6px;">🎤</span>
        <span style="font-size:11px;color:${gold};letter-spacing:2px;font-weight:bold;text-transform:uppercase;">${s.guestRole}</span>
      </div>
      
      <div style="width:${photoSize}px;height:${photoSize}px;border-radius:50%;border:3px solid ${gold};padding:4px;margin-bottom:25px;z-index:2;box-sizing:border-box;">
        ${photo}
      </div>
      
      <div style="z-index:2;">
        <div style="font-family:'Great Vibes',cursive;font-size:42px;line-height:1;margin-bottom:8px;">${s.guestName}</div>
        <div style="font-size:12px;opacity:0.8;text-transform:uppercase;letter-spacing:3px;margin-bottom:20px;">PERFORMING LIVE</div>
        <div style="font-size:11px;color:${gold};font-weight:bold;letter-spacing:1px;margin-bottom:4px;">${s.stage}</div>
        <div style="font-size:11px;opacity:0.9;">${s.eventDate}</div>
      </div>
      
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
