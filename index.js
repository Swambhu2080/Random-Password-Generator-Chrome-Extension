

const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('Uppercase')
const lowercaseEl = document.getElementById('Lowercase')
const numbersEl = document.getElementById('Number')
const symbolsEl = document.getElementById('Symbol')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);    
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);    
}

function getRandomSymbol(){
    const symbol = '!@#%^&*(){}?/';
    return symbol[Math.floor(Math.random() * symbol.length)];
}

const randomFunction = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const clkLower = lowercaseEl.checked
    const clkUpper = uppercaseEl.checked
    const clkNumber = numbersEl.checked
    const clkSymbol = symbolsEl.checked

    resultEl.innerText = createPass(length, clkLower, clkNumber, clkUpper, clkSymbol);
});

function createPass(length, lower, number, upper, symbol) {
    let finalPass = ''

    //filter unchecked types
    const typesCount = lower + upper + number + symbol

    if (typesCount === 0) return ''

    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    //loop over length, call generator function for each type
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0]
            finalPass += randomFunction[funcName]()
        });
    }

    return finalPass.slice(0, length)
}
 
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const finalPass = resultEl.innerText

    if (!finalPass) { return }

    textArea.value = finalPass
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
});

