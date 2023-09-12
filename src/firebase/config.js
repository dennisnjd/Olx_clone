import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore'; // Import getFirestore to access Firestore
import {getAuth} from 'firebase/auth';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAeMrAsciB7X69L5Wq2LtsQHXDSFtznNiw",
    authDomain: "fir-86aaf.firebaseapp.com",
    projectId: "fir-86aaf",
    storageBucket: "fir-86aaf.appspot.com",
    messagingSenderId: "282976672622",
    appId: "1:282976672622:web:56be31db809f7c81dcbf7f",
    measurementId: "G-HPM4PXFE4T"
  };

  const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app); // Use getFirestore to initialize Firestore

export const auth = getAuth(app);