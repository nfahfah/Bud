// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK3B0yTYtruT5iXnDSyCNnAV47GrGgd8M",
  authDomain: "bud-app-2815a.firebaseapp.com",
  projectId: "bud-app-2815a",
  storageBucket: "bud-app-2815a.appspot.com",
  messagingSenderId: "204447060780",
  appId: "1:204447060780:web:66c5c8658ceb1638ce9289",
  measurementId: "G-Z3EB0DR0LJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export auth and db so other files can use them
export const auth = getAuth(app);
export const db = getFirestore(app);



