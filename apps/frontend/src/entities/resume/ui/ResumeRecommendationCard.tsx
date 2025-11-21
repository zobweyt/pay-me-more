import { Card, Flex, Text } from "@mantine/core";
import type React from "react";

import type { Recommendation } from "@/shared/api";

export type ResumeRecommendationCardProps = {
  recommendation: Recommendation;
};

export const ResumeRecommendationCard: React.FC<
  ResumeRecommendationCardProps
> = ({ recommendation: { title, subtitle, result } }) => {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Flex direction="row">
        <Flex direction="column" gap={10}>
          <Text fw={500}>{title}</Text>
          <Text size="sm">{subtitle}</Text>
          <Text size="sm" c="orange">
            {result}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
