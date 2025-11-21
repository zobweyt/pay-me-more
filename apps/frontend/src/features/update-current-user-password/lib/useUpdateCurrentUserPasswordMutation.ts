import { useMutation } from "@tanstack/react-query";

import { updateCurrentUserPassword } from "../api/updateCurrentUserPassword";

export const useUpdateCurrentUserPasswordMutation = () => {
  return useMutation({
    mutationKey: ["update-current-user-password"],
    mutationFn: updateCurrentUserPassword,
  });
};
