import { z } from "zod/v4";

export const ResumeExperienceSchema = z.coerce.number().nonnegative();
