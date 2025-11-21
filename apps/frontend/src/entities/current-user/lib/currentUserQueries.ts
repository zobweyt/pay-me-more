import { queryOptions } from "@tanstack/react-query";

import { getCurrentUser } from "../api/getCurrentUser";

export const currentUserQueries = {
  all: () => ["current-user"],
  detail: () =>
    queryOptions({
      queryKey: [...currentUserQueries.all(), "detail"],
      queryFn: getCurrentUser,
      staleTime: Infinity,
    }),
};
