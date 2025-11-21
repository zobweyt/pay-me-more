import { Input, Loader, Stack, Title } from "@mantine/core";
import { useDebouncedValue, useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDeferredValue, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { useTypedSearchParams } from "react-router-typesafe-routes";

import { userQueries } from "@/entities/user";
import { routes } from "@/shared/config/routes";

import { UsersGrid } from "./UsersGrid";
import { UsersPageEmpty } from "./UsersPageEmpty";
import { UsersPageSkeleton } from "./UsersPageSkeleton";

export const UsersPage: React.FC = () => {
  const [searchParams, setSearchParams] = useTypedSearchParams(
    routes.shell.users,
  );
  const [debouncedSearchParams] = useDebouncedValue(searchParams, 300);
  const deferredSearchInputValue = useDeferredValue(searchParams.q ?? "");

  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery(
    userQueries.list(debouncedSearchParams),
  );

  const { ref, entry } = useIntersection({
    threshold: 0.1,
    rootMargin: "40%",
  });

  const hasUsers = !!data?.users.length;
  const isEmpty = !isLoading && !hasUsers;

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting]);

  return (
    <Stack gap="xs">
      <Title order={1} size="h2">
        Пользователи
      </Title>

      <Stack gap="sm">
        <Input
          value={deferredSearchInputValue}
          onChange={(event) =>
            setSearchParams(
              { q: event.currentTarget.value || undefined },
              { replace: true },
            )
          }
          leftSection={
            !isLoading && isFetching ? (
              <Loader size={18} />
            ) : (
              <LuSearch size={18} />
            )
          }
          rightSection={
            searchParams.q && (
              <Input.ClearButton
                onClick={() =>
                  setSearchParams({ q: undefined }, { replace: true })
                }
                tabIndex={-1}
              />
            )
          }
          placeholder="Поиск"
        />

        {isLoading && <UsersPageSkeleton />}

        {isEmpty && (
          <UsersPageEmpty
            onResetSearchParams={() => setSearchParams({}, { replace: true })}
          />
        )}

        {hasUsers && (
          <UsersGrid
            users={data.users}
            back={
              searchParams.q
                ? routes.shell.users.$buildPath({
                    searchParams: searchParams,
                  })
                : undefined
            }
          />
        )}

        <div ref={ref} />
      </Stack>
    </Stack>
  );
};
