import { EMPTY } from '../constants';
import { Grid } from '../types';

export const makeMove = (grid: Grid, column: number, playerSymbol: string) => {
  const columnAsIndex = column - 1;
  const newGrid = grid;
  let success = false;

  // check if bottom of column is empty
  if (newGrid[newGrid.length - 1][columnAsIndex] === EMPTY) {
    newGrid[newGrid.length - 1][columnAsIndex] = playerSymbol;
    success = true;
  } else {
    for (let i = 0; i < newGrid.length; i++) {
      if (newGrid[i][columnAsIndex] !== EMPTY) {
        if (i - 1 > 0) {
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
