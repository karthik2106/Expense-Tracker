// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKWonEk9i8UWFxtECWBA0bHG0HUc1BPEs",
  authDomain: "expense-tracker-8abb3.firebaseapp.com",
  projectId: "expense-tracker-8abb3",
  storageBucket: "expense-tracker-8abb3.appspot.com",
  messagingSenderId: "16303883414",
  appId: "1:16303883414:web:ced7f9c620e6368aca2eb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);

export const db = getFirestore(app);










// firebase login
// firebase init
