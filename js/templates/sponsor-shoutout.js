// Template: Sponsor
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "sponsor-shoutout",
  "label": "Sponsor",
  "emoji": "🤝",
  "cat": "promo",
  "thumbBg": "linear-gradient(135deg,#0D2145,#152D5A)",
  "desc": "Professional sponsor acknowledgement"
});
window.CONTROLS_CONFIG['sponsor-shoutout'] = [
  {
    "type": "section",
    "label": "Sponsor"
  },
  {
    "type": "text",
    "id": "sponsorName",
    "label": "Sponsor Name"
  },
  {
    "type": "text",
    "id": "sponsorTier",
    "label": "Partnership Tier"
  },
  {
    "type": "section",
    "label": "Style"
  },
  {
    "type": "image",
    "id": "logoImg",
    "label": "Sponsor Logo"
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
window.RENDERERS['sponsor-shoutout'] = function(w, h, s, gold, bg, tc, img, logo) {
  let logoHtml = logo ? `<img src="${logo}" style="width:80px;height:auto;object-fit:contain;">` : `<div style="width:70px;height:70px;border-radius:50%;background:${gold};color:#0D2145;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;">LOGO</div>`;
  return `
    <div style="width:${w}px;height:${h}px;background:#0D2145;position:relative;overflow:hidden;color:white;font-family:'Inter',sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px;box-sizing:border-box;">
      <div style="position:absolute;top:0;left:0;right:0;height:4px;background:${gold};"></div>
      
      <div style="background:rgba(255,255,255,0.05);width:120px;height:120px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:30px;border:1px solid rgba(255,255,255,0.1);">
        ${logoHtml}
      </div>
      
      <div style="font-size:11px;color:${gold};letter-spacing:4px;font-weight:bold;margin-bottom:15px;">POWERED BY</div>
      
      <div style="font-family:'Playfair Display',serif;font-size:30px;font-weight:800;margin-bottom:15px;line-height:1.2;">${s.sponsorName}</div>
      
      <div style="display:inline-block;background:${gold};color:#0D2145;font-size:11px;font-weight:900;padding:4px 16px;border-radius:16px;margin-bottom:35px;letter-spacing:1px;text-transform:uppercase;">
        ${s.sponsorTier}
      </div>
      
      <div style="width:60px;height:1px;background:rgba(255,255,255,0.2);margin:0 auto 25px;"></div>
      
      <div style="font-size:12px;font-style:italic;opacity:0.7;">"Thank you for your support"</div>
      
      <div style="position:absolute;bottom:30px;font-size:10px;color:${gold};letter-spacing:2px;font-weight:bold;opacity:0.8;">
        RAFA Season 2 · The Word League
      </div>
    </div>
  `;
};
