import { type Resumes, client } from "@/shared/api";

export const loadResumeRecommendations = async (
  resume: Resumes,
  signal: AbortSignal | undefined,
) => {
  const { data, response } = await client.POST(
    "/resumes/analyze/recommendations",
    {
      body: resume,
      signal,
    },
  );
  return { data, status: response.status };
};

export const loadResumeSalaryFork = async (resume: Resumes) => {
  const { data, response } = await client.POST("/resumes/analyze/salary_fork", {
    body: resume,
  });
  return { data, status: response.status };
};
