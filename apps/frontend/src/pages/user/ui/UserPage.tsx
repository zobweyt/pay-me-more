import {
  ActionIcon,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { LuArrowLeft, LuUserMinus } from "react-icons/lu";
import { Link } from "react-router";
import {
  useTypedParams,
  useTypedSearchParams,
} from "react-router-typesafe-routes";

import {
  UserCreatedAtCard,
  UserIdCard,
  UserProfileLinkCopyButton,
  UserSection,
  UserUsernameCard,
  userQueries,
} from "@/entities/user";
import { routes } from "@/shared/config/routes";

import { UserPageSkeleton } from "./UserPageSkeleton";

export const UserPage: React.FC = () => {
  const { username = "" } = useTypedParams(routes.shell.user);
  const [{ back = routes.shell.users.$path() }] = useTypedSearchParams(
    routes.shell.user,
  );
  const { data: user, isLoading } = useQuery(userQueries.detail(username));

  const isEmpty = !isLoading && !user;

  return (
    <Stack>
      <Group gap="xs">
        <ActionIcon
          component={Link}
          to={back}
          c="dimmed"
          size="lg"
          color="gray"
          radius="xl"
          variant="subtle"
        >
          <LuArrowLeft size={24} />
        </ActionIcon>

        <Title order={1} size="h2">
          О пользователе
        </Title>

        <UserProfileLinkCopyButton username={username} />
      </Group>

      {isLoading && <UserPageSkeleton />}

      {isEmpty && (
        <Stack my="xl" align="center">
          <ThemeIcon size={64} color="red" radius="xl" variant="filled">
            <LuUserMinus size={36} />
          </ThemeIcon>

          <Stack component="hgroup" gap="xs">
            <Title size="h2" ta="center">
              Пользователь не найден
            </Title>
            <Text c="dimmed" ta="center" fz="md">
              Такого пользователя не существует.
            </Text>
          </Stack>
        </Stack>
      )}

      {user && (
        <Stack gap="xl">
          <UserSection user={user} />

          <Stack gap="sm">
            <Title order={3} size="xl">
              Информация об аккаунте
            </Title>
            <UserUsernameCard value={user.username} />
            <UserCreatedAtCard value={user.created_at} />
            <UserIdCard value={user.id} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};
