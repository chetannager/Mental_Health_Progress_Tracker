import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAenhA7sWWFo0YQO7bkCMZyUSRpwb0pIzE",
  authDomain: "mental-health-progress-tracker.firebaseapp.com",
  projectId: "mental-health-progress-tracker",
  storageBucket: "mental-health-progress-tracker.appspot.com",
  messagingSenderId: "789897103616",
  appId: "1:789897103616:web:98371501b2a260913d0be5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
