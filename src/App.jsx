import "./App.css";
import React, { useRef} from "react";
import { Typography, TextField, Button } from "@mui/material";

function App() {
  const message=useRef();


  return (
    <div className="App">
      <TextField
        label="Outlined"
        variant="outlined"
        ref={message}
        type="text"
        onChange={(e) => this.handleTextFieldChange(e)}
      />
      <Button variant="outlined" type="submit">
        Enviar{" "}
      </Button>
    </div>
  );
}

export default App;
