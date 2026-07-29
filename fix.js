const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');
const regex = /<script src="js\/templates\/bts\.js"><\/script>[\s\S]*?<\/style>/;
const replacement = `<script src="js/templates/bts.js"></script>
  <script src="js/templates/champions-chosen.js"></script>
  <script src="js/templates/coming-soon.js"></script>
  <script src="js/templates/congrats-winner.js"></script>
  <script src="js/templates/contestant-card.js"></script>
  <script src="js/templates/contestant-spotlight.js"></script>
  <script src="js/templates/event-countdown.js"></script>
  <script src="js/templates/event-flyer.js"></script>
  <script src="js/templates/event-host.js"></script>
  <script src="js/templates/event-team.js"></script>
  <script src="js/templates/fan-favourite.js"></script>
  <script src="js/templates/grand-final.js"></script>
  <script src="js/templates/guest-artist.js"></script>
  <script src="js/templates/how-to-vote.js"></script>
  <script src="js/templates/leaderboard.js"></script>
  <script src="js/templates/reel-cover.js"></script>
  <script src="js/templates/sponsor-shoutout.js"></script>
  <script src="js/templates/stage-promo.js"></script>
  <script src="js/templates/team-reveal.js"></script>
  <script src="js/templates/tech-crew.js"></script>
  <script src="js/templates/voting-live.js"></script>
  <script src="js/countdown.js"></script>`;
c = c.replace(regex, replacement);
fs.writeFileSync('index.html', c);
console.log('Fixed');
