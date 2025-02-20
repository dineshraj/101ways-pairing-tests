export const makePlayers = (playerNames: string[]) => { 
  return playerNames.map((name) => ({ name, total: 0 }));
};
