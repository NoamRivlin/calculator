import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  // TODO: display preview of the calculation and the process of the calculation after the user clicks the equal sign

  // State to store the input value
  const [input, setInput] = useState<string>("");
  // Array of digits and decimal point to be displayed as buttons
  // Includes both numbers and string representation of the decimal point (".")
  const DIGITS: (number | string)[] = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
  const OPERATORS: string[] = ["+", "-", "*", "/"];

  // TODO prevent multiple decimel points - 2.2.2
  const handleDigitClick = (digit: number | string) => {
    // Ignore consecutive decimal points or decimal point at the beginning of input
    // check input with regex /\d$/gm to see if the last character is a digit
    if (digit === "." && (!/\d$/gm.test(input) || /\d\.\d+$/gm.test(input))) {
      return;
    }

    setInput(input + digit);
  };

  const handleOperatorClick = (operator: string) => {
    if (operator === "/" || operator === "*") {
      setInput(input.replace(/\*|\/$/gm, operator));
      if (/\d$/gm.test(input)) setInput(input + operator);
    }

    if (operator === "-" || operator === "+") {
      if (!/\.$/gm.test(input)) setInput(input + operator);
    }
  };

  const handleClearEntry = () => {
    // if input is different than a number, clear the input
    if (isNaN(parseInt(input))) {
      setInput("");
    } else {
      // Remove the last character from the input
      setInput(input.slice(0, -1));
    }
  };

  const handleCalculate = () => {
    try {
      // Remove leading zeros from decimal numbers
      // Convert each number (including decimals) in the input to its string representation without leading zeros
      // For example, "01.23" becomes "1.23"
      let sanitizedInput = input.replace(/(\d+(\.\d+)?)/g, (match) =>
        parseFloat(match).toString()
      );
      // Replace consecutive "--" with "+"
      sanitizedInput = sanitizedInput.replace("--", "+");

      const calculatedResult = eval(sanitizedInput);
      setInput(calculatedResult.toString());
    } catch (error: any) {
      setInput(error);
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
