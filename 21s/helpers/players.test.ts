import { makePlayers } from './players';

describe('makePlayers', () => {
  it('makes players', () => {
    const playerNames = ['Sam', 'Dealer'];
    const players = makePlayers(playerNames);
    expect(players).toHaveLength(2);
    expect(players[0]).toEqual({ name: 'Sam', total: 0 });
    expect(players[1]).toEqual({ name: 'Dealer', total: 0 });
  });
});
