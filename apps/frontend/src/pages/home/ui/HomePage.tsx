import { Stack, Title, rem } from "@mantine/core";
import { useState } from "react";

import {
  ResumeForm,
  ResumeRecommendationsList,
  ResumeSalaryCard,
} from "@/entities/resume";
import { VacanciesList } from "@/entities/vacancy";
import type { ServiceResponse } from "@/shared/api";

import { HomePageLanding } from "./HomePageLanding";

export const HomePage: React.FC = () => {
  const [response, setResponse] = useState<ServiceResponse | null>(null);

  const onSubmit = (values: ServiceResponse) => {
    setResponse(values);
    requestAnimationFrame(() => {
      const responseElement = document.getElementById("home-page-response");
      responseElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  };

  return (
    <Stack gap="xl">
      <HomePageLanding />

      <ResumeForm onSubmit={onSubmit} />

      {!!response && (
        <Stack
          id="home-page-response"
          gap="lg"
          style={{ scrollMarginTop: rem(64) }}
        >
          <Title size="h3" order={4}>
            Оценка от ИИ
          </Title>
          <ResumeSalaryCard salary={response.salary} />
          <ResumeRecommendationsList
            recommendations={response.recommendations}
          />
          <VacanciesList vacancies={response.recommend_vacancies} />
        </Stack>
      )}
    </Stack>
  );
};
