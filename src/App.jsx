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
} from "react-router-dom";
import Home from "./Components/Home.jsx";

function App() {
const [account, setAccount] = useState(null);
const [provider, setProvider] = useState(null);
const navigate = useNavigate();

  const navigateToHome = () => {
    // 👇️ navigate to /contacts
    navigate("/Home");
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" element={<LogIn navigateToHome={navigateToHome}/>}/>          
        <Route path="/Home" element={<Home/>}/>
      </Switch>
    </Router>
  );
}

export default App;
