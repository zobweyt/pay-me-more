import { Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";

import { currentUserQueries } from "@/entities/current-user";

import { Shell } from "./Shell";

export const ShellLayout: React.FC = () => {
  const { data: currentUser, isLoading } = useQuery(
    currentUserQueries.detail(),
  );

  if (isLoading || currentUser === undefined) {
    return (
      <Center mih="100dvh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Shell currentUser={currentUser}>
      <Outlet />
    </Shell>
  );
};
