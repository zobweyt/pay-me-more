import { Stack, Title } from "@mantine/core";
import { useState } from "react";

import { ResumeForm, type ResumeFormValues } from "@/entities/resume";

export const HomePage: React.FC = () => {
  const [resume, setResume] = useState<ResumeFormValues | undefined>(undefined);

  return (
    <Stack gap="xs">
      <Title order={1} size="h2">
        Главная
      </Title>

      <ResumeForm initialValues={resume} onSubmit={setResume} />

      {JSON.stringify(resume)}
    </Stack>
  );
};
