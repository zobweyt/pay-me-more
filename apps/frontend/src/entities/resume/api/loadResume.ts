import { type Resumes, client } from "@/shared/api";

export const loadResume = async (resume: Resumes) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const { data } = await client.POST("/resumes/analyze", { body: resume });
  return data;
};
