import { makeMove } from '../helpers/gameLogic';
import { createGrid } from '../helpers/grid';

describe('gameLogic', () => {
  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('puts the token in the correct place when there are no other tokens in the column', () => {
    const grid = createGrid(2, 3);
    const expectedGrid = [
      ['.', '.', '.'],
      ['.', 'x', '.']
    ];

    const { newGrid, success } = makeMove(grid, 2, 'x');

    expect(newGrid).toStrictEqual(expectedGrid);
    expect(success).toBe(true);
  });

  it('puts a token above previous tokens', () => {
    const grid = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', 'x'],
      ['.', 'x', 'o'],
      ['o', 'x', 'x']
    ];

    const expectedGrid = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', 'o'],
      ['.', '.', 'x'],
      ['.', 'x', 'o'],
      ['o', 'x', 'x']
    ];

    const { newGrid, success } = makeMove(grid, 3, 'o');

    expect(newGrid).toStrictEqual(expectedGrid);
    expect(success).toBe(true);
  });

  it('calls out an invalid move if the player tries to put a token on a full column', () => {
    const grid = [
      ['.', '.', 'x'],
      ['.', '.', 'o'],
      ['.', '.', 'x'],
      ['.', '.', 'x'],
      ['.', 'x', 'o'],
      ['o', 'x', 'x']
    ];

    const expectedGrid = [
      ['.', '.', 'x'],
      ['.', '.', 'o'],
      ['.', '.', 'x'],
      ['.', '.', 'x'],
      ['.', 'x', 'o'],
      ['o', 'x', 'x']
    ];

    const { newGrid, success } = makeMove(grid, 3, 'o');

    expect(newGrid).toStrictEqual(expectedGrid);
    expect(success).toBe(false);
    expect(consoleLogMock).toHaveBeenCalledWith('Invalid move');
  });
});
