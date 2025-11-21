import z from "zod/v4";

import {
  RESUME_SKILLS_MAX_COUNT,
  RESUME_SKILLS_MIN_COUNT,
} from "../config/skills";
import { ResumeExperienceSchema } from "./experience";
import { ResumeLocationSchema } from "./location";
import { ResumeRoleSchema } from "./role";
import { ResumeSkillSchema } from "./skill";

export const ResumeFormSchema = z.object({
  role: ResumeRoleSchema,
  skills: z
    .array(ResumeSkillSchema)
    .min(RESUME_SKILLS_MIN_COUNT, `Добавьте хотя бы один навык`)
    .max(
      RESUME_SKILLS_MAX_COUNT,
      `Максимальное количество навыков в резюме – ${RESUME_SKILLS_MAX_COUNT}.`,
    ),
  experience: ResumeExperienceSchema,
  location: ResumeLocationSchema,
});

export type ResumeFormValues = z.infer<typeof ResumeFormSchema>;
