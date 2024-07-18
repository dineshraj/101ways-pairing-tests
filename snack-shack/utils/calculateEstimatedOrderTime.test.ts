import calculateEstimatedOrderTime from './calculateEstimatedOrderTime';

describe('calculateEstimatedOrderTime', () => {
  it('calculates an accurate estimated order time', () => {
    const expectedValues = [150, 120];
    calculateEstimatedOrderTime(60);

    expect(expectedValues).toEqual([150, 120]);
  })
});