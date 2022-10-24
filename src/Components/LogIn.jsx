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

export default function (props) {
  const Database= new DatabaseConnection();

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
