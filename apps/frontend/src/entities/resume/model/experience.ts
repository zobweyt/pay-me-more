import { z } from "zod/v4";

export const ResumeExperienceSchema = z
  .number("Пожалуйста, введите опыт.")
  .nonnegative(
    "Введите положительное число (да-да, мы это тоже проверяем, тут не поймали).",
  );
