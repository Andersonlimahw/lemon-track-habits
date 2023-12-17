// Ref:  https://firebase.google.com/docs/reference/js/database.md#database_package
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCZ_wOBFY9DaJ2SOYv1PtARRGWTsceZS7c",
  authDomain: "lemon-dev-f1a67.firebaseapp.com",
  projectId: "lemon-dev-f1a67",
  storageBucket: "lemon-dev-f1a67.appspot.com",
  messagingSenderId: "1098455032155",
  appId: "1:1098455032155:web:885df307e510272a31ba7e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth:
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
auth.languageCode = 'it';

// DB:
export const db = getFirestore(app);
export default db;
