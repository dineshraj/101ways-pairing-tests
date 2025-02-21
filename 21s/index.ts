import { dealCard, makeDeck, shuffleDeck } from './helpers/deck';
import { makePlayers } from './helpers/players';
import { Player } from './types';

import { START_GAME, CONTINUING, WINS, GAME_OVER } from './constants';

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

  if (realPlayer.total === 21) {
    realPlayer.won = true;
  } else if (dealer.total === 21) {
    dealer.won = true;
  }
};

export const continueGame = (shuffledDeck: number[], player: Player) => {
  // while (player.total < 17) {
  //   const card = dealCard(shuffledDeck)
  //   player.total += card
  // }
  // check total
  // if new total is above 17 then finish turn
};

export const checkResults = (realPlayer: Player, dealer: Player) => {
  //   if (realPlayer.total > 21) {
  //     // lose
  //   }
  //   // .. etc
};

export const runGame = (shuffledDeck: number[], players: Player[]) => {
  const realPlayer = players.find((player: Player) => player.name === 'Sam');
  const dealer = players.find((player: Player) => player.name === 'Dealer');

  console.log(START_GAME);
  
  runFirstHand(shuffledDeck, realPlayer, dealer);

  if (realPlayer.won) {
    console.log(`${realPlayer.name} ${WINS}`);
    console.log(GAME_OVER);
    return;
  } else if (dealer.won) {
    console.log(`${dealer.name} ${WINS}`);
    console.log(GAME_OVER);
    return;
  }

  console.log(CONTINUING);

  continueGame(shuffledDeck, realPlayer);
  continueGame(shuffledDeck, dealer);

  checkResults(realPlayer, dealer);

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
