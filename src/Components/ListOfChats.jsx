import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { initializeApp } from "firebase/app";
import AutoSizer from "react-virtualized-auto-sizer";

import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
  addDoc ,
} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore"
import {
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  FormGroup,
} from "@mui/material";
import {db} from "./firebase"

export default function VirtualizedList(props) {
  const[user,setUser]=useState(null);
  const{account}=props;
  console.log("Users/"+"0X8B66676696E61EE8748E30AA5A07D18BAD0810D8"+"/Chats");
  const call=collection(db,"Users/0X8B66676696E61EE8748E30AA5A07D18BAD0810D8/Chats");
  const [docs,loading,error] = useCollectionData(call);
  console.log(docs);

  const searchUser=async ()=> {
    const UsersData = collection(db, "Users");
    console.log("HOla1");
    const q = query(UsersData, where("Name", "==", user));
    console.log("HOla2");
    const querySnapshot = await getDocs(q);
    console.log("HOla3");
    if (querySnapshot.empty) {
      console.log("existe");
      await addDoc(collection(db, "Users/0X8B66676696E61EE8748E30AA5A07D18BAD0810D8/Chats"), {
        Wallet: user,
      });
      return true;
      
    } else {
      console.log("no existe");
      return false;
    }

  }
  function renderRow(props) {
    const { index, style } = props;
    console.log(docs[index])
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={docs[index].Wallet } />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "94vh",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
    >
      {loading ?(<></>):(
        <>
      <Typography variant="h3">{user}</Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <TextField
            id="outlined"
            label="UserName"
            variant="outlined"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" size="large" onClick={searchUser}>
            Search
          </Button>
        </Grid>
      </Grid>
      <AutoSizer>
      {({ height, width }) => (
      <FixedSizeList
        height={height}
        width={width}
        itemSize={50}
        itemCount={docs.length}
        overscanCount={10}
      >
        {renderRow}
      </FixedSizeList>
      )}
      </AutoSizer>
      </>)}
    </Box>
  );
}
