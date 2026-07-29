const documentData = {
  "financials": {
    "totalBudget": 25000000,
    "revenueTarget": 100000000,
    "revenueBreakdown": [
      { "category": "Sponsorship", "amount": 60000000, "notes": "Corporate brands & wealthy individuals. Benefits: LED/Stage Branding, Red Carpet, Promos." },
      { "category": "Public Voting", "amount": 15000000, "notes": "Target: 150,000 paid votes at ₦100/vote. Includes early-voting fast-tracks." },
      { "category": "Ticket Sales", "amount": 10000000, "notes": "VIP tables and standard ticketing for Quarter/Semi/Grand Finale shows." },
      { "category": "Registration Fees", "amount": 5000000, "notes": "Target: 1,000 forms (Mix of ₦5k single & ₦10k group)." },
      { "category": "Vendor/Exhibition Stands", "amount": 5000000, "notes": "Stalls at all live audition and finale venues." },
      { "category": "Merchandise & Other", "amount": 5000000, "notes": "Branded shirts, caps, and miscellaneous income." }
    ]
  },
  "goals": [
    { "icon": "👥", "label": "Contestants", "value": "1,000+ Registered Entries" },
    { "icon": "💰", "label": "Revenue Target", "value": "₦100,000,000 Ecosystem" },
    { "icon": "🗳️", "label": "Total Votes", "value": "150,000+ (₦100/vote)" },
    { "icon": "🤝", "label": "Sponsorship", "value": "₦60M from Brands & Patrons" },
    { "icon": "🎫", "label": "Ticketing & Vendors", "value": "₦15M combined live revenue" },
    { "icon": "📺", "label": "Media Reach", "value": "Massive Audience Engagement" }
  ],
  "details": {
    "registrationFeeSingle": 5000,
    "registrationFeeGroup": 10000,
    "votePrice": 100,
    "targetContestants": 1000,
    "votingWeightJudges": 60,
    "votingWeightPublic": 40,
    "productionSpecs": [
      "Professional Stage",
      "Large LED Screen",
      "Concert Lighting & Live Band",
      "Multi-Camera Live Production",
      "Red Carpet & Drone Coverage"
    ],
    "sponsorBenefits": [
      "LED Screen & Stage Branding",
      "Judges' Table & Backdrop Branding",
      "Red Carpet Branding",
      "TV, Radio & Social Media Mentions",
      "Product Display & Promo Videos"
    ],
    "targetAudience": [
      "Students", "Churches", "Families", "Music Lovers", 
      "Youth Organizations", "Business Owners", "Media Houses"
    ],
    "sponsorSlogan": "Together, Let Us Raise Voices and Transform Lives."
  },
  "phases": [
    {
      "id": "phase-1",
      "title": "Phase 1: Grassroots Mobilisation & Digital Registration",
      "date": "July 15 - August 15",
      "desc": "The ₦5M Acquisition Strategy. To hit 1,000+ paid registrations, we move beyond passive online ads. We deploy aggressive 'Campus Ambassadors' and 'Church Roadshows' across Delta State. Simultaneously, the ₦60M sponsorship drive begins by dispatching premium pitch decks to FMCGs, telecoms, and wealthy patrons, leveraging our 'Together, Let Us Raise Voices' slogan. Early vendor stands are pitched for the upcoming audition venues.",
      "purpose": "Drive 1,000+ registrations, secure initial corporate commitments, and build profound grassroots trust.",
      "startOffset": -100,
      "endOffset": -78,
      "successCriteria": "Achieve 1,000+ paid registrations, send 50+ sponsorship decks, and lock 5 early vendor stands.",
      "tasks": [
        { "id": "p1-t1", "text": "Launch Aggressive Registration Portal", "detail": "Deploy robust system accepting ₦5k/₦10k payments. Integrate an affiliate tracking system for Campus Ambassadors.", "tag": "tech" },
        { "id": "p1-t2", "text": "Church & Campus Roadshows", "detail": "Deploy street teams with POS machines to major university campuses and mega-church youth ministries to sell physical/digital forms.", "tag": "ops" },
        { "id": "p1-t3", "text": "Dispatch Premium Sponsorship Decks", "detail": "Target companies and wealthy individuals selling the massive demographic reach (students, families, media).", "tag": "finance" },
        { "id": "p1-t4", "text": "Secure Premium Production Vendors", "detail": "Lock down vendors for the Large LED Screen, Concert Lighting, and Multi-Camera setups required for a ₦100M event.", "tag": "tech" },
        { "id": "p1-t5", "text": "Execute Radio & Billboard Ads", "detail": "Run high-frequency jingles on major FM stations and secure 3 strategic billboards in Asaba/Warri.", "tag": "media" },
        { "id": "p1-t6", "text": "Monitor Registration Flow & Support", "detail": "Set up a dedicated WhatsApp support line to audit entries and resolve contestant payment or media upload issues.", "tag": "admin" },
        { "id": "p1-t7", "text": "Audition Venue Securing", "detail": "Finalise payments and logistics for the August 16th audition venue, including backup generators.", "tag": "ops" },
        { "id": "p1-t8", "text": "Social Media Teaser Campaign", "detail": "Drop 'Who will take the crown?' teaser videos across TikTok and Instagram 3 times a week.", "tag": "content" },
        { "id": "p1-t9", "text": "Judge Panel Onboarding", "detail": "Sign contracts with the 3 main celebrity judges and brief them on the season's scoring rubric.", "tag": "admin" }
      ],
      "contestantJourney": {
        "experience": "Contestants feel the FOMO as physical ambassadors visit their churches and campuses. They see the premium production promised and register immediately.",
        "touchpoints": ["Campus Reps", "Church Announcements", "Registration Portal", "Radio Jingles"]
      },
      "concreteActions": [
        { "step": "1. Deploy Ambassadors", "achievableGoal": "500 forms sold offline", "actionOwner": "Ops Team" },
        { "step": "2. Pitch Sponsors", "achievableGoal": "First ₦10M in pledges secured", "actionOwner": "Finance Team" }
      ]
    },
    {
      "id": "phase-2",
      "title": "Phase 2: First Audition & The 'Fast-Track' Vote",
      "date": "August 16",
      "desc": "The ₦15M voting engine starts early! The First Audition is not just screening; we introduce the 'Fast-Track Vote'. Contestants who fall in the borderline 'maybe' category can secure a bypass to the next round by rallying 500 early votes (₦50,000). The venue is heavily branded with LED screens and sponsor backdrops to produce high-quality B-roll for corporate pitching.",
      "purpose": "Screen the first massive batch, generate early voting revenue, and capture premium B-roll for sponsors.",
      "startOffset": -77,
      "endOffset": -77,
      "successCriteria": "Process 300+ contestants, generate first 10,000 votes via Fast-Track, and lock in high-quality media.",
      "tasks": [
        { "id": "p2-t1", "text": "Premium Venue Branding", "detail": "Erect Stage Branding, Red Carpet, and Judges' Table Branding for sponsor visibility.", "tag": "ops" },
        { "id": "p2-t2", "text": "Launch 'Fast-Track' Early Voting", "detail": "Activate the voting portal for borderline contestants to buy their way into the next round via fanbase support.", "tag": "finance" },
        { "id": "p2-t3", "text": "Drone & Multi-Camera Capture", "detail": "Film drone coverage of the massive crowd and multi-cam shots of the stage for TV/Socials.", "tag": "tech" },
        { "id": "p2-t4", "text": "Exhibition Stand Management", "detail": "Set up the first 10 vendor/exhibition stands at the audition venue to drive alternative income.", "tag": "finance" },
        { "id": "p2-t5", "text": "Militant Accreditation", "detail": "Verify IDs, cross-check payment receipts, and issue physical audition numbers (Batch 1).", "tag": "logistics" },
        { "id": "p2-t6", "text": "Holding Room Management", "detail": "Keep waiting contestants engaged, hydrated, and briefed on stage protocols.", "tag": "admin" },
        { "id": "p2-t7", "text": "Judge Scoring & Collation", "detail": "Judges evaluate vocals, stage presence, and originality using real-time digital scorecards.", "tag": "admin" },
        { "id": "p2-t8", "text": "Audition Highlight Editing", "detail": "Editor cuts a 60-second high-energy recap reel to be posted by 8:00 PM same day.", "tag": "media" },
        { "id": "p2-t9", "text": "Security & Crowd Control", "detail": "Deploy bouncers to manage the expected overflow of family and friends outside the venue.", "tag": "ops" }
      ],
      "contestantJourney": {
        "experience": "Contestants are wowed by the Red Carpet and Concert Lighting. Borderline contestants immediately rally their churches to secure 'Fast-Track' votes.",
        "touchpoints": ["Red Carpet", "Judge Table", "Fast-Track Portal", "Exhibition Stands"]
      },
      "concreteActions": [
        { "step": "1. Launch Early Voting", "achievableGoal": "Secure 10,000 early votes (₦1M)", "actionOwner": "Tech Team" },
        { "step": "2. Media Capture", "achievableGoal": "Produce 3 sponsor-grade promo videos", "actionOwner": "Media Team" }
      ]
    },
    {
      "id": "phase-3",
      "title": "Phase 3: Second Audition & Sponsor Escalation",
      "date": "August 30",
      "desc": "With the hype from the first audition going viral, late registrations spike. We send the Day 1 high-quality promo videos directly back to hesitant corporate sponsors, proving the audience scale (students, families, music lovers). We continue the early voting strategies and expand the exhibition stands as foot traffic increases.",
      "purpose": "Capture the late-registration surge, escalate sponsor negotiations with video proof, and continue early voting.",
      "startOffset": -63,
      "endOffset": -63,
      "successCriteria": "Hit the 1,000 registration mark, secure ₦30M in sponsorships, and clear 25,000 cumulative votes.",
      "tasks": [
        { "id": "p3-t1", "text": "Late Registration Push", "detail": "Set up aggressive on-site payment terminals to capture the massive walk-in crowd.", "tag": "ops" },
        { "id": "p3-t2", "text": "Sponsor Follow-up with Video Proof", "detail": "Send the drone and multi-cam videos to government officials, business owners, and corporate brands.", "tag": "finance" },
        { "id": "p3-t3", "text": "Expand Vendor Stands", "detail": "Increase vendor footprint at the venue, pushing towards the ₦5M exhibition goal.", "tag": "finance" },
        { "id": "p3-t4", "text": "Continue Early Voting", "detail": "Keep the Fast-Track voting active for the new batch of borderline contestants.", "tag": "admin" },
        { "id": "p3-t5", "text": "Pre-Event Logistical Adjustments", "detail": "Implement solutions for any holding room or sound issues identified during the Aug 16 audition.", "tag": "ops" },
        { "id": "p3-t6", "text": "Intensified Judge Briefing", "detail": "Brief judges to raise the bar—only exceptional talent moves forward from this batch.", "tag": "admin" },
        { "id": "p3-t7", "text": "Stage Second Auditions", "detail": "Manage live performances for Batch 2 with strict adherence to the 3-minute time limit per act.", "tag": "logistics" },
        { "id": "p3-t8", "text": "Data Collation Checkpoint", "detail": "Merge Batch 1 and Batch 2 scores into the master database for preliminary ranking.", "tag": "tech" },
        { "id": "p3-t9", "text": "Phase 4 Teaser Blast", "detail": "Launch the 'Last Chance' campaign urging final registrations for September 20.", "tag": "media" }
      ],
      "contestantJourney": {
        "experience": "The competition is fierce. The venue feels like a festival with vendors and media everywhere. Trust in the brand is absolute.",
        "touchpoints": ["Late Registration Desk", "Vendor Village", "Sponsor Product Displays"]
      },
      "concreteActions": [
        { "step": "1. Close Sponsorships", "achievableGoal": "Lock in Title/Gold sponsors", "actionOwner": "Finance Team" },
        { "step": "2. Vendor Expansion", "achievableGoal": "Sell 15 exhibition spots", "actionOwner": "Ops Team" }
      ]
    },
    {
      "id": "phase-4",
      "title": "Phase 4: Third Audition & The 'Fan-Save' Cull",
      "date": "September 20",
      "desc": "The final cut before the live shows. Judges finalise the elite acts. However, to maximize the 150,000 vote goal, we introduce the 'Fan-Save' mechanic: 5 eliminated fan-favorite contestants can be voted back into the Academy by their supporters within a 72-hour window. This drives a massive mid-season revenue spike.",
      "purpose": "Finalise the elite lineup and execute a targeted 72-hour voting sprint.",
      "startOffset": -42,
      "endOffset": -40,
      "successCriteria": "Finalists locked, Fan-Save generates 20,000 votes, and all data strictly audited.",
      "tasks": [
        { "id": "p4-t1", "text": "Master Selection Lockdown", "detail": "Judges isolate the top tier acts destined for the live shows in a private boardroom.", "tag": "admin" },
        { "id": "p4-t2", "text": "Launch 72-Hour 'Fan-Save' Vote", "detail": "Activate a sudden-death voting window for 10 borderline contestants to fight for 5 slots.", "tag": "tech" },
        { "id": "p4-t3", "text": "Independent Audit Integration", "detail": "Announce the third-party auditor overseeing the voting to build absolute public trust.", "tag": "admin" },
        { "id": "p4-t4", "text": "Stage Third Auditions (Morning)", "detail": "Execute the final wave of physical screenings swiftly before 1:00 PM.", "tag": "logistics" },
        { "id": "p4-t5", "text": "Master Score Audit", "detail": "Independent auditor or lead admin verifies the calculation of all judge scores to prevent disputes.", "tag": "finance" },
        { "id": "p4-t6", "text": "Finalist Selection & Categorisation", "detail": "Select the final advancing acts, ensuring balanced representation across Singing, Dance, Comedy, etc.", "tag": "ops" },
        { "id": "p4-t7", "text": "Automated Email Notifications", "detail": "Trigger bulk acceptance emails to the finalists and polite rejection emails to the rest.", "tag": "tech" },
        { "id": "p4-t8", "text": "Public Shortlist Announcement", "detail": "Publish the final list across all TV, Radio, and Social Media channels.", "tag": "media" },
        { "id": "p4-t9", "text": "Press Release Dispatch", "detail": "Send official press release to local media partners announcing the conclusion of the audition phases.", "tag": "media" },
        { "id": "p4-t10", "text": "Bootcamp Logistics Prep", "detail": "Finalise catering, venue, and mentor schedules for the upcoming Academy phase.", "tag": "ops" }
      ],
      "contestantJourney": {
        "experience": "Devastation for the eliminated turns into a frenzied 72-hour campaign as they rally their communities for the Fan-Save.",
        "touchpoints": ["Final Stage", "Fan-Save Portal", "Social Media Drives"]
      },
      "concreteActions": [
        { "step": "1. Execute Fan-Save", "achievableGoal": "Generate ₦2M in 72 hours", "actionOwner": "Tech Team" },
        { "step": "2. Auditor Announcement", "achievableGoal": "Publish audit credibility statement", "actionOwner": "Admin Team" }
      ]
    },
    {
      "id": "phase-5",
      "title": "Phase 5: The Academy & Campaign Training",
      "date": "September 25 - October 5",
      "desc": "During Boot Camp, contestants aren't just trained to sing—they are trained to campaign. We run masterclasses on fanbase mobilization. We shoot high-end profile videos heavily featuring our sponsors' Product Displays. Pre-sales for the Quarter/Semi/Grand Finale tickets (targeting the ₦10M goal) officially open to the public.",
      "purpose": "Train contestants in performance and digital campaigning, and launch live show ticket sales.",
      "startOffset": -37,
      "endOffset": -27,
      "successCriteria": "Contestants armed with campaign strategies, sponsor products integrated into media, and ticket pre-sales live.",
      "tasks": [
        { "id": "p5-t1", "text": "Fanbase Mobilisation Masterclass", "detail": "Teach finalists how to leverage their churches, schools, and families to hit voting targets.", "tag": "outreach" },
        { "id": "p5-t2", "text": "Sponsor Product Integration", "detail": "Shoot the contestant profile videos featuring natural placements of sponsor products.", "tag": "content" },
        { "id": "p5-t3", "text": "Launch Ticket Pre-Sales", "detail": "Open the ticketing portal for VIP Tables and Standard seats for the upcoming live shows.", "tag": "tech" },
        { "id": "p5-t4", "text": "Merchandise Production", "detail": "Finalise printing of branded shirts and merch to be sold at the live shows (₦5M goal).", "tag": "ops" },
        { "id": "p5-t5", "text": "Orientation & Legal Signing", "detail": "Brief contestants on rules, expectations, and sign binding NDAs, media waivers, and codes of conduct.", "tag": "admin" },
        { "id": "p5-t6", "text": "Vocal & Choreography Masterclasses", "detail": "Execute daily rigorous training sessions led by hired industry coaches and music directors.", "tag": "outreach" },
        { "id": "p5-t7", "text": "Media Etiquette Training", "detail": "Train contestants on how to handle interviews, speak to the press, and engage their fanbases.", "tag": "media" },
        { "id": "p5-t8", "text": "Professional Photoshoot", "detail": "Shoot high-end studio headshots for every contestant to be used on the voting portal and billboards.", "tag": "content" },
        { "id": "p5-t9", "text": "Wardrobe & Styling Consultation", "detail": "Stylists review and approve contestant outfits for the upcoming live shows.", "tag": "ops" },
        { "id": "p5-t10", "text": "Test Voting Portal Infrastructure", "detail": "Tech team runs stress tests on the voting servers in preparation for the Quarter Finals.", "tag": "tech" }
      ],
      "contestantJourney": {
        "experience": "Contestants transform into professional brands. They leave the Academy armed with high-quality promo videos to blast on their socials.",
        "touchpoints": ["Academy House", "Media Masterclass", "Promo Video Shoot", "Ticketing Portal"]
      },
      "concreteActions": [
        { "step": "1. Launch Ticketing", "achievableGoal": "Secure ₦2M in early-bird sales", "actionOwner": "Finance Team" },
        { "step": "2. Deliver Sponsor Assets", "achievableGoal": "All profile videos feature sponsor branding", "actionOwner": "Content Team" }
      ]
    },
    {
      "id": "phase-6",
      "title": "Phase 6: Quarter Finals (The Mainstream Surge)",
      "date": "October 11",
      "desc": "The live shows begin, and the voting engine kicks into high gear. With a Large LED Screen, Live Band, and Multi-Camera setup, the production is premium. The 60/40 Judges-to-Public voting weight means fanbases must spend heavily to save their favorites. Merch booths and VIP tables are fully operational.",
      "purpose": "Execute a flawless broadcast, drive massive main-stage voting, and activate on-site revenue streams.",
      "startOffset": -21,
      "endOffset": -21,
      "successCriteria": "Hit 50,000 cumulative votes, sell out 80% of Quarter Final tickets, and deliver on sponsor media mentions.",
      "tasks": [
        { "id": "p6-t1", "text": "Execute Premium Broadcast", "detail": "Run the multi-camera live stream with flawless audio and on-screen sponsor graphics.", "tag": "tech" },
        { "id": "p6-t2", "text": "Aggressive Live Voting Drive", "detail": "MC constantly pushes the voting links and USSD codes during ad breaks.", "tag": "media" },
        { "id": "p6-t3", "text": "Live Stage Production Setup", "detail": "Deploy LED screens, premium PA systems, multi-camera rigs, and branded podiums.", "tag": "ops" },
        { "id": "p6-t4", "text": "Voting System Activation", "detail": "Flick the switch at exactly 6:00 PM to open USSD and Web voting channels simultaneously.", "tag": "tech" },
        { "id": "p6-t5", "text": "Real-Time Revenue Monitoring", "detail": "Finance desk actively monitors Paystack dashboards to track incoming vote payments and flag anomalies.", "tag": "finance" },
        { "id": "p6-t6", "text": "Live Judge Commentary", "detail": "Judges deliver live feedback on stage, heavily influencing the audience's voting decisions.", "tag": "admin" },
        { "id": "p6-t7", "text": "Publish Quarter Final Highlights", "detail": "Cut and upload the best performances to YouTube within 24 hours to drive week-long voting.", "tag": "media" },
        { "id": "p6-t8", "text": "Audience & VIP Stewarding", "detail": "Manage the live audience, ensuring VIPs and sponsors have premium seating and hospitality.", "tag": "ops" },
        { "id": "p6-t9", "text": "Post-Show Leaderboard Tease", "detail": "Release a controversial mid-week leaderboard update to trigger panic voting.", "tag": "admin" }
      ],
      "contestantJourney": {
        "experience": "The glitz and glamour of the main stage. Contestants plead with the camera for votes, knowing the 40% public weight can make or break them.",
        "touchpoints": ["Main Stage", "Live Stream Chat", "Merch Booth", "VIP Section"]
      },
      "concreteActions": [
        { "step": "1. Broadcast Quality", "achievableGoal": "Maintain 99% stream uptime", "actionOwner": "Tech Team" },
        { "step": "2. Revenue Push", "achievableGoal": "Generate ₦3M in one night", "actionOwner": "Finance Team" }
      ]
    },
    {
      "id": "phase-7",
      "title": "Phase 7: Semi Finals (The Pressure Cooker)",
      "date": "October 18",
      "desc": "Eliminations hit hard. The remaining contestants face their toughest challenges. To maximize the ₦15M voting target, we introduce 'Double Vote Hours' where votes carry 2x weight, sparking a frenzy of payments. We launch the final aggressive push for Grand Finale VIP tables targeting government officials and business owners.",
      "purpose": "Force peak voting engagement through eliminations and sell out the Grand Finale VIP section.",
      "startOffset": -14,
      "endOffset": -14,
      "successCriteria": "Clear 100,000 cumulative votes and secure 100% booking for Finale VIP tables.",
      "tasks": [
        { "id": "p7-t1", "text": "Live Eliminations & Audit", "detail": "Independent auditor hands over the sealed results on stage to guarantee absolute trust.", "tag": "finance" },
        { "id": "p7-t2", "text": "Launch 'Double Vote Hour'", "detail": "Activate a 60-minute window post-show where ₦100 buys 2 votes to drive instant revenue.", "tag": "tech" },
        { "id": "p7-t3", "text": "Grand Finale VIP Drive", "detail": "Directly call and pitch high-net-worth individuals and corporate partners to buy Finale tables.", "tag": "ops" },
        { "id": "p7-t4", "text": "Sponsor Fulfillment Check", "detail": "Ensure every TV/Radio mention and logo placement promised to the ₦60M sponsors is delivered.", "tag": "admin" },
        { "id": "p7-t5", "text": "Stage Semi Finals Performances", "detail": "Surviving contestants perform high-stakes routines (e.g., Duets, Unplugged rounds).", "tag": "ops" },
        { "id": "p7-t6", "text": "Aggressive Finale Promo Drive", "detail": "Deploy heavy radio, TV, and social media ads pushing the Nov 1 date and 'Vote to Save' campaigns.", "tag": "media" },
        { "id": "p7-t7", "text": "Secure Celebrity Guest Artist", "detail": "Finalise contracts and logistics for the headline guest artist performing at the Grand Finale.", "tag": "admin" },
        { "id": "p7-t8", "text": "Crisis & Fraud Management", "detail": "Monitor the voting backend for bot attacks or fraudulent card payments as desperation increases.", "tag": "tech" },
        { "id": "p7-t9", "text": "Produce 'Road to the Finale' Documentary", "detail": "Begin editing a 15-minute emotional documentary tracing the journey of the final surviving contestants.", "tag": "content" }
      ],
      "contestantJourney": {
        "experience": "Tears, drama, and relief. Surviving contestants launch their most desperate campaigns yet.",
        "touchpoints": ["Elimination Stage", "Double Vote Portal", "TV Interviews"]
      },
      "concreteActions": [
        { "step": "1. Flash Sale Voting", "achievableGoal": "Process 15,000 votes in 1 hour", "actionOwner": "Tech Team" },
        { "step": "2. VIP Table Sales", "achievableGoal": "Lock in all high-end tables", "actionOwner": "Finance Team" }
      ]
    },
    {
      "id": "phase-8",
      "title": "Phase 8: Grand Finale — The ₦100M Climax",
      "date": "November 1",
      "desc": "The culmination of the ecosystem. The Grand Finale is a sold-out spectacle with Concert Lighting, Drone Coverage, and celebrity guests. We push the final voting window to its absolute limit, clearing the 150,000 vote goal. Exhibition stands are packed, merch is sold out, and the ₦100M revenue target is achieved. The winner is crowned transparently.",
      "purpose": "Execute the ultimate premium production, close all revenue streams, and solidify the brand legacy.",
      "startOffset": 0,
      "endOffset": 5,
      "successCriteria": "Achieve ₦100,000,000 total revenue, flawless broadcast, and zero post-event debt.",
      "tasks": [
        { "id": "p8-t1", "text": "Final Voting Frenzy & Lockdown", "detail": "The MC hypes the live crowd to vote before the portal strictly shuts down 2 hours prior to the crowning.", "tag": "tech" },
        { "id": "p8-t2", "text": "Premium Red Carpet Experience", "detail": "Paparazzi, drone shots, and interviews against the massive Sponsor Backdrop.", "tag": "media" },
        { "id": "p8-t3", "text": "Maximized On-Site Sales", "detail": "Vendors operate at peak capacity; all remaining merch is sold at a discount.", "tag": "finance" },
        { "id": "p8-t4", "text": "Transparent Crowning & Payout", "detail": "Auditor confirms results. Winner receives the dummy cheque, with actual funds wired within 48 hours.", "tag": "admin" },
        { "id": "p8-t5", "text": "Execute Grand Finale Concert", "detail": "Host the 3-hour main event featuring contestant medleys, guest artist performances, and speeches.", "tag": "logistics" },
        { "id": "p8-t6", "text": "Press Photography & Interviews", "detail": "Conduct immediate post-crowning interviews with the winner for morning blogs and TV.", "tag": "media" },
        { "id": "p8-t7", "text": "Post-Event Media Blitz", "detail": "Publish the 'Winning Moment' reel, high-res photos, and issue the final press release.", "tag": "content" },
        { "id": "p8-t8", "text": "Vendor & Crew Payouts", "detail": "Settle all outstanding balances for lighting, sound, security, and event crew.", "tag": "finance" },
        { "id": "p8-t9", "text": "Sponsor ROI Delivery", "detail": "Within 5 days, send every sponsor a beautifully packaged report detailing the massive reach and engagement achieved.", "tag": "ops" },
        { "id": "p8-t10", "text": "Event Debrief & Season 4 Planning", "detail": "Core management team meets to review successes, failures, and set the dates for next year.", "tag": "admin" }
      ],
      "contestantJourney": {
        "experience": "Life-changing moment on a world-class stage. The winner becomes an instant celebrity in Delta State.",
        "touchpoints": ["Red Carpet", "Final Stage", "Winner's Podium", "Press Media Wall"]
      },
      "concreteActions": [
        { "step": "1. Close Voting", "achievableGoal": "Hit 150,000 total paid votes", "actionOwner": "Tech Team" },
        { "step": "2. Settle Accounts", "achievableGoal": "Pay out winner and vendors within 48 hrs", "actionOwner": "Finance Team" }
      ]
    }
  ]
};

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

async function updateRevenueStrategy() {
  const url = "https://firestore.googleapis.com/v1/projects/refa-hub-2026/databases/(default)/documents/events/hit-the-mic-s3?updateMask.fieldPaths=phases";
  const payload = {
    fields: {
      phases: toFirestoreType(documentData.phases)
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

updateRevenueStrategy();
