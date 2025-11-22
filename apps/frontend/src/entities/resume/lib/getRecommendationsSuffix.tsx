const recommendationsLDMLPluralRulesToSuffix: Record<
  Intl.LDMLPluralRule,
  string
> = {
  zero: "рекомендаций",
  few: "рекомендации",
  many: "рекомендаций",
  one: "рекомендация",
  other: "рекомендаций",
  two: "рекомендации",
};

const rules = new Intl.PluralRules("ru", {
  type: "cardinal",
});

export const getRecommendationsSuffix = (count: number) => {
  return recommendationsLDMLPluralRulesToSuffix[rules.select(count)];
};
