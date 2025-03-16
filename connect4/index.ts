/*
  create grid (6x7)
  instantiate it all with .'s

  interactive version of the game
    - two plays playing on the same computer
      - player 1: x
      - player 2: o

  while no winner
   - loop between player one and player two
    - each playerplaces a token
    - games check if the player has won after each go


  Winning conditions:
    any four tokens in a row
      - any direction (including diagonals)

      e.g

      [
        [., ., ., ., ., .,]
        [., ., ., ., ., .,]
        [., x, x, x, x, .,]
        [., ., ., ., ., .,]
        [., ., ., ., ., .,]
        [., ., ., ., ., .,]
        [., ., ., ., ., .,]
      ]
*/

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { createGrid, drawGrid, validateColumn } from './helpers/grid';
import { Grid, Player } from './types';
import {
  checkDiagonalDownWinner,
  checkDiagonalUpWinner,
  checkHorizontalWinner,
  checkVerticalWinner,
  makeMove
} from './helpers/gameLogic';
import { INVALID_COLUMN } from './constants';

export const someoneHasWon = (value: boolean = false) => {
  return value;
};

export const runGame = async (
  grid: Grid,
  players: Player[],
  rows: number,
  cols: number,
  rl: readline.Interface,
  someoneHasWon: (value?: boolean) => boolean
) => {
  let moves = 0;
  let player = 0;

  while (!someoneHasWon()) {
    const currentPlayer = players[player];
    rl.write(`It's your move ${players[player].name}\n`);

    rl.write('This is the grid at the moment:\n\n');
    drawGrid(grid);

    const column = await rl.question(
      `\n\nWhich column do you want to place your token in? (1 to ${cols})\n\n`
    );

    // validate column number is within range
    if (validateColumn(grid, parseInt(column))) {
      const { newGrid, success } = makeMove(
        grid,
        parseInt(column),
        currentPlayer.symbol
      );

      if (success) {
        grid = JSON.parse(JSON.stringify(newGrid));
        // check if anyone has won vertically (others coming later!)
        if (
          checkVerticalWinner(grid, currentPlayer.symbol) ||
          checkHorizontalWinner(grid, currentPlayer.symbol) ||
          checkDiagonalDownWinner(grid, currentPlayer.symbol) ||
          checkDiagonalUpWinner(grid, currentPlayer.symbol)
        ) {
          console.log(`${currentPlayer.name} has won!`);
          drawGrid(grid);
          return;
        }
        // swap player index
        player = player === 0 ? 1 : 0;
        //increment moves
        moves++;
      }
    } else {
      console.log(INVALID_COLUMN);
    }

    // just for now
    // return;
  }
};

const Connect4 = async (rows: number = 6, cols: number = 7) => {
  const rl = readline.createInterface({ input, output });
  const grid = createGrid(rows, cols);

  const playerOneName = await rl.question('Enter player one name: ');
  const playerTwoName = await rl.question('Enter Player two name: ');
  const players = [
    { name: playerOneName, symbol: 'x' },
    { name: playerTwoName, symbol: 'o' }
  ];

  return runGame(grid, players, rows, cols, rl, someoneHasWon);
};

export default Connect4;
