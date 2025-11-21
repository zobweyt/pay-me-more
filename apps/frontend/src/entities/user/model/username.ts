import { z } from "zod/v4/mini";

import {
  USER_USERNAME_MAX_LENGTH,
  USER_USERNAME_MIN_LENGTH,
  USER_USERNAME_PATTERN,
} from "../config/username";

export const UserUsernameSchema = z.string().check(
  z.minLength(USER_USERNAME_MIN_LENGTH, {
    error: `Имя пользователя должно быть минимум ${USER_USERNAME_MIN_LENGTH} символов.`,
  }),
  z.maxLength(USER_USERNAME_MAX_LENGTH, {
    error: `Имя пользователя должно быть максимум ${USER_USERNAME_MAX_LENGTH} символов.`,
  }),
  z.regex(new RegExp(USER_USERNAME_PATTERN), {
    error:
      "Имя пользователя должно содержать только латинские буквы, цифры или подчёркивания.",
  }),
  z.trim(),
);
