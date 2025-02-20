import makeDeck from './makeDeck';

describe('makeDeck', () => {
  it('makes a deck of cards', () => {
    const mockDeck = ['2', '3', '4'];
    const deck = makeDeck(mockDeck);
    expect(deck).toHaveLength(12);
    expect(deck).toEqual([
      '2',
      '2',
      '2',
      '2',
      '3',
      '3',
      '3',
      '3',
      '4',
      '4',
      '4',
      '4',
    ]);
  });
});
