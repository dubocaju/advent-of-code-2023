const fs = require("fs");
const data = fs.readFileSync(process.argv[2], 'utf-8').split(/\r?\n/);

const cleanArray = arr => arr.filter(str => str != '').map(str => parseInt(str));
const isTextLine = str => isNaN(str[0]);
let currentValues = cleanArray(data[0].split(':')[1].split(' '));
let currentConverterArray = [];

const convertValue = (value, converterValues) => {
    const destination = converterValues[0];
    const source = converterValues[1];
    const range = converterValues[2];
    
    if (value >= source && value < source + range) {
        const diff = value - source;
        return destination + diff;
    }
    return value;
}

const convertCurrentValues = (values, converterArray) => values.map(value => {
    let convertedValue = value;
    converterArray.forEach(converterValues => {
        const conversionTry = convertValue(value, converterValues);
        if (conversionTry != value) {
            convertedValue = conversionTry;
        }
    });
    return convertedValue;
});

for (let i = 2; i < data.length; i++) {
    const line = data[i];
    if (line == ''){
        continue;
    }
    
    if (isTextLine(line) || i === data.length - 1) {
        if (currentConverterArray.length <= 0) {
            continue;
        }
        currentValues = convertCurrentValues(currentValues, currentConverterArray);
        currentConverterArray = [];
    }
    else {
        const mapValues = cleanArray(line.split(' '));
        currentConverterArray.push(mapValues);
    }
}

console.log("Lowest location number : " + Math.min(...currentValues));