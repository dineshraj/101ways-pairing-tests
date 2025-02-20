import twentyOnes from './';

describe('21s', () => {
  it('has an entry point to run the game', () => {
    expect(twentyOnes).toBeDefined();
  });

  it('runs the game', () => {
    const game = twentyOnes();
    expect(game).toBeDefined();
  });
});
