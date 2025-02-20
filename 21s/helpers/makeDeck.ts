const makeDeck = (values: string[]) => {
  const deck = [];
  values.forEach((value) => {
    for (let i = 0; i < 4; i++) {
      deck.push(value);
    }
  });
  return deck;
};

export default makeDeck