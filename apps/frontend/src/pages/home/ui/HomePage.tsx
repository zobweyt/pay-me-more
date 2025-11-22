import { Stack, Title, rem } from "@mantine/core";
import { useRef, useState } from "react";

import {
  ResumeForm,
  ResumeQualityProgressCard,
  ResumeRecommendationsCard,
  ResumeSalaryForkCard,
} from "@/entities/resume";
import type { ServiceResponse } from "@/shared/api";

import { HomePageLanding } from "./HomePageLanding";
import { HomePageResponseEmpty } from "./HomePageResponseEmpty";

export const HomePage: React.FC = () => {
  const responseSectionRef = useRef<HTMLDivElement | null>(null);
  const [response, setResponse] = useState<ServiceResponse | null>(null);

  const handleSubmit = (values: ServiceResponse) => {
    setResponse(values);
    scrollIntoResponseSection();
  };

  const scrollIntoResponseSection = () => {
    requestAnimationFrame(() => {
      responseSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  };

  return (
    <Stack gap="xl">
      <HomePageLanding />

      <ResumeForm onSubmit={handleSubmit} />

      <Stack ref={responseSectionRef} style={{ scrollMarginTop: rem(64) }}>
        <Title size="h3" order={4}>
          Оценка от ИИ
        </Title>

        {response ? (
          <>
            <ResumeSalaryForkCard salary={response.salary} />
            <ResumeQualityProgressCard quality="moderate" />
            <ResumeRecommendationsCard
              recommendations={response.recommendations}
            />
          </>
        ) : (
          <HomePageResponseEmpty />
        )}

        {/* <VacanciesList vacancies={response.recommend_vacancies} /> */}
      </Stack>
    </Stack>
  );
};
