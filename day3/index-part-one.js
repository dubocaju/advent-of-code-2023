const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf-8');
const dataLines = data.split(/\r?\n/);
const numbers = [];

const isSymbol = char => typeof char !== 'undefined' && char !== '.' && isNaN(char);

const checkAndReturnFalseOnError = (i, j) => {
    try {
        return isSymbol(dataLines[i][j]);
    } catch (error) {
        return false;
    }
}

const checkAdjacentSymbols = (i, j) => {
    // check up
    if (checkAndReturnFalseOnError(i - 1, j)) return true;
    // check down
    if (checkAndReturnFalseOnError(i + 1, j)) return true;
    // check left
    if (checkAndReturnFalseOnError(i, j - 1)) return true;
    // check right
    if (checkAndReturnFalseOnError(i, j + 1)) return true;
    // check up left
    if (checkAndReturnFalseOnError(i - 1, j - 1)) return true;
    // check down left
    if (checkAndReturnFalseOnError(i + 1, j - 1)) return true;
    // check up right
    if (checkAndReturnFalseOnError(i - 1, j + 1)) return true;
    // check down right
    if (checkAndReturnFalseOnError(i + 1, j + 1)) return true;

    return false;
}

for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];

    let numberStr = '';
    let hasAdjacentSymbol = false;
    let hasNumberOnLastLine = false;
    for (let j = 0; j < line.length; j++) {
        const char = dataLines[i][j];
        
        if (!isNaN(char)) {
            if (checkAdjacentSymbols(i, j)) {
                hasAdjacentSymbol = true;
                hasNumberOnLastLine = true;
            }
            numberStr += char;
        }
        else {
            if (numberStr !== '' && hasAdjacentSymbol){
                numbers.push(parseInt(numberStr));
            }
            numberStr = '';
            hasAdjacentSymbol = false;
            hasNumberOnLastLine = false;
        }
    }
    if (hasNumberOnLastLine) numbers.push(parseInt(numberStr));
}

console.log("Numbers : " + numbers);
console.log("Sum : " + numbers.reduce((acc, value) => acc += value, 0));