import { runGame } from "../..";
import * as index from '../../'

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
      jest.resetAllMocks();
    });

    it('Sam wins if he have 21 in the first hand and the game stops', () => {
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

    it('The dealer wins if he have 21 in the first hand and the game stops', () => {
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
});