import { Skeleton, Stack, Title, rem } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  ResumeForm,
  ResumeRecommendationsCard,
  ResumeSalaryForkCard,
} from "@/entities/resume";
import { RateResumeRecommendationsForm } from "@/features/rate-resume-recommendations";
import type { LlmResponse, SalaryDto } from "@/shared/api";

import { HomePageLanding } from "./HomePageLanding";
import { HomePageLoadingRecommendations } from "./HomePageLoadingRecommendations";
import { HomePageResponseEmpty } from "./HomePageResponseEmpty";

export const HomePage: React.FC = () => {
  const resumeFormRef = useRef<HTMLFormElement | null>(null);
  const randomNumberForRating = useMemo(
    () => Math.floor(Math.random() * 3) + 1,
    [],
  );
  const responseSectionRef = useRef<HTMLDivElement | null>(null);
  const [submitCount, setSubmitCount] = useState(0);
  const [recommendations, setRecommendations] = useState<
    LlmResponse | undefined
  >(undefined);
  const [salaryFork, setSalaryFork] = useState<SalaryDto | undefined>(
    undefined,
  );
  const [requestId, setRequestId] = useState(uuidv4());

  const [salaryForkLoading, setSalaryForkLoading] = useState<boolean>(false);
  const [recommendationsLoading, setRecommendationsLoading] =
    useState<boolean>(false);
  const [previousSalaryFork, setPreviousSalaryFork] = useState<
    SalaryDto | undefined
  >(undefined);

  const handleRecommendationsLoaded = (values: LlmResponse | undefined) => {
    setRecommendations(values);
  };

  const handleSalaryForkLoaded = (values: SalaryDto | undefined) => {
    setPreviousSalaryFork(salaryFork);
    setSalaryFork(values);
    scrollIntoResponseSection();
    setRequestId(uuidv4());
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
        requestId={requestId}
        onSalaryForkLoaded={handleSalaryForkLoaded}
        onSalaryForkLoadingChange={setSalaryForkLoading}
        onRecommendationsLoaded={handleRecommendationsLoaded}
        onRecommendationsLoadingChange={setRecommendationsLoading}
        onSubmitCountChange={setSubmitCount}
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

        {!!salaryFork &&
          !salaryForkLoading &&
          randomNumberForRating === submitCount && (
            <RateResumeRecommendationsForm submitCount={submitCount} />
          )}

        {!salaryFork && !recommendations && (
          <HomePageResponseEmpty onScrollIntoForm={scrollIntoResumeForm} />
        )}

        {/* <ResumeQualityProgressCard quality={response.quality} /> */}
      </Stack>
    </Stack>
  );
};
