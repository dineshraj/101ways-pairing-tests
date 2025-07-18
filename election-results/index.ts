import { transformData } from "./src/transformData";

const run = async () => {
  const transformatedData = await transformData(`${__dirname}/data.txt`);

  transformatedData.forEach((constituency, i) => {
    console.log(`\n=== ${constituency.constituencyName} ===`);
    console.log(`Total Votes: ${constituency.totalVotes}`);
    console.table(constituency.votes);
  });
};

run();
