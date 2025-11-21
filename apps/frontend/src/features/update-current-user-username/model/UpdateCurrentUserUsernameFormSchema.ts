import { z } from "zod/v4/mini";

import { UserUsernameSchema } from "@/entities/user";

export const UpdateCurrentUserUsernameFormSchema = z.object({
  username: UserUsernameSchema,
});

export type UpdateCurrentUserUsernameFormValues = z.infer<
  typeof UpdateCurrentUserUsernameFormSchema
>;
