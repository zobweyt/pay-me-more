import {
  Button,
  Card,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useState } from "react";
import { LuSparkles } from "react-icons/lu";

import type { ServiceResponse } from "@/shared/api";

import { loadResume } from "../api/loadResume";
import { getExperienceSuffix } from "../lib/getExperienceSuffix";
import { ResumeFormSchema, type ResumeFormValues } from "../model/resume";
import { ResumeFormSkills } from "./ResumeFormSkills";

export type ResumeFormProps = {
  initialValues?: ResumeFormValues;
  onSubmit?: (values: ServiceResponse) => void;
};

export const ResumeForm: React.FC<ResumeFormProps> = ({
  initialValues = {
    role: "",
    experience: "" as unknown as number,
    location: "",
    skills: [],
  },
  onSubmit,
}) => {
  const form = useForm<ResumeFormValues>({
    initialValues,
    validate: zod4Resolver(ResumeFormSchema),
    validateInputOnChange: true,
  });

  const [response, setResponse] = useState<ServiceResponse | null>(null);

  const submit = form.onSubmit(async (values) => {
    const response = await loadResume(values);
    setResponse(response);
    onSubmit?.(response);
  });

  return (
    <form onSubmit={submit}>
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

          <TextInput
            {...form.getInputProps("role")}
            label="Роль"
            placeholder="Frontend-разработчик"
            description="Укажите свою профессию или роль (например, «аналитик», «разработчик» или «дизайнер»)."
            withAsterisk
          />

          <NumberInput
            {...form.getInputProps("experience")}
            label="Опыт"
            placeholder="5 лет"
            description="Укажите сколько лет опыта вы имеете."
            suffix={` ${getExperienceSuffix(form.values.experience)}`}
            min={0}
            max={100}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            withAsterisk
          />

          <TextInput
            {...form.getInputProps("location")}
            label="Город"
            placeholder="Москва"
            description="Укажите в каком городе вы рассматриваете вакансии."
            withAsterisk
          />

          <ResumeFormSkills form={form} />

          <Button
            type="submit"
            loading={form.submitting}
            variant="gradient"
            gradient={{ from: "violet.6", to: "grape.6" }}
            leftSection={<LuSparkles size={16} />}
          >
            {response ? "Пересчитать" : "Оценить резюме"}
          </Button>
        </Stack>
      </Card>
    </form>
  );
};
