// Template: Winner Card
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "congrats-winner",
  "label": "Winner Card",
  "emoji": "🏅",
  "cat": "social",
  "thumbBg": "linear-gradient(135deg,#D4AF37,#B45309)",
  "desc": "Winner announcement with trophy & prize"
});
window.CONTROLS_CONFIG['congrats-winner'] = [
  {
    "type": "section",
    "label": "Winner"
  },
  {
    "type": "text",
    "id": "name",
    "label": "Winner Name"
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
    "id": "prizeFirst",
    "label": "Prize Amount"
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
window.RENDERERS['congrats-winner'] = function(w, h, s, gold, bg, tc, img, logo) {
  return `
    <div style="width:${w}px;height:${h}px;background:#08172E;position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:25px;box-sizing:border-box;">
      <div style="position:absolute;top:10px;left:10px;right:10px;bottom:10px;border:1px solid ${gold};opacity:0.3;"></div>
      <div style="position:absolute;top:14px;left:14px;right:14px;bottom:14px;border:1px solid ${gold};opacity:0.6;"></div>
      
      <div style="z-index:2;">
        <div style="font-size:48px;margin-bottom:15px;">🏅</div>
        <div style="display:inline-block;background:${gold};color:#08172E;font-size:11px;font-weight:900;padding:4px 16px;border-radius:16px;margin-bottom:20px;letter-spacing:2px;">CHAMPION</div>
        
        <div style="font-family:'Playfair Display',serif;font-size:34px;font-weight:900;line-height:1.1;margin-bottom:10px;color:${gold};">${s.name}</div>
        <div style="font-size:13px;text-transform:uppercase;letter-spacing:2px;opacity:0.8;margin-bottom:25px;">TEAM ${s.team}</div>
        
        <div style="width:40px;height:2px;background:rgba(255,255,255,0.2);margin:0 auto 25px;"></div>
        
        <div style="display:inline-block;background:rgba(212,175,55,0.15);border:1px solid ${gold};color:${gold};font-size:20px;font-weight:900;padding:10px 24px;border-radius:30px;margin-bottom:35px;">
          ${s.prizeFirst}
        </div>
      </div>
      
      <div style="position:absolute;bottom:35px;font-size:10px;color:${gold};letter-spacing:2px;font-weight:bold;z-index:2;">
        RAFA Season 2 · The Word League
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
