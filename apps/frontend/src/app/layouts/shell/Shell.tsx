import { AppShell, Stack } from "@mantine/core";
import { useEffect } from "react";
import { useLocation } from "react-router";

import type { CurrentUserResponse } from "@/shared/api";
import { useIsMobile } from "@/shared/lib/breakpoints";

import { ShellFooter } from "./ShellFooter";
import { ShellHeader } from "./ShellHeader";

export type ShellProps = React.PropsWithChildren<{
  currentUser: CurrentUserResponse | null;
}>;

export const Shell: React.FC<ShellProps> = ({ currentUser, children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <AppShell
      header={{ height: 56 }}
      footer={{ height: 60, collapsed: !isMobile }}
    >
      <ShellHeader currentUser={currentUser} />

      <AppShell.Main px="md" mx="auto" maw="52rem">
        <Stack py="lg">{children}</Stack>
      </AppShell.Main>

      <ShellFooter />
    </AppShell>
  );
};
