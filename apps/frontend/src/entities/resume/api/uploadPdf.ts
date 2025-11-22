import type { FileWithPath } from "@mantine/dropzone";

import { client, serializeFormData } from "@/shared/api";

import type { PartialResumeFormValues } from "../model/resume";

export const uploadPdf = async (
  inputFile: FileWithPath,
): Promise<PartialResumeFormValues> => {
  const jsFile = await inputFile.handle?.getFile();
  console.log(inputFile);
  console.log(inputFile.handle);
  console.log(jsFile);
  const {
    data,
    response: { status },
  } = await client.POST("/resumes/parse/pdf", {
    body: { file: jsFile as unknown as string },
    bodySerializer: serializeFormData,
  });
  if (status !== 200 || !data) {
    throw Error(`Non-ok status ${status}`);
  }
  const result = {
    role: data?.role ?? undefined,
    skills: data?.skills ?? [],
    experience: data?.experience ?? undefined,
    location: data?.location ?? undefined,
  };
  return result;
};
