const fs = require("fs");
const data = fs.readFileSync('input.txt', 'utf-8');
const validGamesIds = [];

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

const areResultsValid = results => {
    let valid = true;
    results.forEach(set => {
        valid &= set.red <= 12 && set.green <= 13 && set.blue <= 14;
    });
    return valid;
}
data.split(/\r?\n/).forEach(line =>  {
    const gameIdStr = line.split(":").shift();
    const setStr = line.split(":")[1];
    const gameId = parseInt(gameIdStr.split(" ").slice(1));
    const setsArray = setStr.split(';');

    const results = parseResultsFromSet(setsArray);
    if (areResultsValid(results)) {
        validGamesIds.push(gameId);
    }
});

const sum = validGamesIds.reduce((acc, currentValue) => acc += currentValue, 0);
console.log("Total sum of valid games ids : " + sum);