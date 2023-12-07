const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf-8');
const dataLines = data.split(/\r?\n/);
const gearsMap = {};
let gearsRatioSum = 0;

const isGear = char => char === '*';

const checkAndReturnFalseOnError = (i, j) => {
    try {
        return isGear(dataLines[i][j]);
    } catch (error) {
        return false;
    }
}

const checkAdjacentGear = (i, j) => {
    // check up
    if (checkAndReturnFalseOnError(i - 1, j)) return [i - 1, j];
    // check down
    if (checkAndReturnFalseOnError(i + 1, j)) return [i + 1, j];
    // check left
    if (checkAndReturnFalseOnError(i, j - 1)) return [i, j - 1];
    // check right
    if (checkAndReturnFalseOnError(i, j + 1)) return [i, j + 1];
    // check up left
    if (checkAndReturnFalseOnError(i - 1, j - 1)) return [i - 1, j - 1];
    // check down left
    if (checkAndReturnFalseOnError(i + 1, j - 1)) return [i + 1, j - 1];
    // check up right
    if (checkAndReturnFalseOnError(i - 1, j + 1)) return [i - 1, j + 1];
    // check down right
    if (checkAndReturnFalseOnError(i + 1, j + 1)) return [i + 1, j + 1];

    return [];
}

const addGearAndNumberToMap = (gear, numberStr) => {
    if (numberStr == '' || gear.length <= 0){
        return;
    }

    if (gearsMap[`${gear[0]}-${gear[1]}`] == undefined) {
        gearsMap[`${gear[0]}-${gear[1]}`] = [];
    }
    gearsMap[`${gear[0]}-${gear[1]}`].push(parseInt(numberStr));
}

for (let i = 0; i < dataLines.length; i++) {
    const line = dataLines[i];

    let numberStr = '';
    let currentGear = [];
    for (let j = 0; j < line.length; j++) {
        const char = dataLines[i][j];
        
        if (!isNaN(char)) {
            gear = checkAdjacentGear(i, j);
            if (gear.length > 0) {
                currentGear = gear;
            }
            numberStr += char;
        }
        else {
            addGearAndNumberToMap(currentGear, numberStr);
            numberStr = '';
            currentGear = [];
        }
    }
    addGearAndNumberToMap(currentGear, numberStr);
}

console.log("Numbers : " + JSON.stringify(gearsMap));

for (const numbers of Object.values(gearsMap)) {
    if (numbers.length === 2){
        gearsRatioSum += numbers[0] * numbers[1];
    }
}

console.log("Gears Ratios Sum : " + gearsRatioSum);