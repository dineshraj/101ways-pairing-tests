import shuffleDeck from "./shuffleDeck";

describe('shuffleDeck', () => {
  it('shuffles the deck', () => {
    const mockDeck = ['2', '3', '4', '5', '6'];
    const shuffledDeck = shuffleDeck(mockDeck);
    expect(shuffledDeck).toHaveLength(5);
    expect(shuffledDeck).not.toEqual(mockDeck);
  });
});
