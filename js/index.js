const display = document.getElementById('display-screen')

function displayOnScreen (input) {
  display.value += input // Append the input to the display
}

function clearScreen () {
  display.value = '' // Clear the display
}

// Custom calculation function to evaluate mathematical expressions
function calculate () {
  try {
    const result = evaluateExpression(display.value)
    display.value = result
  } catch (error) {
    display.value = 'Error' // Handle invalid expressions
  }
}

function binaryConversion () {
  let number = display.value
  const conversion = []
  while (number > 0) {
    conversion.unshift(number % 2)
    number = Math.floor(number / 2)
  }
  display.value = conversion.join('') // Display the binary conversion
}

// Custom evaluator for basic arithmetic operations
function evaluateExpression (expression) {
  const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '') // Remove invalid characters
  const tokens = sanitizedExpression.split(/([+\-*/()])/).filter(Boolean) // Tokenize the input
  const parsedTokens = tokens.map(token => {
    if (!isNaN(token)) {
      return Number(token) // Convert numeric tokens to numbers
    }
    return token
  })

  return compute(parsedTokens) // Compute the result
}

// Helper function to compute the result of an expression
function compute (tokens) {
  const operators = []
  const values = []
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  }

  function applyOperator () {
    const operator = operators.pop()
    const b = values.pop()
    const a = values.pop()
    switch (operator) {
      case '+':
        values.push(a + b)
        break
      case '-':
        values.push(a - b)
        break
      case '*':
        values.push(a * b)
        break
      case '/':
        values.push(a / b)
        break
      case '%':
        values.push(a / 100)
        break
      default:
        throw new Error('Unknown operator')
    }
  }

  tokens.forEach(token => {
    if (typeof token === 'number') {
      values.push(token)
    } else if (token === '(') {
      operators.push(token)
    } else if (token === ')') {
      while (operators.length && operators[operators.length - 1] !== '(') {
        applyOperator()
      }
      operators.pop() // Remove the '('
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        applyOperator()
      }
      operators.push(token)
    }
  })

  while (operators.length) {
    applyOperator()
  }

  return values[0]
}

// Function to calculate the percentage of the current number (% button)
function switchPercent () {
  const currentValue = display.value

  // If the value is a valid number, calculate its percentage
  if (currentValue) {
    display.value = eval(currentValue) / 100 // Calculate the percentage
  }
}

// Function to switch the sign of the current number (+/- button)
function switchSign () {
  const currentValue = display.value

  // If the value is a valid number, toggle its sign
  if (currentValue) {
    if (currentValue.startsWith('-')) {
      display.value = currentValue.substring(1) // Remove the negative sign
    } else {
      display.value = '-' + currentValue // Add the negative sign
    }
  }
}

// Attach these functions to your buttons (if using event listeners)

displayOnScreen()
clearScreen()
calculate()
binaryConversion()
switchPercent()
switchSign()

// // Get the display screen element
// const displayScreen = document.getElementById('display-screen')

// // Function to display values on the screen
// function displayOnScreen (value) {
//   if (displayScreen.value === '' && isNaN(value) && value !== '.') return

//   displayScreen.value += value
// }

// // Function to clear the screen
// function clearScreen () {
//   displayScreen.value = ''
// }

// // Function to calculate the result
// function calculate () {
//   try {
//     // Replace ÷ with / and evaluate the expression
//     displayScreen.value = eval(displayScreen.value.replace('÷', '/'))
//   } catch (error) {
//     displayScreen.value = 'Error'
//   }
// }

// // Function to switch the sign of the current number (+/- button)
// function switchSign () {
//   const currentValue = displayScreen.value

//   // If the value is a valid number, toggle its sign
//   if (currentValue) {
//     if (currentValue.startsWith('-')) {
//       displayScreen.value = currentValue.substring(1) // Remove the negative sign
//     } else {
//       displayScreen.value = '-' + currentValue // Add the negative sign
//     }
//   }
// }

// // Function to calculate the percentage of the current number (% button)
// function switchPercent () {
//   const currentValue = displayScreen.value

//   // If the value is a valid number, calculate its percentage
//   if (currentValue) {
//     displayScreen.value = eval(currentValue) / 100 // Calculate the percentage
//   }
// }

// // Function to convert the displayed value to binary (Bin button)
// function binaryConversion () {
//   const currentValue = displayScreen.value

//   if (currentValue && !isNaN(currentValue)) {
//     displayScreen.value = parseInt(currentValue, 10).toString(2) // Convert to binary
//   } else {
//     displayScreen.value = 'Error' // Show an error if the input is invalid
//   }
// }

// displayOnScreen()
// switchPercent()
// binaryConversion()
// switchSign()
// calculate()
// clearScreen()
