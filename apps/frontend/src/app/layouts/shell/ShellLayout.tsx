import { Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";

import { currentUserQueries } from "@/entities/current-user";
import { routes } from "@/shared/config/routes";

import { Shell } from "./Shell";

export type ShellLayoutProps = React.PropsWithChildren;

export const ShellLayout: React.FC<ShellLayoutProps> = () => {
  const { pathname, search } = useLocation();
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

  if (!currentUser) {
    return (
      <Navigate
        to={routes.auth.login.$buildPath({
          searchParams: { redirect: pathname + search },
        })}
        replace
      />
    );
  }

  return (
    <Shell currentUser={currentUser}>
      <Outlet />
    </Shell>
  );
};
