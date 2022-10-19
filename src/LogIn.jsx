import React from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormGroup,
} from "@mui/material";
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
} from "firebase/firestore";

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

  const initConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("good");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      console.log(provider);
      setAccount(accounts[0]);
      await getUser(db, accounts[0]);
    } else {
      console.log("install metamask");
    }
  };
  async function Register(db, name) {
    if (searchUser(name)) {
      await setDoc(doc(db, "Users", account.toString().toUpperCase()), {
        Name: name,
      });
    }
  }
  async function searchUser(userName) {
    const q = query(db, where("Name", "==", userName));
    if (q.exist()) {
      return false;
    } else {
      return true;
    }
  }
  async function getUser(db, account) {
    console.log("Account:" + account.toUpperCase());
    console.log("Necesario:" + "0x8B66676696E61EE8748e30AA5a07D18BaD0810D8");
    const docRef = doc(db, "Users", account.toString().toUpperCase());
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setExist(true);
      console.log("Document data:", docSnap.data().Name);
      setUser(docSnap.data().Name);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
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
          {exist ? (
            <Grid
              container
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item>
                <Typography variant>
                  ...{account.substring(account.length - 7)}
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
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <Button>
                <Typography>Register</Typography>
              </Button>
            </Grid>
          )}
        </>
      )}
    </Box>
  );
}
