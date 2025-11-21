import { Flex, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import type React from "react";
import { LuTarget } from "react-icons/lu";

import type { Recommendation } from "../model/recommendation";
import { RecommendationCard } from "./RecommendationCard";

export interface RecommendationsProps {
  recommendations: Recommendation[];
}

export const Recommendations: React.FC<RecommendationsProps> = ({
  recommendations,
}) => {
  return (
    <Flex direction="column" gap={20}>
      {recommendations.length ? (
        <Group>
          <ThemeIcon size="xl" variant="light" color="orange.5">
            <LuTarget size={24} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={600} size="lg">
              Ваша рыночная стоимость
            </Text>
            <Text>На основе анализа актуальных вакансий</Text>
          </Stack>
        </Group>
      ) : null}
      <Flex direction="column">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </Flex>
    </Flex>
  );
};
