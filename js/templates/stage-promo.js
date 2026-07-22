// Template: Stage Promo
if (!window.TEMPLATES) window.TEMPLATES = [];
if (!window.CONTROLS_CONFIG) window.CONTROLS_CONFIG = {};
if (!window.RENDERERS) window.RENDERERS = {};

window.TEMPLATES.push({
  "id": "stage-promo",
  "label": "Stage Promo",
  "emoji": "🔥",
  "cat": "event",
  "thumbBg": "linear-gradient(160deg,#B22222,#3D0000)",
  "desc": "Dramatic event promo for competition stages"
});
window.CONTROLS_CONFIG['stage-promo'] = [
  {
    "type": "section",
    "label": "Event Details"
  },
  {
    "type": "text",
    "id": "stage",
    "label": "Stage"
  },
  {
    "type": "text",
    "id": "round",
    "label": "Round"
  },
  {
    "type": "text",
    "id": "stageNum",
    "label": "Bible Verses Count"
  },
  {
    "type": "text",
    "id": "stageTime",
    "label": "Time (minutes)"
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
    "type": "text",
    "id": "broadcastLine",
    "label": "Broadcast Line"
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
window.RENDERERS['stage-promo'] = function(w, h, s, gold, bg, tc, img, logo) {
  let numSize = Math.min(160, h/3);
  let logoHtml = logo ? `<img src="${logo}" style="position:absolute;top:30px;right:30px;width:60px;height:auto;object-fit:contain;">` : '';
  return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(160deg,#1a0000 0%,#5c0000 40%,#3D0000 100%);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;font-family:'Inter',sans-serif;">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;repeating-linear-gradient(45deg,transparent,transparent 6px,${gold}15 6px,${gold}15 7px);"></div>
      <div style="position:absolute;top:-50%;right:-50%;width:100%;height:100%;background:radial-gradient(circle,${gold}33 0%,transparent 60%);"></div>
      ${logoHtml}
      <div style="position:absolute;top:30px;left:30px;z-index:2;">
        <div style="font-size:9px;color:${gold};letter-spacing:2px;">BIBLE RECITATION COMPETITION</div>
        <div style="font-size:14px;font-weight:900;margin-top:2px;">THE REFA'S</div>
        <div style="font-size:10px;opacity:0.8;margin-top:4px;">${s.location}</div>
      </div>
      
      <div style="z-index:2;text-align:center;">
        <div style="font-family:'Oswald',sans-serif;font-size:${numSize}px;font-weight:900;text-shadow:0 0 20px ${gold}55;line-height:1;">${s.stageNum}</div>
        <div style="display:inline-block;background:#B22222;padding:4px 16px;border-radius:20px;font-size:11px;font-weight:bold;margin-top:-10px;position:relative;">${s.round}</div>
      </div>
      
      <div style="z-index:2;text-align:center;margin-top:40px;">
        <div style="font-size:12px;letter-spacing:1px;font-weight:800;">BIBLE VERSES IN <span style="background:${gold};color:#3D0000;padding:2px 6px;border-radius:4px;margin:0 4px;">${s.stageTime}</span> MINUTES</div>
        <div style="font-size:13px;text-transform:uppercase;margin-top:15px;letter-spacing:2px;font-weight:600;">${s.eventDate}</div>
      </div>
      
      <div style="position:absolute;bottom:0;left:0;right:0;height:44px;background:${gold};display:flex;justify-content:center;align-items:center;color:#3D0000;font-size:12px;font-weight:bold;z-index:2;">
        ${s.broadcastLine}
      </div>
    </div>
  `;
};
