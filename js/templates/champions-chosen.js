// Template: 100 Champions
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "champions-chosen",
  "label": "100 Champions",
  "emoji": "🎉",
  "cat": "social",
  "thumbBg": "linear-gradient(135deg,#B45309,#D4AF37)",
  "desc": "\"The 100 Are Chosen\" celebration post"
});
window.CONTROLS_CONFIG['champions-chosen'] = [
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
window.RENDERERS['champions-chosen'] = function(w, h, s, gold, bg, tc, img, logo) {
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#D4AF37 20%,#B45309 100%);position:relative;overflow:hidden;color:#1a0a00;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;box-sizing:border-box;">
      <div style="position:absolute;font-size:24px;opacity:0.4;top:30px;left:30px;">✨</div>
      <div style="position:absolute;font-size:30px;opacity:0.5;top:60px;right:40px;">✨</div>
      <div style="position:absolute;font-size:20px;opacity:0.3;bottom:80px;left:60px;">✨</div>
      <div style="position:absolute;font-size:28px;opacity:0.4;bottom:40px;right:50px;">✨</div>
      
      <div style="font-size:11px;font-weight:900;letter-spacing:3px;margin-bottom:10px;z-index:2;">REFA SEASON 2</div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:65px;line-height:1;margin-bottom:5px;z-index:2;letter-spacing:2px;">THE 100</div>
      <div style="font-family:'Playfair Display',serif;font-size:32px;font-weight:800;font-style:italic;margin-bottom:25px;z-index:2;">ARE CHOSEN</div>
      
      <div style="width:80px;height:2px;background:#1a0a00;margin:0 auto 20px;opacity:0.3;z-index:2;"></div>
      
      <div style="font-size:13px;font-weight:600;max-width:80%;line-height:1.5;z-index:2;">
        Congratulations to all selected contestants!
      </div>
      
      <div style="position:absolute;bottom:25px;font-size:10px;font-weight:bold;letter-spacing:1px;opacity:0.7;z-index:2;">
        Bible Recitation Competition · Season 2
      </div>
    </div>
  `;
};
