import { Button, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { LuSparkles } from "react-icons/lu";

import { getExperienceSuffix } from "../lib/getExperienceSuffix";
import { ResumeFormSchema, type ResumeFormValues } from "../model/resume";
import { ResumeFormSkills } from "./ResumeFormSkills";

export type ResumeFormProps = {
  initialValues?: ResumeFormValues;
  onSubmit?: (values: ResumeFormValues) => void;
};

export const ResumeForm: React.FC<ResumeFormProps> = ({
  initialValues = {
    role: "",
    experience: 0,
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

  const submit = form.onSubmit((values) => {
    onSubmit?.(values);
  });

  return (
    <form onSubmit={submit}>
      <Stack>
        <TextInput
          {...form.getInputProps("role")}
          label="Роль"
          placeholder="Frontend-разработчик"
          description="Укажите свою профессию или роль (например, «аналитик», «разработчик» или «дизайнер»)."
        />

        <NumberInput
          {...form.getInputProps("experience")}
          label="Опыт"
          placeholder="3 года"
          description="Укажите сколько лет опыта вы имеете."
          suffix={` ${getExperienceSuffix(form.values.experience)}`}
          min={0}
          max={100}
          stepHoldDelay={500}
          stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
        />

        <TextInput
          {...form.getInputProps("location")}
          label="Город"
          placeholder="Москва"
          description="Укажите в каком городе вы рассматриваете вакансии."
        />

        <ResumeFormSkills form={form} />

        <Button
          type="submit"
          variant="gradient"
          gradient={{ from: "violet.6", to: "grape.6" }}
          leftSection={<LuSparkles size={16} />}
        >
          Оценить резюме
        </Button>
      </Stack>
    </form>
  );
};
