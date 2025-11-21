import {
  Button,
  Center,
  Flex,
  Group,
  Loader,
  SegmentedControl,
  type SegmentedControlItem,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { LuArrowLeft } from "react-icons/lu";
import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router";
import { useTypedSearchParams } from "react-router-typesafe-routes";

import { currentUserQueries } from "@/entities/current-user";
import { routes } from "@/shared/config/routes";
import { ColorSchemeSegmentedControl } from "@/shared/ui/ColorSchemeSegmentedControl";

const authSegmentedControlItems = [
  { label: "Вход", value: "login" },
  { label: "Регистрация", value: "register" },
] as const satisfies SegmentedControlItem[];

type AuthType = (typeof authSegmentedControlItems)[number]["value"];

export const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [{ redirect }] = useTypedSearchParams(routes.auth);
  const { data: currentUser, isLoading } = useQuery(
    currentUserQueries.detail(),
  );

  if (isLoading) {
    return (
      <Center mih="100dvh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (currentUser) {
    return <Navigate to={redirect ?? routes.shell.home.$path()} replace />;
  }

  return (
    <Flex
      p="md"
      bg="light-dark(var(--mantine-color-white), var(--mantine-color-dark-7))"
      gap="xl"
      mih="100dvh"
      align="center"
      justify="center"
      direction="column"
    >
      <Button
        component={Link}
        to={routes.shell.home.$path()}
        me="auto"
        radius="xl"
        variant="subtle"
        leftSection={<LuArrowLeft size={16} />}
      >
        На главную
      </Button>

      <Stack maw="24rem" w="100%" my="auto">
        <Center>
          <img
            src="/favicon.svg"
            alt="Логотип"
            width={64}
            height={64}
            draggable={false}
          />
        </Center>

        <Stack component="hgroup" gap="xs">
          <Title order={1} size="h4" ta="center" fw={600}>
            Добро пожаловать!
          </Title>
          <Text size="sm" ta="center">
            Войдите или зарегистрируйтесь, чтобы продолжить.
          </Text>
        </Stack>

        <SegmentedControl
          data={Array.from(authSegmentedControlItems)}
          value={location.pathname.replace("/", "")}
          onChange={(value) => {
            navigate(
              routes.auth[value as AuthType].$buildPath({
                searchParams: { redirect },
              }),
            );
          }}
        />

        <Outlet />
      </Stack>

      <Group w="100%" justify="space-between" mx="auto">
        <Group gap="xs">
          <img
            src="/favicon.svg"
            alt="Логотип"
            width={24}
            height={24}
            draggable={false}
          />
          <Text fw={500} size="sm">
            PayMeMore
          </Text>
        </Group>
        <ColorSchemeSegmentedControl />
      </Group>
    </Flex>
  );
};
