'use strict'

const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0
let operatorValue = '';
let awaitingNextValue = false; 

function sendNumberValue(number) {
    

    if (awaitingNextValue) {
        calculatorDisplay.textContent =number;
        awaitingNextValue = false;
    } else {
        // ako je rezultat 0, ako jeste zamenimo ako nije dodamo

    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }


}

const addDecimal = function(){
    // 
    if (awaitingNextValue) return;

    // ako nema decimale, dodaj
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber/ secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber* secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber+ secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber- secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}



const useOperator = function(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //

    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue
    } else {
        console.log(firstValue, operatorValue , currentValue);
        const calculation = calculate[operatorValue] (firstValue,currentValue)
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // ready for next value
    awaitingNextValue= true;
    operatorValue = operator;
    
    
}

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));    
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal())
    } else if (inputBtn.classList.contains('number')) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value))
    }
});

// clear ALL values display 
const brise = function() {
    firstValue = 0
    operatorValue = '';
    awaitingNextValue = false; 
    calculatorDisplay.textContent = '0';
}
clearBtn.addEventListener('click', brise);

