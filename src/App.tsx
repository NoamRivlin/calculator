import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  // State to store the input value
  const [input, setInput] = useState<string>("");
  // Array of digits and decimal point to be displayed as buttons
  // Includes both numbers and string representation of the decimal point (".")
  const DIGITS: (number | string)[] = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const OPERATORS: string[] = ["+", "-", "*", "/"];

  const handleDigitClick = (digit: number | string) => {
    setInput(input + digit);
  };

  const handleOperatorClick = (operator: string) => {
    // Preventing consecutive operators that could break the calculation
    const lastCharacter = input.slice(-1);
    const isLastCharacterOperator = OPERATORS.includes(lastCharacter);
    if (
      !isLastCharacterOperator ||
      (isLastCharacterOperator && (operator === "-" || operator === "+"))
    ) {
      setInput(input + operator);
    }
  };

  const handleClearEntry = () => {
    if (input === "Infinity" || input === "-Infinity" || input === "NaN") {
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
          }}
          value={input}
          InputProps={{
            readOnly: true,
          }}
        />
        <div className="pad">
          <div className="clears">
            <Button variant="contained" onClick={() => setInput("")}>
              C
            </Button>
            <Button variant="contained" onClick={handleClearEntry}>
              CE
            </Button>
          </div>
          <div className="digits">
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
