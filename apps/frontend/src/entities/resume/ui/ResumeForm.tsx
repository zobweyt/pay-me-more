import { Button, NumberInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { LuPlus } from "react-icons/lu";

import { ResumeFormSchema, type ResumeFormValues } from "../model/resume";

export const ResumeForm: React.FC = () => {
  const form = useForm<ResumeFormValues>({
    validate: zod4Resolver(ResumeFormSchema),
    initialValues: {
      role: "",
      skills: [""],
      experience: 0,
      location: "",
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Stack>
        <TextInput
          {...form.getInputProps("role")}
          label="Роль"
          placeholder="Frontend-разработчик"
        />

        {form.getValues().skills.map((_skill, index) => (
          <TextInput
            key={form.key(`skills.${index}`)}
            {...form.getInputProps(`skills.${index}`)}
            label="Навык"
            placeholder="React"
            // TODO: удаление навыка
          />
        ))}

        <Button
          variant="light"
          leftSection={<LuPlus size={20} />}
          onClick={() => form.insertListItem("skills", "wdwqw")}
        >
          Добавить навык
        </Button>

        <NumberInput
          {...form.getInputProps("experience")}
          label="Опыт работы"
          placeholder="3 года"
          defaultValue={0}
          // TODO: форматирование suffix с помощью Intl (года, лет)
          suffix=" лет"
        />

        <TextInput
          {...form.getInputProps("location")}
          label="Локация"
          placeholder="Москва"
        />

        <Button type="submit">Сохранить</Button>
      </Stack>
    </form>
  );
};
