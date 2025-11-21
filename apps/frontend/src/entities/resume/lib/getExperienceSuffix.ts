const experienceLDMLPluralRulesToSuffix: Record<Intl.LDMLPluralRule, string> = {
  zero: "лет",
  few: "года",
  many: "лет",
  one: "год",
  other: "года",
  two: "года",
};

const rules = new Intl.PluralRules("ru", {
  type: "cardinal",
});

export const getExperienceSuffix = (count: number) => {
  return experienceLDMLPluralRulesToSuffix[rules.select(count)];
};
