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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

/**
 * Validate a Pass Key against Firestore.
 * Checks key active status, max usage limit, and records login.
 * @param {string} name - Name of member
 * @param {string} keyInput - Entered Pass Key
 * @returns {Promise<{success: boolean, message?: string, roleData?: object}>}
 */
async function validatePassKey(name, keyInput) {
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
    const tasksColRef = collection(db, "tasks");
    const snapshot = await getDocs(tasksColRef);
    if (!snapshot.empty) {
      return false;
    }

    const batch = writeBatch(db);
    phases.forEach(phase => {
      phase.tasks.forEach(t => {
        const taskDocRef = doc(db, "tasks", t.id);
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

/**
 * Subscribe to real-time task updates from Firestore.
 * @param {Function} callback - Callback function receiving an object of { taskId: boolean }.
 */
function subscribeToTasks(callback) {
  const tasksColRef = collection(db, "tasks");
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
    const taskDocRef = doc(db, "tasks", taskId);
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
  const colRef = collection(db, "teams");
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
    const docRef = doc(db, "teams", teamId);
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
    await deleteDoc(doc(db, "teams", teamId));
    return { success: true };
  } catch (err) {
    console.error("Error deleting team:", err);
    return { success: false, error: err.message };
  }
}

// --- CONTENT SCHEDULE GLOBAL STATE HELPERS ---
function subscribeToContentSchedule(callback) {
  const colRef = collection(db, "content_schedule");
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
    const docRef = doc(db, "content_schedule", itemId);
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
    await deleteDoc(doc(db, "content_schedule", itemId));
    return { success: true };
  } catch (err) {
    console.error("Error deleting content schedule item:", err);
    return { success: false, error: err.message };
  }
}

// --- MEDIA UPLOADS GLOBAL STATE HELPERS ---
function subscribeToMediaUploads(callback) {
  const colRef = collection(db, "media_uploads");
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
    const docRef = doc(db, "media_uploads", docId);
    await setDoc(docRef, {
      ...fileMeta,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.error("Error recording media upload:", err);
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
  seedTasksIfEmpty,
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
  signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback)
};

// Dispatch event so app.js knows Firebase is ready
window.dispatchEvent(new Event("firebase-ready"));
