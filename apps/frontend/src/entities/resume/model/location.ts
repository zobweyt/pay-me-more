import { z } from "zod/v4";

export const ResumeLocationSchema = z
  .string()
  .min(1, "Пожалуйста, введите город!");
