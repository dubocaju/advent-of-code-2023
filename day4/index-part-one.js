const fs = require("fs");
const data = fs.readFileSync(process.argv[2], 'utf-8');
let totalScore = 0;

const cleanArray = arr => 
    arr.filter(str => str != '').map(str => parseInt(str));


data.split(/\r?\n/).forEach(line =>  {
    line = line.split(':')[1];
    const card = line.split("|");
    const winningNumbers = cleanArray(card[0].split(' '));
    const playingNumbers = cleanArray(card[1].split(' '));

    let matchs = 0;
    playingNumbers.forEach(number => {
        if (winningNumbers.includes(number)) {
            matchs++;
        }
    });

    if (matchs === 1) {
        totalScore++;
    }
    if (matchs > 1) {
        totalScore += Math.pow(2, matchs - 1);
    }
});

console.log("Total score : " + totalScore);