// Calculator state variables
let previousNumber = "";
let currentNumber = "";
let operator = "";
let displayValue = "0";
let activeOperatorButton = null;

// Dom elements
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear-btn");
const equalOp = document.querySelector(".equals");
const decimal = document.querySelector(".decimal");

display.textContent = "0";

// Event listeners for number buttons
numbers.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    handleNumber(event.target.textContent);
    removeActiveOperator();
  });
});

// Event listeners for operator buttons
operators.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    handleOperator(event.target.textContent);
    setActiveOperator(event.target);
  });
});

// Event listeners for the equals button
equalOp.addEventListener("click", () => {
  if (previousNumber && currentNumber && operator) {
    operate();
    operator = "";
  }
  removeActiveOperator();
});

// Event listener for the decimal button
decimal.addEventListener("click", () => {
  if (!currentNumber.includes(".")) {
    // Append the decimal point
    currentNumber += ".";
    displayValue = currentNumber;
    updateDisplay();
  }
});

// Event listener for the clear button
clearBtn.addEventListener("click", clearCalculator);

// Handle number button clicks
function handleNumber(number) {
  if (currentNumber.length < 5) {
    currentNumber += number;
    displayValue = currentNumber;
    updateDisplay();
    clearBtn.textContent = "C";
  }
}

// Handle operator button clicks
function handleOperator(op) {
  // Make sure only two numbers at a time evaluated
  if (previousNumber && currentNumber && operator) {
    operate();
  }
  // Only update previous number if current number not empty (not reset by previous operator button)
  if (currentNumber !== "") {
    previousNumber = currentNumber;
    currentNumber = "";
  }
  // Update operator to most recent operator button pressed
  operator = op;

  // Only update display if previous number is not empty
  if (previousNumber) {
    displayValue = previousNumber;
    updateDisplay();
  }
}

// Perform the calculation based on the operator
function operate() {
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);
  let result;

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
      result = num2 === 0 ? "Error" : num1 / num2;
      break;
    default:
      return;
  }
  if (!Number.isInteger(result)) {
    result = result.toFixed(2);
  }
  displayValue = result.toString();
  previousNumber = displayValue;
  currentNumber = "";
  updateDisplay();
}

// Update the calculator display
function updateDisplay() {
  display.textContent = displayValue;
}

// Clear the calculator
function clearCalculator() {
  displayValue = "0";
  previousNumber = "";
  currentNumber = "";
  operator = "";
  updateDisplay();
  clearBtn.textContent = "AC";
}

// Highlight the active operator button
function setActiveOperator(button) {
  removeActiveOperator(); // Remove highlight from previous operator
  button.classList.add("active-operator");
  activeOperatorButton = button;
}

// Remove the highlight from the active operator button
function removeActiveOperator() {
  if (activeOperatorButton) {
    activeOperatorButton.classList.remove("active-operator");
    activeOperatorButton = null;
  }
}
