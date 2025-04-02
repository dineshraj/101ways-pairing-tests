import { Grid } from '../types';
import { EMPTY } from '../constants';

export const createGrid = (numRows: number, numCols: number) => {
  const grid: Array<string>[] = [];

  for (let row = 0; row < numRows; row++) {
    grid[row] = [];
    for (let col = 0; col < numCols; col++) {
      grid[row][col] = EMPTY;
    }
  }
  return grid;
};

export const drawGrid = (grid: Grid) => {
  const prettyGrid = grid.map((d) => d.join(' ')).join('\n');
  console.log(`Current grid\n${prettyGrid}`);
};

export const validateColumn = (grid: Grid, chosenColumn: number) => {
  const chosenColumnAsIndex = chosenColumn - 1;

  return chosenColumnAsIndex < grid[0].length;
};
