// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBtdpW3nwEsn3YtHsXPqHWRqbbXtIxopw4",
    authDomain: "cryptochat-d151f.firebaseapp.com",
    projectId: "cryptochat-d151f",
    storageBucket: "cryptochat-d151f.appspot.com",
    messagingSenderId: "330745028140",
    appId: "1:330745028140:web:aa78d74db7afe83f82bb89",
    measurementId: "G-9WSP7EY9F0",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

export { db };