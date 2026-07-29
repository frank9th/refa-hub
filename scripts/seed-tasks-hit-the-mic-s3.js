/**
 * Seeds HIT THE MIC Season 3 phases + tasks into Firestore.
 * Writes to: events/hit-the-mic-s3/tasks/{taskId}
 * Pattern mirrors seed-tasks.js for the multi-event architecture.
 * Run via: node scripts/seed-tasks-hit-the-mic-s3.js
 */

const HTM_PHASES = [
  {
    id: 'prelaunch',
    title: 'Pre-Launch Setup',
    date: 'August 1 – September 13',
    tasks: [
      { id: 'htm-pl1', text: 'Finalise HTM Season 3 brand identity', detail: 'Logo, colour palette, typography, tagline "Raising Voices... Transforming Lives." locked', tag: 'ops' },
      { id: 'htm-pl2', text: 'Create and launch all social media handles', detail: 'Instagram, TikTok, Facebook, YouTube — all handles secured, bios written, profile images set', tag: 'media' },
      { id: 'htm-pl3', text: 'Build and launch online registration portal', detail: 'Multi-step form: personal details, category, group info, media upload, payment (Paystack ₦5,000 single / ₦10,000 group)', tag: 'tech' },
      { id: 'htm-pl4', text: 'Commission and test voting platform', detail: 'Paid vote system at ₦200/vote with bundles. Fraud controls: phone verify, rate limits. Leaderboard live.', tag: 'tech' },
      { id: 'htm-pl5', text: 'Draft and send sponsorship pitch deck to 30+ targets', detail: 'Tiers: Title ₦5M, Category ₦1.5M, Gold ₦1M, Silver ₦500K. Send to Delta State brands, telecos, FMCG, faith orgs.', tag: 'finance' },
      { id: 'htm-pl6', text: 'Recruit and brief judges panel', detail: 'Min 3 judges per stage. Criteria: Performance 30%, Stage Presence 20%, Creativity 20%, Engagement 10%, Appearance 10%, Impact 10%', tag: 'ops' },
      { id: 'htm-pl7', text: 'Assign media and content manager', detail: 'Lead confirmed for daily posting, filming, editing, and livestream coordination across all stages', tag: 'media' },
      { id: 'htm-pl8', text: 'Run "HIT THE MIC IS COMING" teaser campaign', detail: '6-week countdown: category reveals, judge teasers, venue hints, influencer seeding across Delta State', tag: 'media' },
      { id: 'htm-pl9', text: 'Identify and book audition venues across Delta State LGAs', detail: 'Min 3 venue locations for physical auditions. Confirm capacity, power, PA system per venue.', tag: 'ops' },
      { id: 'htm-pl10', text: 'Set up production infrastructure checklist', detail: 'Stage, LED, lighting, live band, 4-camera rig, drone, red carpet — sourced and confirmed for Grand Finale', tag: 'ops' },
      { id: 'htm-pl11', text: 'Build content calendar for registration phase', detail: 'Every post planned: category spotlight days, registration countdowns, judge reveals, FAQ posts', tag: 'content' },
      { id: 'htm-pl12', text: 'Print and prepare contestant registration packs', detail: 'Physical packs for walk-in registrants: form printout, rules summary, payment instructions, QR code', tag: 'admin' }
    ]
  },
  {
    id: 'registration',
    title: 'Online Registration Window',
    date: 'August 1 – September 14',
    tasks: [
      { id: 'htm-rg1', text: 'Registration portal live and tested', detail: 'All 6 categories accepting entries. Paystack payment confirmed working. Confirmation emails sending.', tag: 'tech' },
      { id: 'htm-rg2', text: 'Daily registration count tracking', detail: 'Monitor total entries by category daily. Flag if any category undersubscribed — boost marketing for it.', tag: 'admin' },
      { id: 'htm-rg3', text: 'Category spotlight content series', detail: 'Each of the 6 categories gets a dedicated content week: what to expect, past performer clips, how to register', tag: 'content' },
      { id: 'htm-rg4', text: 'WhatsApp broadcast to churches, schools, youth groups', detail: 'Delta State-wide outreach via WhatsApp broadcast lists. Target: churches, secondary schools, universities, youth orgs', tag: 'admin' },
      { id: 'htm-rg5', text: 'Influencer seeding across Delta State social media', detail: 'Brief 10–15 Delta State influencers with registration link, creative brief, and content templates', tag: 'media' },
      { id: 'htm-rg6', text: 'Registration deadline reminder campaign (final 7 days)', detail: '"Last chance to register!" countdown posts daily. Urgency graphics. Final 48hrs push.', tag: 'media' },
      { id: 'htm-rg7', text: 'Close registration and export contestant database', detail: 'Export all confirmed registrants (paid) by category. Generate unique contestant IDs. Prepare accreditation list.', tag: 'admin' },
      { id: 'htm-rg8', text: 'Send audition venue assignments to contestants', detail: 'WhatsApp + email confirmation: audition date, venue address, time slot, what to bring, dress code', tag: 'admin' }
    ]
  },
  {
    id: 'auditions',
    title: 'Physical Auditions',
    date: 'September 20',
    tasks: [
      { id: 'htm-au1', text: 'Venue setup across all LGA audition locations', detail: 'Branded backdrop, accreditation desk, waiting area, performance area, judges table set up per venue', tag: 'ops' },
      { id: 'htm-au2', text: 'Contestant accreditation and check-in', detail: 'ID verification, confirm registration payment, wristband/ID card issued, slot assignment confirmed', tag: 'admin' },
      { id: 'htm-au3', text: 'Brief all judges on scoring criteria', detail: 'Score sheets distributed. All 6 criteria explained: 30/20/20/10/10/10 weighting. Standardised process per category.', tag: 'ops' },
      { id: 'htm-au4', text: 'Film BTS content throughout audition day', detail: 'Venue atmosphere, contestant arrivals, waiting area energy — do NOT film actual auditions without consent', tag: 'content' },
      { id: 'htm-au5', text: 'Conduct auditions per category schedule', detail: 'Each contestant performs. Judges score independently. Category MC manages timing and flow.', tag: 'ops' },
      { id: 'htm-au6', text: 'Collect and collate judge score sheets', detail: 'Admin team collects all score sheets per category, totals scores, flags borderline cases for review', tag: 'admin' },
      { id: 'htm-au7', text: 'Post audition day recap content', detail: 'BTS reel, crowd highlights, "The voices of Delta State showed up today" narrative. No results yet.', tag: 'content' },
      { id: 'htm-au8', text: 'Interview outstanding performers on camera', detail: 'Quick 60-sec interviews: "What category are you in? Why did you register? What do you want to tell Delta State?" — content gold', tag: 'content' }
    ]
  },
  {
    id: 'callback',
    title: 'Callback Round',
    date: 'October 4',
    tasks: [
      { id: 'htm-cb1', text: 'Announce audition results and callback list', detail: 'Post results per category. Celebratory graphics for qualifiers. Respectful messaging for those not advancing.', tag: 'media' },
      { id: 'htm-cb2', text: 'Send callback confirmation to selected contestants', detail: 'WhatsApp + email: date, venue, what to prepare for callback, dress code, expectations', tag: 'admin' },
      { id: 'htm-cb3', text: 'Contestant spotlight series begins', detail: '1–2 callback qualifier profiles per day. 60-sec "meet the contestant" video: name, category, LGA, why they are here.', tag: 'content' },
      { id: 'htm-cb4', text: 'Conduct callback performances per category', detail: 'Deeper assessment: judges now evaluate creativity and stage presence more critically. Live audience welcome.', tag: 'ops' },
      { id: 'htm-cb5', text: 'Film callback day highlight reel', detail: 'Best moments, standout performances, judge reactions, crowd energy — post within 48hrs', tag: 'content' },
      { id: 'htm-cb6', text: 'Announce Quarter Finalists', detail: 'Official QF qualifier list published per category. Graphic per qualifier. "They made it!" celebration posts.', tag: 'media' },
      { id: 'htm-cb7', text: 'Begin orientation for QF contestants', detail: 'Rules briefing, code of conduct signing, agreement form collection, schedule distributed', tag: 'admin' },
      { id: 'htm-cb8', text: 'Open Voting Round 1', detail: 'Voting officially opens. Share links to all contestants. Post voting how-to guide. WhatsApp blast.', tag: 'tech' }
    ]
  },
  {
    id: 'quarterfinals',
    title: 'Quarter Finals',
    date: 'October 18',
    tasks: [
      { id: 'htm-qf1', text: 'Production setup: stage, LED, lighting, sound', detail: 'Full branded stage. HTM S3 backdrop. LED screen with live scoring display. Professional sound system.', tag: 'ops' },
      { id: 'htm-qf2', text: 'Live stream setup — 4 camera angles minimum', detail: 'Wide stage, medium performance, close-up face, audience/crowd. Stream to YouTube + Facebook Live.', tag: 'tech' },
      { id: 'htm-qf3', text: 'MC and co-host briefed with full running order', detail: 'MC has full script: contestant list by category, judge bios, sponsor mentions, voting window announcement cues', tag: 'ops' },
      { id: 'htm-qf4', text: 'Judges panel in position per category', detail: 'Score sheets, microphones, category-specific scoring criteria visible on judges table displays', tag: 'ops' },
      { id: 'htm-qf5', text: 'Opening ceremony — prayer, vision, sponsor mentions', detail: 'Open with prayer, state the HTM mission, recognise title sponsor, introduce judges', tag: 'ops' },
      { id: 'htm-qf6', text: 'All 6 category performances executed', detail: 'Each category performs in sequence. MC builds narrative between categories. Crowd energy maintained throughout.', tag: 'ops' },
      { id: 'htm-qf7', text: 'Round 1 voting leaderboard revealed live', detail: 'MC reads current top 5 from voting platform before or during event. Drama and audience reaction.', tag: 'ops' },
      { id: 'htm-qf8', text: 'Judges deliver filmed remarks per category', detail: 'Each judge gives 30-sec filmed commentary after each category block — this is social content gold', tag: 'content' },
      { id: 'htm-qf9', text: 'Quarter Final results announced live', detail: 'Semi-finalists per category identified. Judges deliberate live. Elimination handled with dignity and encouragement.', tag: 'ops' },
      { id: 'htm-qf10', text: 'Post QF highlights reel within 48 hours', detail: 'Best moments by category, judge reaction clips, crowd highlights — YouTube + IG Reels + Facebook', tag: 'content' }
    ]
  },
  {
    id: 'semifinals',
    title: 'Semi Finals',
    date: 'November 1',
    tasks: [
      { id: 'htm-sf1', text: 'Open Voting Round 2 post-QF', detail: 'Announce across all platforms. New leaderboard window. WhatsApp blast to all contestant networks.', tag: 'tech' },
      { id: 'htm-sf2', text: 'Semi-finalist spotlight content series', detail: '"Road to the Finale" — 2 contestants featured per day. Deep dive: their journey, category, why they deserve to win.', tag: 'content' },
      { id: 'htm-sf3', text: 'Elevated production setup for Semi Finals', detail: 'Upgraded stage design. More sponsor branding visible. VIP section introduced. Higher audience capacity.', tag: 'ops' },
      { id: 'htm-sf4', text: 'Full multi-camera live stream active', detail: 'YouTube premiere format. Social media live simultaneously. Stream quality check 2 hours before.', tag: 'tech' },
      { id: 'htm-sf5', text: 'Semi Final performances — increased judging pressure', detail: 'Contestants face more demanding judging. Creativity and originality weighted more heavily this stage.', tag: 'ops' },
      { id: 'htm-sf6', text: 'Voting Round 2 leaderboard revealed live on stage', detail: 'MC reveals top 5 per category from public voting. Crowd involvement maximised. Suspense maintained.', tag: 'ops' },
      { id: 'htm-sf7', text: 'Announce Grand Finalists per category', detail: 'Per-category finalists named. Celebration moment for each. Farewell honours for eliminated contestants.', tag: 'ops' },
      { id: 'htm-sf8', text: 'Open Final Voting Round', detail: '"FINAL VOTING IS NOW OPEN. Closes November 21 midnight." Blast to all channels simultaneously.', tag: 'tech' },
      { id: 'htm-sf9', text: 'Post SF highlights and finalist content', detail: 'SF reel, finalist profile cards, "Who will win?" posts. Leaderboard updates every 48hrs. Urgency posts.', tag: 'content' }
    ]
  },
  {
    id: 'grandfinal',
    title: 'Grand Finale — The Last Word',
    date: 'November 22',
    tasks: [
      { id: 'htm-f1', text: 'Full grand production setup', detail: 'Premium stage, LED wall, concert lighting rig, live band briefed, drone camera cleared. Setup begins 6hrs before.', tag: 'ops' },
      { id: 'htm-f2', text: 'Red carpet setup and media zone', detail: 'Step-and-repeat backdrop branded HTM S3. Lighting, rope barriers, press photographers positioned.', tag: 'ops' },
      { id: 'htm-f3', text: 'VIP, sponsor, and reserved seating arranged', detail: 'Title sponsor VIP table. Category sponsor seats. Judges table. Reserved audience sections with banners.', tag: 'ops' },
      { id: 'htm-f4', text: 'Professional multi-camera rig (4+ angles) + drone active', detail: 'Wide stage, close-up performance, reaction cam, drone. Dedicated sound recording. Backup stream confirmed.', tag: 'tech' },
      { id: 'htm-f5', text: 'Media and press invitations sent', detail: 'Delta State TV, radio stations, gospel blogs, entertainment journalists, social media press invited', tag: 'media' },
      { id: 'htm-f6', text: 'Finalist red carpet arrival filmed and livestreamed', detail: 'Finalists arrive as a group. MC commentates on red carpet. Parents and supporters in frame. Drone overhead.', tag: 'content' },
      { id: 'htm-f7', text: 'Live worship / opening performance segment', detail: 'Live band. 10–15 minutes to set the spiritual and celebratory tone of the evening.', tag: 'ops' },
      { id: 'htm-f8', text: 'All 6 category final performances executed', detail: 'Each category final performance. Judges score live. MC builds drama between each category.', tag: 'ops' },
      { id: 'htm-f9', text: 'Public vote final tally confirmed and sealed', detail: 'Voting coordinator has final count. Sealed before event begins. Results integrated into total score for winners.', tag: 'admin' },
      { id: 'htm-f10', text: 'Sponsors recognition segment', detail: 'MC formally recognises all sponsors on stage. Sponsor representatives invited to stand. Branded moment filmed.', tag: 'ops' },
      { id: 'htm-f11', text: 'Full awards ceremony — all categories + special awards', detail: '3rd, 2nd, 1st per category. Special: Best Vocalist, Best Dancer, Best Comedian, Best Stage Perf, Viewers Choice.', tag: 'ops' },
      { id: 'htm-f12', text: 'Winner announcement — HTM Season 3 Champion', detail: 'Overall champion named. ₦1,000,000 presented on stage. Crown/trophy moment. Confetti. Live performance.', tag: 'ops' },
      { id: 'htm-f13', text: 'Official Grand Finale photo session', detail: 'All finalists + judges + organiser + sponsors photo. Winner solo shot. Category winner shots. Press wall.', tag: 'content' },
      { id: 'htm-f14', text: 'Full finale video published within 72 hours', detail: 'YouTube premiere + social media highlights. HTM S3 wrap content begins. Season 4 teaser seeded.', tag: 'content' }
    ]
  },
  {
    id: 'postevent',
    title: 'Post-Event & Season Wrap',
    date: 'November 23 onwards',
    tasks: [
      { id: 'htm-pe1', text: 'Publish full Grand Finale replay (YouTube)', detail: 'Full unedited event on YouTube. Chapters: Opening, Category Performances, Awards, Winner Moment.', tag: 'content' },
      { id: 'htm-pe2', text: 'Clip pack release (all platforms)', detail: 'Top 10 moments, winner reaction, best judge remarks, crowd highlights — dripped over 2 weeks', tag: 'content' },
      { id: 'htm-pe3', text: 'Fulfil all sponsor obligations', detail: 'Deliver sponsor report: coverage screenshots, reach data, video mentions, photo proof of all agreed deliverables', tag: 'finance' },
      { id: 'htm-pe4', text: 'Season evaluation report', detail: 'Total entries, votes, revenue vs. spend, social media growth, media coverage count, audience feedback summary', tag: 'admin' },
      { id: 'htm-pe5', text: 'Pay all prize winners', detail: '1st ₦1,000,000, 2nd ₦700,000, 3rd ₦500,000. All special award prizes. Document with payment receipts.', tag: 'finance' },
      { id: 'htm-pe6', text: 'Contestant farewell and certificate distribution', detail: 'Participation certificates for all finalists. Thank-you message to all registered contestants via WhatsApp.', tag: 'admin' },
      { id: 'htm-pe7', text: 'Season 4 announcement content', detail: '"HIT THE MIC SEASON 4 is coming!" Teaser post. Begin building early interest and Season 4 mailing list.', tag: 'media' },
      { id: 'htm-pe8', text: 'Winner feature and follow-up content', detail: 'Post-win interview with HTM Season 3 Champion. Their story, next steps, message to Delta State youth.', tag: 'content' }
    ]
  }
];

