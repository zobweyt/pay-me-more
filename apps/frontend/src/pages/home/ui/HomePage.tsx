import { Skeleton, Stack, Title, rem } from "@mantine/core";
import { useRef, useState } from "react";

import {
  ResumeForm,
  ResumeRecommendationsCard,
  ResumeSalaryForkCard,
} from "@/entities/resume";
import type { LlmResponse, Salary } from "@/shared/api";

import { HomePageLanding } from "./HomePageLanding";
import { HomePageLoadingRecommendations } from "./HomePageLoadingRecommendations";
import { HomePageResponseEmpty } from "./HomePageResponseEmpty";

export const HomePage: React.FC = () => {
  const resumeFormRef = useRef<HTMLFormElement | null>(null);
  const responseSectionRef = useRef<HTMLDivElement | null>(null);
  const [recommendations, setRecommendations] = useState<
    LlmResponse | undefined
  >(undefined);
  const [salaryFork, setSalaryFork] = useState<Salary | undefined>(undefined);

  const [salaryForkLoading, setSalaryForkLoading] = useState<boolean>(false);
  const [recommendationsLoading, setRecommendationsLoading] =
    useState<boolean>(false);
  const [previousSalaryFork, setPreviousSalaryFork] = useState<
    Salary | undefined
  >(undefined);

  const handleRecommendationsLoaded = (values: LlmResponse | undefined) => {
    setRecommendations(values);
  };

  const handleSalaryForkLoaded = (values: Salary | undefined) => {
    setPreviousSalaryFork(salaryFork);
    setSalaryFork(values);
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

      <ResumeForm
        ref={resumeFormRef}
        onSalaryForkLoaded={handleSalaryForkLoaded}
        onSalaryForkLoadingChange={setSalaryForkLoading}
        onRecommendationsLoaded={handleRecommendationsLoaded}
        onRecommendationsLoadingChange={setRecommendationsLoading}
      />

      <Stack ref={responseSectionRef} style={{ scrollMarginTop: rem(64) }}>
        <Title size="h3" order={4}>
          Оценка от ИИ
        </Title>

        {salaryForkLoading ? (
          <Skeleton h={341} />
        ) : (
          salaryFork && (
            <ResumeSalaryForkCard
              salary={salaryFork}
              previousSalary={previousSalaryFork}
            />
          )
        )}
        {recommendationsLoading ? (
          <HomePageLoadingRecommendations />
        ) : (
          recommendations && (
            <ResumeRecommendationsCard
              recommendations={recommendations.recommendations}
            />
          )
        )}

        {!salaryFork && !recommendations && (
          <HomePageResponseEmpty onScrollIntoForm={scrollIntoResumeForm} />
        )}

        {/* <ResumeQualityProgressCard quality={response.quality} /> */}
        {/* <VacanciesList vacancies={response.recommend_vacancies} /> */}
      </Stack>
    </Stack>
  );
};
