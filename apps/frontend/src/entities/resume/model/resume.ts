import z from "zod/v4";

import { ResumeExperienceSchema } from "./experience";
import { ResumeLocationSchema } from "./location";
import { ResumeRoleSchema } from "./role";
import { ResumeSkillSchema } from "./skill";

export const ResumeFormSchema = z.object({
  role: ResumeRoleSchema,
  skills: z.array(ResumeSkillSchema),
  experience: ResumeExperienceSchema,
  location: ResumeLocationSchema,
});

export type ResumeFormValues = z.infer<typeof ResumeFormSchema>;
