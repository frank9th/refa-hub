// Template: Voting Is Live
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "voting-live",
  "label": "Voting Is Live",
  "emoji": "🗳️",
  "cat": "voting",
  "thumbBg": "linear-gradient(135deg,#065F46,#0F766E)",
  "desc": "Announce that voting is now open"
});
window.CONTROLS_CONFIG['voting-live'] = [
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
    "type": "text",
    "id": "eventDate",
    "label": "Voting Dates"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "uploadedImg",
    "label": "Background Photo"
  },
  {
    "type": "color",
    "id": "accentColor",
    "label": "Accent Color"
  }
];
window.RENDERERS['voting-live'] = function(w, h, s, gold, bg, tc, img, logo) {
  let photo = img ? `<img src="${img}" style="position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;opacity:0.25;">` : '';
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#065F46,${bg});position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(rgba(255,255,255,0.15) 1px,transparent 1px);background-size:14px 14px;z-index:0;"></div>
      ${photo}
      
      <div style="z-index:2;width:100%;padding:0 30px;box-sizing:border-box;">
        <div style="font-size:50px;margin-bottom:15px;">🗳️</div>
        <div style="font-size:11px;color:${gold};letter-spacing:2px;font-weight:bold;margin-bottom:10px;">REFA SEASON 2 · THE WORD LEAGUE</div>
        <div style="font-size:46px;font-weight:900;letter-spacing:2px;line-height:1;">VOTING</div>
        <div style="font-family:'Playfair Display',serif;font-size:38px;color:${gold};font-style:italic;margin-bottom:30px;">Is Now Live!</div>
        
        <div style="background:rgba(0,0,0,0.3);border:1px solid ${gold};border-radius:12px;padding:20px;margin-bottom:20px;">
          <div style="font-size:10px;color:${gold};text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">VOTE AT</div>
          <div style="font-size:16px;font-weight:bold;letter-spacing:1px;">${s.votingLink}</div>
        </div>
        
        <div style="font-size:14px;font-weight:bold;margin-bottom:10px;">₦200 per vote</div>
        <div style="font-size:11px;opacity:0.8;">${s.eventDate}</div>
      </div>
      
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
