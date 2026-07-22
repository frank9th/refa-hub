// Template: Contestant Card
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "contestant-card",
  "label": "Contestant Card",
  "emoji": "🎽",
  "cat": "contestant",
  "thumbBg": "linear-gradient(135deg,#1A3A8F,#0D2145)",
  "desc": "Profile card with photo, team & vote link"
});
window.CONTROLS_CONFIG['contestant-card'] = [
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
    "id": "teamNumber",
    "label": "Number"
  },
  {
    "type": "text",
    "id": "verse",
    "label": "Scripture"
  },
  {
    "type": "section",
    "label": "Voting"
  },
  {
    "type": "text",
    "id": "votingLink",
    "label": "Voting Link"
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
window.RENDERERS['contestant-card'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover;">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.3);">Upload Photo</div>`;
  return `
    <div style="width:${w}px;height:${h}px;background:${tc};position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(rgba(255,255,255,0.1) 1px,transparent 1px);background-size:14px 14px;z-index:0;"></div>
      
      <div style="height:42px;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:space-between;padding:0 20px;z-index:2;position:relative;">
        <div style="font-size:9px;color:${gold};letter-spacing:1px;font-weight:bold;">RAFA SEASON 2 · THE WORD LEAGUE</div>
        <div style="background:${gold};color:#000;font-size:10px;font-weight:900;padding:2px 8px;border-radius:12px;">#${s.teamNumber}</div>
      </div>
      
      <div style="flex:1;position:relative;z-index:1;">
        ${photo}
        <div style="position:absolute;bottom:0;left:0;right:0;height:50%;background:linear-gradient(to top,${tc},transparent);"></div>
      </div>
      
      <div style="height:180px;position:relative;z-index:2;padding:20px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-end;">
        <div style="font-size:10px;color:${gold};text-transform:uppercase;font-weight:bold;letter-spacing:1px;margin-bottom:4px;">Team ${s.team}</div>
        <div style="font-family:'Playfair Display',serif;font-size:32px;font-weight:800;line-height:1.1;margin-bottom:6px;">${s.name}</div>
        <div style="font-style:italic;font-size:12px;opacity:0.8;margin-bottom:15px;">"${s.verse}"</div>
        <div style="width:100%;height:1px;background:rgba(255,255,255,0.2);margin-bottom:15px;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:11px;font-weight:bold;">VOTE: <span style="color:${gold};">${s.votingLink}</span></div>
          <div style="width:30px;height:30px;background:white;border-radius:4px;"></div>
        </div>
      </div>
    </div>
  `;
};
