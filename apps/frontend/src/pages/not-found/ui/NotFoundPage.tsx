import { Button, Center, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { LuArrowLeft, LuBird } from "react-icons/lu";
import { Link } from "react-router";

import { routes } from "@/shared/config/routes";

export const NotFoundPage: React.FC = () => {
  return (
    <Center w="100dvw" h="100dvh" my="auto">
      <Stack align="center">
        <ThemeIcon size={64} color="red" radius="xl" variant="filled">
          <LuBird size={36} />
        </ThemeIcon>

        <Stack component="hgroup" gap="xs">
          <Title size="h2" ta="center">
            Страница не найдена
          </Title>
          <Text c="dimmed" ta="center" fz="md">
            Этой страницы не существует.
          </Text>
        </Stack>
        <Button
          component={Link}
          to={routes.shell.home.$path()}
          leftSection={<LuArrowLeft size={24} />}
        >
          На главную
        </Button>
      </Stack>
    </Center>
  );
};
