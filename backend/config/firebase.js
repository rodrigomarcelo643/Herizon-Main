import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDubzF7Zm037JqfrH7UgmGcbnq6dXsy7ak",
  authDomain: "herizon-373ff.firebaseapp.com",
  projectId: "herizon-373ff",
  storageBucket: "herizon-373ff.firebasestorage.app",
  messagingSenderId: "975904870539",
  appId: "1:975904870539:web:0e11a35f9806f1c963448e",
  measurementId: "G-J3F8SZPJXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);



export { app, auth, db, storage};
