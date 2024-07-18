import snacksnack from '.'


describe('Snack Snack', () => {
  let consoleLogMock; 

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log');
  })

  afterEach(() => {
    jest.resetAllMocks();
  })


  it('prints out the order sequence with the correct time', () => {
    const ordersMock: Array<string> = ['sandwich 1', 'sandwich 2'];
    const orders = snacksnack(ordersMock);

    const expectedOrderSequence = [
      'Order sandwich 1: time till served: 60',
      '0:00 make sandwich 1',
      '1:00 serve sandwich 1',
      'Order sandwich 2: time till served: 150',
      '1:30 make sandwich 2',
      '2:30 serve sandwich 2',
    ];

    expect(orders).toEqual(expectedOrderSequence);
  });

  it('does not add the order to the queue if the order will take more than 5 minutes', () => {
    const largeOrderMock: Array<string> = ['sandwich 1', 'sandwich 2', 'sandwich 3', 'sandwich 4', 'sandwich 5'];
    const orders = snacksnack(largeOrderMock);

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


  it('logs out that the order has been cancelled', () => {
    const largeOrderMock: Array<string> = ['sandwich 1', 'sandwich 2', 'sandwich 3', 'sandwich 4', 'sandwich 5'];
    snacksnack(largeOrderMock);

    expect(consoleLogMock).toHaveBeenCalledWith('Order sandwich 4 will take too long, so it has been cancelled');
    expect(consoleLogMock).toHaveBeenCalledWith('Order sandwich 5 will take too long, so it has been cancelled');
  });

});
