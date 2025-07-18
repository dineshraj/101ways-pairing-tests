import fs from "fs";
import readline from "readline";

import { getFullPartyName } from "./getFullPartyName";

interface PartyVotes {
  party: string;
  votePercentage: string;
}

interface DataArray {
  constituencyName: string;
  totalVotes: number;
  votes: Array<PartyVotes>;
}

export const transformData = async (electionData: string) => {
  let transformedData: Array<DataArray> = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(electionData)
  });






/*
TODO If there is a problem with the format of the results file then all good entries should result in output and the error should go to a separate error log with the problem explained in non-technical language that a journalist might be able to understand and report back to the results service.

Intepretation: 
* If the initial item of the link is not a string then disregard the line
* If it is a string but matches a party name then disregard the line
* If each tuple is not a ['number', 'party acronym'] disregard the tuple

*/


  for await (const line of rl) {
    const pairSize = 2;
    let votes: Array<PartyVotes> = [];
    let totalVotes = 0;
    const items = line.split(",");

    //TODO error checking that it isn't a number
    const currentConstituency = items.shift() as string;
    totalVotes = getTotalVotes(items);

    //TODO error checking if the there are tuples and not an odd one( obviously more complex than that, like check each tuple contains a number and a string and also check that the string corresponds with a party)
    for (let i = 0; i < items.length; i += pairSize) {
      const voteAndPartyArray = items.slice(i, i + pairSize);
      const votePercentage = asPercentage(
        parseInt(voteAndPartyArray[0].trim()),
        totalVotes
      );

      votes.push({
        party: getFullPartyName(voteAndPartyArray[1]),
        votePercentage: `${votePercentage}%`
      });
    }

    transformedData.push({
      constituencyName: currentConstituency,
      totalVotes,
      votes
    });

    totalVotes = 0;
  }
  return transformedData;
};

export const asPercentage = (a: number, b: number) => {
  const percentage = (a / b) * 100;
  return roundTo2dp(percentage);
};

export const roundTo2dp = (value: number) => {
  const decimalPoints = 2;
  const factor = Math.pow(10, decimalPoints);

  return Math.round(value * factor) / factor;
};

export const getTotalVotes = (voteTuples: string[]): number => {
  let totalVotes = 0;

  voteTuples.filter((value, index) => {
    if (index % 2 === 0) {
      totalVotes += parseInt(value.trim());
    }
  });

  return totalVotes;
};
