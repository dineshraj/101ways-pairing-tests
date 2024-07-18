import currentTimeToString from './currentTimeToString';

export default (currentTime: number, timeToMakeBurger: number, timeToServe: number): [number, string] => {
  // burger has been made so add 60 to the current time, this is also the serving time
  currentTime += timeToMakeBurger;
  const currentTimeString = currentTimeToString(currentTime);
  // it takes 30 seconds to serve, so add that to the current time
  currentTime += timeToServe;
  // return the currentTime before elapsed serving time to display the beginning of when serve begins
  return [currentTime, currentTimeString];
};