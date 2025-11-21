import { Group, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { currentUserQueries } from "@/entities/current-user";
import { UserCreatedAtCard, UserIdCard, UserSection } from "@/entities/user";

import { CurrentUserPasswordCard } from "./CurrentUserPasswordCard";
import { CurrentUserUsernameCard } from "./CurrentUserUsernameCard";

export const SettingsPage: React.FC = () => {
  const { data: currentUser } = useQuery(currentUserQueries.detail());

  if (!currentUser) {
    return null;
  }

  return (
    <Stack>
      <Group gap="xs" justify="space-between">
        <Title order={1} size="h2">
          Настройки
        </Title>

        {/* <Tooltip label="Посмотреть профиль" position="bottom">
          <ActionIcon
            component={Link}
            to={routes.shell.user.$buildPath({
              params: { username: currentUser.username },
              searchParams: { back: routes.shell.settings.$path() },
            })}
            c="dimmed"
            size="lg"
            color="gray"
            radius="xl"
            variant="subtle"
          >
            <LuEye size={24} />
          </ActionIcon>
        </Tooltip> */}
      </Group>

      <Stack gap="xl">
        <UserSection user={currentUser} />

        <Stack gap="sm">
          <Title order={3} size="xl">
            Управление аккаунтом
          </Title>
          <CurrentUserUsernameCard value={currentUser.username} />
          <CurrentUserPasswordCard />
        </Stack>

        <Stack gap="sm">
          <Title order={3} size="xl">
            Информация об аккаунте
          </Title>
          <UserCreatedAtCard value={currentUser.created_at} />
          <UserIdCard value={currentUser.id} />
        </Stack>
      </Stack>
    </Stack>
  );
};
