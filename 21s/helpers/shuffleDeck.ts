const shuffleDeck = (deck: string[]) => {
  const shuffledDeck = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffledDeck;
};

export default shuffleDeck;