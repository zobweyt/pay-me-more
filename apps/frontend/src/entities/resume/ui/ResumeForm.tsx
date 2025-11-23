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
import { useCounter, useDebouncedValue } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useQuery } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { type Ref, useCallback, useState } from "react";
import { LuSparkles, LuX } from "react-icons/lu";

import { type LlmResponse, type Salary, client } from "@/shared/api";
import { useIsMobile } from "@/shared/lib/breakpoints";

import {
  loadResumeRecommendations,
  loadResumeSalaryFork,
} from "../api/loadResume";
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
  onSalaryForkLoaded?: (values: Salary | undefined) => void;
  onSalaryForkLoadingChange?: (loading: boolean) => void;
  onRecommendationsLoaded?: (values: LlmResponse | undefined) => void;
  onRecommendationsLoadingChange?: (loading: boolean) => void;
};

export const ResumeForm: React.FC<ResumeFormProps> = ({
  ref,
  initialValues = {
    role: "",
    experience: "" as unknown as number,
    location: "",
    skills: [],
  },
  onSalaryForkLoaded,
  onSalaryForkLoadingChange,
  onRecommendationsLoaded,
  onRecommendationsLoadingChange,
}) => {
  const form = useForm<ResumeFormValues>({
    initialValues,
    validate: zod4Resolver(ResumeFormSchema),
    validateInputOnChange: true,
  });

  const [recommendationsAbortController, setRecommendationsAbortController] =
    useState(new AbortController());
  const [salaryForkLoading, setSalaryForkLoading] = useState<boolean>(false);

  const [submitCount, { increment: incrementSubmitCount }] = useCounter(0);

  const isMobile = useIsMobile();
  const submit = form.onSubmit(async (values) => {
    onSalaryForkLoadingChange?.(true);
    setSalaryForkLoading(true);

    if (recommendationsAbortController) {
      recommendationsAbortController.abort();
    }

    onRecommendationsLoadingChange?.(true);

    const newAbortController = new AbortController();
    setRecommendationsAbortController(newAbortController);

    try {
      const { data: newSalaryFork, status } =
        await loadResumeSalaryFork(values);
      if (status === 422) {
        notifications.show({
          icon: <LuX size={20} />,
          color: "red",
          message: "Не удалось распарсить резюме.",
        });
      }
      onSalaryForkLoaded?.(newSalaryFork);
    } catch {
      notifications.show({
        icon: <LuX size={20} />,
        color: "red",
        message: "Не удалось вилку зарплаты.",
      });
    } finally {
      onSalaryForkLoadingChange?.(false);
      setSalaryForkLoading(false);
    }

    try {
      const { data: newRecommendations, status } =
        await loadResumeRecommendations(values, newAbortController.signal);
      if (status === 422) {
        notifications.show({
          icon: <LuX size={20} />,
          color: "red",
          message: "Не удалось распарсить резюме.",
        });
      }
      onRecommendationsLoaded?.(newRecommendations);
    } catch (error) {
      if ((error as { name: string }).name !== "AbortError") {
        notifications.show({
          icon: <LuX size={20} />,
          color: "red",
          message: "Не удалось загрузить рекомендации к резюме.",
        });
      }
    } finally {
      if (!newAbortController.signal.aborted) {
        onRecommendationsLoadingChange?.(false);
      }
    }

    incrementSubmitCount();
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
        message: "Не удалось разобрать ваше резюме, внесите данные вручную.",
      });
    } finally {
      setPdfLoading(false);
    }
  }, []);

  const [debouncedRole] = useDebouncedValue(form.values.role, 300);
  const { data: recommendedSkills } = useQuery({
    queryKey: ["skills", debouncedRole],
    queryFn: async () => {
      const { data, response } = await client.GET("/resumes/skills", {
        params: { query: { role: debouncedRole } },
      });

      if (response.status !== 200) {
        notifications.show({
          icon: <LuX size={20} />,
          color: "red",
          message: "Не удалось получить рекомендованные навыки к должности.",
        });
        return null;
      }

      return data ?? null;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

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
            disabled={salaryForkLoading}
            loading={pdfLoading}
          />

          <Autocomplete
            {...form.getInputProps("role")}
            size="md"
            label="Желаемая должность"
            placeholder="Frontend-разработчик"
            description="Укажите свою профессию или роль (например, «аналитик», «разработчик» или «дизайнер»)."
            data={POPULAR_ROLES}
            limit={3}
            readOnly={pdfLoading || salaryForkLoading}
            selectFirstOptionOnChange={!isMobile}
            withAsterisk
          />

          <NumberInput
            {...form.getInputProps("experience")}
            size="md"
            label="Опыт"
            placeholder="5 лет"
            readOnly={pdfLoading || salaryForkLoading}
            description="Укажите сколько лет опыта вы имеете."
            suffix={` ${getExperienceSuffix(form.values.experience)}${form.values.experience === 0 ? " (без опыта)" : form.values.experience === 100 ? " (крутой дядька)" : ""}`}
            min={0}
            max={100}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            allowDecimal={false}
            clampBehavior="strict"
            withAsterisk
          />

          <Autocomplete
            {...form.getInputProps("location")}
            size="md"
            label="Город"
            readOnly={pdfLoading || salaryForkLoading}
            placeholder="Москва"
            description="Укажите в каком городе вы рассматриваете вакансии."
            data={POPULAR_RUSSIAN_CITIES}
            limit={3}
            selectFirstOptionOnChange={!isMobile}
            withAsterisk
          />

          <ResumeFormSkills
            form={form}
            pdfLoading={pdfLoading}
            salaryForkLoading={salaryForkLoading}
            recommendedSkills={recommendedSkills?.skills}
          />

          <Button
            type="submit"
            size="md"
            loading={salaryForkLoading}
            disabled={pdfLoading}
            variant="gradient"
            gradient={{ from: "violet.6", to: "grape.6" }}
            leftSection={<LuSparkles size={20} />}
          >
            {submitCount > 0 ? "Пересчитать" : "Оценить резюме"}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
