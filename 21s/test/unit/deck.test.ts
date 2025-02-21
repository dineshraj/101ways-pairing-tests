import { makeDeck, shuffleDeck, dealCard } from '../../helpers/deck';

describe('makeDeck', () => {
  it('makes a deck of cards', () => {
    const mockDeck = [2, 3, 4];
    const deck = makeDeck(mockDeck);
    expect(deck).toHaveLength(12);
    expect(deck).toEqual([2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
  });
});

describe('shuffleDeck', () => {
  it('shuffles the deck', () => {
    const mockDeck = [2, 3, 4, 5, 6];
    const shuffledDeck = shuffleDeck(mockDeck);
    expect(shuffledDeck).toHaveLength(5);
    expect(shuffledDeck).not.toEqual(mockDeck);
  });
});

describe('dealCard', () => {
  it('deals a card to a player', () => {
    const mockDeck = [2, 3, 4, 5, 6];
    const card = dealCard(mockDeck);
    expect(card).toBe(6);
  });
});