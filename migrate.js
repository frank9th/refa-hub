const fs = require('fs');

const appJsPath = 'js/app.js';
const seedPath = 'scripts/seed-event-refa2.js';
const indexPath = 'index.html';

let appJs = fs.readFileSync(appJsPath, 'utf8');
let seedJs = fs.readFileSync(seedPath, 'utf8');

// The card HTML for the 5 kits (extracted from index.html manually by me)
const sponsorshipCardHtml = `
        <div class="kit-card">
          <div class="kit-header kit-header-sponsorship">
            <div class="kit-title-wrap">
              <h3>Sponsorship Pitch Deck</h3>
              <p>Corporate, School &amp; Individual Kit</p>
            </div>
            <div class="kit-icon">🤝</div>
          </div>
          <div class="kit-body">
            <div class="kit-badge-row">
              <span class="kit-chip chip-gold">5 Tiers (₦50k-₦1M)</span>
              <span class="kit-chip chip-blue">Proposal Deck</span>
            </div>
            <ul class="kit-features">
              <li>School, Brand &amp; Individual Pitch Templates</li>
              <li>Executive Summary 1-Pager</li>
              <li>5-Tier Deliverables Matrix</li>
              <li>Printable Agreement Contract</li>
            </ul>
            <div class="kit-actions">
              <button class="btn-preview" onclick="openKitModal('sponsorship')">🚀 Open Ready-to-Use Kit</button>
              <div style="display:flex; gap:5px; margin-top:5px; flex-wrap:wrap;">
                <button class="btn-raw" onclick="editTemplate('sponsorship_schools')" style="background:var(--navy);color:var(--white);border:none;border-radius:4px;padding:6px 10px;font-size:11px;cursor:pointer;">✏️ Letter (Schools)</button>
                <button class="btn-raw" onclick="editTemplate('sponsorship_business')" style="background:var(--navy);color:var(--white);border:none;border-radius:4px;padding:6px 10px;font-size:11px;cursor:pointer;">✏️ Letter (Business)</button>
                <button class="btn-raw" onclick="editTemplate('sponsorship_individual')" style="background:var(--navy);color:var(--white);border:none;border-radius:4px;padding:6px 10px;font-size:11px;cursor:pointer;">✏️ Letter (Individual)</button>
              </div>
            </div>
          </div>
        </div>
`;

const parentCardHtml = `
        <div class="kit-card">
          <div class="kit-header kit-header-parent">
            <div class="kit-title-wrap">
              <h3>Parent Voting Starter Pack</h3>
              <p>Mobilization &amp; Print Kit</p>
            </div>
            <div class="kit-icon">👨‍👩‍👧</div>
          </div>
          <div class="kit-body">
            <div class="kit-badge-row">
              <span class="kit-chip chip-green">Printable Cards</span>
              <span class="kit-chip chip-gold">WhatsApp Copy (₦200/Vote)</span>
            </div>
            <ul class="kit-features">
              <li>Audition Day Parent Welcome Letter</li>
              <li>QR Code &amp; 100-Vote Challenge Card</li>
              <li>One-Click WhatsApp Broadcast Copy</li>
              <li>Step-by-Step Voting Guide &amp; FAQs</li>
            </ul>
            <div class="kit-actions">
              <button class="btn-preview" onclick="openKitModal('parent')">🚀 Open Ready-to-Use Kit</button>
              <a href="Parent_Voting_Starter_Pack.md" target="_blank" class="btn-raw">📄 Raw (.md)</a>
            </div>
          </div>
        </div>
`;

const socialCardHtml = `
        <div class="kit-card">
          <div class="kit-header kit-header-social">
            <div class="kit-title-wrap">
              <h3>Social Media Launch Kit</h3>
              <p>Campaign Copy &amp; Visual Briefs</p>
            </div>
            <div class="kit-icon">📱</div>
          </div>
          <div class="kit-body">
            <div class="kit-badge-row">
              <span class="kit-chip chip-purple">Daily Posts</span>
              <span class="kit-chip chip-blue">Reels Scripts</span>
            </div>
            <ul class="kit-features">
              <li>Teaser Campaign &amp; Concept Reveals</li>
              <li>Profile Week Contestant Spotlight Scripts</li>
              <li>Voting Launch &amp; Countdown Posts</li>
              <li>Graphic Designer Briefs &amp; Specs</li>
            </ul>
            <div class="kit-actions">
              <button class="btn-preview" onclick="openKitModal('social')">🚀 Open Ready-to-Use Kit</button>
              <a href="Social_Media_Launch_Kit.md" target="_blank" class="btn-raw">📄 Raw (.md)</a>
            </div>
          </div>
        </div>
`;

