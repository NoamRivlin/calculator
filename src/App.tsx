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

  const handleDigitClick = (digit: number | string) => {
    // check input with regex if the last character is a digit or a decimal point
    if (digit === "." && (!/\d$/gm.test(input) || /\d\.\d+$/gm.test(input))) {
      // Ignore the digit click if it's a decimal point and the input already ends with a decimal point
      // or if it ends with a digit followed by a decimal point
      return;
    }
    setInput(input + digit);
  };

  const handleOperatorClick = (operator: string) => {
    if (operator === "/" || operator === "*") {
      // if the last character of the input is multiplication or division
      // replace it with the new operator
      setInput(input.replace(/\*|\/$/gm, operator));
      // if the last character of the input is a digit, add the operator to the input
      if (/\d$/gm.test(input)) setInput(input + operator);
    }

    if (operator === "-" || operator === "+") {
      // if the last character of the input is a digit, add the operator to the input
      if (!/\.$/gm.test(input)) setInput(input + operator);
    }
  };

  const handleClearEntry = () => {
    // If the input is not a valid number, clear the input
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

      // Evaluate the sanitized input expression
      let calculatedResult = eval(sanitizedInput);
      // round the result to 4 decimal places
      calculatedResult = parseFloat(calculatedResult.toFixed(4));

      // Set the rounded result as the new input
      setInput(calculatedResult.toString());
    } catch (error: any) {
      // If an error occurs during evaluation, set the error message as the new input
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
