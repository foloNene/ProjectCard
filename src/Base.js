import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyALN12lHfi_nFSYPRbXroKJ-P04ZW2tUEM",
  authDomain: "fir-project-be53c.firebaseapp.com",
  projectId: "fir-project-be53c",
  storageBucket: "fir-project-be53c.appspot.com",
  messagingSenderId: "602643731304",
  appId: "1:602643731304:web:84d011518d2fdefe0abcdd",
  measurementId: "G-3WLKM80R9W"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);