import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  return (
    <>
      <h1> Calculator </h1>
    </>
  );
}

export default App;
