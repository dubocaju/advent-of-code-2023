const fs = require("fs");
const data = fs.readFileSync(process.argv[2], 'utf-8').split(/\r?\n/);

const cleanStr = str => parseInt(str.split(':')[1].split(' ').filter(str => str != '').join(''));
const timeAllowed =  cleanStr(data[0]);
const distanceRecord = cleanStr(data[1]);
let waysOfBeatingRecord = 0;

for (let timeHolding = 0; timeHolding < timeAllowed; timeHolding++) {
    const distance = timeHolding * (timeAllowed - timeHolding);
    if (distance > distanceRecord) {
        waysOfBeatingRecord++;
    }
}   

console.log("Result : " + waysOfBeatingRecord);