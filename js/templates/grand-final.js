// Template: Grand Final
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "grand-final",
  "label": "Grand Final",
  "emoji": "👑",
  "cat": "event",
  "thumbBg": "linear-gradient(135deg,#1a0a2e,#3d1a6e)",
  "desc": "Premium gala promo for the Grand Final"
});
window.CONTROLS_CONFIG['grand-final'] = [
  {
    "type": "section",
    "label": "Event"
  },
  {
    "type": "text",
    "id": "eventDate",
    "label": "Event Date"
  },
  {
    "type": "text",
    "id": "location",
    "label": "Location"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "logoImg",
    "label": "Logo Upload"
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
window.RENDERERS['grand-final'] = function(w, h, s, gold, bg, tc, img, logo) {
  let logoHtml = logo ? `<img src="${logo}" style="margin-bottom:10px;width:80px;height:auto;object-fit:contain;">` : '';
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#0a0015 0%,#1a0a2e 50%,#0D2145 100%);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;font-family:'Inter',sans-serif;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(${gold}26 1px,transparent 1px);background-size:14px 14px;"></div>
      <div style="z-index:2;text-align:center;">
        <div style="font-size:9px;color:${gold};letter-spacing:3px;margin-bottom:20px;">RAFA SEASON 2</div>
        ${logoHtml}
        <div style="font-size:50px;margin-bottom:15px;">🏆</div>
        <div style="font-family:'Playfair Display',serif;font-size:32px;font-weight:800;letter-spacing:1px;">THE LAST WORD</div>
        <div style="font-family:'Great Vibes',cursive;font-size:42px;color:${gold};margin-top:-10px;">Grand Final</div>
        
        <div style="width:60px;height:2px;background:${gold};margin:25px auto;"></div>
        
        <div style="font-size:12px;opacity:0.9;line-height:1.6;">
          ${s.eventDate}<br>${s.location}
        </div>
      </div>
      <div style="position:absolute;bottom:0;left:0;right:0;height:4px;background:${gold};"></div>
    </div>
  `;
};
