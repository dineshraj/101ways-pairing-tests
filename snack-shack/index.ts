import calculateEstimatedOrderTime from './utils/calculateEstimatedOrderTime';
import calculateServingTime from './utils/calculateServingTime';
import currenntTimeToString from './utils/currentTimeToString';

let currentTime: number = 0;
let estimatedTime: number = 0;
const timeToMakeBurger: number = 60;
const timeToServe: number = 30;

let orderSequence: Array<string> = [];

const processOrders = (orders: Array<string>) => {
  orders.forEach((order, i) => {
    // start making the burger
    const makingTime = currenntTimeToString(currentTime);
    const [newCurrentTime, servingTime] = calculateServingTime(currentTime, timeToMakeBurger, timeToServe);
    currentTime = newCurrentTime;
    const [newEstimatedTime, timeToGetToCustomer] = calculateEstimatedOrderTime(estimatedTime);
    estimatedTime = newEstimatedTime;
    orderSequence.push(`Order ${order}: time till served: ${timeToGetToCustomer}`);
    orderSequence.push(`${makingTime} make ${order}`);
    orderSequence.push(`${servingTime} serve ${order}`);
  })
};

const snacksnack = (orders: Array<string>) => {
  processOrders(orders);
  return orderSequence;
}

export default snacksnack;