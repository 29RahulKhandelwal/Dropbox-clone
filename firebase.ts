import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKi7nNNSRVAZqk7Zznuq_ffRfetl4RtWo",
  authDomain: "nextjs-projects-b6f3a.firebaseapp.com",
  projectId: "nextjs-projects-b6f3a",
  storageBucket: "nextjs-projects-b6f3a.appspot.com",
  messagingSenderId: "843740297079",
  appId: "1:843740297079:web:6fc8fae74b666ee1c8d372",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
