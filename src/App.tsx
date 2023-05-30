import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const DIGITS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const OPERATORS = ["+", "-", "*", "/"];
  const handleDigitClick = (digit) => {
    setInput(input + digit);
  };
  const handleOperatorClick = (operator) => {
    // Check if the last input character is an operator other than *
    const lastCharacter = input.slice(-1);
    if (lastCharacter === "*" || lastCharacter === "/") {
      // Replace the last operator with the new operator
      setInput(input.slice(0, -1) + operator);
    } else {
      setInput(input + operator);
    }
  };

  const handleClearEntry = () => {
    if (input === "Infinity" || input === "-Infinity") {
      setInput("");
    } else {
      setInput(input.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    try {
      let sanitizedInput = input.replace(/(\d+(\.\d+)?)/g, (match) =>
        parseFloat(match).toString()
      ); // Remove leading zeros from decimal numbers
      sanitizedInput = sanitizedInput.replace("--", "+"); // Replace consecutive "--" with "+"
      const calculatedResult = eval(sanitizedInput);
      setInput(calculatedResult.toString());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1> Calculator </h1>
      <main id="container">
        <TextField
          className="display"
          style={{
            backgroundColor: "silver",
            width: "300px",
            height: "45px",
            // marginBottom: "10px",
          }}
          // label="Display"
          value={input}
          InputProps={{
            readOnly: true,
          }}
          // variant="filled"
        />
        <div className="pad">
          <div className="clears">
            <Button variant="contained" onClick={() => setInput("")}>
              C
            </Button>
            <Button variant="contained" onClick={() => handleClearEntry()}>
              CE
            </Button>
          </div>
          {/* <Button variant="contained" onClick={() => setInput("")}>
            C
          </Button>
          <Button variant="contained" onClick={() => handleClearEntry()}>
            CE
          </Button> */}
          <div className="digits">
            {/* Digit Buttons */}
            {DIGITS.map((digit) => (
              <Button
                key={digit}
                variant="contained"
                onClick={() => handleDigitClick(digit)}>
                {digit}
              </Button>
            ))}
            <Button variant="contained" onClick={() => handleDigitClick(".")}>
              .
            </Button>
            <Button variant="contained" onClick={() => handleCalculate()}>
              =
            </Button>
          </div>
          <div className="operators">
            {/* Operator Buttons */}
            {OPERATORS.map((operator, index) => (
              <Button
                key={index}
                variant="contained"
                onClick={() => handleOperatorClick(operator)}>
                {operator}
              </Button>
            ))}
          </div>
          {/* Clear Button */}
        </div>
      </main>
    </>
  );
}

export default App;
