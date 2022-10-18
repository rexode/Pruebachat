import React from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";


export default function(props){
  const { initConnection, account } = props;
  const [provider, setProvider] = useState(null);
return (
  <Box display="flex" alignItems="center" justifyContent="center" sx={{width:400,height:400, backgroundColor:"blue",borderRadius:10}}>
    {account == null ? (
      <Button disableElevation sx={{ color: "black" }} onClick={initConnection}>
        <Typography fontSize={16}>Log-in</Typography>
      </Button>
    ) : (
      <Typography variant>...{account.substring(account.length - 7)}</Typography>
    )}
  </Box>
);
}