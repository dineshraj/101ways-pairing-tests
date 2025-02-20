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

  // =====================================
  // player 1 goes first
  // * player 1 keeps drawing cards until their total is higher than 17
  // if player 1 gets higher than 21 then player 2 wins (GAME OVER)
  // if player 1 is in the range of 17-21, it is player 2's turn
  // =====================================
  // * player 1 keeps drawing cards until their total is higher than 17
  // if player 2 gets higher than 21 then player 1 wins (GAME OVER) (remember player two wont even get a go if player  one is over 21 anyway
  // if neither player busts, the player with the highest total wins
  // if there is a tie, the dealer wins
  // }

  return;
};

const twentyOnes = () => {
  const deck = makeDeck(VALUES);
  const shuffledDeck = shuffleDeck(deck);
  const players: Player[] = makePlayers(PLAYERS);

  return runGame(shuffledDeck, players);
};

export default twentyOnes;
