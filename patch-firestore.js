const phases = [
  {
    "id": "phase-1",
    "title": "Registration & Marketing Campaign",
    "date": "July 15 - August 15",
    "purpose": "Drive massive awareness and secure contestant registrations ahead of the first audition.",
    "startOffset": -100,
    "endOffset": -78,
    "successCriteria": "Achieve 300+ paid registrations and high social media engagement.",
    "tasks": [
      { "id": "t-101", "text": "Launch Digital Registration Portal", "detail": "Deploy online system accepting ₦10,000/₦5,000 fee payment via Paystack.", "tag": "technical", "priority": "high", "dueDateOffset": -100 },
      { "id": "t-102", "text": "Execute Radio & Billboard Ads", "detail": "Run jingles on Wazobia FM and Crown FM Warri to drive traffic to the portal.", "tag": "media", "priority": "high", "dueDateOffset": -95 },
      { "id": "t-103", "text": "Monitor Registration Flow", "detail": "Audit entries and resolve contestant payment or upload issues.", "tag": "finance", "priority": "medium", "dueDateOffset": -80 }
    ],
    "contestantJourney": {
      "experience": "Contestants discover the event via radio/socials, feel excited, and securely register online to receive their audition tags.",
      "touchpoints": ["Instagram Ads", "Radio Jingles", "Registration Portal", "Email Confirmation"]
    },
    "concreteActions": [
      { "step": "1. Launch Portal", "achievableGoal": "Website live with zero payment bugs", "actionOwner": "Tech Team" },
      { "step": "2. Deploy Ads", "achievableGoal": "500,000+ social media impressions", "actionOwner": "Media Team" }
    ]
  },
  {
    "id": "phase-2",
    "title": "First Audition",
    "date": "August 16",
    "purpose": "Conduct the first wave of physical screening and talent discovery.",
    "startOffset": -77,
    "endOffset": -77,
    "successCriteria": "Successfully screen the first batch of registered contestants with judges' scoring completed.",
    "tasks": [
      { "id": "t-201", "text": "Audition Accreditation", "detail": "Verify IDs and issue physical audition numbers to the first batch.", "tag": "logistics", "priority": "high", "dueDateOffset": -78 },
      { "id": "t-202", "text": "Stage First Auditions", "detail": "Manage live performances and video recordings for Batch 1.", "tag": "logistics", "priority": "high", "dueDateOffset": -77 },
      { "id": "t-203", "text": "Judge Scoring & Collation", "detail": "Judges submit digital scorecards for the day's performances.", "tag": "admin", "priority": "high", "dueDateOffset": -77 }
    ],
    "contestantJourney": {
      "experience": "Nervous but determined, contestants arrive, get accredited, and perform before the live judges.",
      "touchpoints": ["Accreditation Desk", "Holding Room", "Audition Stage", "Judge Feedback"]
    },
    "concreteActions": [
      { "step": "1. Set Up Venue", "achievableGoal": "Stage, sound, and lighting ready by 7 AM", "actionOwner": "Logistics Team" },
      { "step": "2. Complete Batch 1", "achievableGoal": "All scheduled contestants screened", "actionOwner": "Admin Team" }
    ]
  },
  {
    "id": "phase-3",
    "title": "Second Audition",
    "date": "August 30",
    "purpose": "Conduct the second wave of physical screening.",
    "startOffset": -63,
    "endOffset": -63,
    "successCriteria": "Successfully screen the second batch and maintain momentum.",
    "tasks": [
      { "id": "t-301", "text": "Audition Accreditation", "detail": "Verify IDs and issue physical audition numbers to the second batch.", "tag": "logistics", "priority": "high", "dueDateOffset": -64 },
      { "id": "t-302", "text": "Stage Second Auditions", "detail": "Manage live performances and video recordings for Batch 2.", "tag": "logistics", "priority": "high", "dueDateOffset": -63 },
      { "id": "t-303", "text": "Publish Media Highlights", "detail": "Release video clips and pictures from the first and second auditions to build hype.", "tag": "media", "priority": "medium", "dueDateOffset": -60 }
    ],
    "contestantJourney": {
      "experience": "The second batch of contestants perform, fueled by the social media hype from the first audition.",
      "touchpoints": ["Social Media Teasers", "Audition Stage", "Media Wall Interviews"]
    },
    "concreteActions": [
      { "step": "1. Resolve Batch 1 Bottlenecks", "achievableGoal": "Smoother accreditation process", "actionOwner": "Logistics Team" },
      { "step": "2. Content Release", "achievableGoal": "Upload 5 viral audition clips", "actionOwner": "Media Team" }
    ]
  },
  {
    "id": "phase-4",
    "title": "Third Audition & Final Selection",
    "date": "September 20",
    "purpose": "Final audition day and the ultimate selection of the Top Contestants.",
    "startOffset": -42,
    "endOffset": -40,
    "successCriteria": "Finalize the official list of contestants moving forward to the live shows.",
    "tasks": [
      { "id": "t-401", "text": "Stage Third Auditions", "detail": "Complete the final batch of physical screenings.", "tag": "logistics", "priority": "high", "dueDateOffset": -42 },
      { "id": "t-402", "text": "Final Judge Deliberation", "detail": "Judges review all scores across the three auditions to select the finalists.", "tag": "admin", "priority": "high", "dueDateOffset": -41 },
      { "id": "t-403", "text": "Announce Selected Finalists", "detail": "Publish the official shortlist publicly and send acceptance emails.", "tag": "media", "priority": "high", "dueDateOffset": -40 }
    ],
    "contestantJourney": {
      "experience": "High anxiety waiting for results, followed by immense joy or disappointment upon the final list announcement.",
      "touchpoints": ["Final Audition", "Official Website List", "Acceptance Email"]
    },
    "concreteActions": [
      { "step": "1. Final Scoring Audit", "achievableGoal": "100% accurate judge score compilation", "actionOwner": "Admin Team" },
      { "step": "2. Finalist Announcement", "achievableGoal": "Public release of Top Contestants", "actionOwner": "Media Team" }
    ]
  },
  {
    "id": "phase-5",
    "title": "Training & Mentorship Academy",
    "date": "September 25 - October 5",
    "purpose": "Prepare the selected finalists for the big stage through professional coaching.",
    "startOffset": -37,
    "endOffset": -27,
    "successCriteria": "All finalists complete boot camp, improve performance skills, and sign legal agreements.",
    "tasks": [
      { "id": "t-501", "text": "Host Finalist Orientation & Contracts", "detail": "Brief contestants on rules and sign binding code of conduct agreements.", "tag": "admin", "priority": "high", "dueDateOffset": -37 },
      { "id": "t-502", "text": "Vocal & Stage Masterclasses", "detail": "Bring in industry experts to train finalists on stage presence and delivery.", "tag": "outreach", "priority": "high", "dueDateOffset": -32 },
      { "id": "t-503", "text": "Shoot Promotional Assets", "detail": "Record professional headshots and video profiles for each finalist.", "tag": "media", "priority": "high", "dueDateOffset": -27 }
    ],
    "contestantJourney": {
      "experience": "Intensive learning and bonding with peers. Contestants feel empowered and professionalized.",
      "touchpoints": ["Orientation Briefing", "Masterclass Sessions", "Photoshoots"]
    },
    "concreteActions": [
      { "step": "1. Contract Signing", "achievableGoal": "100% signed legal documents", "actionOwner": "Admin Team" },
      { "step": "2. Asset Production", "achievableGoal": "Complete profile videos for voting", "actionOwner": "Media Team" }
    ]
  },
  {
    "id": "phase-6",
    "title": "Quarter Finals (Live Show & Voting)",
    "date": "October 11",
    "purpose": "First major live show and the official launch of public voting.",
    "startOffset": -21,
    "endOffset": -21,
    "successCriteria": "Flawless live execution, massive public turnout, and voting portal successfully processing payments.",
    "tasks": [
      { "id": "t-601", "text": "Launch Public Voting System", "detail": "Activate USSD and web voting channels simultaneously with the show.", "tag": "technical", "priority": "high", "dueDateOffset": -22 },
      { "id": "t-602", "text": "Stage Quarter Finals Live Show", "detail": "Execute the live run sheet with full audience, judges, and contestant performances.", "tag": "logistics", "priority": "high", "dueDateOffset": -21 },
      { "id": "t-603", "text": "Monitor Voting Revenue & Integrity", "detail": "Track live vote counts and block any fraudulent bot activities.", "tag": "finance", "priority": "high", "dueDateOffset": -20 }
    ],
    "contestantJourney": {
      "experience": "The thrill of the live audience. Contestants actively urge their fanbases and churches to vote.",
      "touchpoints": ["Live Stage", "Backstage Interviews", "Voting Portal", "Fan Clubs"]
    },
    "concreteActions": [
      { "step": "1. Launch Voting", "achievableGoal": "Voting portal live with zero downtime", "actionOwner": "Tech Team" },
      { "step": "2. Execute Live Show", "achievableGoal": "On-time show start and wrap", "actionOwner": "Logistics Team" }
    ]
  },
  {
    "id": "phase-7",
    "title": "Semi Finals (Live Show)",
    "date": "October 18",
    "purpose": "High-stakes elimination round to determine the Grand Finalists.",
    "startOffset": -14,
    "endOffset": -14,
    "successCriteria": "Smooth live eliminations, sustained voting revenue, and hyped anticipation for the finale.",
    "tasks": [
      { "id": "t-701", "text": "Announce Quarter Final Eliminations", "detail": "Combine judge scores and public votes to eliminate bottom contestants.", "tag": "admin", "priority": "high", "dueDateOffset": -15 },
      { "id": "t-702", "text": "Stage Semi Finals Live Show", "detail": "Execute the Semi Finals with intensified performances from the remaining contestants.", "tag": "logistics", "priority": "high", "dueDateOffset": -14 },
      { "id": "t-703", "text": "Aggressive Finale Promo Drive", "detail": "Launch massive ad spend targeting the Grand Finale ticket sales and final voting push.", "tag": "media", "priority": "high", "dueDateOffset": -12 }
    ],
    "contestantJourney": {
      "experience": "Extreme pressure and emotion during eliminations, followed by fierce determination from those who advance.",
      "touchpoints": ["Elimination Announcement", "Semi-Final Stage", "Intense Rehearsals"]
    },
    "concreteActions": [
      { "step": "1. Vote Collation", "achievableGoal": "Transparent elimination process", "actionOwner": "Admin Team" },
      { "step": "2. Finale Marketing", "achievableGoal": "Sell 80% of Finale VIP tickets", "actionOwner": "Media Team" }
    ]
  },
  {
    "id": "phase-8",
    "title": "Grand Finale & Prize Presentation",
    "date": "November 1",
    "purpose": "The ultimate showdown, crowning the champion, and presenting the ₦1,000,000 prize.",
    "startOffset": 0,
    "endOffset": 1,
    "successCriteria": "Sold-out venue, viral social media trends, successful award handover, and closing of the event.",
    "tasks": [
      { "id": "t-801", "text": "Close Voting & Tally Final Scores", "detail": "Shut down the voting portal strictly 2 hours before the winner announcement.", "tag": "technical", "priority": "high", "dueDateOffset": 0 },
      { "id": "t-802", "text": "Execute Grand Finale Concert", "detail": "Host the main event featuring top performances, celebrity guests, and VIP sponsors.", "tag": "logistics", "priority": "high", "dueDateOffset": 0 },
      { "id": "t-803", "text": "Awards & Check Presentation", "detail": "Crown the winner, present the dummy check on stage, and handle press photos.", "tag": "admin", "priority": "high", "dueDateOffset": 0 },
      { "id": "t-804", "text": "Post-Event Audit & Financial Settlement", "detail": "Disburse actual prize money, pay vendors, and send ROI reports to sponsors.", "tag": "finance", "priority": "medium", "dueDateOffset": 2 }
    ],
    "contestantJourney": {
      "experience": "The pinnacle of the competition. Life-changing moments, massive exposure, and celebration.",
      "touchpoints": ["Grand Stage", "Winner Crowning", "Press Interviews", "Prize Handover"]
    },
    "concreteActions": [
      { "step": "1. Lock Votes", "achievableGoal": "Final transparent vote audit", "actionOwner": "Tech Team" },
      { "step": "2. Crown Winner", "achievableGoal": "Smooth on-stage prize handover", "actionOwner": "Admin Team" },
      { "step": "3. Vendor Payout", "achievableGoal": "All accounts settled within 48 hours", "actionOwner": "Finance Team" }
    ]
  }
];

function toFirestoreType(obj) {
  if (obj === null) return { nullValue: null };
  if (typeof obj === "string") return { stringValue: obj };
  if (typeof obj === "number") return Number.isInteger(obj) ? { integerValue: String(obj) } : { doubleValue: obj };
  if (typeof obj === "boolean") return { booleanValue: obj };
  if (Array.isArray(obj)) return { arrayValue: { values: obj.map(toFirestoreType) } };
  if (typeof obj === "object") {
    const fields = {};
    for (const key in obj) {
      if (obj[key] !== undefined) {
        fields[key] = toFirestoreType(obj[key]);
      }
    }
    return { mapValue: { fields } };
  }
  return { nullValue: null };
}

async function updatePhases() {
  const url = "https://firestore.googleapis.com/v1/projects/refa-hub-2026/databases/(default)/documents/events/hit-the-mic-s3?updateMask.fieldPaths=phases";
  const payload = {
    fields: {
      phases: {
        arrayValue: {
          values: phases.map(toFirestoreType)
        }
      }
    }
  };

  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    const data = await res.json();
    console.log("Success:", data.updateTime ? "Updated successfully" : data);
  } catch(e) {
    console.error("Error:", e);
  }
}

updatePhases();
