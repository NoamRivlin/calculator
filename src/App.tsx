import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  // State to store the input value
  const [input, setInput] = useState<string>("");
  // Array of digits and decimal point to be displayed as buttons
  // Includes both numbers and string representation of the decimal point (".")
  const DIGITS: (number | string)[] = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
  const OPERATORS: string[] = ["+", "-", "*", "/"];

  // TODO prevent multiple decimel points - 2.2.2
  const handleDigitClick = (digit: number | string) => {
    const lastCharacter = input.slice(-1);
    // Ignore consecutive decimal points or decimal point at the beginning of input
    if (
      (digit === "." && input === "") ||
      (digit === "." && lastCharacter === ".")
    ) {
      return;
    }

    setInput(input + digit);
  };

  const handleOperatorClick = (operator: string) => {
    // ignores division or multiplication operators if input is empty
    if (input === "" && (operator === "/" || operator === "*")) return;

    // Preventing consecutive operators that could break the calculation, eval doesn't support ** or //
    const lastCharacter = input.slice(-1);
    const isLastCharacterOperator = OPERATORS.includes(lastCharacter);
    // if the last character is not an operator or if the last character is an operator and the new operator is - or +
    if (
      !isLastCharacterOperator ||
      (isLastCharacterOperator && (operator === "-" || operator === "+"))
    ) {
      setInput(input + operator);
    }
  };

  const handleClearEntry = () => {
    // If the input is Infinity, -Infinity, or NaN, clear the input
    if (input === "Infinity" || input === "-Infinity" || input === "NaN") {
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

  // managed to ignore decimals after decimals - 2.2.2 + 2 will be calculated as 2.2+2
  // BUT fails on long calculations...
  // const handleCalculate = () => {
  //   // calculate ignores decimals after decimals - 2.2.2 + 2 will be calculated as 2.2+2
  //   try {
  //     // Split the input into separate numbers based on operators (+, -, *, /)
  //     const numbers = input.split(/[-+*/]/);

  //     // Convert each number in the input to its string representation without leading zeros
  //     const parsedNumbers = numbers.map((num) => {
  //       if (num.includes(".")) {
  //         // If the number contains a decimal point, remove leading zeros
  //         return parseFloat(num).toString();
  //       } else {
  //         // If the number is an integer, remove leading zeros
  //         return parseFloat(num).toString().replace(/^0+/, "");
  //       }
  //     });

  //     // Reconstruct the expression by combining the parsed numbers and operators
  //     let expression = "";
  //     for (let i = 0; i < parsedNumbers.length; i++) {
  //       expression += parsedNumbers[i];
  //       if (i < numbers.length - 1) {
  //         // Append the operator based on the length of the current number
  //         expression += input.charAt(numbers[i].length);
  //       }
  //     }

  //     // Evaluate the expression using eval and calculate the result
  //     const calculatedResult = eval(expression);

  //     // Set the input to the calculated result
  //     setInput(calculatedResult.toString());
  //   } catch (error: any) {
  //     // Set the input to the error message if an error occurs during calculation
  //     setInput(error);
  //   }
  // };

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
