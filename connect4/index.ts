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
import powerUps from './helpers/powerups';

export const someoneHasWon = (value: boolean = false) => {
  return value;
};

const checkWinner = (grid: Grid, symbol: string) => {
  return (
    checkVerticalWinner(grid, symbol) ||
    checkHorizontalWinner(grid, symbol) ||
    checkDiagonalDownWinner(grid, symbol) ||
    checkDiagonalUpWinner(grid, symbol)
  );
};

export const runGame = async (
  grid: Grid,
  players: Player[],
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

    const dropOrTake = await rl.question(
      '\nDo you want to drop (D) or take a token from the bottom (P)?'
    );

    if (dropOrTake === 'D' || dropOrTake === 'P') {
      const take = dropOrTake === 'P'; //change name of this variable
      let chosenPowerUp = '';

      if (dropOrTake === 'D' && currentPlayer.powerUps.length > 0) {
        rl.write(`You currently have ${currentPlayer.powerUps.toString()}\n\n`);
        chosenPowerUp = await rl.question(
          'Do you want to use a powerup? If so type the name,  or "n" for no\n\n'
        );
        if (
          chosenPowerUp !== 'n' &&
          currentPlayer.powerUps.includes(chosenPowerUp)
        ) {
          rl.write(`You have chosen the ${chosenPowerUp}\n\n`);
        } else if (chosenPowerUp === 'n') {
          rl.write(
            'fairs, keep it for later init when you really need it.\n\n'
          );
        } else {
          chosenPowerUp = 'invalid';
        }
      }

      if (chosenPowerUp !== 'invalid') {
        const column = await rl.question(
          `\n\nWhich column do you want to do play in? (1 to ${cols})\n\n`
        );

        // validate column number is within range
        if (validateColumn(grid, parseInt(column))) {
          const { newGrid, success } = makeMove(
            grid,
            parseInt(column),
            currentPlayer.symbol,
            take,
            chosenPowerUp
          );

          if (success) {
            // remove from the powerup array
            if (chosenPowerUp !== '') {
              const updatedPowerUps = currentPlayer.powerUps.filter(
                (powerup) => powerup !== chosenPowerUp
              );
              currentPlayer.powerUps = updatedPowerUps;
            }

            grid = JSON.parse(JSON.stringify(newGrid));

            // TODO: USE MOVES TO CHECK WHEN TO START CHECKING ( <= 7)
            if (checkWinner(grid, currentPlayer.symbol)) {
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
      } else {
        console.log('write a valid powerup you dick');
      }
    } else {
      console.log(
        'Stop spazzing out and enter "D" or "P", I literally just said that.'
      );
    }
  }
};

const Connect4 = async (rows: number = 6, cols: number = 7) => {
  const rl = readline.createInterface({ input, output });
  const grid = createGrid(rows, cols);

  const playerOneName = await rl.question('Enter player one name: ');
  const playerTwoName = await rl.question('Enter Player two name: ');
  const players = [
    { name: playerOneName, symbol: 'x', powerUps },
    { name: playerTwoName, symbol: 'o', powerUps }
  ];
  rl.write('lol, you have shit names bruv, feel sorry for you.');
  return runGame(grid, players, cols, rl, someoneHasWon);
};

export default Connect4;

// powerups are set to true by default which is offsetting the
// rl mock in the tests and making the tests fail
