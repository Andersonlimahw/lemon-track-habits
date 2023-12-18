// Ref:  https://firebase.google.com/docs/reference/js/database.md#database_package
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmXJzByvnMcnyXioWDkErSfzrQeLU7xLo",
  authDomain: "myapp-8c22b.firebaseapp.com",
  databaseURL: "https://myapp-8c22b.firebaseio.com",
  projectId: "myapp-8c22b",
  storageBucket: "myapp-8c22b.appspot.com",
  messagingSenderId: "641320460003",
  appId: "1:641320460003:web:9723032d80cadfcead2fd6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth:
export const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const auth = getAuth(app);
auth.useDeviceLanguage();
export const analytics = getAnalytics(app);

// DB:
export const db = getFirestore(app);
export default db;
