import { z } from "zod/v4/mini";

import {
  USER_PASSWORD_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH,
  USER_PASSWORD_PATTERN,
} from "../config/password";

export const UserPasswordSchema = z.string().check(
  z.minLength(USER_PASSWORD_MIN_LENGTH, {
    error: `Пароль должен быть минимум ${USER_PASSWORD_MIN_LENGTH} символов.`,
  }),
  z.maxLength(USER_PASSWORD_MAX_LENGTH, {
    error: `Пароль должен быть максимум ${USER_PASSWORD_MAX_LENGTH} символов.`,
  }),
  z.regex(new RegExp(USER_PASSWORD_PATTERN), {
    error:
      "Пароль должен содержать только латинские буквы, цифры или символы !@#$%^&*",
  }),
  z.trim(),
);
