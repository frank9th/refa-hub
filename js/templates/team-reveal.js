// Template: Team Reveal
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "team-reveal",
  "label": "Team Reveal",
  "emoji": "🏆",
  "cat": "social",
  "thumbBg": "linear-gradient(135deg,#111827,#374151)",
  "desc": "Dramatic team name and colour reveal"
});
window.CONTROLS_CONFIG['team-reveal'] = [
  {
    "type": "section",
    "label": "Team"
  },
  {
    "type": "text",
    "id": "name",
    "label": "Team Name"
  },
  {
    "type": "select",
    "id": "team",
    "label": "Team Colour",
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
    "label": "Team Number"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "color",
    "id": "accentColor",
    "label": "Accent Color"
  }
];
window.RENDERERS['team-reveal'] = function(w, h, s, gold, bg, tc, img, logo) {
  return `
    <div style="width:${w}px;height:${h}px;background:${tc};position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(rgba(255,255,255,0.15) 1px,transparent 1px);background-size:14px 14px;z-index:0;"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:250px;height:250px;background:radial-gradient(circle,rgba(255,255,255,0.15) 0%,transparent 70%);z-index:1;"></div>
      
      <div style="z-index:2;width:100%;padding:0 20px;box-sizing:border-box;">
        <div style="font-size:10px;color:${gold};letter-spacing:3px;font-weight:bold;margin-bottom:30px;">REFA SEASON 2 · TEAM REVEAL</div>
        
        <div style="font-size:65px;margin-bottom:20px;">🏆</div>
        <div style="display:inline-block;background:${gold};color:#000;font-size:12px;font-weight:900;padding:4px 12px;border-radius:16px;margin-bottom:15px;letter-spacing:1px;">TEAM ${s.teamNumber}</div>
        
        <div style="font-family:'Playfair Display',serif;font-size:42px;font-weight:900;line-height:1.1;margin-bottom:25px;text-shadow:0 4px 12px rgba(0,0,0,0.3);">
          ${s.name}
        </div>
        
        <div style="width:60px;height:3px;background:${gold};margin:0 auto 20px;"></div>
        
        <div style="font-size:12px;font-weight:600;letter-spacing:1px;opacity:0.9;">10 MEMBERS · 1 MENTOR · SEASON 2</div>
      </div>
      
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
