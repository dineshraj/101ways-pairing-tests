const partyTranslation = {
  L: "Labour",
  C: "Conservatives",
  LD: "Liberal Democrats",
  UKIP: "UKIP",
  G: "Green Party",
  Ind: "Independant"
};

export const getFullPartyName = (acronym: string) => {
  const trimmedAcronym = acronym.trim();
  return partyTranslation[trimmedAcronym as keyof typeof partyTranslation];
};
