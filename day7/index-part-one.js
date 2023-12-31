const fs = require("fs");
const data = fs.readFileSync(process.argv[2], 'utf-8').split(/\r?\n/);
const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'].reverse();
const game = [];

data.forEach(line => {
    const split = line.split(' ');
    game.push({"hand": split[0], "bet": split[1]});
});

const countCardOccurences = hand => {
    const occurences = {};
    hand.split('').forEach(card => {
        if (occurences[card] == undefined) {
            occurences[card] = 1;
        }
        else {
            occurences[card]++;
        }
    });
    return Object.values(occurences).sort((a,b) => b - a);
}

const isFiveOfAKind = sortedOccurences => sortedOccurences[0] === 5;
const isFourOfAKind = sortedOccurences => sortedOccurences[0] === 4;
const isFullHouse = sortedOccurences => sortedOccurences[0] === 3 && sortedOccurences[1] === 2;
const isThreeOfAKind = sortedOccurences => sortedOccurences[0] === 3 && sortedOccurences[1] <= 2;
const isTwoPairs = sortedOccurences => sortedOccurences[0] === 2 && sortedOccurences[1] === 2;
const isOnePair = sortedOccurences => sortedOccurences[0] === 2 && sortedOccurences[1] <= 2;

const computeHandScore = hand => {
    const occurences = countCardOccurences(hand);
    if (isFiveOfAKind(occurences)) {
        return 7;
    }
    if (isFourOfAKind(occurences)) {
        return 6;
    }
    if (isFullHouse(occurences)) {
        return 5;
    }
    if (isThreeOfAKind(occurences)) {
        return 4;
    }
    if (isTwoPairs(occurences)) {
        return 3;
    }
    if (isOnePair(occurences)) {
        return 2;
    }
    return 1;
}

const compareCards = (firstCard, secondCard) => cards.indexOf(firstCard) - cards.indexOf(secondCard);

const compareHands = (firstHand, secondHand) => {
    const firstHandScore = computeHandScore(firstHand);
    const secondHandScore = computeHandScore(secondHand);
    
    if (firstHandScore != secondHandScore) {
        return firstHandScore - secondHandScore;
    }
    
    for (let i = 0; i < firstHand.length; i++) {
        const cardsComparaison = compareCards(firstHand[i], secondHand[i]);
        if (cardsComparaison !== 0) {
            return cardsComparaison;
        }
    }
}

const gameResult = game
.sort((a,b) => compareHands(a.hand, b.hand))
.map((value, index) => { return { ...value, "rank": index + 1 } });

const totalWinnings = gameResult.reduce((acc, value) => acc += value.bet * value.rank, 0);

//console.log(gameResult);
console.log("Total winnings : " + totalWinnings);