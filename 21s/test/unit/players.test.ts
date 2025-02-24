import { expect, describe, it } from '@jest/globals';
import { makePlayers } from '../../helpers/players';

describe('makePlayers', () => {
  it('makes players', () => {
    const playerNames = ['Sam', 'Dealer'];
    const players = makePlayers(playerNames);
    expect(players).toHaveLength(2);
    expect(players[0]).toEqual({ name: 'Sam', total: 0, won: false });
    expect(players[1]).toEqual({ name: 'Dealer', total: 0, won: false });
  });
});
