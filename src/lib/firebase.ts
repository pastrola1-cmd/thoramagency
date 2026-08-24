import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDummyKeyForStaticBuild12345678",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "thoramgroup-f2e76.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "thoramgroup-f2e76",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "thoramgroup-f2e76.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:1234567890abcdef",
};

// Initialize Firebase (safeguard against multiple initializations in Next.js hot reload)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: any;
let db: any;

try {
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase Auth/Firestore fallback mode during build:", e);
}

export { app, auth, db };
