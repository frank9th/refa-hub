// Template: Reels Cover
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "reel-cover",
  "label": "Reels Cover",
  "emoji": "🎬",
  "cat": "contestant",
  "thumbBg": "linear-gradient(160deg,#6D28D9,#4C1D95)",
  "desc": "Vertical 9:16 cover for Instagram/TikTok"
});
window.CONTROLS_CONFIG['reel-cover'] = [
  {
    "type": "section",
    "label": "Content"
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
    "label": "Stage"
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
window.RENDERERS['reel-cover'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;">` : `<div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to bottom,${tc},#000);"></div>`;
  return `
    <div style="width:${w}px;height:${h}px;background:#000;position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;">
      ${photo}
      <div style="position:absolute;bottom:0;left:0;right:0;height:70%;background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.6) 50%,transparent 100%);</div>
      
      <div style="position:absolute;top:30px;left:30px;background:rgba(0,0,0,0.5);padding:6px 12px;border-radius:20px;display:flex;align-items:center;border:1px solid rgba(255,255,255,0.2);">
        <div style="width:6px;height:6px;border-radius:50%;background:${gold};margin-right:8px;"></div>
        <div style="font-size:10px;font-weight:bold;letter-spacing:1px;">REFA S2</div>
      </div>
      
      <div style="position:absolute;bottom:40px;left:30px;right:30px;">
        <div style="font-size:9px;color:${gold};text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-bottom:5px;">${s.stage}</div>
        <div style="font-family:'Playfair Display',serif;font-size:32px;font-weight:800;line-height:1.1;margin-bottom:8px;">${s.name}</div>
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">TEAM ${s.team}</div>
        <div style="font-size:11px;font-style:italic;color:${gold};margin-bottom:20px;">"${s.verse}"</div>
        
        <div style="width:100%;height:1px;background:rgba(255,255,255,0.2);margin-bottom:15px;"></div>
        
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;font-weight:bold;">
          <div>VOTE: <span style="color:${gold};">${s.votingLink}</span></div>
          <div style="background:rgba(255,255,255,0.1);padding:4px 8px;border-radius:4px;">₦200</div>
        </div>
      </div>
    </div>
  `;
};
