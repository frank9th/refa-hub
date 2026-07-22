// Template: Coming Soon
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "coming-soon",
  "label": "Coming Soon",
  "emoji": "🔮",
  "cat": "promo",
  "thumbBg": "linear-gradient(135deg,#111827,#1F2937)",
  "desc": "Mystery teaser — \"Something Big is Coming\""
});
window.CONTROLS_CONFIG['coming-soon'] = [
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
window.RENDERERS['coming-soon'] = function(w, h, s, gold, bg, tc, img, logo) {
  return `
    <div style="width:${w}px;height:${h}px;background:#090909;position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:300px;height:300px;background:radial-gradient(circle,rgba(212,175,55,0.15) 0%,transparent 60%);z-index:0;"></div>
      
      <div style="position:absolute;top:40px;font-size:10px;color:${gold};letter-spacing:4px;font-weight:bold;opacity:0.6;z-index:2;">RAFA SEASON 2</div>
      
      <div style="z-index:2;font-family:'Oswald',sans-serif;">
        <div style="font-size:28px;letter-spacing:2px;margin-bottom:5px;">SOMETHING BIG</div>
        <div style="font-size:24px;color:${gold};letter-spacing:3px;">IS COMING</div>
      </div>
      
      <div style="width:8px;height:8px;background:${gold};border-radius:50%;box-shadow:0 0 15px ${gold};margin-top:30px;z-index:2;"></div>
      
      <div style="position:absolute;bottom:40px;font-size:11px;opacity:0.5;letter-spacing:2px;z-index:2;text-transform:uppercase;">Stay Tuned</div>
    </div>
  `;
};
