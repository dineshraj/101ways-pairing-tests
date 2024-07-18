export default (estimatedTime: number): [number, number] => {
  // If you start an order it's the amount of orders made + the serving time needed  
  let newEstimatedTime = estimatedTime + 60;
  const timeToGetToCustomer = newEstimatedTime;
  newEstimatedTime += 30;

  return [newEstimatedTime, timeToGetToCustomer];
}