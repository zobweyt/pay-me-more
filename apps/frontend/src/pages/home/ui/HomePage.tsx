import { Stack, Title } from "@mantine/core";
import { useCallback, useState } from "react";

import { ResumeForm, type ResumeFormValues } from "@/entities/resume";
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

      <ResumeForm initialValues={resume} onSubmit={onSubmit} />
      <Recommendations recommendations={recommendations} />

      {JSON.stringify(resume)}
    </Stack>
  );
};
