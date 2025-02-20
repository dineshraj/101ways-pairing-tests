import { dealCard, makeDeck, shuffleDeck } from './helpers/deck';
import { makePlayers } from './helpers/players';
import { Player } from './types';

// suits don't matter in this game
// substitute J, Q, K for 10 and A for 11
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
const PLAYERS = ['Sam', 'Dealer'];

const twentyOnes = () => {
  const deck = makeDeck(VALUES);
  const shuffledDeck = shuffleDeck(deck);
  const players: Player[] = makePlayers(PLAYERS);

  return runGame(shuffledDeck, players);
};

const runFirstHand = (
  shuffledDeck: number[],
  players: Player[],
  realPlayer: Player,
  dealer: Player
) => {
  players.forEach((player: Player) => {
    for (let i = 0; i < 2; i++) {
      const card = dealCard(shuffledDeck);
      player.total += card;
    }
  });

  // note only a 11 and a 10 can make 21 so both players can't have 21
  if (realPlayer.total === 21) {
    return 'Sam wins';
  } else if (dealer.total === 21) {
    return 'Dealer wins';
  }
  return 'No one wins. Continuing game...'
};

export const runGame = (shuffledDeck: number[], players: Player[]) => {
  const realPlayer = players.find((player: Player) => player.name === 'Sam');
  const dealer = players.find((player: Player) => player.name === 'Dealer');

  const firstHandResults = runFirstHand(shuffledDeck, players, realPlayer, dealer);

  console.log(firstHandResults);

  // if (firstHandResults !== 'Continue') {
  //   return firstHandResults;
  // }

  // else if (dealer.total === 21 && realPlayer.total !== 21) {
  //   return 'Dealer wins';
  // }

  // while (!winner) {
  // deal two cards to each player
  // if either player has 21, they win
  // if neither player has 21.........
  // =====================================
  // player 1 goes first
  // * player 1 keeps drawing cards until their total is higher than 17 or higher 21
  // if player 1 gets higher than 21 then player 2 wins (GAME OVER)
  // if player 1 is in the range of 17-21, it is player 2's turn
  // =====================================
  // * player 1 keeps drawing cards until their total is higher than 17 or higher 21
  // if player 2 gets higher than 21 then player 1 wins (GAME OVER) (remember player two wont even get a go if player  one is over 21 anyway
  // if neither player busts, the player with the highest total wins
  // if there is a tie, the dealer wins
  // }

  return 'game';
};

export default twentyOnes;
