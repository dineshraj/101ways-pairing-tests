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
      rows,
      cols,
      rl,
      someoneHasWon
    );
  });

  it('tells the user the have chosen an invalid column and asks again', async () => {
    const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
    const rows = 1;
    const cols = 1;
    const rl = {
      question: jest
        .fn()
        .mockResolvedValueOnce('Dineshraj')
        .mockResolvedValueOnce('Chloe')
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

  it('makes a move if the column is valid', async () => {
    const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
    const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
    const rows = 2;
    const cols = 2;
    const grid = createGrid(rows, cols);
    console.log('🚀 ~ it ~ grid:', grid);
    const rl = {
      question: jest
        .fn()
        .mockResolvedValueOnce('Dineshraj')
        .mockResolvedValueOnce('Chloe')
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
    expect(makeMoveSpy).toHaveBeenCalledWith(grid, 2, 'x');
  });
});
