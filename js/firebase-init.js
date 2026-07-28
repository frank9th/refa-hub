import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getFirestore, 
  enableIndexedDbPersistence, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  getDocs,
  writeBatch,
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
 * Seed all initial tasks into Firestore if the tasks collection is empty.
 * @param {Array} phases - Array of phase objects containing task definitions.
 */
async function seedTasksIfEmpty(phases) {
  try {
    const tasksColRef = collection(db, "tasks");
    const snapshot = await getDocs(tasksColRef);
    if (!snapshot.empty) {
      console.log(`[Firebase DB] Tasks collection already contains ${snapshot.size} documents. Skipping seed.`);
      return false;
    }

    console.log("[Firebase DB] Tasks collection is empty. Seeding initial REFA tasks to global DB...");
    const batch = writeBatch(db);

    let count = 0;
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
        count++;
      });
    });

    await batch.commit();
    console.log(`[Firebase DB] Successfully seeded ${count} tasks to global Cloud Firestore database.`);
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
  signIn: (email, password) => signInWithEmailAndPassword(auth, email, password),
  signOut: () => signOut(auth),
  onAuthStateChanged: (callback) => onAuthStateChanged(auth, callback)
};

// Dispatch event so app.js knows Firebase is ready
window.dispatchEvent(new Event("firebase-ready"));
