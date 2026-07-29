const fs = require('fs');

const firebaseConfig = {
  projectId: "refa-hub-2026" 
};

const PASSKEYS = [
  {
    key: "HIT-ADMIN-2026",
    role: "admin",
    title: "Executive Admin (Hit The Mic)",
    eventId: "hit-the-mic-s3",
    allowedPages: [
      "dashboard", "tasks", "strategy", "voting", "sponsors", 
      "letters", "accounts", "media", "studio", "timeline", 
      "countdown", "parents", "operations", "revenue", "teams", "social", "sponsorship"
    ],
    active: true,
    maxUses: 0,
    currentUses: 0,
    createdAt: new Date().toISOString()
  },
  {
    key: "HIT-MEDIA-2026",
    role: "media",
    title: "Media & Studio Lead (Hit The Mic)",
    eventId: "hit-the-mic-s3",
    allowedPages: [
      "dashboard", "tasks", "media", "studio", "strategy", "timeline", "countdown", "social"
    ],
    active: true,
    maxUses: 0,
    currentUses: 0,
    createdAt: new Date().toISOString()
  },
  {
    key: "HIT-TEAM-2026",
    role: "ops",
    title: "Operations & Mentor (Hit The Mic)",
    eventId: "hit-the-mic-s3",
    allowedPages: [
      "dashboard", "tasks", "voting", "strategy", "timeline", "countdown", "parents", "teams"
    ],
    active: true,
    maxUses: 0,
    currentUses: 0,
    createdAt: new Date().toISOString()
  }
];

function toFirestoreType(obj) {
  if (obj === null) return { nullValue: null };
  if (typeof obj === 'string') return { stringValue: obj };
  if (typeof obj === 'number') {
    return Number.isInteger(obj) ? { integerValue: String(obj) } : { doubleValue: obj };
  }
  if (typeof obj === 'boolean') return { booleanValue: obj };
  if (Array.isArray(obj)) {
    return { arrayValue: { values: obj.map(toFirestoreType) } };
  }
  if (typeof obj === 'object') {
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

async function seedPasskeys() {
  console.log(`Starting to seed isolated Hit The Mic passkeys to Firestore project: ${firebaseConfig.projectId}...`);

  for (const item of PASSKEYS) {
    const docPath = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/passkeys/${item.key}`;
    const payload = { fields: toFirestoreType(item).mapValue.fields };

    try {
      const res = await fetch(docPath, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.error) {
        console.error(`Failed to seed ${item.key}:`, data.error.message);
      } else {
        console.log(`Successfully seeded passkey: ${item.key}`);
      }
    } catch (e) {
      console.error(`Network error seeding ${item.key}:`, e.message);
    }
  }

  console.log("Seeding isolated passkeys complete!");
}

seedPasskeys();
