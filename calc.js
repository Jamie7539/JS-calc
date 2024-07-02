let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let result = null;

const display = document.getElementById('display');
const calculationDisplay = document.getElementById('calculation');
const decimal = document.getElementById('decimal');
const add = document.getElementById('add');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');

function updateDisplay(value) {
    if (display.value === 'Error') return;

    //bugged, the decimal gets placed before the number
    if (value === '.') {
        if (!display.value.includes('.')) {
            if (display.value === '') {
                display.value = '0.';
            } else {
                display.value += value;
            }
        }
    } else {
        display.value += value;
    }
}


function updateCalculationDisplay(value) {
    const maxLength = 33;
    let currentText = calculationDisplay.textContent.trim();
    if (value === '+' || value === '-' || value === '*' || value === '/') {
        if (currentText.slice(-1) === '+' || currentText.slice(-1) === '-' || currentText.slice(-1) === '*' || currentText.slice(-1) === '/' || currentText.slice(-2) === ' =') {
            calculationDisplay.textContent = currentText.slice(0, -1) + value;
        } else {
            calculationDisplay.textContent += ` ${value}`;
        }
    } else if (value === '=') {
        calculationDisplay.textContent += ` ${value} ${result}`;
    } else {
        calculationDisplay.textContent += value;
    }
    calculationDisplay.textContent = calculationDisplay.textContent.slice(-maxLength);
}

function clearDisplay() {
    display.value = '';
    calculationDisplay.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    result = null;
}

function handleOperator(operator, displayOperator) {
    if (currentOperator !== null) calculate();
    firstOperand = display.value;
    currentOperator = operator;
    display.value = '';
    updateCalculationDisplay(displayOperator);
}

function calculate() {
    if (currentOperator === null) return;
    secondOperand = display.value;
    let num1 = parseFloat(firstOperand);
    let num2 = parseFloat(secondOperand);
    switch (currentOperator) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num2 === 0 ? 'Error' : num1 / num2; break;
        default: return;
    }
    display.value = result;
    calculationDisplay.textContent += ` = ${result}`;
    currentOperator = null;
    firstOperand = result.toString();
}

decimal.addEventListener('click', () => {
    if (display.value === 'Error') return;

    if (display.value === '') {
        display.value = '0.';
        updateCalculationDisplay('0.');
    } else if (!display.value.includes('.')) {
        updateDisplay('.');
        updateCalculationDisplay('.');
    }
});


add.addEventListener('click', () => handleOperator('+', '+'));
subtract.addEventListener('click', () => handleOperator('-', '-'));
multiply.addEventListener('click', () => handleOperator('*', '*'));
divide.addEventListener('click', () => handleOperator('/', '/'));
equals.addEventListener('click', calculate);
clear.addEventListener('click', clearDisplay);

zero.addEventListener('click', () => {
    updateDisplay('0');
    updateCalculationDisplay('0');
});
one.addEventListener('click', () => {
    updateDisplay('1');
    updateCalculationDisplay('1');
});
two.addEventListener('click', () => {
    updateDisplay('2');
    updateCalculationDisplay('2');
});
three.addEventListener('click', () => {
    updateDisplay('3');
    updateCalculationDisplay('3');
});
four.addEventListener('click', () => {
    updateDisplay('4');
    updateCalculationDisplay('4');
});
five.addEventListener('click', () => {
    updateDisplay('5');
    updateCalculationDisplay('5');
});
six.addEventListener('click', () => {
    updateDisplay('6');
    updateCalculationDisplay('6');
});
seven.addEventListener('click', () => {
    updateDisplay('7');
    updateCalculationDisplay('7');
});
eight.addEventListener('click', () => {
    updateDisplay('8');
    updateCalculationDisplay('8');
});
nine.addEventListener('click', () => {
    updateDisplay('9');
    updateCalculationDisplay('9');
});

document.addEventListener('keydown', event => {
    const key = event.key;
    const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace'];

    if (validKeys.includes(key)) {
        event.preventDefault();
    }

    if (key >= '0' && key <= '9') {
        updateDisplay(key);
        updateCalculationDisplay(key);
    } else if (key === '.') {
        if (!display.value.includes('.')) {
            updateDisplay('.');
            updateCalculationDisplay('.');
        }
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleOperator(key, key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        display.value = display.value.slice(0, -1);
    }
});

