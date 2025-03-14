import { EMPTY } from '../constants';
import { Grid } from '../types';

export const makeMove = (grid: Grid, column: number, playerSymbol: string) => {
  const columnAsIndex = column - 1;
  // make deep copy of array
  const newGrid = JSON.parse(JSON.stringify(grid));
  let success = false;

  // check if bottom of column is empty
  if (newGrid[newGrid.length - 1][columnAsIndex] === EMPTY) {
    newGrid[newGrid.length - 1][columnAsIndex] = playerSymbol;
    success = true;
  } else {
    // this is for when the column isn't empty
    for (let i = 0; i <= newGrid.length; i++) {
      if (newGrid[i][columnAsIndex] !== EMPTY) {
        if (i - 1 >= 0) {
          newGrid[i - 1][columnAsIndex] = playerSymbol;
          success = true;
          break;
        } else {
          console.log('Invalid move');
          break;
        }
      }
    }
  }
  return { newGrid, success };
};

export const checkVerticalWinner = (grid: Grid, playerSymbol: string) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (
        grid[i + 3] &&
        grid[i][j] === playerSymbol &&
        grid[i + 1][j] === playerSymbol &&
        grid[i + 2][j] === playerSymbol &&
        grid[i + 3][j] === playerSymbol
      ) {
        return true;
      }
    }
  }
  return false;
};

export const checkHorizontalWinner = (grid: Grid, playerSymbol: string) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        grid[i][j + 3] &&
        grid[i][j] === playerSymbol &&
        grid[i][j + 1] === playerSymbol &&
        grid[i][j + 2] === playerSymbol &&
        grid[i][j + 3] === playerSymbol
      ) {
        return true;
      }
    }
  }
  return false;
};
