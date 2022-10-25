import React from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormGroup,
} from "@mui/material";
import { DatabaseConnection } from "../Controller/Database";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
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
import {Link} from "react-router-dom";
import { recoverPersonalSignature } from '@metamask/eth-sig-util';


export default function (props) {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [exist, setExist] = useState(false);
  const [user, setUser] = useState(null);


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
  const auth = getAuth();



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
      let newNonce=await getNonceToSign;
      let signature=await ethereum.request({
        method: 'personal_sign',
        params: [
          `0x${this.toHex(newNonce)}`,
          account,
        ],
      })
      let token=await verifySignedMessage(signature);
      let authorization=await signInWithCustomToken(auth, token).then((userCredential) => {
        const user = userCredential.user;
      })




    } else {
      console.log("install metamask");
    }
  };
    async function Register(nonce ){
    console.log("HOla")
    let exist= await searchUser();
    console.log(exist.toString())
    if (exist && user !=null) {
      await setDoc(doc(db, "Users", account.toString().toUpperCase()), {
        Name: user,
        Nonce:nonce
      });
      this.state.exist=true;
    }
  }
   async function searchUser() {
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
  async function getUser(account) {
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
    async function getNonceToSign(){
      // Get the user document for that address
      const docRef = doc(db, "Users", account.toString().toUpperCase());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // The user document exists already, so just return the nonce
        const existingNonce = docSnap.data()?.Nonce;
        return existingNonce;
      } else {
        // The user document does not exist, create it first
        const generatedNonce = Math.floor(Math.random() * 1000000).toString();
        // Create an Auth user
        await Register(existingNonce);
        // Associate the nonce with that user
        return generatedNonce ;
      }
  }
   async function verifySignedMessage(signature){ 
          const sig = signature;
          // Get the nonce for this address
          const docRef = doc(db, "Users", account.toString().toUpperCase());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists) {
            const existingNonce = docSnap.data()?.Nonce;
            // Recover the address of the account used to create the given Ethereum signature.
            const recoveredAddress = recoverPersonalSignature({
              data: `0x${toHex(existingNonce)}`,
              signature: sig,
            });
            // See if that matches the address the user is claiming the signature is from
            if (recoveredAddress === address) {
              // The signature was verified - update the nonce to prevent replay attacks
              // update nonce
              await userDocRef.update({
                nonce: Math.floor(Math.random() * 1000000).toString(),
              });
              // Create a custom token for the specified address
              const firebaseToken = await admin.auth().createCustomToken(address);
              // Return the token
              return response.status(200).json({ token: firebaseToken });
            } else {
              // The signature could not be verified
              return response.sendStatus(401);
            }
          } 
        } 
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 400,
        height: 400,
        background: "linear-gradient(to bottom, #48cae4, #caf0f8)",
        borderRadius: 10,
      }}
    >
      {account == null ? (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Grid item>
            <Typography>Please Log-in with the account</Typography>
          </Grid>
          <Grid item>
            <Button
              disableElevation
              sx={{ color: "black" }}
              onClick={initConnection}
            >
              <Typography fontSize={16}>Log-in</Typography>
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>
          {Database.state.exist ? (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item>
                <Typography variant>
                  ...{Database.state.account.substring(account.length - 7)}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3">{user}</Typography>
              </Grid>
            </Grid>
          ) : (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item>
                <Typography variant="h5">
                  Please Register with a Username
                </Typography>
              </Grid>
              <TextField
                id="outlined"
                label="UserName"
                variant="outlined"
                onChange={(e) => {
                  Database.state.user=e.target.value;
                }}
              />
              <Button onClick={Database.Register()}>
                <Typography>Register</Typography>
              </Button>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
}
