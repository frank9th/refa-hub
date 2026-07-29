const documentData = {
  "sponsorshipTiers": [
    {
      "tier": "Title Sponsor",
      "price": 25000000,
      "slots": 1,
      "target": "Tier-1 Telecoms & Major Commercial Banks",
      "benefits": [
        "Complete Naming Rights ('Powered by [Brand]')",
        "Exclusive Logo on ₦1M Winner's Cheque",
        "Permanent Logo on Main Stage LED Screen",
        "30-second Commercial during all Live Streams"
      ]
    },
    {
      "tier": "Gold Sponsor",
      "price": 10000000,
      "slots": 2,
      "target": "Major FMCG Brands & Real Estate Firms",
      "benefits": [
        "Product Integration during Academy Boot Camp",
        "Prime Red Carpet Media Walls",
        "Segment Ownership (e.g., 'The [Brand] Boot Camp')",
        "Live MC Shoutouts"
      ]
    },
    {
      "tier": "Silver Sponsor",
      "price": 3500000,
      "slots": 3,
      "target": "Top Regional Hotels & Logistics Companies",
      "benefits": [
        "Significant Stage Podium Branding",
        "Prominent TV and Radio Jingles Mentions",
        "VIP Tables at Grand Finale",
        "Digital Voting Portal Banners"
      ]
    },
    {
      "tier": "Patrons & Community Builders",
      "price": 500000,
      "slots": 9,
      "target": "Wealthy Individuals, Local Chiefs & Politicians",
      "benefits": [
        "Prestige Title: 'Youth Transformer'",
        "Premium VIP Seating at Live Shows",
        "On-Stage Acknowledgment by MC",
        "Vote Match Influence"
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

async function updateSponsorshipTiers() {
  const url = "https://firestore.googleapis.com/v1/projects/refa-hub-2026/databases/(default)/documents/events/hit-the-mic-s3?updateMask.fieldPaths=sponsorshipTiers";
  const payload = {
    fields: {
      sponsorshipTiers: toFirestoreType(documentData.sponsorshipTiers)
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

updateSponsorshipTiers();
