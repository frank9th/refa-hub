import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  collection, 
  doc, 
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
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
const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn("Multiple tabs open, persistence can only be enabled in one tab at a time.");
  } else if (err.code == 'unimplemented') {
    console.warn("The current browser does not support all of the features required to enable persistence");
  }
});

// Sign in anonymously so all Firestore writes are authenticated.
// The app never requires the user to create an account — this is transparent.
signInAnonymously(auth).catch((err) => {
  console.warn("[Firebase Auth] Anonymous sign-in failed:", err.code);
});

/**
 * Returns the Firestore path for a sub-collection of the active event.
 * Throws if no active event has been resolved — no hardcoded fallback IDs.
 */
function getEventPath(subCol) {
  const event = window.REFA_EVENTS ? window.REFA_EVENTS.getActiveEvent() : null;
  if (!event || !event.id) {
    throw new Error('[Firebase] getEventPath() called before an active event was resolved. Ensure initEvent() has completed.');
  }
  return `events/${event.id}/${subCol}`;
}

// --- EVENT CONFIG CACHE ---
// Caches only the static event configuration document (name, dates, phases,
// categories, settings). NOT used for live data (votes, tasks, contestants
// etc.) — those already use efficient onSnapshot() real-time listeners.
const _eventMemCache = new Map();          // Tier 1: in-memory (tab lifetime)
const _LIST_CACHE_KEY = 'refa_events_list_cache';
const EVENT_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function _eventCacheKey(id) { return `refa_event_cache_${id}`; }

function _readEventCache(id) {
  // 1. Memory first — zero cost
  if (_eventMemCache.has(id)) return _eventMemCache.get(id);
  // 2. sessionStorage — survives page-to-page navigation in same tab
  try {
    const raw = sessionStorage.getItem(_eventCacheKey(id));
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < EVENT_CACHE_TTL_MS) {
      _eventMemCache.set(id, data); // warm memory tier
      return data;
    }
    sessionStorage.removeItem(_eventCacheKey(id)); // stale — evict
  } catch(e) {}
  return null;
}

function _writeEventCache(id, data) {
  _eventMemCache.set(id, data);
  try {
    sessionStorage.setItem(_eventCacheKey(id), JSON.stringify({ data, ts: Date.now() }));
  } catch(e) {}
}

function _readListCache() {
  if (_eventMemCache.has('__list__')) return _eventMemCache.get('__list__');
  try {
    const raw = sessionStorage.getItem(_LIST_CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < EVENT_CACHE_TTL_MS) {
      _eventMemCache.set('__list__', data);
      return data;
    }
    sessionStorage.removeItem(_LIST_CACHE_KEY);
  } catch(e) {}
  return null;
}

