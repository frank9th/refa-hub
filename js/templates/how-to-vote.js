// Template: How To Vote
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "how-to-vote",
  "label": "How To Vote",
  "emoji": "📋",
  "cat": "voting",
  "thumbBg": "linear-gradient(135deg,#1A3A8F,#6D28D9)",
  "desc": "Step-by-step voting guide for parents"
});
window.CONTROLS_CONFIG['how-to-vote'] = [
  {
    "type": "section",
    "label": "Content"
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
window.RENDERERS['how-to-vote'] = function(w, h, s, gold, bg, tc, img, logo) {
  return `
    <div style="width:${w}px;height:${h}px;background:${bg};position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(rgba(255,255,255,0.1) 1px,transparent 1px);background-size:14px 14px;z-index:0;"></div>
      
      <div style="background:linear-gradient(90deg,${gold},#FDE047);padding:20px;text-align:center;color:#000;position:relative;z-index:2;">
        <div style="font-size:9px;font-weight:bold;letter-spacing:2px;margin-bottom:4px;">RAFA SEASON 2 · THE WORD LEAGUE</div>
        <div style="font-size:22px;font-weight:900;letter-spacing:1px;">HOW TO VOTE</div>
      </div>
      
      <div style="flex:1;padding:25px;display:flex;flex-direction:column;justify-content:center;gap:15px;position:relative;z-index:2;">
        <div style="display:flex;align-items:center;gap:15px;">
          <div style="width:32px;height:32px;border-radius:50%;background:${gold};color:#000;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0;">1</div>
          <div>
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Go to link</div>
            <div style="font-size:11px;opacity:0.7;color:${gold};">${s.votingLink}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:15px;">
          <div style="width:32px;height:32px;border-radius:50%;background:${gold};color:#000;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0;">2</div>
          <div>
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Enter phone</div>
            <div style="font-size:11px;opacity:0.7;">Provide your active phone number</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:15px;">
          <div style="width:32px;height:32px;border-radius:50%;background:${gold};color:#000;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0;">3</div>
          <div>
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Choose contestant</div>
            <div style="font-size:11px;opacity:0.7;">Select who you are voting for</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:15px;">
          <div style="width:32px;height:32px;border-radius:50%;background:${gold};color:#000;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0;">4</div>
          <div>
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Select vote pack</div>
            <div style="font-size:11px;opacity:0.7;">Choose ₦200, ₦1,600, or ₦7,000 pack</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:15px;">
          <div style="width:32px;height:32px;border-radius:50%;background:${gold};color:#000;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;flex-shrink:0;">5</div>
          <div>
            <div style="font-size:14px;font-weight:bold;margin-bottom:2px;">Pay & confirm</div>
            <div style="font-size:11px;opacity:0.7;">Complete payment to submit votes</div>
          </div>
        </div>
      </div>
      
      <div style="border-top:2px solid ${gold};padding:15px;text-align:center;font-size:11px;color:${gold};font-weight:bold;letter-spacing:1px;position:relative;z-index:2;background:rgba(0,0,0,0.2);">
        EVERY VOTE COUNTS!
      </div>
    </div>
  `;
};
