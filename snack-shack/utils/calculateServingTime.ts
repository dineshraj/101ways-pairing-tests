import currentTimeToString from './currentTimeToString';

export default (currentTime: number, timeToMakeBurger: number, timeToServe: number): [number, string] => {
  let currentTimeNew = currentTime;
  // burger has been made so add 60 to the current time, this is also the serving time
  currentTimeNew += timeToMakeBurger;
  const currentTimeString = currentTimeToString(currentTimeNew);
  // it takes 30 seconds to serve, so add that to the current time
  currentTimeNew += timeToServe;
  // return the currentTime before elapsed serving time to display the beginning of when serve begins
  return [currentTimeNew, currentTimeString];
};