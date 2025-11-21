import { z } from "zod/v4";

import { UserPasswordSchema, UserUsernameSchema } from "@/entities/user";

export const RegisterFormSchema = z
  .object({
    username: UserUsernameSchema,
    password1: UserPasswordSchema,
    password2: UserPasswordSchema,
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Пароли не совпадают.",
    path: ["password2"],
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
