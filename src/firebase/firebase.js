"use client"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "resume-builder-zenmonk.firebaseapp.com",
  projectId: "resume-builder-zenmonk",
  storageBucket: "resume-builder-zenmonk.firebasestorage.app",
  messagingSenderId: "227409265218",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-9S3DSNJR76"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;