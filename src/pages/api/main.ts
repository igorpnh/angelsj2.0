import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJmmD_0RwACeox8xupgoH26s3frrqU674",
  authDomain: "angelsj-72f7d.firebaseapp.com",
  projectId: "angelsj-72f7d",
  storageBucket: "angelsj-72f7d.appspot.com",
  messagingSenderId: "965814493501",
  appId: "1:965814493501:web:85edec528dccb0488c2554",
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
