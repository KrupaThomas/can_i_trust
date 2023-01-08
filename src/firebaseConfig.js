
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSEGIN_SENDER_ID,
  appId: APP_ID.process.env.
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
