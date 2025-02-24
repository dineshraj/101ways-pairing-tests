import {
  dealCard,
  isHigherThan21,
  makeDeck,
  shuffleDeck,
} from './helpers/deck';
import { makePlayers } from './helpers/players';
import { Player } from './types';

import { START_GAME, CONTINUING, WINS, GAME_OVER, DRAW } from './constants';

// suits don't matter in this game
// substitute J, Q, K for 10 and A for 11
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
const PLAYERS = ['Sam', 'Dealer'];

export const runFirstHand = (
  shuffledDeck: number[],
  realPlayer: Player,
  dealer: Player
) => {
  [realPlayer, dealer].forEach((player: Player) => {
    for (let i = 0; i < 2; i++) {
      const card = dealCard(shuffledDeck);
      player.total += card;
    }
  });

  if (realPlayer.total === 21 && dealer.total !== 21) {
    realPlayer.won = true;
  } else if (dealer.total === 21 && realPlayer.total !== 21) {
    dealer.won = true;
  } else if (realPlayer.total === 21 && dealer.total === 21) {
    realPlayer.won = true;
    dealer.won = true;
  }
};

export const continueGame = (
  shuffledDeck: number[],
  player: Player,
  maxTotal: number = 17
) => {
  // should be <= if Sam's go and < if Dealer's go
  while (player.total < maxTotal) {
    const card = dealCard(shuffledDeck);
    player.total += card;
  }
};

const finishGame = (realPlayer: Player, dealer: Player) => {
  if (realPlayer.won && !dealer.won) {
    console.log(`${realPlayer.name} ${WINS}`);
    console.log(GAME_OVER);
    return true;
  } else if (dealer.won && !realPlayer.won) {
    console.log(`${dealer.name} ${WINS}`);
    console.log(GAME_OVER);
    return true;
  } else if (dealer.won && realPlayer.won) {
    console.log(DRAW);
    console.log(GAME_OVER);
    return true;
  }
  return false;
};

export const runGame = (shuffledDeck: number[], players: Player[]) => {
  const realPlayer = players.find((player: Player) => player.name === 'Sam');
  const dealer = players.find((player: Player) => player.name === 'Dealer');

  console.log(START_GAME);

  runFirstHand(shuffledDeck, realPlayer, dealer);

  if (finishGame(realPlayer, dealer)) {
    return;
  }

  console.log(CONTINUING);

  // continue game for Sam
  continueGame(shuffledDeck, realPlayer);

  // check if Sam has lost
  if (isHigherThan21(realPlayer.total)) {
    dealer.won = true;
    finishGame(realPlayer, dealer);
    return;
  }

  continueGame(shuffledDeck, dealer, realPlayer.total);

  if (isHigherThan21(dealer.total)) {
    realPlayer.won = true;
    finishGame(realPlayer, dealer);
    return;
  }

  // both players have ended with less than or equal to 21
  // but the dealer only stops drawing when he has a higher total than Sam
  // thus the dealer has to win in this case
  dealer.won = true;
  finishGame(realPlayer, dealer);
  return;
};

const twentyOnes = () => {
  const deck = makeDeck(VALUES);
  const shuffledDeck = shuffleDeck(deck);
  const players: Player[] = makePlayers(PLAYERS);

  return runGame(shuffledDeck, players);
};

export default twentyOnes;
