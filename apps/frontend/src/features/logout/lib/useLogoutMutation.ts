import { useMutation, useQueryClient } from "@tanstack/react-query";

import { currentUserQueries } from "@/entities/current-user";
import { clearAccessToken } from "@/shared/api";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      clearAccessToken();
    },
    onSuccess: () => {
      queryClient.setQueryData(currentUserQueries.detail().queryKey, null);
    },
  });
};
