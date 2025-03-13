import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCclvmsLtOHhx1h2un3xVwg9w5clhXNG2M",
  authDomain: "practica10032025.firebaseapp.com",
  projectId: "practica10032025",
  storageBucket: "practica10032025.firebasestorage.app",
  messagingSenderId: "544140760774",
  appId: "1:544140760774:web:95565abf83c9ea3033e9c7",
  measurementId: "G-8DMWCFBHG1"
};

// Inicializar Firebase
const appfirebase = initializeApp(firebaseConfig);

const db = getFirestore(appfirebase);
const auth = getAuth(appfirebase);

export { appfirebase, db, auth };
