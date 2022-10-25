import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";


export default class DatabaseConnection{
   constructor(){
    this.firebaseConfig = {
      apiKey: "AIzaSyBtdpW3nwEsn3YtHsXPqHWRqbbXtIxopw4",
      authDomain: "cryptochat-d151f.firebaseapp.com",
      projectId: "cryptochat-d151f",
      storageBucket: "cryptochat-d151f.appspot.com",
      messagingSenderId: "330745028140",
      appId: "1:330745028140:web:aa78d74db7afe83f82bb89",
      measurementId: "G-9WSP7EY9F0",
    };
     this.app = initializeApp(firebaseConfig);
     this.db = getFirestore(app);
     this.state={
      provider:null,
      account:null,
      exist:false,
      user:null
     }
   }

  initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("good");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      this.state.provider=tempProvider;
      console.log(provider);
      this.state.account=accounts[0];
      await getUser(accounts[0]);
    } else {
      console.log("install metamask");
    }
  };
    async Register(){
    console.log("HOla")
    let exist= await searchUser();
    console.log(exist.toString())
    if (exist && user !=null) {
      await setDoc(doc(db, "Users", account.toString().toUpperCase()), {
        Name: user,
      });
      this.state.exist=true;
    }
  }
   async  searchUser() {
    const UsersData = collection(db, "Users");
    console.log("HOla1")
    const q = query(UsersData, where("Name", "==", user));
    console.log("HOla2")
    const querySnapshot = await getDocs(q);
    console.log("HOla3")
    if (querySnapshot.empty) {
      console.log("Noexiste");
      return true;
    } else {
      console.log(" existe");
      return false;
    }
  }
  async  getUser(account) {
    console.log("Account:" + account.toUpperCase());
    console.log("Necesario:" + "0x8B66676696E61EE8748e30AA5a07D18BaD0810D8");
    const docRef = doc(db, "Users", account.toString().toUpperCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.state.exist=true;
      console.log("Document data:", docSnap.data().Name);
      this.state.user=docSnap.data().Name;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
}
