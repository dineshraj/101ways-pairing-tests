import snacksnack from '.'

const ordersMock: Array<string> = ['sandwich 1', 'sandwich 2', 'sandwich 3'];

describe('Snack Snack', () => {

  it('prints out the order sequence with the correct time', () => {
    const orders = snacksnack(ordersMock);

    const expectedOrderSequence = [
      'Order sandwich 1: time till served: 60',
      '0:00 make sandwich 1',
      '1:00 serve sandwich 1',
      'Order sandwich 2: time till served: 150',
      '1:30 make sandwich 2',
      '2:30 serve sandwich 2',
      'Order sandwich 3: time till served: 240',
      '3:00 make sandwich 3',
      '4:00 serve sandwich 3',
    ];

    expect(orders).toEqual(expectedOrderSequence);
  });

});
