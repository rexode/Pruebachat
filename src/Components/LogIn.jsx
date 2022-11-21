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


export default function LogIn(props) {
  
  const {initConnection,Register,account,setUser,user,logged,exist}=props
  

  

  


  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh", minWidth: "400" }}
    >
      <Grid item xs={10}>
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
                <Typography variant="h3">Loading</Typography>
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
                      setUser(e.target.value);
                    }}
                  />
                  <Button onClick={Register}>
                    <Typography>Register</Typography>
                  </Button>
                </Grid>
              )}
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
