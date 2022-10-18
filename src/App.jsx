import "./App.css";
import React, { useRef} from "react";
import { Typography, TextField, Button,Box,Grid } from "@mui/material";
import LogIn from "./LogIn";
import { ethers } from "ethers";
import { useEffect, useState } from "react";


function App() {
const [account, setAccount] = useState(null);
const [provider, setProvider] = useState(null);

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
    } else {
      console.log("install metamask");
    }
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" ,minWidth:"400"}}
    >
      <Grid item xs={10}>
        <LogIn initConnection={initConnection} account={account} />
      </Grid>
    </Grid>
  );
}

export default App;
