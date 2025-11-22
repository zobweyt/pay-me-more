import { type Resumes, client } from "@/shared/api";

export const loadResume = async (resume: Resumes) => {
  const { data } = await client.POST("/resumes/analyze", { body: resume });
  return data;
};
