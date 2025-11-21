import { Flex } from "@mantine/core";
import type React from "react";

import type { Recommendation } from "../model/recommendation";
import { RecommendationCard } from "./RecommendationCard";

export interface RecommendationsProps {
  recommendations: Recommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <Flex direction="column">
      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation.id}
          recommendation={recommendation}
        />
      ))}
    </Flex>
  );
};
