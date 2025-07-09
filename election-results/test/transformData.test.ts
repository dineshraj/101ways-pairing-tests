import { describe, it, expect, vitest, vi } from "vitest";
import { transformData } from "../src/transformData";

describe("transformData", () => {
  it("transforms the data to the required structure", async () => {
    const expectedTransformation = [
      {
        constituencyName: "Cardiff West",
        votes: [
          {
            party: "Conservatives",
            votePercentage: "11014"
          },
          {
            party: "Labour",
            votePercentage: "17803"
          },
          {
            party: "UKIP",
            votePercentage: '4923'
          },
          {
            party: "Liberal Democrats",
            votePercentage: '2069'
          }
        ]
      },
      {
        constituencyName: "Islington South & Finsbury",
        votes: [
          {
            party: "Labour",
            votePercentage: '22547'
          },
          {
            party: "Conservatives",
            votePercentage: "9389"
          },
          {
            party: "Liberal Democrats",
            votePercentage: '4829'
          },
          {
            party: "UKIP",
            votePercentage: '3375'
          },
          {
            party: "Green Party",
            votePercentage: '3371'
          },
          {
            party: "Independant",
            votePercentage: "309"
          }
        ]
      },
      {
        constituencyName: "Harringey",
        votes: [
          {
            party: "Labour",
            votePercentage: '2257'
          },
          {
            party: "Conservatives",
            votePercentage: "939"
          },
          {
            party: "Liberal Democrats",
            votePercentage: '489'
          },
          {
            party: "UKIP",
            votePercentage: '375'
          },
          {
            party: "Green Party",
            votePercentage: '371'
          },
          {
            party: "Independant",
            votePercentage: "39"
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
