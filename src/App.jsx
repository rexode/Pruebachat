import "./App.css";
import React, { useRef} from "react";
import { Typography, TextField, Button,Box,Grid } from "@mui/material";
import LogIn from "./Components/LogIn";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Redirect,
  useNavigate,
  Routes
} from "react-router-dom";
import Home from "./Components/Home.jsx";
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
  updateDoc 
} from "firebase/firestore";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import {db} from "./firebase"


function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [exist, setExist] = useState(false);
  const [user, setUser] = useState(null);
  const [logged, setLogged] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  

const initConnection = async () => {
  if (typeof window.ethereum !== "undefined") {
    console.log("good");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);
    console.log(provider);
    
    console.log(accounts[0]);
    let exist = await getUser(accounts[0]);
    setAccount(accounts[0].toUpperCase());
    setExist(exist);
    console.log("existe: "+exist)
    if (exist) {
      console.log("existe: "+exist)
      let newNonce = await getNonceToSign(accounts[0]);
      console.log("nonce: "+newNonce);
      let signature = await window.ethereum.request({
        method: "personal_sign",
        params: [`0x${toHex(newNonce)}`, accounts[0]],
      });
      let token = await verifySignedMessage(accounts[0], signature);
    }else{
      
    }
  } else {
    console.log("install metamask");
  }
};
async function Register() {
  let exist = await searchUser();

  if (exist && user != null) {
    let newNonce = await getNonceToSign(account);
    console.log(newNonce);
    let signature = await window.ethereum.request({
      method: "personal_sign",
      params: [`0x${toHex(newNonce)}`, account],
    });
    await setDoc(doc(db, "Users", account.toUpperCase()), {
      Name: user,
      Nonce: newNonce,
    });
    
    let token = await verifySignedMessage(account, signature);
    if (token) {
      setLogged(true);
      console.log("algo va mal");
      navigateToHome();
    }
  }
}
async function searchUser() {
  const UsersData = collection(db, "Users");
  console.log("HOla1");
  const q = query(UsersData, where("Name", "==", user));
  console.log("HOla2");
  const querySnapshot = await getDocs(q);
  console.log("HOla3");
  if (querySnapshot.empty) {
    console.log("Noexiste");
    return true;
  } else {
    console.log(" existe");
    return false;
  }
}
async function getUser(account) {
  console.log("Account:" + account.toUpperCase());
  console.log("Necesario:" + "0x8B66676696E61EE8748e30AA5a07D18BaD0810D8");
  const docRef = doc(db, "Users", account.toString().toUpperCase());
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    setExist(true);
    console.log("Document data:", docSnap.data().Name);
    setUser(docSnap.data().Name);
    return true;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
}
async function getNonceToSign(account) {
  // Get the user document for that address
  const docRef = doc(db, "Users", account.toUpperCase());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // The user document exists already, so just return the nonce
    const existingNonce = docSnap.data()?.Nonce;
    return existingNonce;
  } else {
    // The user document does not exist, create it first
    console.log("no existe el nonce");
    const generatedNonce = Math.floor(Math.random() * 1000000).toString();
    // Create an Auth user
    // Associate the nonce with that user
    return generatedNonce;
  }
}
async function verifySignedMessage(account, signature) {
  const sig = signature;
  // Get the nonce for this address
  const docRef = doc(db, "Users", account.toUpperCase());
  const docSnap = await getDoc(docRef);
  console.log(docSnap.value);
  if (docSnap.exists) {
    const existingNonce = docSnap.data()?.Nonce;
    console.log(existingNonce);
    // Recover the address of the account used to create the given Ethereum signature.
    const recoveredAddress = recoverPersonalSignature({
      data: `0x${toHex(existingNonce)}`,
      signature: sig,
    });
    console.log(recoveredAddress)
    // See if that matches the address the user is claiming the signature is from
    if (recoveredAddress === account) {
      // The signature was verified - update the nonce to prevent replay attacks
      // update nonce
      
      await updateDoc(docRef,{
        Nonce: Math.floor(Math.random() * 1000000).toString(),
      });
      // Return the token
      navigateToHome();
      setLogged(true);
      return true;
    } else {
      // The signature could not be verified
      return false;
    }
  }
}
function toHex(str) {
  var result = '';
  for (var i=0; i<str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result;
}

const navigateToHome = () => {
    // 👇️ navigate to /contacts
    console.log(account);
    navigate("/Home");
  };

  return (
    <>
      <Switch>
        <Route exact path="/" element={<LogIn navigateToHome={navigateToHome} initConnection={initConnection} Register={Register} provider={provider} account={account} exist={exist} user={user} logged={logged} setUser={setUser}/>}/>          
        <Route path="/Home" element={<Home account={account}/>}/>
      </Switch>
      </>
  );
}

export default App;
