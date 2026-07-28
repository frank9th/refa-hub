const projects = [
  'actcon-dacbf',
  'ai-broker-c0afd',
  'charater-ai',
  'ecommerce-9288e',
  'flash-chat-7ae6e',
  'frankia-project',
  'quinsty-90e47',
  'refa-hub-2026',
  'swhair-project',
  'vidhunt-app'
];

async function checkProjects() {
  for (const proj of projects) {
    const url = `https://firestore.googleapis.com/v1/projects/${proj}/databases/(default)/documents`;
    try {
      const res = await fetch(url);
      const status = res.status;
      const text = await res.text();
      console.log(`Project: ${proj} -> HTTP ${status} (${text.substring(0, 100).replace(/\n/g, ' ')})`);
    } catch (e) {
      console.log(`Project: ${proj} -> Error: ${e.message}`);
    }
  }
}

checkProjects();
