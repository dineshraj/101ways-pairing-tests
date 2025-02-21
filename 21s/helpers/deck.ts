export const makeDeck = (values: number[]) => {
  const deck = [];
  values.forEach((value) => {
    for (let i = 0; i < 4; i++) {
      deck.push(value);
    }
  });
  return deck;
};

export const shuffleDeck = (deck: number[]) => {
  const shuffledDeck = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return shuffledDeck;
};

export const dealCard = (deck: number[]) => {
  return deck.pop();
}

export const isHigherThan21 = (number: number) => {
  return number > 21;
}