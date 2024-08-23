// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfjsSZV8RZpEWwe_d5OeWkSEUkfGeRmDg",
  authDomain: "gig-portal.firebaseapp.com",
  projectId: "gig-portal",
  storageBucket: "gig-portal.appspot.com",
  messagingSenderId: "627738893989",
  appId: "1:627738893989:web:325f85bdcad581abd3f74c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
