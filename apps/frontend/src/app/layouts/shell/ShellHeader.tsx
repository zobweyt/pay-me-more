import { AppShell, Button, Group } from "@mantine/core";
import { Link, useLocation } from "react-router";

import { APP_SECTIONS } from "@/app/config/sections";
import type { CurrentUserResponse } from "@/shared/api";
import { routes } from "@/shared/config/routes";
import { CurrentUserMenu } from "@/widgets/current-user-menu";

export type ShellHeaderProps = {
  currentUser: CurrentUserResponse | null;
};

export const ShellHeader: React.FC<ShellHeaderProps> = ({ currentUser }) => {
  const { pathname } = useLocation();

  return (
    <AppShell.Header bg="var(--mantine-color-surface)" zIndex={1000000}>
      <Group
        h="100%"
        mx="auto"
        px="md"
        gap={0}
        maw="52rem"
        pos="relative"
        justify="space-between"
      >
        <Button
          component={Link}
          to={routes.shell.home.$path()}
          p={0}
          c="var(--mantine-body-color)"
          fz="md"
          variant="transparent"
          leftSection={
            <img
              src="/favicon.svg"
              alt="Логотип"
              width={32}
              height={32}
              draggable={false}
            />
          }
        >
          PayMeMore
        </Button>

        <Group
          mx="auto"
          gap={8}
          visibleFrom="sm"
          pos="absolute"
          left={0}
          right={0}
          style={{ top: "50%", transform: "translate(36%, -50%)" }}
        >
          {APP_SECTIONS.map((section) => (
            <Button
              component={Link}
              key={section.pathname}
              to={section.pathname}
              h={36}
              p="xs"
              c="var(--mantine-body-color)"
              color="gray"
              radius="xl"
              variant={pathname === section.pathname ? "light" : "subtle"}
              leftSection={<section.icon size={22} />}
            >
              {section.label}
            </Button>
          ))}
        </Group>

        {currentUser ? (
          <CurrentUserMenu currentUser={currentUser} />
        ) : (
          <Button
            component={Link}
            to={routes.auth.fastlogin.$path()}
            h={36}
            px="md"
            radius="xl"
          >
            Войти
          </Button>
        )}
      </Group>
    </AppShell.Header>
  );
};
