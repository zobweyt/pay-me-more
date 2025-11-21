import { useMutation, useQueryClient } from "@tanstack/react-query";

import { currentUserQueries } from "@/entities/current-user";

import { register } from "../api/register";

export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  const handleCreated = async () => {
    await queryClient.invalidateQueries({
      queryKey: currentUserQueries.detail().queryKey,
    });
  };

  return useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: async ({ status }) => {
      if (status === 201) {
        return handleCreated();
      }
    },
  });
};
