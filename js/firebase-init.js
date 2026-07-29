import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  collection, 
  doc, 
  getDoc,
  getDocs,
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  writeBatch,
  increment,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCt6M4rbejaSqLyfCz9Udmx03hZUhD1irM",
  authDomain: "refa-hub-2026.firebaseapp.com",
  projectId: "refa-hub-2026",
  storageBucket: "refa-hub-2026.firebasestorage.app",
  messagingSenderId: "669575221546",
  appId: "1:669575221546:web:f44355112445ad9ed88e53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
  } else if (err.code == 'unimplemented') {
    console.warn("The current browser does not support all of the features required to enable persistence");
  }
});

function getEventPath(subCol) {
  const event = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  const eventId = event && event.id ? event.id : 'refa-season2';
  return `events/${eventId}/${subCol}`;
}

// --- EVENTS CONFIG HELPERS ---
async function getEvent(eventId) {
  try {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (err) {
    console.error("Error getting event:", err);
    return null;
  }
}

async function listEvents() {
  try {
    const colRef = collection(db, "events");
    const snapshot = await getDocs(colRef);
    const events = [];
    snapshot.forEach(docSnap => events.push({ id: docSnap.id, ...docSnap.data() }));
    return events;
  } catch (err) {
    console.error("Error listing events:", err);
    return [];
  }
}

async function saveEvent(eventData) {
  try {
    const eventId = eventData.id || `event-${Date.now()}`;
    const docRef = doc(db, "events", eventId);
    await setDoc(docRef, {
      ...eventData,
      id: eventId,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return { success: true, id: eventId };
  } catch (err) {
    console.error("Error saving event:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Validate a Pass Key against Firestore.
 * Checks key active status, max usage limit, and records login.
 * @param {string} name - Name of member
 * @param {string} keyInput - Entered Pass Key
 * @returns {Promise<{success: boolean, message?: string, roleData?: object}>}
 */
async function validatePassKey(name, keyInput, currentEventId) {
  const cleanKey = (keyInput || '').trim().toUpperCase();
  if (!cleanKey) {
    return { success: false, message: 'Pass key cannot be empty.' };
  }

  try {
    const keyDocRef = doc(db, "passkeys", cleanKey);
    const docSnap = await getDoc(keyDocRef);

    if (!docSnap.exists()) {
      return { success: false, message: 'Invalid Pass Key. Access denied.' };
    }

    const data = docSnap.data();
    if (data.active === false) {
      return { success: false, message: 'This Pass Key has been deactivated by administrator.' };
    }

    if (currentEventId) {
      const keyEventId = data.eventId || 'refa-season-2';
      if (keyEventId !== currentEventId) {
        return { success: false, message: 'This Pass Key is not authorized for the current event dashboard.' };
      }
    }

    const currentUses = Number(data.currentUses || 0);
    const maxUses = Number(data.maxUses || 0);

    if (maxUses > 0 && currentUses >= maxUses) {
      return { 
        success: false, 
        message: `Pass key usage limit reached! (Max allowed users: ${maxUses}). Please contact administrator.` 
      };
    }

    // Increment currentUses counter in Firestore
    await updateDoc(keyDocRef, {
      currentUses: increment(1),
      lastUsedAt: serverTimestamp()
    });

    // Log session document in 'user_sessions'
    try {
      const sessionDocRef = doc(collection(db, "user_sessions"));
      await setDoc(sessionDocRef, {
        memberName: name || 'Anonymous Member',
        passKey: cleanKey,
        role: data.role,
        title: data.title,
        loginTime: serverTimestamp()
      });
    } catch (e) {
      console.warn("Log session error:", e);
    }

    return {
      success: true,
      roleData: {
        key: cleanKey,
        memberName: name || 'Team Member',
        role: data.role,
        title: data.title,
        allowedPages: data.allowedPages || []
      }
    };
  } catch (err) {
    console.error("PassKey validation error:", err);
    // Offline local fallback if network error
    const FALLBACK_KEYS = {
      'REFA-ADMIN-2026': { key: 'REFA-ADMIN-2026', role: 'admin', title: 'Executive Admin', allowedPages: ["dashboard", "tasks", "strategy", "voting", "sponsors", "letters", "accounts", "media", "studio", "timeline", "countdown", "parents", "operations", "revenue", "teams", "social", "sponsorship"] },
      'REFA-MEDIA-2026': { key: 'REFA-MEDIA-2026', role: 'media', title: 'Media & Studio Lead', allowedPages: ["dashboard", "tasks", "media", "studio", "strategy", "timeline", "countdown", "social"] },
      'REFA-TEAM-2026': { key: 'REFA-TEAM-2026', role: 'ops', title: 'Operations & Mentor', allowedPages: ["dashboard", "tasks", "voting", "strategy", "timeline", "countdown", "parents", "teams"] },
      'REFA-GUEST-2026': { key: 'REFA-GUEST-2026', role: 'viewer', title: 'Guest Visitor', allowedPages: ["dashboard", "timeline", "countdown"] }
    };
    if (FALLBACK_KEYS[cleanKey]) {
      return {
        success: true,
        roleData: { ...FALLBACK_KEYS[cleanKey], memberName: name || 'Team Member' }
      };
    }
    return { success: false, message: 'Database connection error and key not found locally.' };
  }
}

/**
 * Seed all initial tasks into Firestore if the tasks collection is empty.
 * @param {Array} phases - Array of phase objects containing task definitions.
 */
async function seedTasksIfEmpty(phases) {
  try {
    const tasksColRef = collection(db, getEventPath("tasks"));
    const snapshot = await getDocs(tasksColRef);
    if (!snapshot.empty) {
      return false;
    }

    const batch = writeBatch(db);
    phases.forEach(phase => {
      phase.tasks.forEach(t => {
        const taskDocRef = doc(db, getEventPath("tasks"), t.id);
        batch.set(taskDocRef, {
          id: t.id,
          phaseId: phase.id,
          text: t.text,
          detail: t.detail,
          tag: t.tag,
          completed: false,
          completedBy: null,
          updatedAt: serverTimestamp()
        });
      });
    });

    await batch.commit();
    return true;
  } catch (err) {
    console.error("[Firebase DB] Error seeding tasks:", err);
    return false;
  }
}

async function seedTeamsIfEmpty(defaultTeams) {
  try {
    const teamsColRef = collection(db, getEventPath("teams"));
    const snapshot = await getDocs(teamsColRef);
    if (!snapshot.empty || !defaultTeams || defaultTeams.length === 0) {
      return false;
    }

    const batch = writeBatch(db);
    defaultTeams.forEach(t => {
      const teamId = 'team-' + t.num;
      const teamDocRef = doc(db, getEventPath("teams"), teamId);
      batch.set(teamDocRef, {
        id: teamId,
        name: t.name,
        color: t.color,
        num: t.num,
        mentor: 'Unassigned',
        members: [],
        createdAt: serverTimestamp()
      });
    });

    await batch.commit();
    return true;
  } catch (err) {
    console.error("[Firebase DB] Error seeding teams:", err);
    return false;
  }
}

/**
 * Subscribe to real-time task updates from Firestore.
 * @param {Function} callback - Callback function receiving an object of { taskId: boolean }.
 */
function subscribeToTasks(callback) {
  const tasksColRef = collection(db, getEventPath("tasks"));
  return onSnapshot(tasksColRef, (snapshot) => {
    const checkedMap = {};
    const taskDetailsMap = {};
    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      checkedMap[data.id] = !!data.completed;
      taskDetailsMap[data.id] = data;
    });
    callback(checkedMap, taskDetailsMap);
  }, (error) => {
    console.error("[Firebase DB] Real-time task subscription error:", error);
  });
}

/**
 * Update single task completed state in Firestore.
 * @param {string} taskId 
 * @param {boolean} isCompleted 
 * @param {string} [userName] 
 */
async function updateTaskInDb(taskId, isCompleted, userName = 'Team Member') {
  try {
    const taskDocRef = doc(db, getEventPath("tasks"), taskId);
    await setDoc(taskDocRef, {
      completed: isCompleted,
      completedBy: isCompleted ? userName : null,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error(`[Firebase DB] Error updating task ${taskId}:`, err);
  }
}

// --- TEAMS GLOBAL STATE HELPERS ---
function subscribeToTeams(callback) {
  const colRef = collection(db, getEventPath("teams"));
  return onSnapshot(colRef, (snapshot) => {
    const teamsList = [];
    snapshot.forEach(docSnap => {
      teamsList.push({ id: docSnap.id, ...docSnap.data() });
    });
    teamsList.sort((a, b) => (a.num || 0) - (b.num || 0));
    callback(teamsList);
  }, (err) => console.error("[Firebase DB] Teams sync error:", err));
}

async function addTeamToDb(teamData) {
  try {
    const teamId = teamData.id || `team-${Date.now()}`;
    const docRef = doc(db, getEventPath("teams"), teamId);
    await setDoc(docRef, {
      ...teamData,
      id: teamId,
      createdAt: serverTimestamp()
    }, { merge: true });
    return { success: true, id: teamId };
  } catch (err) {
    console.error("Error adding team:", err);
    return { success: false, error: err.message };
  }
}

async function deleteTeamFromDb(teamId) {
  try {
    await deleteDoc(doc(db, getEventPath("teams"), teamId));
    return { success: true };
  } catch (err) {
    console.error("Error deleting team:", err);
    return { success: false, error: err.message };
  }
}

// --- CONTENT SCHEDULE GLOBAL STATE HELPERS ---
function subscribeToContentSchedule(callback) {
  const colRef = collection(db, getEventPath("content_schedule"));
  return onSnapshot(colRef, (snapshot) => {
    const items = [];
    snapshot.forEach(docSnap => {
      items.push({ id: docSnap.id, ...docSnap.data() });
    });
    items.sort((a, b) => new Date(a.scheduledDate || 0) - new Date(b.scheduledDate || 0));
    callback(items);
  }, (err) => console.error("[Firebase DB] Content schedule sync error:", err));
}

async function addContentScheduleToDb(contentData) {
  try {
    const itemId = contentData.id || `post-${Date.now()}`;
    const docRef = doc(db, getEventPath("content_schedule"), itemId);
    await setDoc(docRef, {
      ...contentData,
      id: itemId,
      createdAt: serverTimestamp()
    }, { merge: true });
    return { success: true, id: itemId };
  } catch (err) {
    console.error("Error scheduling content:", err);
    return { success: false, error: err.message };
  }
}

async function deleteContentScheduleFromDb(itemId) {
  try {
    await deleteDoc(doc(db, getEventPath("content_schedule"), itemId));
    return { success: true };
  } catch (err) {
    console.error("Error deleting content schedule item:", err);
    return { success: false, error: err.message };
  }
}

// --- MEDIA UPLOADS GLOBAL STATE HELPERS ---
function subscribeToMediaUploads(callback) {
  const colRef = collection(db, getEventPath("media_uploads"));
  return onSnapshot(colRef, (snapshot) => {
    const uploads = [];
    snapshot.forEach(docSnap => {
      uploads.push({ id: docSnap.id, ...docSnap.data() });
    });
    callback(uploads);
  }, (err) => console.error("[Firebase DB] Media uploads sync error:", err));
}

async function recordMediaUploadInDb(fileMeta) {
  try {
    const docId = fileMeta.name ? fileMeta.name.replace(/[^a-zA-Z0-9_\-]/g, '_') : `file-${Date.now()}`;
    const docRef = doc(db, getEventPath("media_uploads"), docId);
    await setDoc(docRef, {
      ...fileMeta,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error("Error recording media upload:", err);
  }
}

// --- CONTESTANT GLOBAL STATE HELPERS ---
function subscribeToContestants(callback) {
  const colRef = collection(db, getEventPath("contestants"));
  return onSnapshot(colRef, (snapshot) => {
    const contestants = [];
    snapshot.forEach(docSnap => {
      contestants.push({ id: docSnap.id, ...docSnap.data() });
    });
    callback(contestants);
  }, (err) => console.error("[Firebase DB] Contestants sync error:", err));
}

async function addContestantToDb(contestantData) {
  try {
    const contestantId = contestantData.id || `c-${Date.now()}`;
    const docRef = doc(db, getEventPath("contestants"), contestantId);
    await setDoc(docRef, {
      ...contestantData,
      id: contestantId,
      createdAt: serverTimestamp()
    }, { merge: true });
    return { success: true, id: contestantId };
  } catch (err) {
    console.error("Error adding contestant:", err);
    return { success: false, error: err.message };
  }
}

async function updateContestantInDb(contestantId, updateData) {
  try {
    const docRef = doc(db, getEventPath("contestants"), contestantId);
    await updateDoc(docRef, updateData);
    return { success: true };
  } catch (err) {
    console.error("Error updating contestant:", err);
    return { success: false, error: err.message };
  }
}

// --- RUNSHEET GLOBAL STATE HELPERS ---
function subscribeToRunsheet(eventId, callback) {
  const colRef = collection(db, `events/${eventId}/runsheet`);
  return onSnapshot(colRef, (snapshot) => {
    const cues = [];
    snapshot.forEach(docSnap => {
      cues.push({ id: docSnap.id, ...docSnap.data() });
    });
    callback(cues);
  }, (err) => console.error("[Firebase DB] Runsheet sync error:", err));
}

async function updateRunsheetCue(eventId, cueId, updateData) {
  try {
    const docRef = doc(db, `events/${eventId}/runsheet`, cueId);
    await setDoc(docRef, updateData, { merge: true });
    return { success: true };
  } catch (err) {
    console.error("Error updating cue:", err);
    return { success: false, error: err.message };
  }
}

// --- FINANCE GLOBAL STATE HELPERS ---
function subscribeToFinance(eventId, callback) {
  const colRef = collection(db, `events/${eventId}/finance`);
  return onSnapshot(colRef, (snapshot) => {
    const transactions = [];
    snapshot.forEach(docSnap => {
      transactions.push({ id: docSnap.id, ...docSnap.data() });
    });
    callback(transactions);
  }, (err) => console.error("[Firebase DB] Finance sync error:", err));
}

async function addFinanceTransaction(eventId, transactionData) {
  try {
    const docRef = doc(collection(db, `events/${eventId}/finance`));
    await setDoc(docRef, {
      ...transactionData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("Error adding transaction:", err);
    return { success: false, error: err.message };
  }
}

// Expose Firebase and methods to window for classic JS app
window.REFA_FIREBASE = {
  db,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  getEvent,
  listEvents,
  saveEvent,
  seedTasksIfEmpty,
  seedTeamsIfEmpty,
  subscribeToTasks,
  updateTaskInDb,
  validatePassKey,
  subscribeToTeams,
  addTeamToDb,
  deleteTeamFromDb,
  subscribeToContentSchedule,
  addContentScheduleToDb,
  deleteContentScheduleFromDb,
  subscribeToMediaUploads,
  recordMediaUploadInDb,
  subscribeToContestants,
  addContestantToDb,
  updateContestantInDb,
  subscribeToRunsheet,
  updateRunsheetCue,
  subscribeToFinance,
  addFinanceTransaction
};

// Dispatch event so app.js knows Firebase is ready
window.dispatchEvent(new Event("firebase-ready"));
