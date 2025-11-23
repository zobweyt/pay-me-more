import { Card, Rating, Stack, Text, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";

import { client } from "@/shared/api";

export const RateResumeRecommendationsForm: React.FC<{
  submitCount: number;
}> = ({ submitCount }) => {
  const [rated, setRated] = useState(false);

  const handleRatingChange = async (rating: number) => {
    setRated(true);

    console.log(`Оцнека ${rating} на ${submitCount} пересчёт.`);
    notifications.show({
      icon: <LuCheck size={20} />,
      color: "green",
      message: "Спасибо за оценку!",
    });

    // submitCount
    try {
      await client.POST("/feedback/rate", {
        body: { value: rating, time: submitCount },
      });
    } catch (e) {
      console.log("Failed to send feedback", e);
    }
  };

  return (
    <Card>
      <Stack>
        <Stack component="hgroup" gap={4}>
          <Title size="h4" order={5}>
            Оцените результат
          </Title>
          <Text c="dimmed" size="sm" style={{ textWrap: "pretty" }}>
            Поставьте оценку расчёту вилки и рекомендациям от ИИ.
          </Text>
        </Stack>

        <Rating size="lg" onChange={handleRatingChange} readOnly={rated} />
      </Stack>
    </Card>
  );
};
