export default (currentTime: number) => {
  return `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`;
};
