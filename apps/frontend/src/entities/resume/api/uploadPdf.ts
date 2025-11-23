import type { FileWithPath } from "@mantine/dropzone";

import { client, serializeFormData } from "@/shared/api";

import type { PartialResumeFormValues } from "../model/resume";

export const uploadPdf = async (
  inputFile: FileWithPath | File,
): Promise<PartialResumeFormValues> => {
  const {
    data,
    response: { status },
  } = await client.POST("/parse/pdf", {
    body: { file: inputFile as unknown as string },
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
