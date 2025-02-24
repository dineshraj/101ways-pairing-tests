import { expect, describe, it, beforeEach, afterEach, jest } from '@jest/globals';

import { runGame } from '../../index';
import * as index from '../../index';

describe('21s', () => {
  let consoleLogMock;
  let continueGameMock;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
    continueGameMock = jest.spyOn(index, 'continueGame');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Game play', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    describe('First hand', () => {
      it('Sam wins if only he have 21 in the first hand and the game stops', () => {
        const mockShuffledDeck = [2, 3, 11, 10];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(players[0].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith('Game over');
        expect(continueGameMock).not.toHaveBeenCalled();
      });

      it('The dealer wins if only he have 21 in the first hand and the game stops', () => {
        const mockShuffledDeck = [10, 11, 1, 10];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(players[1].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith('Game over');
        expect(continueGameMock).not.toHaveBeenCalled();
      });

      it('both players win if they both have 21 and the game stops', () => {
        const mockShuffledDeck = [10, 11, 11, 10];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(players[0].won).toBe(true);
        expect(players[1].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith(
          'Draw! Both players have won'
        );
        expect(consoleLogMock).toHaveBeenCalledWith('Game over');
        expect(continueGameMock).not.toHaveBeenCalled();
      });

      it('The game continues if neither player has 21 in the first hand of two cards', () => {
        const mockShuffledDeck = [1, 11, 2, 10];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(consoleLogMock).toHaveBeenCalledWith(
          'No one wins. Continuing game...'
        );
        expect(continueGameMock).toHaveBeenCalled();
      });
    });

    describe('Rest of game', () => {
      it('Sam gets higher than 21 and loses instantly', () => {
        // Sam will get 26 after drawing 2, 5 (7) and then 9 (16) and 10 (26)
        const mockShuffledDeck = [10, 9, 1, 3, 2, 5];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(continueGameMock).toHaveBeenCalledTimes(1);
        expect(players[1].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith('Game over');
      });

      it('if Sam is still in play and the Dealer gets more than 21, the dealer loses', () => {
        // Sam will get 18 after drawing 2, 5 (7) and then 9 (16) and 2 (18)
        // Dealer will get 22 after drawing 3, 1 (4) and then 11 (16) and 7 (22)
        const mockShuffledDeck = [7, 11, 2, 9, 1, 3, 2, 5];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(continueGameMock).toHaveBeenCalledTimes(2);
        expect(players[0].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith('Game over');
      });

      it('if both players do not get over 21 then Dealer wins as he will have the higher score', () => {
        // Sam will get 18 after drawing 2, 5 (7) and then 9 (16) and 1 (17)
        // Dealer will get 22 after drawing 3, 1 (4) and then 11 (15) and 3 (18)
        const mockShuffledDeck = [3, 11, 1, 9, 1, 3, 2, 5];
        const players = [
          { name: 'Sam', total: 0, won: false },
          { name: 'Dealer', total: 0, won: false },
        ];
        runGame(mockShuffledDeck, players);
        expect(continueGameMock).toHaveBeenCalledTimes(2);
        expect(players[1].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith('Game over');
      });
    });
  });
});
