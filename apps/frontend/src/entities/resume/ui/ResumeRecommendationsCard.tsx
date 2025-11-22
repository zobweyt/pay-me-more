import { Card, Stack, Text, Title } from "@mantine/core";
import type React from "react";

import type { Recommendation } from "@/shared/api";

import { getRecommendationsSuffix } from "../lib/getRecommendationsSuffix";
import { ResumeRecommendationsAccordion } from "./ResumeRecommendationsAccordion";

export type ResumeRecommendationsCardProps = {
  recommendations: Recommendation[];
};

export const ResumeRecommendationsCard: React.FC<
  ResumeRecommendationsCardProps
> = ({ recommendations }) => {
  return (
    <Card>
      <Stack>
        <Stack component="hgroup" gap={4}>
          <Title size="h4" order={5}>
            Рекомендации
          </Title>
          <Text c="dimmed" size="sm" style={{ textWrap: "pretty" }}>
            {recommendations.length}{" "}
            {getRecommendationsSuffix(recommendations.length)} для увеличения
            вашей вилки зарплаты.
          </Text>
        </Stack>
        <ResumeRecommendationsAccordion recommendations={recommendations} />
        <Text c="dimmed" size="sm" style={{ textWrap: "pretty" }}>
          Попробуйте последовать одной из рекомендаций и посмотрите, как
          изменится ваша вилка.
        </Text>
      </Stack>
    </Card>
  );
};
