import { Stack, Title } from "@mantine/core";
import { useCallback, useState } from "react";

import type { Recommendation } from "@/entities/resume/model/recommendation";
import { Recommendations } from "@/entities/resume/ui/Recommendations";

const mock_recommendations: Recommendation[] = [
  {
    id: "708d16a9-472a-41bc-b6d7-35b50bb8c8d3",
    title: "Добавьте больше навыков",
    description:
      "У вас указано только 2 навыка. Добавление 5-7 ключевых технологий может значительно повысить вашу конкурентоспособность.",
    result: "Увеличение вилки на 15-25%",
  },
];

import {
  ResumeForm,
  type ResumeFormValues,
  ResumeSalaryCard,
} from "@/entities/resume";
import { VacancyCard } from "@/entities/vacancy";

import { mockVacancies } from "../config/mockVacancies";

export const HomePage: React.FC = () => {
  const [resume, setResume] = useState<ResumeFormValues | undefined>(undefined);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const onSubmit = useCallback(
    (values: ResumeFormValues) => {
      setResume(values);
      setRecommendations(mock_recommendations);
    },
    [setResume],
  );

  return (
    <Stack gap="xs">
      <Title order={1} size="h2">
        Главная
      </Title>

      <Stack>
        <ResumeForm initialValues={resume} onSubmit={onSubmit} />
        <ResumeSalaryCard salary={{ from: 300000, to: 400000 }} />
        <Recommendations recommendations={recommendations} />
        {mockVacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </Stack>
    </Stack>
  );
};
