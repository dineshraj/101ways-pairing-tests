import readline, { Interface } from 'node:readline/promises';
import Connect4, { someoneHasWon } from './';
import { createGrid } from './helpers/grid';
import * as connect4Module from './';
import * as gridHelpers from './helpers/grid';
import * as gameLogic from './helpers/gameLogic';
import { INVALID_COLUMN } from './constants';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn()
}));


describe('Connect4', () => {
  let consoleLogMock: jest.SpyInstance;
  let runGameMock: jest.SpyInstance;
  let someoneHasWonMock: jest.SpyInstance;

  beforeEach(() => {
    runGameMock = jest.spyOn(connect4Module, 'runGame');
    consoleLogMock = jest.spyOn(console, 'log');
    someoneHasWonMock = jest.spyOn(connect4Module, 'someoneHasWon');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('has an entry point', () => {
    expect(Connect4).toBeDefined();
    expect(typeof Connect4).toBe('function');
  });

  it('returns the value passed into the someoneHasWon function', async () => {
    const someoneHasWonValue = someoneHasWon(true);

    expect(someoneHasWonValue).toBe(true);
  });

  describe('Game', () => {
    it('defaults to a 6 x 7 grid', async () => {
      runGameMock.mockImplementation(jest.fn());

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: ['anvil'] },
        { name: 'Chloe', symbol: 'o', powerUps: ['anvil'] }
      ];

      await Connect4();

      expect(connect4Module.runGame).toHaveBeenCalledWith(
        [
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.'],
          ['.', '.', '.', '.', '.', '.', '.']
        ],
        playerMock,
        7,
        rl,
        someoneHasWon
      );
    });

    it('accepts two players names and generates player objects', async () => {
      runGameMock.mockImplementation(jest.fn());
      const rows = 1;
      const cols = 1;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: ['anvil'] },
        { name: 'Chloe', symbol: 'o', powerUps: ['anvil'] }
      ];

      await Connect4(rows, cols);

      expect(connect4Module.runGame).toHaveBeenCalledWith(
        [['.']],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );
    });

    it('errors and does not to the next player if a D or a P is not entered', async () => {
      const rows = 3;
      const cols = 2;

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('PEE'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(consoleLogMock).toHaveBeenCalledWith(
        'Stop spazzing out and enter "D" or "P", I literally just said that.'
      );
    });

    it('tells the user they have chosen an invalid column and asks again', async () => {
      const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame([['.']], playerMock, 1, rl, someoneHasWon);

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(validateColumnSpy).toHaveReturnedWith(false);
      expect(consoleLogMock).toHaveBeenCalledWith(INVALID_COLUMN);
      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
    });

    it('makes a move if the column is valid and the column is empty', async () => {
      const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 2;
      const cols = 2;
      const grid = createGrid(rows, cols);

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [
          ['.', '.'],
          ['.', '.']
        ],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(validateColumnSpy).toHaveReturnedWith(true);
      expect(makeMoveSpy).toHaveBeenCalledWith(grid, 2, 'x', false, '');
    });

    it('makes a valid move if the column is not empty', async () => {
      const validateColumnSpy = jest.spyOn(gridHelpers, 'validateColumn');
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 2;
      const cols = 2;
      const initialGrid = [
        ['.', '.'],
        ['.', '.']
      ];
      const secondGrid = [
        ['.', '.'],
        ['.', 'x']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [
          ['.', '.'],
          ['.', '.']
        ],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(makeMoveSpy).toHaveBeenCalledWith(initialGrid, 2, 'x', false, '');
      expect(rl.write).toHaveBeenCalledWith("It's your move Chloe\n");
      expect(validateColumnSpy).toHaveReturnedWith(true);
      expect(makeMoveSpy).toHaveBeenCalledWith(secondGrid, 2, 'o', false, '');
    });

    it('swaps players after a successful move', async () => {
      const rows = 2;
      const cols = 2;

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [
          ['.', '.'],
          ['.', '.']
        ],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(rl.write).toHaveBeenCalledWith("It's your move Chloe\n");
    });

    it('determines the winner and finishes the game if someone has 4 vertical tokens', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const cols = 4;
      const gridBeforeEnd = [
        ['.', '.', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', '.', '.'],
        ['x', 'o', 'x', '.']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(makeMoveSpy).toHaveBeenCalledWith(
        gridBeforeEnd,
        2,
        'o',
        false,
        ''
      );
      expect(consoleLogMock).toHaveBeenCalledWith('Chloe has won!');
    });

    it('determines the winner and finishes the game if someone has 4 upwards diagonal tokens', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const rows = 4;
      const cols = 4;
      const gridBeforeEnd = [
        ['.', '.', '.', '.'],
        ['x', 'o', 'x', 'o'],
        ['x', 'x', 'o', 'o'],
        ['x', 'o', 'x', 'o']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('3')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('4'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.'],
          ['.', '.', '.', '.']
        ],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(makeMoveSpy).toHaveBeenCalledWith(
        gridBeforeEnd,
        4,
        'x',
        false,
        ''
      );
      expect(consoleLogMock).toHaveBeenCalledWith('Dineshraj has won!');
    });
  });

  describe('Powerups', () => {
    it('only asks the player if they want to use a powerup if they choose "D"', async () => {
      const rows = 2;
      const cols = 2;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('Dineshraj')
          .mockResolvedValueOnce('Chloe')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('anvil')
          .mockResolvedValueOnce('2'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      await Connect4(rows, cols);

      expect(rl.write).toHaveBeenCalledWith('You have chosen the anvil\n\n');
    });

    it('does not ask the player if they want to use a powerup if they do not have one', async () => {
      const cols = 2;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1'),
        write: jest.fn()
      } as unknown as Interface;

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [['.']],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).not.toHaveBeenCalledWith('You have chosen the anvil');
    });

    it('removes the powerup from the player if they use it', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const initialGrid = [
        ['.', '.'],
        ['o', '.'],
        ['x', '.']
      ];

      const expectedGrid = [
        ['.', '.'],
        ['o', '.'],
        ['x', '.']
      ];
      const cols = 2;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('anvil')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          // first player's go again but it wont ask for the anvil
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1'),
        write: jest.fn()
      } as unknown as Interface;

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: ['anvil'] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        initialGrid,
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).toHaveBeenCalledWith('You have chosen the anvil\n\n');
      expect(makeMoveSpy).toHaveBeenCalledWith(expectedGrid, 1, 'x', false, '');
    });

    it('lists the power tokens the user has', async () => {
      const cols = 2;
      const rl = {
        question: jest.fn().mockResolvedValueOnce('D'),
        write: jest.fn()
      } as unknown as Interface;

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: ['anvil', 'lightsabre'] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [['.', '.']],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).toHaveBeenCalledWith(
        'You currently have anvil,lightsabre\n\n'
      );
    });

    it('asks the user again if they enter an incorrect powerup', async () => {
      const cols = 2;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('penis-power'),
        write: jest.fn()
      } as unknown as Interface;

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: ['anvil', 'lightsabre'] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [['.', '.']],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).not.toHaveBeenCalledWith(
        `You have chosen the penis-power\n\n`
      );
      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
      expect(consoleLogMock).toHaveBeenCalledWith(
        'write a valid powerup you dick'
      );
      expect(rl.write).toHaveBeenCalledWith("It's your move Dineshraj\n");
    });

    it('skips the powerup logic if the user enters "n"', async () => {
      const cols = 2;
      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('n')
          .mockResolvedValueOnce('1'),
        write: jest.fn()
      } as unknown as Interface;

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      jest.mocked(readline.createInterface).mockReturnValue(rl);
      jest.mocked(connect4Module.runGame);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: ['anvil'] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        [['.', '.']],
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(rl.write).toHaveBeenCalledWith(
        'fairs, keep it for later init when you really need it.\n\n'
      );
    });

    it('asks the player if they want to pop a token from the bottom and makes the move accordingly', async () => {
      const makeMoveSpy = jest.spyOn(gameLogic, 'makeMove');
      const cols = 2;
      const initialGrid = [
        ['.', '.'],
        ['.', '.'],
        ['.', 'x']
      ];
      const expectedGrid = [
        ['.', '.'],
        ['.', '.'],
        ['o', '.']
      ];

      const rl = {
        question: jest
          .fn()
          .mockResolvedValueOnce('P')
          .mockResolvedValueOnce('2')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1')
          .mockResolvedValueOnce('D')
          .mockResolvedValueOnce('1'),
        write: jest.fn()
      } as unknown as Interface;

      jest.mocked(readline.createInterface).mockReturnValue(rl);

      someoneHasWonMock
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => false)
        .mockImplementationOnce(() => true);

      const playerMock = [
        { name: 'Dineshraj', symbol: 'x', powerUps: [] },
        { name: 'Chloe', symbol: 'o', powerUps: [] }
      ];

      await connect4Module.runGame(
        initialGrid,
        playerMock,
        cols,
        rl,
        someoneHasWon
      );

      expect(makeMoveSpy).toHaveBeenCalledWith(expectedGrid, 1, 'x', false, '');
    });
  });
});