const bibleCardHtml = `
        <div class="kit-card">
          <div class="kit-header kit-header-bible">
            <div class="kit-title-wrap">
              <h3>Master Production Bible</h3>
              <p>Full Season Strategy &amp; Architecture</p>
            </div>
            <div class="kit-icon">📘</div>
          </div>
          <div class="kit-body">
            <div class="kit-badge-row">
              <span class="kit-chip chip-gold">Master Plan</span>
              <span class="kit-chip chip-green">Reality TV Concept</span>
            </div>
            <ul class="kit-features">
              <li>"The Word League" Season 2 Architecture</li>
              <li>Detailed 7-Phase Execution Timeline</li>
              <li>Scoring Rules &amp; Judging Framework</li>
              <li>10 Team Names, Colours &amp; Mentor Brief</li>
            </ul>
            <div class="kit-actions">
              <button class="btn-preview" onclick="openKitModal('bible')">🚀 Open Ready-to-Use Kit</button>
              <a href="REFA_Season2_Strategy.md" target="_blank" class="btn-raw">📄 Raw (.md)</a>
            </div>
          </div>
        </div>
`;

const legalCardHtml = `
        <div class="kit-card">
          <div class="kit-header" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);">
            <div class="kit-title-wrap">
              <h3 style="color:#fff;">Legal &amp; Compliance</h3>
              <p style="color:rgba(255,255,255,0.7);">Contracts, Consents &amp; NDAs</p>
            </div>
            <div class="kit-icon">⚖️</div>
          </div>
          <div class="kit-body">
            <div class="kit-badge-row">
              <span class="kit-chip chip-gold">Official Docs</span>
              <span class="kit-chip chip-purple">Print Ready</span>
            </div>
            <ul class="kit-features">
              <li>Contestant Participation Agreement</li>
              <li>Parent / Guardian Consent Form</li>
              <li>Judge NDA &amp; Scoring Agreement</li>
              <li>Media Release Waivers</li>
            </ul>
            <div class="kit-actions">
              <div style="display:flex; gap:5px; margin-top:5px; flex-wrap:wrap;">
                <button class="btn-raw" onclick="editTemplate('legal_contestant')" style="background:var(--navy);color:var(--white);border:none;border-radius:4px;padding:6px 10px;font-size:11px;cursor:pointer;">✏️ Contestant Agreement</button>
                <button class="btn-raw" onclick="editTemplate('legal_consent')" style="background:var(--navy);color:var(--white);border:none;border-radius:4px;padding:6px 10px;font-size:11px;cursor:pointer;">✏️ Guardian Consent</button>
                <button class="btn-raw" onclick="editTemplate('legal_nda')" style="background:var(--navy);color:var(--white);border:none;border-radius:4px;padding:6px 10px;font-size:11px;cursor:pointer;">✏️ Judge NDA</button>
              </div>
            </div>
          </div>
        </div>
`;

// Extract KIT_PREVIEWS safely
let startIndex = appJs.indexOf('const KIT_PREVIEWS = {');
let endIndex = appJs.indexOf('};', startIndex) + 2;
let kitCode = appJs.substring(startIndex, endIndex);
appJs = appJs.slice(0, startIndex) + appJs.slice(endIndex);

// Add the card HTMLs to the kitCode object
kitCode = kitCode.replace('sponsorship: {', 'sponsorship: {\n    cardHtml: `' + sponsorshipCardHtml + '`,');
kitCode = kitCode.replace('parent: {', 'parent: {\n    cardHtml: `' + parentCardHtml + '`,');
kitCode = kitCode.replace('social: {', 'social: {\n    cardHtml: `' + socialCardHtml + '`,');
kitCode = kitCode.replace('bible: {', 'bible: {\n    cardHtml: `' + bibleCardHtml + '`,');
// Legal wasn't in KIT_PREVIEWS, wait, legal didn't have a kit-modal. It only had editTemplate. So we can just add it as a dummy kit.
kitCode = kitCode.replace(/\}$/, ',\n  legal: {\n    title: "Legal", subtitle: "", html: "", cardHtml: `' + legalCardHtml + '`\n  }\n}');

let kitObj = kitCode.replace('const KIT_PREVIEWS = {', 'productionKits: {');
kitObj = kitObj.replace(/\}$/, '},');

// Extract LETTER_TEMPLATES safely
startIndex = appJs.indexOf('const LETTER_TEMPLATES = {');
endIndex = appJs.indexOf('};', startIndex) + 2;
let letterCode = appJs.substring(startIndex, endIndex);
appJs = appJs.slice(0, startIndex) + appJs.slice(endIndex);

let letterObj = letterCode.replace('const LETTER_TEMPLATES = {', 'letterTemplates: {');
letterObj = letterObj.replace(/\}$/, '},');

// Inject into seed
seedJs = seedJs.replace('  phases: [', `  ${kitObj}\n  ${letterObj}\n  phases: [`);

const htmPath = 'scripts/seed-event-hit-the-mic-s3.js';
let htmJs = fs.readFileSync(htmPath, 'utf8');
htmJs = htmJs.replace('  phases: [', `  productionKits: {},\n  letterTemplates: {},\n  phases: [`);

fs.writeFileSync(appJsPath, appJs);
fs.writeFileSync(seedPath, seedJs);
fs.writeFileSync(htmPath, htmJs);
console.log('Successfully migrated kits and letters to event configs!');
