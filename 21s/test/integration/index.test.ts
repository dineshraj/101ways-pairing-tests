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
    jest.resetAllMocks();
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
          { name: 'Dealer', total: 0, won: false }
        ];
        runGame(mockShuffledDeck, players);
        expect(players[0].won).toBe(true);
        expect(players[1].won).toBe(true);
        expect(consoleLogMock).toHaveBeenCalledWith('Draw!');
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

    /*
      Cases:
        * Sam gets 21 and Dealer gets 21

    */      

    });
  });
});
