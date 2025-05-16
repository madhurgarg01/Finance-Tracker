// src/firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// If you plan to use Firebase Analytics, you can keep this import:
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// IMPORTANT: For better security, consider moving these to environment variables
// as discussed previously (e.g., VITE_FIREBASE_API_KEY in a .env file).
const firebaseConfig = {
  apiKey: "AIzaSyCi7wDm9pWe4VPeTw7CNU6XE5rGyPvLwrs",
  authDomain: "my-finance-dashboard-madhur.firebaseapp.com",
  projectId: "my-finance-dashboard-madhur",
  storageBucket: "my-finance-dashboard-madhur.appspot.com", // Please verify this ends with .appspot.com from your Firebase project settings
  messagingSenderId: "951842247792",
  appId: "1:951842247792:web:e529c9694eff454d2290b5",
  measurementId: "G-L90KNCQ3MJ" // This is for Firebase Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// If you plan to use Firebase Analytics, you can initialize it like this:
// const analytics = getAnalytics(app);
// You can then export 'analytics' if needed by other parts of your app.