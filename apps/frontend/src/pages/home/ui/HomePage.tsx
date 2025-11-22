import { Stack, Title, rem } from "@mantine/core";
import { usePrevious } from "@mantine/hooks";
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
  const resumeFormRef = useRef<HTMLFormElement | null>(null);
  const responseSectionRef = useRef<HTMLDivElement | null>(null);
  const [response, setResponse] = useState<ServiceResponse | undefined>(
    undefined,
  );
  const previousResponse = usePrevious(response);

  const handleSubmit = (values: ServiceResponse | undefined) => {
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

  const scrollIntoResumeForm = () => {
    requestAnimationFrame(() => {
      resumeFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    });
  };

  return (
    <Stack gap="xl">
      <HomePageLanding onScrollIntoForm={scrollIntoResumeForm} />

      <ResumeForm ref={resumeFormRef} onSubmit={handleSubmit} />

      <Stack ref={responseSectionRef} style={{ scrollMarginTop: rem(64) }}>
        <Title size="h3" order={4}>
          Оценка от ИИ
        </Title>

        {response ? (
          <>
            <ResumeSalaryForkCard
              salary={response.salary}
              previousSalary={previousResponse?.salary}
            />
            <ResumeQualityProgressCard quality={response.quality} />
            <ResumeRecommendationsCard
              recommendations={response.recommendations}
            />
          </>
        ) : (
          <HomePageResponseEmpty onScrollIntoForm={scrollIntoResumeForm} />
        )}

        {/* <VacanciesList vacancies={response.recommend_vacancies} /> */}
      </Stack>
    </Stack>
  );
};
