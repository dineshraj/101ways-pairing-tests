import calculateServingTime from './calculateServingTime';

describe('calculateServingTime', () => {
  it('returns the new current time and the serving time string', () => {
    const [currentTime, servingTimeString] = calculateServingTime(180, 60, 30);

    expect(currentTime).toBe(270);
    expect(servingTimeString).toBe('4:00');
  })
});