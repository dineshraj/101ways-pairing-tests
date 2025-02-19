import calculateEstimatedOrderTime from './utils/calculateEstimatedOrderTime';
import calculateServingTime from './utils/calculateServingTime';
import currentTimeToString from './utils/currentTimeToString';

const TIME_TO_MAKE_BURGER = 60;
const TIME_TO_SERVE = 30;
const FIVE_MINUTES = 300;
const SEVEN_MINUTES = 420;

const processOrders = (orders: Array<string>) => {
  const orderSequence: Array<string> = [];
  let currentTime = 0;
  let estimatedTime = 0;

  orders.forEach((order) => {
    // start making the burger
    const makingTime = currentTimeToString(currentTime);
    const [newCurrentTime, servingTime] = calculateServingTime(currentTime, TIME_TO_MAKE_BURGER, TIME_TO_SERVE);
    const [newEstimatedTime, timeToGetToCustomer] = calculateEstimatedOrderTime(estimatedTime);

    if (newEstimatedTime <= FIVE_MINUTES) {
      currentTime = newCurrentTime;
      estimatedTime = newEstimatedTime;
      orderSequence.push(`Order ${order}: time till served: ${timeToGetToCustomer}`);
      orderSequence.push(`${makingTime} make ${order}`);
      orderSequence.push(`${servingTime} serve ${order}`);
    } else {
      console.log(`Order ${order} will take too long, so it has been cancelled`);
    }
  });
  return orderSequence;
};

const snacksnack = (orders: Array<string>) => {
  return processOrders(orders);
}

export default snacksnack;