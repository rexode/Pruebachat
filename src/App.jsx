import "./App.css";
import React, { useRef} from "react";
import { Typography, TextField, Button,Box,Grid } from "@mui/material";
import LogIn from "./LogIn";
import { useEffect, useState } from "react";


function App() {
const [account, setAccount] = useState(null);
const [provider, setProvider] = useState(null);

  
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
        <LogIn  />
      </Grid>
    </Grid>
  );
}

export default App;
