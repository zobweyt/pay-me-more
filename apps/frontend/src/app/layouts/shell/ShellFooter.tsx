import { AppShell, Flex, NavLink, Text } from "@mantine/core";
import { Link, useLocation } from "react-router";

import { APP_SECTIONS } from "@/app/config/sections";

export const ShellFooter: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <AppShell.Footer bg="var(--mantine-color-surface)" hiddenFrom="sm">
      <Flex justify="space-between">
        {APP_SECTIONS.map((section) => (
          <NavLink
            component={Link}
            key={section.pathname}
            to={section.pathname}
            active={pathname === section.pathname}
            label={
              <Flex align="center" justify="center" direction="column">
                <section.icon size={24} />
                <Text mt={4} lh={1.25} fw={600} fz="xs">
                  {section.label}
                </Text>
              </Flex>
            }
            bg="transparent"
            variant="subtle"
          />
        ))}
      </Flex>
    </AppShell.Footer>
  );
};
