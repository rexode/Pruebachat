// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {firestore, getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBtdpW3nwEsn3YtHsXPqHWRqbbXtIxopw4",
  authDomain: "cryptochat-d151f.firebaseapp.com",
  projectId: "cryptochat-d151f",
  storageBucket: "cryptochat-d151f.appspot.com",
  messagingSenderId: "330745028140",
  appId: "1:330745028140:web:aa78d74db7afe83f82bb89",
  measurementId: "G-9WSP7EY9F0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);