import {
  expect,
  describe,
  it,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';

import twentyOnes, { runFirstHand, continueGame } from '../../index';
import * as deck from '../../helpers/deck';

describe('21s', () => {
  let dealCardMock;
  let consoleLogMock;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
    dealCardMock = jest.spyOn(deck, 'dealCard');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('has an entry point to run the game', () => {
    expect(twentyOnes).toBeDefined();
  });

  it('runs the game', () => {
    expect(twentyOnes).not.toThrow();
  });

  describe('Game play methods', () => {
    it('deals four cards in the first hand', () => {
      const shuffledDeckMock = [1, 5, 7, 5];
      const realPlayer = { name: 'Sam', total: 0, won: false };
      const dealer = { name: 'Dealer', total: 0, won: false };
      runFirstHand(shuffledDeckMock, realPlayer, dealer);
      expect(dealCardMock).toHaveBeenCalledTimes(4);
    });

    it('sets the correct player to "won" if they win', () => {
      let realPlayer = { name: 'Sam', total: 0, won: false };
      let dealer = { name: 'Dealer', total: 0, won: false };
      let shuffledDeckMock = [1, 5, 10, 11];

      runFirstHand(shuffledDeckMock, realPlayer, dealer);
      expect(realPlayer.won).toBe(true);
      expect(dealer.won).toBe(false);

      realPlayer = { name: 'Sam', total: 0, won: false };
      dealer = { name: 'Dealer', total: 0, won: false };
      shuffledDeckMock = [10, 11, 1, 5];

      runFirstHand(shuffledDeckMock, realPlayer, dealer);
      expect(realPlayer.won).toBe(false);
      expect(dealer.won).toBe(true);
    });

    it('sets both players to "won" if they win', () => {
      let realPlayer = { name: 'Sam', total: 0, won: false };
      let dealer = { name: 'Dealer', total: 0, won: false };
      let shuffledDeckMock = [11, 10, 10, 11];

      runFirstHand(shuffledDeckMock, realPlayer, dealer);
      expect(realPlayer.won).toBe(true);
      expect(dealer.won).toBe(true);
    });

    it('it carries on drawing cards until the player has a total >= 17', () => {
      const player = { name: 'Sam', total: 4, won: false };
      const shuffledDeckMock = [2, 3, 9, 2]; // total + 3 cards = 18
      continueGame(shuffledDeckMock, player);
      expect(dealCardMock).toHaveBeenCalledTimes(3);
      expect(player.total).toEqual(18);
    });

    it('it carries on drawing cards until the supplied total is reached', () => {
      const dealer = { name: 'Dealer', total: 4, won: false };
      const playerTotal = 18;
      const shuffledDeckMock = [1, 3, 2, 9, 2]; // total + 3 cards = 20
      continueGame(shuffledDeckMock, dealer, playerTotal);
      expect(dealCardMock).toHaveBeenCalledTimes(4);
      expect(dealer.total).toEqual(20);
    });
  });
});
