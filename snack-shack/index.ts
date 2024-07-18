import calculateEstimatedOrderTime from './utils/calculateEstimatedOrderTime';
import calculateServingTime from './utils/calculateServingTime';
import currenntTimeToString from './utils/currentTimeToString';

const timeToMakeBurger: number = 60;
const timeToServe: number = 30;
const fiveMinutes = 300;

const processOrders = (orders: Array<string>) => {
  const orderSequence: Array<string> = [];
  let currentTime: number = 0;
  let estimatedTime: number = 0;
  orders.forEach((order) => {
    // start making the burger
    const makingTime = currenntTimeToString(currentTime);
    const [newCurrentTime, servingTime] = calculateServingTime(currentTime, timeToMakeBurger, timeToServe);
    
    const [newEstimatedTime, timeToGetToCustomer] = calculateEstimatedOrderTime(estimatedTime);

    if (newEstimatedTime <= fiveMinutes) {
      currentTime = newCurrentTime;
      estimatedTime = newEstimatedTime;
      orderSequence.push(`Order ${order}: time till served: ${timeToGetToCustomer}`);
      orderSequence.push(`${makingTime} make ${order}`);
      orderSequence.push(`${servingTime} serve ${order}`);
    } else {
      console.log(`Order ${order} will take too long, so it has been cancelled`);
    }
  })
  return orderSequence;
};

const snacksnack = (orders: Array<string>) => {
  return processOrders(orders);
}

export default snacksnack;