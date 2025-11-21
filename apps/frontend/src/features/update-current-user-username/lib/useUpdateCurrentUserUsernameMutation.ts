import { useMutation, useQueryClient } from "@tanstack/react-query";

import { currentUserQueries } from "@/entities/current-user";

import { updateCurrentUserUsername } from "../api/updateCurrentUserUsername";

export const useUpdateCurrentUserUsernameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-current-user-username"],
    mutationFn: updateCurrentUserUsername,
    onSuccess: ({ currentUser }) => {
      if (!currentUser) {
        return;
      }

      queryClient.setQueryData(
        currentUserQueries.detail().queryKey,
        currentUser,
      );
    },
  });
};
