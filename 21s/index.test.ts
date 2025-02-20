import twentyOnes, { runGame } from './';

describe('21s', () => {
  let consoleLogMock = jest.spyOn(console, 'log');

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('has an entry point to run the game', () => {
    expect(twentyOnes).toBeDefined();
  });

  it('runs the game', () => {
    expect(twentyOnes).not.toThrow();
  });

  describe('Game play', () => {
    it('Sam wins if he have 21 in the first hand of two cards and the Dealer does not', () => {
      const mockShuffledDeck = [2, 3, 11, 10];
      const players = [
        { name: 'Sam', total: 0 },
        { name: 'Dealer', total: 0 },
      ];
      runGame(mockShuffledDeck, players);
      expect(consoleLogMock).toHaveBeenCalledWith('Sam wins');
    });

    it('The dealer wins if he have 21 in the first hand of two cards and the Dealer does not', () => {
      const mockShuffledDeck = [10, 11, 1, 10];
      const players = [
        { name: 'Sam', total: 0 },
        { name: 'Dealer', total: 0 },
      ];
      runGame(mockShuffledDeck, players);
      expect(consoleLogMock).toHaveBeenCalledWith('Dealer wins');
    });

    it('The game continues if neither player has 21 in the first hand of two cards', () => {
      const mockShuffledDeck = [1, 11, 2, 10];
      const players = [
        { name: 'Sam', total: 0 },
        { name: 'Dealer', total: 0 },
      ];
      runGame(mockShuffledDeck, players);
      expect(consoleLogMock).toHaveBeenCalledWith(
        'No one wins. Continuing game...'
      );
    });
  });
});
