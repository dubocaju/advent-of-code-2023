const fs = require("fs");
const spelledDigits = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}
const data = fs.readFileSync('input.txt', 'utf-8');

const findFirstNumber  = line => {
    let charByCharLine = '';
    for (let i = 0; i  < line.length; i++){
        if (!isNaN(line[i])){
            return line[i];
        }
        charByCharLine += line[i];
        number = matchSpelledNumber(charByCharLine);
        if (number) {
            return number;
        }
    }
}

const findLastNumber  = line => {
    let charByCharLine = '';
    for (let i = line.length; i  > 0; i--){
        const char = line[i - 1];
        if (!isNaN(char)){
            return char;
        }
        charByCharLine += char;
        number = matchSpelledNumber(charByCharLine.split('').reverse().join(''));
        if (number) {
            return number;
        }
    }
}

const matchSpelledNumber = str => {
    for (const [key, value] of Object.entries(spelledDigits)) {
        const number = str.replace(key, value).replace(/[^0-9]/g, '');
        if (number) {
            return number;
        }
    }
    return '';
}

let sum = 0;
data.split(/\r?\n/).forEach(line =>  {
    const firstNumber = findFirstNumber(line);
    const lastNumber = findLastNumber(line);
    const calibration = firstNumber + lastNumber;

    console.log("line : " + line + " firstNumber : " + firstNumber + " lastNumber : " + lastNumber);
    sum += parseInt(calibration);
});

console.log("Total sum : " + sum);