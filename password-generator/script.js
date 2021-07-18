// Reference material:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
// https://www.w3schools.com/charsets/ref_html_ascii.asp#:~:text=ASCII%20is%20a%207%2Dbit,are%20all%20based%20on%20ASCII.
'use strict';

// CHALLENGE:
// randomize the order the characters appear in the final password
// currently they always appear in the same order

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) { return };

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert(('Password copied to clipboard!'));
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerHTML = generatePassword(hasLower, hasNumber, 
        hasUpper, hasSymbol, length);
})

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArray = [{lower}, {upper}, {number}, {symbol}].
    filter(item => Object.values(item)[0]); // filter to only show us the true values

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i+=typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor( Math.random() * 26 ) + 65 );
    //return String.fromCharCode(Math.floor(Math.random() * 26) + 97).toUpperCase();
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]+<>/,.'
    return symbols[Math.floor( Math.random() * symbols.length)];
}

console.log(getRandomSymbol());