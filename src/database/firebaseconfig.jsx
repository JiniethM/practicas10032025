import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ NUEVO

const firebaseConfig = {
  apiKey: "AIzaSyCclvmsLtOHhx1h2un3xVwg9w5clhXNG2M",
  authDomain: "practica10032025.firebaseapp.com",
  projectId: "practica10032025",
  storageBucket: "practica10032025.appspot.com", // ⚠️ CORREGIDO aquí también
  messagingSenderId: "544140760774",
  appId: "1:544140760774:web:95565abf83c9ea3033e9c7",
  measurementId: "G-8DMWCFBHG1"
};

const appfirebase = initializeApp(firebaseConfig);

const db = getFirestore(appfirebase);
const auth = getAuth(appfirebase);
const storage = getStorage(appfirebase); // ✅ NUEVO

export { appfirebase, db, auth, storage };
