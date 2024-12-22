const display = document.getElementById('display-screen')

let keyPressed = document.querySelectorAll('numbers-et-al')

function displayOnScreen(input) {
    display.value += input
}

function clearScreen() {
    display.value = ''
}

function calculate() {
    display.value = eval(display.value)
}

function binaryConversion (){
    let number = display.value
    let conversion = []
    while (number > 0) {
        conversion.unshift(number % 2)
        number = Math.floor(number / 2)
    }
    display.value = conversion.join('')
}