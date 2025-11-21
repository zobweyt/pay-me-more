import { Flex, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import type React from "react";
import { LuTarget } from "react-icons/lu";

import type { Recommendation } from "@/shared/api";

import { ResumeRecommendationCard } from "./ResumeRecommendationCard";

export type ResumeRecommendationsListProps = {
  recommendations: Recommendation[];
};

export const ResumeRecommendationsList: React.FC<
  ResumeRecommendationsListProps
> = ({ recommendations }) => {
  return (
    <Flex direction="column" gap={20}>
      {recommendations.length ? (
        <Group>
          <ThemeIcon size="xl" variant="light" color="orange.5">
            <LuTarget size={24} />
          </ThemeIcon>
          <Stack gap={0}>
            <Title order={5} size="lg">
              Рекомендации
            </Title>
            <Text>
              {recommendations.length} рекомендаций для увеличения вашей вилки.
            </Text>
          </Stack>
        </Group>
      ) : null}
      <Flex direction="column">
        {recommendations.map((recommendation, index) => (
          <ResumeRecommendationCard
            key={`recommendation-${index}`}
            recommendation={recommendation}
          />
        ))}
      </Flex>
    </Flex>
  );
};
