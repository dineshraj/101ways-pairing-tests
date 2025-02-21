export const makePlayers = (playerNames: string[]) => { 
  return playerNames.map((name) => ({ name, total: 0, won: false }));
};