function _writeListCache(data) {
  _eventMemCache.set('__list__', data);
  try {
    sessionStorage.setItem(_LIST_CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch(e) {}
}

/**
 * Invalidate all cached data for a given event ID.
 * Called automatically by saveEvent() after a successful Firestore write.
 */
function _invalidateEventCache(id) {
  if (id) {
    _eventMemCache.delete(id);
    try { sessionStorage.removeItem(_eventCacheKey(id)); } catch(e) {}
  }
  // Always bust the list cache too — the event name/metadata may have changed
  _eventMemCache.delete('__list__');
  try { sessionStorage.removeItem(_LIST_CACHE_KEY); } catch(e) {}
}

// --- EVENTS CONFIG HELPERS ---
async function getEvent(eventId) {
  if (!eventId) {
    console.error('[Firebase] getEvent() called with no eventId.');
    return null;
  }
  // Serve from cache if fresh
  const cached = _readEventCache(eventId);
  if (cached) {
    console.debug(`[Firebase] getEvent('${eventId}') served from cache.`);
    return cached;
  }
  try {
    const docRef = doc(db, "events", eventId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = { id: docSnap.id, ...docSnap.data() };
      _writeEventCache(eventId, data);
      return data;
    }
    console.warn(`[Firebase] Event document '${eventId}' not found in Firestore.`);
    return null;
  } catch (err) {
    console.error("[Firebase] Error getting event:", err);
    return null;
  }
}

/**
 * Fetches the first available event from Firestore.
 * Tries the list cache first to avoid a full collection scan.
 */
async function getFirstEvent() {
  // Try list cache first — avoids a full collection scan
  const cachedList = _readListCache();
  if (cachedList && cachedList.length > 0) {
    console.debug('[Firebase] getFirstEvent() served from list cache.');
    return cachedList[0];
  }
  try {
    const colRef = collection(db, "events");
    const q = query(colRef, orderBy('createdAt', 'desc'), limit(1));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const data = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
      _writeEventCache(data.id, data);
      return data;
    }
    // Fallback: unordered scan if no createdAt field exists
    const fallbackSnap = await getDocs(colRef);
    if (!fallbackSnap.empty) {
      const data = { id: fallbackSnap.docs[0].id, ...fallbackSnap.docs[0].data() };
      _writeEventCache(data.id, data);
      return data;
    }
    return null;
  } catch (err) {
    console.error('[Firebase] Error fetching first event:', err);
    return null;
  }
}

async function listEvents() {
  // Serve from cache if fresh
  const cached = _readListCache();
  if (cached) {
    console.debug('[Firebase] listEvents() served from cache.');
    return cached;
  }
  try {
    const colRef = collection(db, "events");
    const snapshot = await getDocs(colRef);
    const events = [];
    snapshot.forEach(docSnap => {
      const data = { id: docSnap.id, ...docSnap.data() };
      events.push(data);
      // Warm individual event caches while we have the data
      _writeEventCache(data.id, data);
    });
    _writeListCache(events);
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
    // Invalidate cache so next read reflects the freshly saved data
    _invalidateEventCache(eventId);
    return { success: true, id: eventId };
  } catch (err) {
    console.error("Error saving event:", err);
    return { success: false, error: err.message };
  }
}

async function seedPasskeysForEvent(eventId) {
  try {
    const year = new Date().getFullYear();
    let prefix = eventId.split('-')[0].toUpperCase();
    if (prefix.length < 3 && eventId.split('-').length > 1) {
      prefix = (eventId.split('-')[0] + eventId.split('-')[1]).toUpperCase();
    }
    
    const passkeys = [
      {
        key: `${prefix}-ADMIN-${year}`,
        role: "admin",
        title: "Executive Admin",
        eventId: eventId,
        maxUses: 5,
        currentUses: 0,
        active: true,
        allowedPages: ["dashboard", "tasks", "strategy", "voting", "sponsors", "letters", "accounts", "media", "studio"]
      },
      {
        key: `${prefix}-MEDIA-${year}`,
        role: "media",
        title: "Media & Studio Lead",
        eventId: eventId,
        maxUses: 15,
        currentUses: 0,
        active: true,
        allowedPages: ["dashboard", "tasks", "media", "studio", "strategy"]
      },
      {
        key: `${prefix}-TEAM-${year}`,
        role: "ops",
        title: "Operations & Mentor",
        eventId: eventId,
        maxUses: 30,
        currentUses: 0,
        active: true,
        allowedPages: ["dashboard", "tasks", "voting", "strategy"]
      },
      {
        key: `${prefix}-GUEST-${year}`,
        role: "viewer",
        title: "Guest Visitor",
        eventId: eventId,
        maxUses: 100,
        currentUses: 0,
        active: true,
        allowedPages: ["dashboard"]
      }
    ];

    for (const pk of passkeys) {
      await setDoc(doc(db, "passkeys", pk.key), pk);
    }
    console.log(`[Firebase] Successfully seeded passkeys for event: ${eventId}`);
    return { success: true, passkeys };
  } catch (err) {
    console.error("Error seeding passkeys:", err);
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
      const keyEventId = data.eventId;
      // Only enforce event restriction if the key has an eventId field set
      if (keyEventId && keyEventId !== currentEventId) {
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
    return { success: false, message: 'Database connection error. Please check your connection and try again.' };
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
  auth,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  getEvent,
  getFirstEvent,
  listEvents,
  saveEvent,
  seedPasskeysForEvent,
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