/**
 * Seeds all HTM S3 phases and tasks into events/hit-the-mic-s3/tasks/
 * Checks for existing data before writing to avoid duplicates.
 */
async function seedHitMicS3Tasks() {
  if (!window.REFA_FIREBASE) {
    console.error('Firebase not initialized.');
    return;
  }

  const eventId = 'hit-the-mic-s3';
  console.log(`Seeding tasks for event: ${eventId}...`);

  let seeded = 0;
  let skipped = 0;

  for (const phase of HTM_PHASES) {
    for (const task of phase.tasks) {
      const taskDoc = {
        id: task.id,
        phaseId: phase.id,
        phaseTitle: phase.title,
        text: task.text,
        detail: task.detail,
        tag: task.tag,
        completed: false,
        completedBy: null,
        updatedAt: new Date().toISOString()
      };

      try {
        // Write to event-scoped sub-collection: events/{eventId}/tasks/{taskId}
        await window.REFA_FIREBASE.saveEventTask(eventId, taskDoc);
        seeded++;
      } catch (e) {
        console.warn(`Skipped task ${task.id}:`, e.message);
        skipped++;
      }
    }
  }

  console.log(`HIT THE MIC S3 tasks seeded: ${seeded} tasks across ${HTM_PHASES.length} phases. Skipped: ${skipped}.`);
}

// Expose globally
window.HTM_S3_PHASES = HTM_PHASES;
window.seedHitMicS3Tasks = seedHitMicS3Tasks;
