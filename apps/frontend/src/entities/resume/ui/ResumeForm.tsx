import {
  Autocomplete,
  Button,
  Card,
  NumberInput,
  Stack,
  Text,
  Title,
  rem,
} from "@mantine/core";
import type { FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { type Ref, useCallback, useState } from "react";
import { LuSparkles, LuX } from "react-icons/lu";

import type { ServiceResponse } from "@/shared/api";
import { useIsMobile } from "@/shared/lib/breakpoints";

import { loadResume } from "../api/loadResume";
import { uploadPdf } from "../api/uploadPdf";
import { POPULAR_RUSSIAN_CITIES } from "../config/cities";
import { POPULAR_ROLES } from "../config/roles";
import { getExperienceSuffix } from "../lib/getExperienceSuffix";
import { ResumeFormSchema, type ResumeFormValues } from "../model/resume";
import { ResumeFormPdfDropzone } from "./ResumeFormPdfDropzone";
import { ResumeFormSkills } from "./ResumeFormSkills";

export type ResumeFormProps = {
  ref?: Ref<HTMLFormElement>;
  initialValues?: ResumeFormValues;
  onSubmit?: (values: ServiceResponse | undefined) => void;
  onLoadingChange?: (loading: boolean) => void;
};

export const ResumeForm: React.FC<ResumeFormProps> = ({
  ref,
  initialValues = {
    role: "",
    experience: "" as unknown as number,
    location: "",
    skills: [],
  },
  onSubmit,
  onLoadingChange,
}) => {
  const form = useForm<ResumeFormValues>({
    initialValues,
    validate: zod4Resolver(ResumeFormSchema),
    validateInputOnChange: true,
  });

  const [response, setResponse] = useState<ServiceResponse | undefined>(
    undefined,
  );

  const isMobile = useIsMobile();

  const submit = form.onSubmit(async (values) => {
    onLoadingChange?.(true);
    try {
      const response = await loadResume(values);
      setResponse(response);
      onSubmit?.(response);
    } catch {
    } finally {
      onLoadingChange?.(false);
    }
  });

  const [pdfLoading, setPdfLoading] = useState<boolean>(false);

  const parsePdf = useCallback(async (files: FileWithPath[]) => {
    if (!files[0]) return;
    setPdfLoading(true);
    try {
      const result = await uploadPdf(files[0]);
      form.setValues(result);
    } catch (_) {
      notifications.show({
        icon: <LuX size={20} />,
        color: "red",
        message: "Не удалось разобрать ваше резюме, внесите данные вручную",
      });
    } finally {
      setPdfLoading(false);
    }
  }, []);

  return (
    <form ref={ref} onSubmit={submit} style={{ scrollMarginTop: rem(74) }}>
      <Card>
        <Stack>
          <Stack component="hgroup" gap={4}>
            <Title order={3} size="h4">
              Расскажите о себе
            </Title>
            <Text c="dimmed" size="sm">
              Заполните резюме, чтобы мы могли дать вам рекомендации.
            </Text>
          </Stack>

          <ResumeFormPdfDropzone
            onDrop={parsePdf}
            loading={form.submitting || pdfLoading}
          />

          <Autocomplete
            {...form.getInputProps("role")}
            size="md"
            label="Желаемая должность"
            placeholder="Frontend-разработчик"
            description="Укажите свою профессию или роль (например, «аналитик», «разработчик» или «дизайнер»)."
            data={POPULAR_ROLES}
            limit={3}
            readOnly={pdfLoading || form.submitting}
            selectFirstOptionOnChange={!isMobile}
            withAsterisk
          />

          <NumberInput
            {...form.getInputProps("experience")}
            size="md"
            label="Опыт"
            placeholder="5 лет"
            readOnly={pdfLoading || form.submitting}
            description="Укажите сколько лет опыта вы имеете."
            suffix={` ${getExperienceSuffix(form.values.experience)}`}
            min={0}
            max={100}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            withAsterisk
          />

          <Autocomplete
            {...form.getInputProps("location")}
            size="md"
            label="Город"
            readOnly={pdfLoading || form.submitting}
            placeholder="Москва"
            description="Укажите в каком городе вы рассматриваете вакансии."
            data={POPULAR_RUSSIAN_CITIES}
            limit={3}
            selectFirstOptionOnChange={!isMobile}
            withAsterisk
          />

          <ResumeFormSkills form={form} pdfLoading={pdfLoading} />

          <Button
            type="submit"
            size="md"
            loading={form.submitting}
            disabled={pdfLoading}
            variant="gradient"
            gradient={{ from: "violet.6", to: "grape.6" }}
            leftSection={<LuSparkles size={20} />}
          >
            {response ? "Пересчитать" : "Оценить резюме"}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
