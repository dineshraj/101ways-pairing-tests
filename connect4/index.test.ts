import readline from 'node:readline/promises';
import Connect4 from './';
import * as connect4Module from './';
import { INVALID_COLUMN } from './constants';

jest.mock('node:readline/promises', () => ({
  createInterface: jest.fn(() => ({
    question: jest.fn(),
    write: jest.fn(),
    close: jest.fn()
  }))
}));

// jest.mock('node:readline/promises', () => ({
//   readline: jest.fn()
// }));

// jest.mocked(readline).mockReturnValue({
//     createInterface: jest.fn(() => ({
//       question: jest.fn(),
//       write: jest.fn(),
//       close: jest.fn()
// });

describe('Connect4', () => {
  let consoleLogMock;
  let mockQuestion: jest.Mock;
  let mockWrite: jest.Mock;
  let mockClose: jest.Mock;
  let runGameMock: jest.SpyInstance;

  beforeEach(() => {
    mockQuestion = jest.fn();
    mockWrite = jest.fn();
    mockClose = jest.fn();

    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      write: mockWrite,
      close: mockClose
    });
    runGameMock = jest.spyOn(connect4Module, 'runGame');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('has an entry point', () => {
    expect(Connect4).toBeDefined();
  });

  it.only('accepts two players names', async () => {
    const rows = 1;
    const cols = 1;

    // Simulating multiple inputs in order
    const inputs = ['Dineshraj', 'Chloe'];
    let callCount = 0;

    mockQuestion.mockResolvedValueOnce(inputs[callCount++]);
    mockQuestion.mockResolvedValueOnce(inputs[callCount++]);

    const playerMock = [
      { name: 'Dineshraj', symbol: 'x' },
      { name: 'Chloe', symbol: 'o' }
    ];
    await Connect4(rows, cols);
    expect(runGameMock).toHaveBeenCalledWith([['.']], playerMock, rows, cols);
  });
});
