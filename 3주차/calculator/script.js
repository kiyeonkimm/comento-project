document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  let currentInput = "0";
  let operator = "";
  let firstOperand = "";
  let secondOperand = "";
  let result = "";
  let newCalculation = false;

  function updateDisplay(value) {
    input.textContent = value;
  }

  function clear() {
    currentInput = "0";
    operator = "";
    firstOperand = "";
    secondOperand = "";
    result = "";
    newCalculation = false;
    updateDisplay(currentInput);
  }

  function calculate() {
    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(secondOperand);
    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "x":
        result = num1 * num2;
        break;
      case "÷":
        result = num2 !== 0 ? num1 / num2 : "Error";
        break;
    }
    updateDisplay(result);
    firstOperand = result.toString();
    secondOperand = "";
    newCalculation = true;
  }

  document.querySelectorAll(".num").forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (value === "AC") {
        clear();
        return;
      }

      if (value === "+/-") {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay(currentInput);
        return;
      }

      if (value === "%") {
        if (currentInput !== "0") {
          currentInput = (parseFloat(currentInput) / 100).toString();
          updateDisplay(currentInput);
        }
        return;
      }

      if (value === ".") {
        if (!currentInput.includes(".")) {
          currentInput += ".";
          updateDisplay(currentInput);
        }
        return;
      }

      if (["+", "-", "x", "÷", "="].includes(value)) {
        if (value === "=") {
          if (operator && firstOperand && currentInput) {
            secondOperand = currentInput;
            calculate();
            return;
          }
        } else {
          if (operator && currentInput === "") {
            operator = value; // Update operator without calculation if no current input
            return;
          }
          if (!newCalculation) {
            if (operator && currentInput !== "") {
              secondOperand = currentInput;
              calculate();
            } else {
              firstOperand = currentInput;
            }
            operator = value;
            currentInput = "";
          } else {
            operator = value;
            currentInput = "";
            newCalculation = false;
          }
        }
        return;
      }

      if (currentInput === "0" || newCalculation) {
        currentInput = value;
        newCalculation = false;
      } else {
        currentInput += value;
      }
      updateDisplay(currentInput);
    });
  });
});
