const fs = require("fs");
const data = fs.readFileSync(process.argv[2], 'utf-8').split(/\r?\n/);

const strToCleanArray = str => str.split(':')[1].split(' ').filter(str => str != '');
const timeArray = strToCleanArray(data[0]);
const distanceArray = strToCleanArray(data[1]);
const waysOfBeatingRecord = {}

for (let i = 0; i < timeArray.length; i++) {
    const timeAllowed = timeArray[i];
    const distanceRecord = distanceArray[i];

    for (let timeHolding = 0; timeHolding < timeAllowed; timeHolding++) {
        const distance = timeHolding * (timeAllowed - timeHolding);
        if (distance > distanceRecord) {
            if (waysOfBeatingRecord[i] == undefined) {
                waysOfBeatingRecord[i] = 1;
            }
            else {
                waysOfBeatingRecord[i]++;
            }
        }
    }
}   

console.log("Result : " + Object.values(waysOfBeatingRecord).reduce((acc, value) => acc *= value, 1));