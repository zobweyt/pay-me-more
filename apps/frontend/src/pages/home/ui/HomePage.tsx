import { Stack, Title } from "@mantine/core";

import { ResumeForm } from "@/entities/resume";

export const HomePage: React.FC = () => {
  return (
    <Stack gap="xs">
      <Title order={1} size="h2">
        Главная
      </Title>
      <ResumeForm />
    </Stack>
  );
};
