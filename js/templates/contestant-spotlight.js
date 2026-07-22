// Template: Spotlight
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "contestant-spotlight",
  "label": "Spotlight",
  "emoji": "⭐",
  "cat": "contestant",
  "thumbBg": "linear-gradient(135deg,#B45309,#78350F)",
  "desc": "Cinematic spotlight for featuring contestants"
});
window.CONTROLS_CONFIG['contestant-spotlight'] = [
  {
    "type": "section",
    "label": "Contestant"
  },
  {
    "type": "text",
    "id": "name",
    "label": "Name"
  },
  {
    "type": "select",
    "id": "team",
    "label": "Team",
    "opts": [
      "Eagles of Zion",
      "Shields of David",
      "Lions of Judah",
      "Rivers of Eden",
      "Flames of Elijah",
      "Arrows of Jonathan",
      "Stars of Abraham",
      "Swords of Gideon",
      "Doves of Solomon",
      "Thunder of Sinai"
    ]
  },
  {
    "type": "text",
    "id": "verse",
    "label": "Verse"
  },
  {
    "type": "text",
    "id": "stage",
    "label": "Context/Stage"
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
  }
];
window.RENDERERS['contestant-spotlight'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;object-position:center top;">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#222;">Upload Photo</div>`;
  return `
    <div style="width:${w}px;height:${h}px;background:#111;position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;border-left:5px solid ${tc};box-sizing:border-box;">
      <div style="padding:20px;display:flex;align-items:center;">
        <span style="color:${gold};font-size:12px;margin-right:8px;">⭐</span>
        <span style="font-size:10px;color:${gold};letter-spacing:2px;font-weight:bold;">MEET THE WARRIOR</span>
      </div>
      
      <div style="height:60%;width:100%;position:relative;">
        ${photo}
        <div style="position:absolute;bottom:0;left:0;right:0;height:40%;background:linear-gradient(to top,#111,transparent);"></div>
      </div>
      
      <div style="padding:0 20px;">
        <div style="display:inline-block;background:${tc};padding:4px 12px;border-radius:12px;font-size:10px;font-weight:bold;margin-bottom:10px;text-transform:uppercase;">Team ${s.team}</div>
        <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;margin-bottom:8px;">${s.name}</div>
        <div style="font-size:10px;color:${gold};font-weight:bold;text-transform:uppercase;margin-bottom:6px;">${s.stage}</div>
        <div style="font-size:11px;font-style:italic;color:${gold};opacity:0.9;">"${s.verse}"</div>
      </div>
      
      <div style="position:absolute;bottom:0;left:0;right:0;background:${gold};color:#000;text-align:center;padding:10px;font-size:11px;font-weight:bold;letter-spacing:1px;">
        WATCH ON REFA TV
      </div>
    </div>
  `;
};
