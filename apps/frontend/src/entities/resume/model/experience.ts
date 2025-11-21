import { z } from "zod/v4";

export const ResumeExperienceSchema = z
  .number("Пожалуйста, введите опыт.")
  .nonnegative();
