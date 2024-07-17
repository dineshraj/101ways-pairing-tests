let currentTime = 0;
let estimatedTime = 0;
const timeToMakeBurger = 60;
const timeToServe = 30;

let orderSequence: Array<string> = [];

const calculateEstimatedOrderTime = (orderNo: number) => {
  /*
    so if you start an order it's the amount of orders made + the serving time needed  
  */
  estimatedTime += 60
  const timeToGetToCustomer = estimatedTime;
  estimatedTime += 30;
  return `estimated: ${timeToGetToCustomer}`;
}

const calculateStartOfMakingTime = (orderNo: number) => {
  // start making the burger
  const currentTimeString = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`;
  return currentTimeString;
};

const calculateServingTime = (orderNo: number): string => {
  // burger has been made so add 60 to the current time, this is also the serving time
  currentTime += timeToMakeBurger;
  const currentTimeString = `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`;
  // it takes 30 seconds to serve, so add that to the current time
  currentTime += timeToServe;
  // return the currentTime before elapsed serving time to display the beginning of when serve begins
  return currentTimeString;
};

const processOrders = (orders: Array<string>) => {
  orders.forEach((order, i) => {
    const makingTime = calculateStartOfMakingTime(i);
    const servingTime = calculateServingTime(i);
    const estimatedTime = calculateEstimatedOrderTime(i);
    orderSequence.push(`Order ${order}: time to serving ${estimatedTime}`);
    orderSequence.push(`${makingTime} make ${order}`);
    orderSequence.push(`${servingTime} serve ${order}`);
  })
};

const snacksnack = (orders: Array<string>) => {
  processOrders(orders);
  return orderSequence;
}

export default snacksnack;