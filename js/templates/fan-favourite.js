// Template: Fan Favourite
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "fan-favourite",
  "label": "Fan Favourite",
  "emoji": "❤️",
  "cat": "voting",
  "thumbBg": "linear-gradient(135deg,#BE185D,#9D174D)",
  "desc": "\"Who's YOUR Champion?\" engagement post"
});
window.CONTROLS_CONFIG['fan-favourite'] = [
  {
    "type": "section",
    "label": "Content"
  },
  {
    "type": "text",
    "id": "name",
    "label": "Contestant Name"
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
    "id": "votingLink",
    "label": "Voting Link"
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
window.RENDERERS['fan-favourite'] = function(w, h, s, gold, bg, tc, img, logo) {
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#BE185D,#6D28D9);position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;box-sizing:border-box;">
      <div style="position:absolute;font-size:30px;opacity:0.2;top:20px;left:20px;">♥</div>
      <div style="position:absolute;font-size:20px;opacity:0.3;top:40px;right:40px;">♥</div>
      <div style="position:absolute;font-size:24px;opacity:0.1;bottom:60px;left:50px;">♥</div>
      <div style="position:absolute;font-size:16px;opacity:0.2;bottom:30px;right:30px;">♥</div>
      
      <div style="font-size:16px;font-weight:900;letter-spacing:2px;margin-bottom:5px;z-index:2;">WHO'S YOUR</div>
      <div style="font-family:'Playfair Display',serif;font-size:38px;font-weight:800;font-style:italic;margin-bottom:30px;z-index:2;">CHAMPION?</div>
      
      <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);border-radius:12px;padding:25px;width:100%;box-sizing:border-box;margin-bottom:30px;z-index:2;">
        <div style="font-size:22px;color:${gold};font-weight:bold;margin-bottom:8px;">${s.name}</div>
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;opacity:0.9;">TEAM ${s.team}</div>
      </div>
      
      <div style="background:${gold};color:#000;padding:12px 30px;border-radius:24px;font-size:14px;font-weight:900;letter-spacing:1px;margin-bottom:15px;z-index:2;display:inline-block;">
        VOTE NOW →
      </div>
      <div style="font-size:11px;font-weight:bold;opacity:0.9;z-index:2;">${s.votingLink}</div>
    </div>
  `;
};
