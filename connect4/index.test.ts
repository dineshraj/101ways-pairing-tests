import readline, { Interface } from 'node:readline/promises';
import Connect4, { someoneHasWon } from './';
import { createGrid } from './helpers/grid';
import * as connect4Module from './';
import * as gridHelpers from './helpers/grid';
import * as gameLogic from './helpers/gameLogic';
import { INVALID_COLUMN } from './constants';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn()
}));

describe('Connect4', () => {
  let consoleLogMock: jest.SpyInstance;
  let runGameMock: jest.SpyInstance;
  let someoneHasWonMock: jest.SpyInstance;

  beforeEach(() => {
    runGameMock = jest.spyOn(connect4Module, 'runGame');
    consoleLogMock = jest.spyOn(console, 'log');
    someoneHasWonMock = jest.spyOn(connect4Module, 'someoneHasWon');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('has an entry point', () => {
    expect(Connect4).toBeDefined();
    expect(typeof Connect4).toBe('function');
  });

  it('returns the value passed into the someoneHasWon function', async () => {
    const someoneHasWonValue = someoneHasWon(true);

    expect(someoneHasWonValue).toBe(true);
  });

  describe('Game', () => {
    it('accepts two players names', async () => {
      runGameMock.mockImplementation(jest.fn());
      const rows = 1;
      const cols = 1;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x' },
        { name: 'Chloe', symbol: 'o' }
      ];

      await Connect4(rows, cols);

      expect(connect4Module.runGame).toHaveBeenCalledWith(
        [['.']],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );
    });

    it('errors and does not to the next player if a D or a P is not entered', async () => {
      const rows = 3;
      const cols = 2;

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('PEE'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(consoleLogMock).toHaveBeenCalledWith('Please enter "D" or "P"');
    });

    it('asks the player if they want to pop a token from the bottom and makes the move accordingly', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 3;
      const cols = 2;
      const initialGrid = [
        ['.', 'o'],
        ['x', 'x'],
        ['o', 'x']
      ];
      const secondGrid = [
        ['.', 'o'],
        ['.', 'x'],
        ['x', 'x']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          // the below gets to the initial grid state above
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')

          // taking from the bottom from the initial grid
          .mockResolvedValueOnce('P')
          .mockResolvedValueOnce('1')
          // taking from the bottom from the second grid
          .mockResolvedValueOnce('P')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(makeMoveSpy).toHaveBeenCalledWith(initialGrid, 1, 'o', true);
      expect(makeMoveSpy).toHaveBeenCalledWith(secondGrid, 2, 'x', true);
    });

    it('tells the user they have chosen an invalid column and asks again', async () => {
      const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
      const rows = 1;
      const cols = 1;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(validateColumnSpy).toHaveReturnedWith(false);
      expect(consoleLogMock).toHaveBeenCalledWith(INVALID_COLUMN);
      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
    });

    it('makes a move if the column is valid and the column is empty', async () => {
      const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 2;
      const cols = 2;
      const grid = createGrid(rows, cols);

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(validateColumnSpy).toHaveReturnedWith(true);
      expect(makeMoveSpy).toHaveBeenCalledWith(grid, 2, 'x', false);
    });

    it('makes a valid move if the column is not empty', async () => {
      const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 2;
      const cols = 2;
      const initialGrid = [
        ['.', '.'],
        ['.', '.']
      ];
      const secondGrid = [
        ['.', '.'],
        ['.', 'x']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(makeMoveSpy).toHaveBeenCalledWith(initialGrid, 2, 'x', false);
      expect(rl.write).toHaveBeenCalledWith("It's your move Chloe\n");
      expect(validateColumnSpy).toHaveReturnedWith(true);
      expect(makeMoveSpy).toHaveBeenCalledWith(secondGrid, 2, 'o', false);
    });

    it('swaps players after a successful move', async () => {
      const rows = 2;
      const cols = 2;

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(rl.write).toHaveBeenCalledWith("It's your move Chloe\n");
    });

    it('determines the winner and finishes the game if someone has 4 vertical tokens', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 4;
      const cols = 4;
      const gridBeforeEnd = [
        ['.', '.', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', 'x', '.']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      await Connect4(rows, cols);

      expect(makeMoveSpy).toHaveBeenCalledWith(gridBeforeEnd, 2, 'o', false);
      expect(consoleLogMock).toHaveBeenCalledWith('Chloe has won!');
    });

    it('determines the winner and finishes the game if someone has 4 upwards diagonal tokens', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 4;
      const cols = 4;
      const gridBeforeEnd = [
        ['.', '.', '.', '.'],
        ['x', 'o', 'x', 'o'],
        ['x', 'x', 'o', 'o'],
        ['x', 'o', 'x', 'o']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      await Connect4(rows, cols);

      expect(makeMoveSpy).toHaveBeenCalledWith(gridBeforeEnd, 4, 'x', false);
      expect(consoleLogMock).toHaveBeenCalledWith('Dineshraj has won!');
    });
  });
});
