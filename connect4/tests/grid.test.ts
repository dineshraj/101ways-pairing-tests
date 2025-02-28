import exp from 'constants';
import { createGrid, drawGrid, validateColumn } from '../helpers/grid';
import { INVALID_COLUMN } from '../constants';

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
  });

  describe('drawGrid', () => {
    it('writes out the grid to the terminal', () => {
      const grid = createGrid(2, 3);
      drawGrid(grid);

      expect(consoleLogMock).toHaveBeenCalledTimes(1);
      expect(consoleLogMock).toHaveBeenCalledWith('. . .\n. . .');
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
