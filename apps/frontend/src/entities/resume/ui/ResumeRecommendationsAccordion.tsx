import { Accordion } from "@mantine/core";
import type React from "react";

import type { Recommendation } from "@/shared/api";

import { ResumeRecommendationsAccordionItem } from "./ResumeRecommendationsAccordionItem";

export type ResumeRecommendationsAccordionProps = {
  recommendations: Recommendation[];
};

export const ResumeRecommendationsAccordion: React.FC<
  ResumeRecommendationsAccordionProps
> = ({ recommendations }) => {
  return (
    <Accordion variant="separated" multiple defaultValue={["0"]}>
      {recommendations.map((recommendation, index) => (
        <ResumeRecommendationsAccordionItem
          key={index}
          value={index.toString()}
          recommendation={recommendation}
          mt={index === 0 ? 0 : "xs"}
        />
      ))}
    </Accordion>
  );
};
