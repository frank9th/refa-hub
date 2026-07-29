/**
 * Seeds the HIT THE MIC Season 3 event config into Firestore.
 * Pattern mirrors seed-event-refa2.js — multi-event architecture compatible.
 * Auto-called in-browser when ?event=hit-the-mic-s3 is detected.
 */

const hitMicS3Config = {
  id: 'hit-the-mic-s3',
  name: 'HIT THE MIC SEASON 3',
  tagline: 'Raising Voices... Transforming Lives.',
  orgName: 'OMASBFILMS',
  season: '3',
  theme: 'sunset-fire',

  dates: {
    registrationOpen:  '2026-08-01',
    registrationClose: '2026-09-14',
    audition:          '2026-09-20',
    callback:          '2026-10-04',
    quarterfinals:     '2026-10-18',
    semifinals:        '2026-11-01',
    final:             '2026-11-22'
  },

  details: {
    targetContestants: 300,
    votePrice: 200,
    coverage: 'Delta State, Nigeria',
    venue: 'Delta State — Multiple LGA Audition Venues (TBC)',
    finalVenue: 'Grand Arena — Delta State (TBC)',
    votingWeightJudges: 60,
    votingWeightPublic: 40,
    registrationFeeSingle: 5000,
    registrationFeeGroup: 10000,
    hashtags: ['#HitTheMicSeason3','#HitTheMic','#RaiseYourVoice','#TransformLives','#DiscoverTalent','#DeltaStateTalent','#GospelTalentShow','#OMASBFILMS'],
    registrationLink: 'bit.ly/hitthemic'
  },

  categories: [
    { id: 'gospel-singing', label: 'Gospel Singing',   icon: '🎤', groupAllowed: true,  maxGroupSize: 6  },
    { id: 'comedy',         label: 'Comedy',           icon: '😂', groupAllowed: false                   },
    { id: 'dance',          label: 'Dance',            icon: '💃', groupAllowed: true,  maxGroupSize: 12 },
    { id: 'spoken-word',    label: 'Spoken Word',      icon: '📜', groupAllowed: false                   },
    { id: 'instrumental',   label: 'Instrumental',     icon: '🎸', groupAllowed: false                   },
    { id: 'special-talent', label: 'Special Talent',   icon: '⭐', groupAllowed: true,  maxGroupSize: 5  }
  ],

  judgingCriteria: [
    { label: 'Vocal / Performance Quality', weight: 30 },
    { label: 'Stage Presence',              weight: 20 },
    { label: 'Creativity',                  weight: 20 },
    { label: 'Audience Engagement',         weight: 10 },
    { label: 'Appearance',                  weight: 10 },
    { label: 'Overall Impact',              weight: 10 }
  ],

  goals: [
    { label: 'Registered Contestants', value: '0 / 300', icon: '🎤' },
    { label: 'Total Vote Revenue', value: '₦0', icon: '💰' },
    { label: 'Sponsorship Secured', value: '₦0 / 50M', icon: '🤝' },
    { label: 'Social Engagement', value: '0 / 500k', icon: '📈' }
  ],

  prizes: {
    first:  '₦1,000,000',
    second: '₦700,000',
    third:  '₦500,000',
    special: [
      'Best Vocalist Award',
      'Best Dancer Award',
      'Best Comedian Award',
      'Best Stage Performance Award',
      "Viewers' Choice Award"
    ]
  },

  goals: [
    { label: 'Contestants',          value: '300+ registered entries',    icon: '👥' },
    { label: 'Revenue Target',       value: '₦100,000,000 framework',     icon: '💰' },
    { label: 'Social Reach',         value: '500,000+ impressions',        icon: '📱' },
    { label: 'Total Votes Target',   value: '50,000+ (₦200/vote)',        icon: '🗳️' },
    { label: 'Live Viewers (Final)', value: '20,000+ (TV + Stream)',      icon: '📺' },
    { label: 'Brand Mission',        value: 'Delta State #1 Talent Show', icon: '🏆' }
  ],

  sponsorship: {
    slogan: 'Together, Let Us Raise Voices and Transform Lives.',
    tiers: [
      {
        name: 'Title Sponsor', fee: '₦5,000,000+',
        benefits: [
          '"[Brand] presents HIT THE MIC S3" — full event naming rights',
          'Opening & closing LED screen branding',
          'All social media: dedicated posts + promo video',
          'VIP table + reserved section at Grand Finale',
          'TV & radio mentions throughout broadcast',
          'Judges table, backdrop, and red carpet branding',
          'Website logo + link recognition'
        ]
      },
      {
        name: 'Category Sponsor', fee: '₦1,500,000',
        benefits: [
          '"[Brand] presents [Category]" — category naming rights',
          'LED screen + stage branding during that category',
          'Social media features for the category',
          'VIP seats at all stage events'
        ]
      },
      {
        name: 'Gold Sponsor', fee: '₦1,000,000',
        benefits: [
          'Logo on all digital assets & event program',
          'Mention at 2 stage events',
          'Social media features (posts + stories)',
          'Backdrop branding + product display at venue'
        ]
      },
      {
        name: 'Silver Sponsor', fee: '₦500,000',
        benefits: [
          'Logo on event backdrop & program',
          '1 stage mention',
          'Shoutout posts on social media',
          'Website recognition'
        ]
      },
      {
        name: 'Media Partner', fee: 'Contra',
        benefits: [
          'Press coverage exchange for branding rights',
          'Logo on all media materials',
          'Social media co-promotion'
        ]
      },
      {
        name: 'Supporter', fee: '₦100,000',
        benefits: [
          'Name listed in event credits',
          'Thank-you social media post',
          'Website recognition'
        ]
      }
    ]
  },

  production: {
    features: [
      'Professional Stage with HTM S3 branding',
      'Large LED Screen',
      'Concert Lighting (stage wash, spots, effects)',
      'Live Band (drums, keys, bass, guitar, brass)',
      'Professional FOH + Monitor Sound System',
      'Multi-Camera Live Production — 4+ angles',
      'Red Carpet & Step-and-Repeat Banner',
      'Drone Coverage (Grand Finale)',
      'Media: interviews, still photography, press',
      'Live Stream to YouTube + Facebook'
    ]
  },

  contact: {
    phone: 'TBC — OMASBFILMS',
    email: 'TBC — OMASBFILMS',
    website: 'Coming Soon',
    registrationLink: 'bit.ly/hitthemic'
  },

  stagesSnapshot: [
    { stage: 'Online Registration', date: 'August 1 - Sept 14', theme: 'Mass Call', status: 'upcoming' },
    { stage: 'Audition / Screening', date: 'September 20', theme: 'Physical Tryouts', status: 'upcoming' },
    { stage: 'Quarterfinals', date: 'October 18', theme: 'Top 50', status: 'upcoming' },
    { stage: 'Grand Finale', date: 'November 22', theme: 'Championship Night', status: 'upcoming' }
  ],

  teamsInfo: {
    title: 'HIT THE MIC - Category & Mentor Structure',
    description: 'Contestants are grouped by their talent category (Singing, Comedy, Dance, Spoken Word, etc.). Each category is assigned expert judges and mentors.'
  },

  productionKits: {},
  letterTemplates: {},
  productionKits: {},
  letterTemplates: {},
  phases: [
    {
      id: 'registration', title: 'Registration Window', date: 'Aug 1 - Sep 14', tasks: [
        { id: 'r1', text: 'Launch marketing campaign', detail: 'Social media ads across Delta State targeting youths', tag: 'media' },
        { id: 'r2', text: 'Distribute physical flyers', detail: 'Target major church hubs and university campuses', tag: 'ops' },
        { id: 'r3', text: 'Monitor Paystack registrations', detail: 'Ensure entry fees (5k/10k) are clearing successfully', tag: 'finance' }
      ]
    },
    {
      id: 'audition', title: 'Physical Auditions', date: 'September 20', tasks: [
        { id: 'a1', text: 'Set up 6 category stations', detail: 'Separate rooms for Comedy, Singing, Dance, etc.', tag: 'ops' },
        { id: 'a2', text: 'Brief category judges', detail: 'Ensure they use the digital scoring portal', tag: 'admin' },
        { id: 'a3', text: 'Film BTS and interviews', detail: 'Capture raw talent and emotions for promotion', tag: 'content' }
      ]
    },
    {
      id: 'quarterfinals', title: 'Quarterfinals', date: 'October 18', tasks: [
        { id: 'q1', text: 'Live stream setup', detail: 'Ensure multi-cam production is active', tag: 'tech' },
        { id: 'q2', text: 'Open public voting', detail: 'Announce voting links and USSD codes', tag: 'media' },
        { id: 'q3', text: 'Execute live run sheet', detail: 'Coordinate MC, Judges, and Acts', tag: 'ops' }
      ]
    },
    {
      id: 'final', title: 'Grand Finale', date: 'November 22', tasks: [
        { id: 'f1', text: 'Red carpet setup', detail: 'VIPs, Sponsors, Media arrivals', tag: 'ops' },
        { id: 'f2', text: 'Final voting tally', detail: 'Seal results before show starts', tag: 'finance' },
        { id: 'f3', text: 'Award presentations', detail: 'Cheques and plaques ready', tag: 'admin' }
      ]
    }
  ],

  defaultTeams: [
    { name: 'Category: Singing', color: '#1A3A8F', num: 1 },
    { name: 'Category: Comedy', color: '#D97706', num: 2 },
    { name: 'Category: Dance', color: '#047857', num: 3 },
    { name: 'Category: Spoken Word', color: '#6D28D9', num: 4 },
    { name: 'Category: Magic/Variety', color: '#BE185D', num: 5 }
  ],

  createdAt: new Date().toISOString(),
  aiGenerated: false
};

async function seedHitMicS3Event() {
  if (!window.REFA_FIREBASE) {
    console.error('Firebase not initialized.');
    return;
  }
  const existing = await window.REFA_FIREBASE.getEvent('hit-the-mic-s3');
  if (!existing || !existing.phases || !existing.stagesSnapshot) {
    console.log('Seeding or updating HIT THE MIC Season 3 event config...');
    await window.REFA_FIREBASE.saveEvent(hitMicS3Config);
    console.log('HIT THE MIC S3 config seed/update complete.');
  } else {
    console.log('HIT THE MIC Season 3 already exists and is up-to-date.');
  }
}

window.seedHitMicS3Event = seedHitMicS3Event;
window.HIT_MIC_S3_CONFIG = hitMicS3Config;
