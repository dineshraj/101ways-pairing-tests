import fs from "fs";
import readline from "readline";

import { getFullPartyName } from "./getFullPartyName";

interface PartyVotes {
  party: string;
  votePercentage: string;
}

interface DataArray {
  constituencyName: string;
  votes: Array<PartyVotes>;
}

export const transformData = async (electionData: string) => {
  let transformedData: Array<DataArray> = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(electionData)
  });

  for await (const line of rl) {
    const pairSize = 2;
    let votes: Array<PartyVotes> = [];

    const items = line.split(",");

    //TODO error checking that it isn't a number
    const currentConstituency = items.shift() || "";

    //TODO error checking if the there are tuples and not an odd one( obviously more complex than that, like check each tuple contains a number and a string and also check that the string corresponds with a party)
    for (let i = 0; i < items.length; i += pairSize) {
      const voteAndPartyArray = items.slice(i, i + pairSize);
      votes.push({
        party: getFullPartyName(voteAndPartyArray[1]),
        votePercentage: voteAndPartyArray[0].trim()
      });
    }

    transformedData.push({
      constituencyName: currentConstituency,
      votes
    });

  }
  return transformedData;
};

// export const getConstituency = (line: string) => {};
