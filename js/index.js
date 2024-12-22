const display = document.getElementById('display-screen')

const keyPressed = document.querySelectorAll('numbers-et-al')

function displayOnScreen (input) {
  display.value += input
}

function clearScreen () {
  display.value = ''
}

function calculate () {
  try {
    display.value = eval(display.value)
  } catch (error) {
    display.value = 'Error'
  }
}

function binaryConversion () {
  let number = display.value
  const conversion = []
  while (number > 0) {
    conversion.unshift(number % 2)
    number = Math.floor(number / 2)
  }
  display.value = conversion.join('')
}
