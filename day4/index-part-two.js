const fs = require("fs");
const data = fs.readFileSync(process.argv[2], 'utf-8');
const cards = data.split(/\r?\n/).map(line => line.split(':')[1].split("|"));
let totalNumberOfCards = 0;

const cleanArray = arr => 
    arr.filter(str => str != '').map(str => parseInt(str));

const processCard = (index) => {
    const card = cards[index];
    totalNumberOfCards++;
    const winningNumbers = cleanArray(card[0].split(' '));
    const playingNumbers = cleanArray(card[1].split(' '));


    let matchs = 0;
    playingNumbers.forEach(number => {
        if (winningNumbers.includes(number)) {
            matchs++;
        }
    });

    if (matchs === 0) {
        return;
    }
    
    for (let i = 1; i <= matchs; i++) {
        processCard(index + i);
    }
}

for (let i = 0; i < cards.length; i++) {
    processCard(i);
}

console.log("Total number of cards : " + totalNumberOfCards);
