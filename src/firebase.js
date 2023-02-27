import { initializeApp } from "firebase/app";
import { getFirestore , collection} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdk2i0h-sLBfLEEgcSovjOZuxCqDzk7qA",
  authDomain: "face-rec-52d87.firebaseapp.com",
  projectId: "face-rec-52d87",
  storageBucket: "face-rec-52d87.appspot.com",
  messagingSenderId: "586478425779",
  appId: "1:586478425779:web:f432429cc7043af96802c6",
  measurementId: "G-Q4NE7HSGN1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const db = collection(firestore, "users");