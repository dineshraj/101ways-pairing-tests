import { describe, it, expect } from "vitest";

import { getFullPartyName } from "../src/getFullPartyName";

describe("getFullPartyName", () => {
  it("translates shorterned versions of a party name to the full name", () => {
    const labourPartyName = getFullPartyName("L");
    const conservativePartyName = getFullPartyName("C");
    const liberalDemocratsPartyName = getFullPartyName("LD");
    const ukipPartyName = getFullPartyName("UKIP");
    const greenPartyName = getFullPartyName("G");
    const independantPartyName = getFullPartyName("Ind");

    expect(labourPartyName).toBe("Labour");
    expect(conservativePartyName).toBe("Conservatives");
    expect(liberalDemocratsPartyName).toBe("Liberal Democrats");
    expect(ukipPartyName).toBe("UKIP");
    expect(greenPartyName).toBe("Green Party");
    expect(independantPartyName).toBe("Independant");
  });
});
