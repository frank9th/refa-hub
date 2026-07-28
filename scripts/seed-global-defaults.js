/**
 * Node script to seed initial 10 teams and sample content schedule items into Firestore
 * Project: refa-hub-2026
 */

const firebaseConfig = {
  projectId: "refa-hub-2026"
};

const INITIAL_TEAMS = [
  { id: 'team-1', num: 1, name: 'Eagles of Zion', color: '#1A3A8F', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-2', num: 2, name: 'Shields of David', color: '#991B1B', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-3', num: 3, name: 'Lions of Judah', color: '#B45309', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-4', num: 4, name: 'Rivers of Eden', color: '#065F46', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-5', num: 5, name: 'Flames of Elijah', color: '#C2410C', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-6', num: 6, name: 'Arrows of Jonathan', color: '#374151', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-7', num: 7, name: 'Stars of Abraham', color: '#6D28D9', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-8', num: 8, name: 'Swords of Gideon', color: '#78350F', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-9', num: 9, name: 'Doves of Solomon', color: '#0F766E', mentor: 'Unassigned', memberCount: 10 },
  { id: 'team-10', num: 10, name: 'Thunder of Sinai', color: '#111827', mentor: 'Unassigned', memberCount: 10 }
];

const INITIAL_SCHEDULE = [
  {
    id: 'post-101',
    title: 'Season 2 "Coming Soon" Teaser Reel',
    platform: 'Instagram',
    scheduledDate: '2026-07-30',
    scheduledTime: '18:00',
    assignee: 'Media Team',
    status: 'Scheduled',
    notes: 'Mystery countdown video introducing Season 2 theme.'
  },
  {
    id: 'post-102',
    title: 'Screening Day Announcement & Location Map',
    platform: 'Facebook',
    scheduledDate: '2026-07-31',
    scheduledTime: '10:00',
    assignee: 'Ops Team',
    status: 'Scheduled',
    notes: 'Church location address, parking guide, and screening schedule.'
  },
  {
    id: 'post-103',
    title: 'Audition Day BTS Atmosphere Highlights',
    platform: 'TikTok',
    scheduledDate: '2026-08-01',
    scheduledTime: '20:00',
    assignee: 'Content Lead',
    status: 'Draft',
    notes: 'Lobby excitement, registration reactions, and judge introductions.'
  }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function seedGlobalDefaults() {
  console.log("Seeding global teams and content schedule to Firestore project:", firebaseConfig.projectId);

  // Seed Teams
  for (const team of INITIAL_TEAMS) {
    const docPath = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/teams/${team.id}`;
    const payload = {
      fields: {
        id: { stringValue: team.id },
        num: { integerValue: team.num },
        name: { stringValue: team.name },
        color: { stringValue: team.color },
        mentor: { stringValue: team.mentor },
        memberCount: { integerValue: team.memberCount }
      }
    };

    try {
      const res = await fetch(`${docPath}?updateMask.fieldPaths=id&updateMask.fieldPaths=num&updateMask.fieldPaths=name&updateMask.fieldPaths=color&updateMask.fieldPaths=mentor&updateMask.fieldPaths=memberCount`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        console.log(`[OK Team] Team ${team.num} (${team.name}) seeded.`);
      }
    } catch (e) {
      console.error(`[Error Team] ${team.name}:`, e.message);
    }
    await sleep(100);
  }

  // Seed Content Schedule
  for (const item of INITIAL_SCHEDULE) {
    const docPath = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/content_schedule/${item.id}`;
    const payload = {
      fields: {
        id: { stringValue: item.id },
        title: { stringValue: item.title },
        platform: { stringValue: item.platform },
        scheduledDate: { stringValue: item.scheduledDate },
        scheduledTime: { stringValue: item.scheduledTime },
        assignee: { stringValue: item.assignee },
        status: { stringValue: item.status },
        notes: { stringValue: item.notes }
      }
    };

    try {
      const res = await fetch(`${docPath}?updateMask.fieldPaths=id&updateMask.fieldPaths=title&updateMask.fieldPaths=platform&updateMask.fieldPaths=scheduledDate&updateMask.fieldPaths=scheduledTime&updateMask.fieldPaths=assignee&updateMask.fieldPaths=status&updateMask.fieldPaths=notes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        console.log(`[OK Post] ${item.title} (${item.platform}) seeded.`);
      }
    } catch (e) {
      console.error(`[Error Post] ${item.title}:`, e.message);
    }
    await sleep(100);
  }

  console.log("\n🎉 Global defaults seeding complete!");
}

seedGlobalDefaults();
