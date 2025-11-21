import { Card, Flex, Text } from "@mantine/core";
import type React from "react";

import type { Recommendation } from "../model/recommendation";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation: { title, description, result },
}) => {
  return (
    <Card shadow="sm" padding="lg" radius="lg" withBorder>
      <Flex direction="row">
        <Flex direction="column" gap={10}>
          <Text fw={500}>{title}</Text>
          <Text size="sm">{description}</Text>
          <Text size="sm" c="orange">
            {result}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
