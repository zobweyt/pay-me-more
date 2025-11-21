import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import type { operations } from "@/shared/api";

import { getUser } from "../api/getUser";
import { getUsers } from "../api/getUsers";

export const userQueries = {
  all: () => ["users"],
  lists: () => [...userQueries.all(), "list"],
  list: ({
    limit = 100,
    ...query
  }: operations["get_users_users_get"]["parameters"]["query"] = {}) =>
    infiniteQueryOptions({
      queryKey: [...userQueries.lists(), query],
      queryFn: ({ pageParam }) =>
        getUsers({ ...query, limit, offset: (pageParam - 1) * limit }),
      select: (data) => ({
        users: [...data.pages].flatMap((page) => page?.users ?? []),
      }),
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage?.pagination.prev_page,
      getNextPageParam: (lastPage) => lastPage?.pagination.next_page,
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    }),
  details: () => [...userQueries.all(), "detail"],
  detail: (username: string) =>
    queryOptions({
      queryKey: [...userQueries.details(), username],
      queryFn: () => getUser(username),
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    }),
};
