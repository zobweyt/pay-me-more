import { Button, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LuCheck } from "react-icons/lu";

import { useRegisterForm } from "../lib/useRegisterForm";

export const RegisterForm: React.FC = () => {
  const [form, submit] = useRegisterForm({
    onCreated: () => {
      notifications.show({
        icon: <LuCheck size={20} />,
        color: "green",
        message: "Вы успешно зарегистрировались!",
      });
    },
  });

  const [showPasswords, { toggle: toggleShowPasswords }] = useDisclosure();

  return (
    <form onSubmit={submit}>
      <Stack>
        <TextInput
          {...form.getInputProps("username")}
          label="Имя пользователя"
          placeholder="Введите имя пользователя…"
          autoComplete="username"
          withAsterisk
        />

        <PasswordInput
          {...form.getInputProps("password1")}
          label="Пароль"
          placeholder="Введите пароль…"
          autoComplete="new-password"
          visible={showPasswords}
          onVisibilityChange={toggleShowPasswords}
          withAsterisk
        />

        <PasswordInput
          {...form.getInputProps("password2")}
          label="Подтверждение пароля"
          placeholder="Введите пароль ещё раз…"
          autoComplete="new-password"
          visible={showPasswords}
          onVisibilityChange={toggleShowPasswords}
          withAsterisk
        />
      </Stack>

      <Group mt="lg">
        <Button type="submit" loading={form.submitting} fullWidth>
          Зарегистрироваться
        </Button>
      </Group>
    </form>
  );
};
