const fs = require('fs');

const projectId = "refa-hub-2026";
const docPath = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/events/hit-the-mic-s3`;

const payload = {
  fields: {
    teaserMode: { booleanValue: true }
  }
};

async function patchDatabase() {
  console.log("Setting global teaserMode to true...");
  try {
    const res = await fetch(`${docPath}?updateMask.fieldPaths=teaserMode`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (data.error) {
      console.error("Failed:", data.error.message);
    } else {
      console.log("Global Teaser Mode successfully enabled in Firestore!");
    }
  } catch (err) {
    console.error("Network error:", err.message);
  }
}

patchDatabase();
