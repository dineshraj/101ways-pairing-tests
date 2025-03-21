import {
  makeMove,
  checkVerticalWinner,
  checkHorizontalWinner,
  checkDiagonalDownWinner,
  checkDiagonalUpWinner,
  isColumnEmpty
} from '../helpers/gameLogic';
import { createGrid } from '../helpers/grid';

describe('gameLogic', () => {
  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('placing tokens from the top', () => {
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

  describe('popping tokens from the bottom', () => {
    it('pops out any token from the bottom and moves all the other token', () => {
      const grid = [
        ['.', '.', '.'],
        ['.', '.', 'o'],
        ['.', '.', 'x'],
        ['.', '.', 'x'],
        ['.', 'x', 'o'],
        ['o', 'x', 'x']
      ];

      const expectedGrid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', 'o'],
        ['.', '.', 'x'],
        ['.', 'x', 'x'],
        ['o', 'x', 'o']
      ];

      const { newGrid, success } = makeMove(grid, 3, 'o', true);

      console.log('🚀 ~ it.only ~ grid:', grid);
      console.log('🚀 ~ it.only ~ expectedGrid:', expectedGrid);
      console.log('🚀 ~ it.only ~ newGrid:', newGrid);

      expect(newGrid).toStrictEqual(expectedGrid);
      expect(success).toBe(true);
    });

    it('pops out a token from the bottom and moves all the other token and adds a empty token if the column is full', () => {
      const grid = [
        ['.', '.', 'x'],
        ['.', '.', 'o'],
        ['.', '.', 'x'],
        ['.', '.', 'x'],
        ['.', 'x', 'o'],
        ['o', 'x', 'x']
      ];

      const expectedGrid = [
        ['.', '.', '.'],
        ['.', '.', 'x'],
        ['.', '.', 'o'],
        ['.', '.', 'x'],
        ['.', 'x', 'x'],
        ['o', 'x', 'o']
      ];

      const { newGrid, success } = makeMove(grid, 3, 'o', true);

      expect(newGrid).toStrictEqual(expectedGrid);
      expect(success).toBe(true);
    });

    it('calls out an invalid move if the player tries to pop an empty column', () => {
      const grid = [
        ['.', '.', '.'],
        ['.', '.', 'o'],
        ['.', '.', 'x'],
        ['.', '.', 'x'],
        ['.', 'x', 'o'],
        ['.', 'x', 'x']
      ];

      const expectedGrid = [
        ['.', '.', '.'],
        ['.', '.', 'o'],
        ['.', '.', 'x'],
        ['.', '.', 'x'],
        ['.', 'x', 'o'],
        ['.', 'x', 'x']
      ];

      const { newGrid, success } = makeMove(grid, 1, 'o', true);

      console.log('🚀 ~ it.only ~ grid:', grid);
      console.log('🚀 ~ it.only ~ expectedGrid:', expectedGrid);
      console.log('🚀 ~ it.only ~ newGrid:', newGrid);

      expect(newGrid).toStrictEqual(expectedGrid);
      expect(success).toBe(false);
      expect(consoleLogMock).toHaveBeenCalledWith('Invalid move');
    });
  });

  describe('winning logic', () => {
    it('declares a winner when there are four vertical tokens', () => {
      const grid = [
        ['.', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', 'x', '.']
      ];

      const result = checkVerticalWinner(grid, 'o');

      expect(result).toBe(true);
    });

    it('does not declare a winner when there are less than four vertical tokens', () => {
      const grid = [
        ['.', '.', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', 'x', '.']
      ];

      const result = checkVerticalWinner(grid, 'o');

      expect(result).toBe(false);
    });

    it('declares a winner when there are four horizontal tokens', () => {
      const grid = [
        ['.', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', 'o', '.'],
        ['x', 'x', 'x', 'x']
      ];

      const result = checkHorizontalWinner(grid, 'x');

      expect(result).toBe(true);
    });

    it('does not declares a winner when there are not four horizontal tokens', () => {
      const grid = [
        ['.', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', 'o', '.'],
        ['x', 'x', 'o', 'x']
      ];

      const result = checkHorizontalWinner(grid, 'x');

      expect(result).toBe(false);
    });

    it('declares a winner if there are four upwards diagonal tokens', () => {
      const grid = [
        ['.', 'o', '.', 'o'],
        ['x', 'o', 'o', 'x'],
        ['x', 'o', 'o', 'x'],
        ['o', 'x', 'x', 'x']
      ];

      const result = checkDiagonalUpWinner(grid, 'o');

      expect(result).toBe(true);
    });

    it('does not declare a winner if there are not four upwards diagonal tokens', () => {
      const grid = [
        ['.', 'o', '.', 'o'],
        ['x', 'o', 'x', 'x'],
        ['x', 'o', 'o', 'x'],
        ['o', 'x', 'x', 'x']
      ];

      const result = checkDiagonalUpWinner(grid, 'o');

      expect(result).toBe(false);
    });

    it('declares a winner if there are four down diagonal tokens', () => {
      const grid = [
        ['o', 'o', '.', 'x'],
        ['x', 'o', 'x', 'x'],
        ['x', 'o', 'o', 'x'],
        ['o', 'x', 'x', 'o']
      ];

      const result = checkDiagonalDownWinner(grid, 'o');

      expect(result).toBe(true);
    });

    it('does not declare a winner if there are not four down diagonal tokens', () => {
      const grid = [
        ['o', 'o', '.', 'x'],
        ['x', 'o', 'x', 'x'],
        ['x', 'o', 'x', 'x'],
        ['o', 'x', 'x', 'o']
      ];

      const result = checkDiagonalDownWinner(grid, 'o');

      expect(result).toBe(false);
    });
  });

  it('checks if the bottom of column is empty', () => {
    const grid = [
      ['.', 'o', '.', 'x'],
      ['.', 'o', 'x', 'x'],
      ['.', 'o', 'x', 'x'],
      ['.', 'x', 'x', 'o']
    ];
    const isEmpty = isColumnEmpty(grid, 0);

    expect(isEmpty).toBe(true);
  });

  describe.skip('power checkers', () => {
    it('allows the user to use an anvil', () => {
      const grid = createGrid(4, 3);
      const expectedGrid = [
        ['.', '.', '.'],
        ['.', 'x', '.'],
        ['x', 'x', '.'],
        ['x', 'x', 'x']
      ];

      makeMove(grid, 2, 'x');
      makeMove(grid, 2, 'x');
      makeMove(grid, 2, 'x');
      makeMove(grid, 1, 'x');
      makeMove(grid, 3, 'x');
      makeMove(grid, 2, 'x');
    });
  });
});
