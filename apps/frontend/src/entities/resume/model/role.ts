import { z } from "zod/v4";

export const ResumeRoleSchema = z.string().min(1, "Пожалуйста, введите роль!");
