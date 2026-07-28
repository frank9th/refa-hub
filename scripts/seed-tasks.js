/**
 * Node task seeder for REFA Season 2 Global Database (Firestore)
 * Seeds 60+ tasks across 7 phases into project 'refa-hub-2026'
 */

const firebaseConfig = {
  apiKey: "AIzaSyCt6M4rbejaSqLyfCz9Udmx03hZUhD1irM",
  authDomain: "refa-hub-2026.firebaseapp.com",
  projectId: "refa-hub-2026",
  storageBucket: "refa-hub-2026.firebasestorage.app",
  messagingSenderId: "669575221546",
  appId: "1:669575221546:web:f44355112445ad9ed88e53"
};

const PHASES = [
  {
    id: 'preseason', title: 'Pre-Season Setup', date: 'July 1 - July 31', tasks: [
      { id: 'ps1', text: 'Finalise Season 2 branding', detail: 'Logo, colours, fonts, season name and theme locked', tag: 'ops' },
      { id: 'ps2', text: 'Create and launch social media handles', detail: 'Instagram, TikTok, Facebook, YouTube all set up and first teaser posted', tag: 'media' },
      { id: 'ps3', text: 'Build contestant application form', detail: 'Google Form or website form collecting name, age, church, guardian contact', tag: 'admin' },
      { id: 'ps4', text: 'Commission and test voting platform', detail: 'Platform contracted, test environment built and verified before Aug 1', tag: 'tech' },
      { id: 'ps5', text: 'Draft and send sponsorship pitch deck', detail: 'Send to minimum 20 prospective sponsors by July 25', tag: 'finance' },
      { id: 'ps6', text: 'Recruit all 10 mentors', detail: 'Brief them on roles, schedule and content expectations', tag: 'ops' },
      { id: 'ps7', text: 'Assign content and media manager', detail: 'Confirm who is responsible for daily posting, filming, and editing', tag: 'media' },
      { id: 'ps8', text: 'Build content calendar for Aug 2-8', detail: 'Every post planned and designed before audition day', tag: 'content' },
      { id: 'ps9', text: 'Run "Coming Soon" teaser campaign', detail: '"The Word League is Coming" - reels, countdowns, mystery posts', tag: 'media' },
      { id: 'ps10', text: 'Print Parent Voting Starter Packs', detail: 'QR code cards, voting guide, challenge card - 100 copies minimum', tag: 'ops' }
    ]
  },
  {
    id: 'audition', title: 'Audition / Screening Day', date: 'August 1', tasks: [
      { id: 'au1', text: 'Set up 3-4 screening stations in church', detail: 'Each station has a judge, score sheets, and timing device', tag: 'ops' },
      { id: 'au2', text: 'Contestant registration and check-in', detail: 'Name tags, registration packets, consent forms from parents', tag: 'admin' },
      { id: 'au3', text: 'Brief judging panel (3-5 judges)', detail: 'Scoring criteria: accuracy, pronunciation, spirit. Standardised sheets.', tag: 'ops' },
      { id: 'au4', text: 'Film BTS content throughout the day', detail: 'Lobby atmosphere, reactions, contestant arrivals - do NOT film actual assessments', tag: 'content' },
      { id: 'au5', text: 'Distribute Parent Voting Starter Packs', detail: 'Every parent leaves with QR code card, how-to guide, and challenge card', tag: 'admin' },
      { id: 'au6', text: 'Add parents to team WhatsApp groups', detail: 'All 10 groups created with mentor admins; parents added same day', tag: 'ops' },
      { id: 'au7', text: 'Assign contestants to teams', detail: '10 teams of 10. Balance age, ability, church representation where possible.', tag: 'ops' },
      { id: 'au8', text: 'Post Screening Day reel by end of day', detail: 'BTS atmosphere footage builds anticipation for announcement tomorrow', tag: 'content' }
    ]
  },
  {
    id: 'profileweek', title: 'Profile Week - Build-Up', date: 'August 2 - 8', tasks: [
      { id: 'pw1', text: 'Aug 2: Announce 100 accepted contestants', detail: 'Celebratory announcement post. Congratulations graphic. Let excitement land.', tag: 'media' },
      { id: 'pw2', text: 'Aug 3: Introduce mentors - 5 per day', detail: 'Mentor profile posts: photo, bio, quote. Split across platforms.', tag: 'content' },
      { id: 'pw3', text: 'Aug 4: Team reveals staggered', detail: 'Post each team name, colour, and member list throughout the day', tag: 'content' },
      { id: 'pw4', text: 'Aug 5: Training Day content', detail: 'Film teams preparing with mentors. Short clips per team.', tag: 'content' },
      { id: 'pw5', text: 'Aug 5: Send "How to Vote" guide to all parents', detail: 'Screenshots and step-by-step via WhatsApp broadcast to all parent groups', tag: 'admin' },
      { id: 'pw6', text: 'Aug 6: Contestant spotlight series begins', detail: '3 spotlight videos per day, 30 sec each. Name, team, favourite scripture, why they joined.', tag: 'content' },
      { id: 'pw7', text: 'Aug 7: VOTING OPENS - Round 1', detail: 'Post voting link across all platforms. WhatsApp blast to all parent groups simultaneously.', tag: 'tech' },
      { id: 'pw8', text: 'Aug 7: "Families Behind the Word" series begins', detail: 'First parent video published. Set the template for the series.', tag: 'content' },
      { id: 'pw9', text: 'Aug 8: Countdown post + leaderboard teaser', detail: '"Who is leading? Find out TOMORROW at Stage 1!" Voting closes midnight.', tag: 'media' }
    ]
  },
  {
    id: 'stage1', title: 'Stage 1 - The Proving Ground', date: 'August 9', tasks: [
      { id: 's1a', text: 'Stage branded backdrop and podium set up', detail: 'REFA Season 2 branding, scoreboard display, team banners in fan zones', tag: 'ops' },
      { id: 's1b', text: 'Live stream setup tested - 2 camera angles minimum', detail: 'Stable internet confirmed. Test stream done 1 hour before event.', tag: 'tech' },
      { id: 's1c', text: 'MC/Host briefed with full running order', detail: 'MC has script, contestant list, team order, judge bios, sponsor mentions', tag: 'ops' },
      { id: 's1d', text: 'Judges panel in position (3 judges)', detail: 'Score sheets, timing devices, and microphones confirmed', tag: 'ops' },
      { id: 's1e', text: 'Reserved Family Corners marked and stewarded', detail: 'Each team has a dedicated section. Parent Supporter Cards distributed at door.', tag: 'ops' },
      { id: 's1f', text: 'Opening ceremony conducted', detail: 'Prayer, REFA mission statement, Season 2 overview, sponsor mentions', tag: 'ops' },
      { id: 's1g', text: 'Round 1 voting leaderboard announced live', detail: 'MC reads current top 3 from voting platform before competition begins', tag: 'ops' },
      { id: 's1h', text: 'All performances filmed and recorded', detail: 'Every contestant moment captured. Highlights editor briefed on key clips.', tag: 'content' },
      { id: 's1i', text: 'Judges deliver filmed remarks', detail: 'Each judge gives short filmed commentary after each team section', tag: 'content' },
      { id: 's1j', text: 'Stage 1 results announced live', detail: 'Bottom 2 per team identified. Next round explained to audience.', tag: 'ops' }
    ]
  },
  {
    id: 'poststage1', title: 'Post-Stage 1 Content Window', date: 'August 10 - 15', tasks: [
      { id: 'pt1a', text: 'Aug 10: Stage 1 highlights reel published', detail: '5-10 min edited video on YouTube + Instagram Reels + Facebook within 48 hrs', tag: 'content' },
      { id: 'pt1b', text: 'Aug 11: Top 5 Moments clips posted', detail: 'Best recitations, judge reactions, crowd moments as short-form clips', tag: 'content' },
      { id: 'pt1c', text: 'Aug 12: Voting Round 2 OPENS', detail: 'Announce across all platforms. WhatsApp blast to all parent groups.', tag: 'tech' },
      { id: 'pt1d', text: 'Aug 12: Leaderboard update published', detail: '"Who is leading after Stage 1?" Reveal top 3 without exact vote counts.', tag: 'media' },
      { id: 'pt1e', text: 'Aug 13: Day-in-life contestant video', detail: '1-2 contestants featured showing their preparation and home life', tag: 'content' },
      { id: 'pt1f', text: 'Aug 14: Send individual clip links to parents', detail: '"Share this highlight of YOUR child!" - personalised WhatsApp message per team', tag: 'admin' },
      { id: 'pt1g', text: 'Aug 15: Stage 2 teaser campaign begins', detail: '"The Refinement begins tomorrow. Who is ready?" Countdown content goes live.', tag: 'media' }
    ]
  },
  {
    id: 'stage2', title: 'Stage 2 - The Refinement', date: 'August 16', tasks: [
      { id: 's2a', text: 'Stage setup with new format signage', detail: 'Duet zone, Cross-Examination format explained on display boards', tag: 'ops' },
      { id: 's2b', text: 'New challenge formats briefed to contestants', detail: 'Cross-Examination, Duet Round, Speed Recall rules explained in advance', tag: 'ops' },
      { id: 's2c', text: 'Live stream active with updated graphics', detail: 'Season progression shown, cumulative scores displayed', tag: 'tech' },
      { id: 's2d', text: 'Round 2 leaderboard announced live on stage', detail: 'MC reads current top 5 from voting before competition begins', tag: 'ops' },
      { id: 's2e', text: 'Team immunity results tracked and posted', detail: 'Which teams secured immunity shown on scoreboard during event', tag: 'ops' },
      { id: 's2f', text: 'Parent Award nominations announced', detail: 'MC announces which parents are nominated for Grand Final awards', tag: 'ops' },
      { id: 's2g', text: 'All performances filmed for highlights', detail: 'Key clip moments flagged live for editors', tag: 'content' },
      { id: 's2h', text: 'Final voting window announced open after event', detail: '"Final voting window is NOW OPEN. Closes September 5 midnight."', tag: 'tech' }
    ]
  },
  {
    id: 'final', title: 'Grand Final - The Last Word', date: 'September 6', tasks: [
      { id: 'f1', text: 'Full stage production setup - elevated', detail: 'Premium lighting, sound, backdrop, red carpet entrance banner, live band briefed', tag: 'ops' },
      { id: 'f2', text: 'VIP and reserved seating arranged', detail: 'Sponsor tables, Family Corners, judges table all labelled and stewarded', tag: 'ops' },
      { id: 'f3', text: 'Professional videographer and multi-camera setup', detail: 'Minimum 3 camera angles. Dedicated sound recording. Backup stream confirmed.', tag: 'tech' },
      { id: 'f4', text: 'Media and press invitations sent', detail: 'Gospel blogs, Christian news outlets, social media journalists invited', tag: 'media' },
      { id: 'f5', text: 'Finalist red carpet arrival filmed and streamed', detail: 'Teams walk coordinated arrival. MC commentates. Parents in frame.', tag: 'content' },
      { id: 'f6', text: 'Live worship opening segment', detail: 'Live band. 10-15 minutes of worship to set spiritual tone.', tag: 'ops' },
      { id: 'f7', text: 'All 3 championship rounds executed', detail: 'Personal Mastery then The Gauntlet then Final Power Recitation', tag: 'ops' },
      { id: 'f8', text: 'Parent Testimony segment (2 minutes)', detail: '2-3 selected parents, 30 sec each, before results. Prompt given in advance.', tag: 'content' },
      { id: 'f9', text: 'Final vote tally confirmed and sealed', detail: 'Voting coordinator hands sealed result to judges before event starts', tag: 'finance' },
      { id: 'f10', text: 'Full awards ceremony staged', detail: '1st/2nd/3rd + Consolation + Fan Favourite + Best Team + Best Mentor + Parent Awards', tag: 'ops' },
      { id: 'f11', text: 'Post-event fellowship and celebration', detail: 'Contestants, families, mentors gather for reflection and community', tag: 'ops' },
      { id: 'f12', text: 'Full Final video published within 72 hours', detail: 'YouTube premiere + all social highlights. Season 2 wrap content begins.', tag: 'content' }
    ]
  }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function seedFirestoreViaRest() {
  console.log("Seeding tasks to Firestore project:", firebaseConfig.projectId);
  const totalTasks = PHASES.reduce((acc, p) => acc + p.tasks.length, 0);
  console.log(`Found ${PHASES.length} phases with total ${totalTasks} tasks.`);

  let successCount = 0;
  for (const phase of PHASES) {
    for (const task of phase.tasks) {
      const docPath = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/tasks/${task.id}`;
      const payload = {
        fields: {
          id: { stringValue: task.id },
          phaseId: { stringValue: phase.id },
          text: { stringValue: task.text },
          detail: { stringValue: task.detail },
          tag: { stringValue: task.tag },
          completed: { booleanValue: false }
        }
      };

      let retries = 3;
      while (retries > 0) {
        try {
          const res = await fetch(`${docPath}?updateMask.fieldPaths=id&updateMask.fieldPaths=phaseId&updateMask.fieldPaths=text&updateMask.fieldPaths=detail&updateMask.fieldPaths=tag&updateMask.fieldPaths=completed`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (res.ok) {
            successCount++;
            console.log(`[OK ${successCount}/${totalTasks}] Task ${task.id} (${phase.id}) seeded.`);
            break;
          } else {
            retries--;
            if (retries === 0) {
              const errText = await res.text();
              console.error(`[Error] Task ${task.id} failed:`, res.status, errText);
            } else {
              await sleep(300);
            }
          }
        } catch (e) {
          retries--;
          if (retries === 0) {
            console.error(`[Fetch Error] Task ${task.id}:`, e.message);
          } else {
            await sleep(300);
          }
        }
      }
      await sleep(100);
    }
  }
  console.log(`\n🎉 Database seeding completed! Successfully seeded ${successCount}/${totalTasks} tasks.`);
}

seedFirestoreViaRest();
