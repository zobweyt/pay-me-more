import { Center, Loader } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";

import { currentUserQueries } from "@/entities/current-user";
import { routes } from "@/shared/config/routes";

export const ProtectedLayout: React.FC = () => {
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
        to={routes.auth.fastlogin.$buildPath({
          searchParams: { redirect: pathname + search },
        })}
        replace
      />
    );
  }

  return <Outlet />;
};
