import { Typography } from "@mui/material";
import React from "react";
import ListOfChats from "./ListOfChats"
export default function Home(props){
    const {account}=props;
return(

    <ListOfChats account={account}/>
)
}