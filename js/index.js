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

// Attach these functions to your buttons (if using event listeners)

displayOnScreen()
clearScreen()
calculate()
binaryConversion()
