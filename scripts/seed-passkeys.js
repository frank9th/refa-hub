/**
 * Node script to seed role-based pass keys into Firestore collection 'passkeys'
 * Project: refa-hub-2026
 */

const firebaseConfig = {
  projectId: "refa-hub-2026"
};

const PASSKEYS = [
  {
    key: "REFA-ADMIN-2026",
    role: "admin",
    title: "Executive Admin",
    maxUses: 5,
    currentUses: 0,
    active: true,
    allowedPages: ["dashboard", "tasks", "strategy", "voting", "sponsors", "letters", "accounts", "media", "studio"]
  },
  {
    key: "REFA-MEDIA-2026",
    role: "media",
    title: "Media & Studio Lead",
    maxUses: 15,
    currentUses: 0,
    active: true,
    allowedPages: ["dashboard", "tasks", "media", "studio", "strategy"]
  },
  {
    key: "REFA-TEAM-2026",
    role: "ops",
    title: "Operations & Mentor",
    maxUses: 30,
    currentUses: 0,
    active: true,
    allowedPages: ["dashboard", "tasks", "voting", "strategy"]
  },
  {
    key: "REFA-GUEST-2026",
    role: "viewer",
    title: "Guest Visitor",
    maxUses: 100,
    currentUses: 0,
    active: true,
    allowedPages: ["dashboard"]
  }
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function seedPasskeys() {
  console.log("Seeding pass keys to Firestore project:", firebaseConfig.projectId);

  for (const item of PASSKEYS) {
    const docPath = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/passkeys/${item.key}`;
    const payload = {
      fields: {
        key: { stringValue: item.key },
        role: { stringValue: item.role },
        title: { stringValue: item.title },
        maxUses: { integerValue: item.maxUses },
        currentUses: { integerValue: item.currentUses },
        active: { booleanValue: item.active },
        allowedPages: {
          arrayValue: {
            values: item.allowedPages.map(p => ({ stringValue: p }))
          }
        }
      }
    };

    let retries = 3;
    while (retries > 0) {
      try {
        const res = await fetch(`${docPath}?updateMask.fieldPaths=key&updateMask.fieldPaths=role&updateMask.fieldPaths=title&updateMask.fieldPaths=maxUses&updateMask.fieldPaths=currentUses&updateMask.fieldPaths=active&updateMask.fieldPaths=allowedPages`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          console.log(`[OK] Pass Key '${item.key}' (${item.title}, Max Uses: ${item.maxUses}) seeded successfully.`);
          break;
        } else {
          retries--;
          if (retries === 0) {
            const text = await res.text();
            console.error(`[Error] Pass Key '${item.key}' failed:`, res.status, text);
          } else {
            await sleep(300);
          }
        }
      } catch (e) {
        retries--;
        if (retries === 0) {
          console.error(`[Fetch Error] Pass Key '${item.key}':`, e.message);
        } else {
          await sleep(300);
        }
      }
    }
    await sleep(200);
  }

  console.log("\n🔑 Pass key seeding complete!");
}

seedPasskeys();
