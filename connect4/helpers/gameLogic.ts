import { EMPTY } from '../constants';
import { Grid } from '../types';

const WINNING_NUMBER_AS_INDEX = 3;

export const isColumnEmpty = (grid: Grid, column: number) => {
  return grid[grid.length - 1][column] === EMPTY;
};

export const popLogic = (
  newGrid: Grid,
  columnAsIndex: number,
  success: boolean
) => {
  if (isColumnEmpty(newGrid, columnAsIndex)) {
    console.log('Invalid move');
  } else {
    for (let i = newGrid.length - 1; i >= 0; i--) {
      if (newGrid[i - 1]) {
        newGrid[i][columnAsIndex] = newGrid[i - 1][columnAsIndex];
      } else {
        newGrid[i][columnAsIndex] = EMPTY;
      }
    }
    success = true;
  }
  return success;
};

export const placingLogic = (
  newGrid: Grid,
  columnAsIndex: number,
  success: boolean,
  playerSymbol: string
) => {
  // check if bottom of column is empty
  if (isColumnEmpty(newGrid, columnAsIndex)) {
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
  return success;
};

export const makeMove = (
  grid: Grid,
  column: number,
  playerSymbol: string,
  pop: boolean = false
) => {
  const columnAsIndex = column - 1;
  // make deep copy of array
  const newGrid = JSON.parse(JSON.stringify(grid));
  let success = false;

  if (pop) {
    success = popLogic(newGrid, columnAsIndex, success);
  } else {
    success = placingLogic(newGrid, columnAsIndex, success, playerSymbol);
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

export const checkDiagonalUpWinner = (grid: Grid, playerSymbol: string) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        grid[i - 3] &&
        grid[i][j + 3] &&
        grid[i][j] === playerSymbol &&
        grid[i - 1][j + 1] === playerSymbol &&
        grid[i - 2][j + 2] === playerSymbol &&
        grid[i - 3][j + 3] === playerSymbol
      ) {
        return true;
      }
    }
  }
  return false;
};

export const checkDiagonalDownWinner = (grid: Grid, playerSymbol: string) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (
        grid[i + 3] &&
        grid[i][j + 3] &&
        grid[i][j] === playerSymbol &&
        grid[i + 1][j + 1] === playerSymbol &&
        grid[i + 2][j + 2] === playerSymbol &&
        grid[i + 3][j + 3] === playerSymbol
      ) {
        return true;
      }
    }
  }
  return false;
};
