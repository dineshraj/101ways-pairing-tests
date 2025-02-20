import makeDeck from './helpers/makeDeck';
import shuffleDeck from './helpers/shuffleDeck';

// suits don't matter in this game
// const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
// substitute J, Q, K for 10 and A for 11

const VALUES = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '10',
  '10',
  '10',
  '11',
];

const deck = makeDeck(VALUES);
const shuffledDeck = shuffleDeck(deck);

const runGame = () => {
  return 'game';
};

const twentyOnes = () => {
  return runGame();
};

export default twentyOnes;
