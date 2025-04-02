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

export const isColumnFull = (grid: Grid, columnAsIndex: number) => {
  return grid[0][columnAsIndex] !== EMPTY;
};

export const placingLogic = (
  newGrid: Grid,
  columnAsIndex: number,
  success: boolean,
  playerSymbol: string,
  powerUp: string
) => {
  // check for full column
  if (isColumnFull(newGrid, columnAsIndex)) {
    console.log('Invalid move');
    success = false;
    return success;
  }

  // different logic for powerups
  // TODO: split out into own function specifically for anvil
  if (powerUp !== 'n' && powerUp === 'anvil') {
    if (isColumnEmpty(newGrid, columnAsIndex)) {
      console.log('bit of a simpleton using it on a empty column right?');
    }

    for (let i = 0; i < newGrid.length; i++) {
      newGrid[i][columnAsIndex] = EMPTY;
    }

    //stll want to put the players token at the bottom
    //TODO: refactor as same logic is used below
    newGrid[newGrid.length - 1][columnAsIndex] = playerSymbol;

  } else {     
    // check if bottom of column is empty
    // and just put it there if it is
    if (isColumnEmpty(newGrid, columnAsIndex)) {
      newGrid[newGrid.length - 1][columnAsIndex] = playerSymbol;
    } else {
      // this is for when the column isn't empty
      for (let i = 0; i < newGrid.length; i++) {
        if (newGrid[i][columnAsIndex] !== EMPTY) {
          // place token above the one that is not empty
          newGrid[i - 1][columnAsIndex] = playerSymbol;
          break;
        }
      }
    }
  }
  success = true;
  return success;
};

export const makeMove = (
  grid: Grid,
  column: number,
  playerSymbol: string,
  pop: boolean = false,
  powerUp: string = ''
) => {
  const columnAsIndex = column - 1;
  // make deep copy of array
  const newGrid = JSON.parse(JSON.stringify(grid));
  let success = false;

  if (pop) {
    success = popLogic(newGrid, columnAsIndex, success);
  } else {
    success = placingLogic(
      newGrid,
      columnAsIndex,
      success,
      playerSymbol,
      powerUp
    );
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
