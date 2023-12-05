const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf-8');
let powersSum = 0;

const parseResultsFromSet = set => {
    const results = [];
    set.forEach(set => {
        const resArray = set.split(",");
        resArray.forEach(res => {
            const count = {"red" : 0, "green": 0, "blue": 0};
            const arr = res.split(" ").reverse();
            count[arr[0]] += parseInt(arr[1]);
            results.push(count);
        })
    });
    return results;
}

const findMaxValues = results => {
    const maxValues = results[0];
    results.forEach(set => {
        if (set.red > maxValues.red) maxValues.red = set.red;
        if (set.green > maxValues.green) maxValues.green = set.green;
        if (set.blue > maxValues.blue) maxValues.blue = set.blue;
    });
    return maxValues;
}
data.split(/\r?\n/).forEach(line =>  {
    const setStr = line.split(":")[1];
    const setsArray = setStr.split(';');

    const results = parseResultsFromSet(setsArray);
    const maxValues = findMaxValues(results);
    console.log("maxValues : " + maxValues);
    const gamePower = maxValues.red * maxValues.green * maxValues.blue;
    console.log("gamePower : " + gamePower);
    powersSum += gamePower;
});

console.log("Total sum of game powers : " + powersSum);