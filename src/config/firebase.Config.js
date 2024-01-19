import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX0V3gh7cNEiiAjQCJxHuyigsfyLfATt8",
  authDomain: "vite-todo-app-f079c.firebaseapp.com",
  projectId: "vite-todo-app-f079c",
  storageBucket: "vite-todo-app-f079c.appspot.com",
  messagingSenderId: "428731022046",
  appId: "1:428731022046:web:0a99db04aefdac2b8c604f",
  measurementId: "G-LEE2GVFRG4",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
