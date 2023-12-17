// Ref:  https://firebase.google.com/docs/reference/js/database.md#database_package
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfigMyAgenda = {
  apiKey: "AIzaSyAfdioe9GSyuyEYM6ED0vrPJ7V96v1gxbM",
  authDomain: "myagenda-e7d9b.firebaseapp.com",
  databaseURL: "https://myagenda-e7d9b.firebaseio.com",
  projectId: "myagenda-e7d9b",
  storageBucket: "myagenda-e7d9b.appspot.com",
  messagingSenderId: "666626362463",
  appId: "1:666626362463:web:9ecbebb09ad03875979fea"
};

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

const analytics = getAnalytics(app);

// Auth:
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
export const auth = getAuth(app);
auth.languageCode = 'it';

// DB:
export const db = getFirestore(app);
export default db;
