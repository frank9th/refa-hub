// Template: Leaderboard
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "leaderboard",
  "label": "Leaderboard",
  "emoji": "📊",
  "cat": "voting",
  "thumbBg": "linear-gradient(135deg,#78350F,#B45309)",
  "desc": "Vote leaderboard teaser for social hype"
});
window.CONTROLS_CONFIG['leaderboard'] = [
  {
    "type": "section",
    "label": "Data"
  },
  {
    "type": "text",
    "id": "leaderPosition",
    "label": "Top Position"
  },
  {
    "type": "text",
    "id": "leaderTeam",
    "label": "Leading Team"
  },
  {
    "type": "text",
    "id": "leaderVotes",
    "label": "Vote Count"
  },
  {
    "type": "text",
    "id": "stage",
    "label": "After Stage"
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
  },
  {
    "type": "color",
    "id": "bgColor",
    "label": "Background Color"
  }
];
window.RENDERERS['leaderboard'] = function(w, h, s, gold, bg, tc, img, logo) {
  let posColor = s.leaderPosition.includes('1') ? gold : s.leaderPosition.includes('2') ? '#E5E7EB' : '#D97706';
  return `
    <div style="width:${w}px;height:${h}px;background:${bg};position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;padding:30px;box-sizing:border-box;display:flex;flex-direction:column;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,0.03) 10px,rgba(255,255,255,0.03) 11px);z-index:0;"></div>
      
      <div style="text-align:center;position:relative;z-index:2;margin-bottom:25px;">
        <div style="font-size:10px;color:${gold};text-transform:uppercase;letter-spacing:2px;font-weight:bold;margin-bottom:6px;">AFTER ${s.stage}</div>
        <div style="font-family:'Playfair Display',serif;font-size:26px;font-weight:800;">Vote Leaderboard 🔥</div>
        <div style="width:80px;height:2px;background:linear-gradient(90deg,transparent,${gold},transparent);margin:15px auto 0;"></div>
      </div>
      
      <div style="flex:1;display:flex;flex-direction:column;gap:15px;position:relative;z-index:2;">
        <div style="background:rgba(255,255,255,0.05);border-left:4px solid ${posColor};border-radius:4px;padding:15px;display:flex;align-items:center;">
          <div style="font-size:24px;font-weight:900;color:${posColor};width:40px;">${s.leaderPosition}</div>
          <div style="flex:1;">
            <div style="font-size:16px;font-weight:bold;margin-bottom:2px;">Team ${s.leaderTeam}</div>
            <div style="font-size:11px;opacity:0.6;">Leading Team</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:18px;font-weight:900;color:${posColor};">${s.leaderVotes}</div>
            <div style="font-size:10px;opacity:0.6;">Votes cast</div>
          </div>
        </div>
        
        <div style="background:rgba(255,255,255,0.03);border-left:4px solid rgba(255,255,255,0.2);border-radius:4px;padding:15px;display:flex;align-items:center;opacity:0.7;">
          <div style="font-size:20px;font-weight:bold;color:rgba(255,255,255,0.5);width:40px;">-</div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Other Teams</div>
            <div style="font-size:11px;opacity:0.6;">Keep voting to rise</div>
          </div>
        </div>
        
        <div style="background:rgba(255,255,255,0.03);border-left:4px solid rgba(255,255,255,0.2);border-radius:4px;padding:15px;display:flex;align-items:center;opacity:0.5;">
          <div style="font-size:20px;font-weight:bold;color:rgba(255,255,255,0.5);width:40px;">-</div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Other Teams</div>
            <div style="font-size:11px;opacity:0.6;">Keep voting to rise</div>
          </div>
        </div>
      </div>
      
      <div style="text-align:center;font-size:11px;font-weight:bold;letter-spacing:1px;position:relative;z-index:2;margin-top:20px;">
        VOTE NOW AT <span style="color:${gold};">${s.votingLink}</span>
      </div>
    </div>
  `;
};
