import { useMutation, useQueryClient } from "@tanstack/react-query";

import { currentUserQueries } from "@/entities/current-user";

import { login } from "../api/login";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const handleOk = async () => {
    await queryClient.invalidateQueries({
      queryKey: currentUserQueries.detail().queryKey,
    });
  };

  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: ({ status }) => {
      if (status === 200) {
        return handleOk();
      }
    },
  });
};
