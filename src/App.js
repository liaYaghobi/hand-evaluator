import './App.css';
import React, { useState } from 'react';

function App() {
  
  const [cards, setCards] = useState([]);
  const [rankData, setRankData] = useState([]);
  const [suitData, setSuitData] = useState([]);
  const [handResult, setHandResult] = useState('');

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1));
  };

  const sortRanks = () => {
    const sortedRanks = rankData.sort((a, b) => b - a);
    setRankData(sortedRanks);
  };

  const checkSuits = () => {
    // Returns true if ALL suits are the same
    for (let i = 1; i < suitData.length; i++) {
      if (suitData[i] !== suitData[0])
        return false;
    }
    return true;
  };

  const checkRanks = () => {
    // Return true if ALL ranks are in consecutive order
    for (let i = 0; i < rankData.length - 1; i++) {
      if (rankData[i] - rankData[i + 1] !== 1) {
        return false;
      }
    }
    return true;
  };

  const findRecurringNumbers = () => {
    const recurringNumbers = {};
    for (let i = 0; i < rankData.length - 1; i++) {
      if (rankData[i] === rankData[i + 1]) {
        // Found recurring numbers (a pair or more)
        if (recurringNumbers[rankData[i]]) {
          recurringNumbers[rankData[i]]++; // Increment the count if already present
        } else {
          recurringNumbers[rankData[i]] = 2; // Initialize the count if not already present
        }
      }
    }

    // Filter the recurringNumbers object to keep only the ranks with count >= 2
    console.log("Recurring ranks:", recurringNumbers);
    return recurringNumbers;
  };

  const solveHand = () => {

    sortRanks();
    const recurring = findRecurringNumbers();
    const sameSuits = checkSuits();
    const consequetiveRanks = checkRanks();

    console.log("Recurring:", recurring);
    console.log("suit data", suitData);
    console.log("suits:", sameSuits);
    console.log("rank data", rankData);
    console.log("ranks:", consequetiveRanks);

    const counts = Object.values(recurring);
    console.log("Counts:", counts);

    if (sameSuits && consequetiveRanks) {
      if (rankData[0] === '14') {
        setHandResult("Royal Flush");
      } else {
        setHandResult("Straight Flush");
      }
    } else if (counts.length === 1 && counts[0] === 4) {
      setHandResult("4 of a kind");
    } else if (counts.length === 2 && (counts[0] === 3 || counts[1] === 3)) {
      setHandResult("Full House");
    } else if (sameSuits && !consequetiveRanks) {
      setHandResult("Flush");
    } else if (!sameSuits && consequetiveRanks) {
      setHandResult("Straight");
    } else if (counts.length === 1 && counts[0] === 3) {
      setHandResult("3 of a kind");
    } else if (counts.length === 2 && counts[0] === 2 && counts[1] === 2) {
      setHandResult("2 Pair");
    } else if (counts.length === 1 && counts[0] === 2) {
      setHandResult("Pair");
    } else {
      setHandResult("High card of " + rankData[0]);
    }
  };

  const generateRandomCards = () => {
    setHandResult('')
    const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    const numbers = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];

    const randomCards = [];
    const ranks = [];
    const suitState = [];

    for (let i = 0; i < 5; i++) {
      const randomSuit = suits[getRandomInt(0, suits.length - 1)];
      const randomNum = numbers[getRandomInt(0, numbers.length - 1)];

      ranks.push(randomNum);
      suitState.push(randomSuit);

      const cardCode = randomSuit + '_' + randomNum;
      randomCards.push(cardCode);
    }
    setCards(randomCards);
    setRankData(ranks);
    setSuitData(suitState);
    console.log(cards);
  }

  return (
    <div className="App">
      <div>
        {cards.map((card, index) => (
          <img
            key={index}
            src={`/svg/${card}.svg`} // Replace with the correct path to your SVG files
            alt={card}
            style={{ width: '10%', height: '20%', marginLeft: '20px' }}
          />
        ))}
      </div>
      <button className="button-style" onClick={generateRandomCards}>NEXT</button>
      <button className="button-style" onClick={solveHand}>SOLVE</button>
      <div className="results">{handResult}</div>
    </div>
  );
}

export default App;
