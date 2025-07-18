import { describe, it, expect, vitest, vi } from "vitest";
import {
  asPercentage,
  getTotalVotes,
  roundTo2dp,
  transformData
} from "../src/transformData";

describe("transformData", () => {
  describe("transformDataMethod", () => {
    it("transforms the data to the required structure", async () => {
      const expectedTransformation = [
        {
          constituencyName: "Cardiff West",
          totalVotes: 35809,
          votes: [
            {
              party: "Conservatives",
              votePercentage: "30.76%"
            },
            {
              party: "Labour",
              votePercentage: "49.72%"
            },
            {
              party: "UKIP",
              votePercentage: "13.75%"
            },
            {
              party: "Liberal Democrats",
              votePercentage: "5.78%"
            }
          ]
        },
        {
          constituencyName: "Islington South & Finsbury",
          totalVotes: 43820,
          votes: [
            {
              party: "Labour",
              votePercentage: "51.45%"
            },
            {
              party: "Conservatives",
              votePercentage: "21.43%"
            },
            {
              party: "Liberal Democrats",
              votePercentage: "11.02%"
            },
            {
              party: "UKIP",
              votePercentage: "7.7%"
            },
            {
              party: "Green Party",
              votePercentage: "7.69%"
            },
            {
              party: "Independant",
              votePercentage: "0.71%"
            }
          ]
        },
        {
          constituencyName: "Harringey",
          totalVotes: 4470,
          votes: [
            {
              party: "Labour",
              votePercentage: "50.49%"
            },
            {
              party: "Conservatives",
              votePercentage: "21.01%"
            },
            {
              party: "Liberal Democrats",
              votePercentage: "10.94%"
            },
            {
              party: "UKIP",
              votePercentage: "8.39%"
            },
            {
              party: "Green Party",
              votePercentage: "8.3%"
            },
            {
              party: "Independant",
              votePercentage: "0.87%"
            }
          ]
        }
      ];
      const transformation = await transformData(
        `${__dirname}/fixtures/data.txt`
      );

      expect(transformation).toStrictEqual(expectedTransformation);
    });
  });

  describe("roundTo2dp", () => {
    it("rounds a value to 2dp", () => {
      const roundedValue = roundTo2dp(30.757630763215953);
      const expectedValue = 30.76;

      expect(roundedValue).toBe(expectedValue);
    });
  });

  describe("asPercentage", () => {
    it("calculates percentages correctly", () => {
      const calculatedPercentage = asPercentage(11014, 35809);
      const expectedPercentage = 30.76;

      expect(calculatedPercentage).toBe(expectedPercentage);
    });
  });

  describe("getTotalVotes", () => {
    it("gets the total votes when given a formatted array of data", () => {
      const data = [
        " 11014",
        " C",
        " 17803",
        " L",
        " 4923",
        " UKIP",
        " 2069",
        " LD"
      ];
      const totalVotes = getTotalVotes(data);
      const expectedTotal = 35809;

      expect(totalVotes).toBe(expectedTotal);
    });
  });
});
