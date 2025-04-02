import exp from 'constants';
import { createGrid, drawGrid, validateColumn } from '../helpers/grid';

describe('Grid helper', () => {
  let consoleLogMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createGrid', () => {
    it('creates the grid correctly', () => {
      let grid = createGrid(2, 3);
      let expectedGrid = [
        ['.', '.', '.'],
        ['.', '.', '.']
      ];
      expect(grid).toStrictEqual(expectedGrid);

      grid = createGrid(4, 2);
      expectedGrid = [
        ['.', '.'],
        ['.', '.'],
        ['.', '.'],
        ['.', '.']
      ];
      expect(grid).toStrictEqual(expectedGrid);
    });

    // it.skip('does not allow a grid to be created with a winning criteria bigger than the grid', () => {
      // createGrid({ rows: 2, cols: 3, toWin: 8 });
      // expect(consoleLogMock).toHaveBeenCalledWith('Cannot make grid smaller than what it takes to win');
    // })
  });

  describe('drawGrid', () => {
    it('writes out the grid to the terminal', () => {
      const grid = createGrid(2, 3);
      drawGrid(grid);

      expect(consoleLogMock).toHaveBeenCalled();
      expect(consoleLogMock).toHaveBeenCalledWith('Current grid\n. . .\n. . .');
    });
  });

  describe('validateColumn', () => {
    it('checks the column number is vaild', () => {
      const grid = createGrid(2, 3);
      let chosenColumn = 4;
      let expectedValue = validateColumn(grid, chosenColumn);
      expect(expectedValue).toBe(false);

      chosenColumn = 2;
      expectedValue = validateColumn(grid, chosenColumn);
      expect(expectedValue).toBe(true);
    })
  });
});
