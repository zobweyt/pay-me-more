import { Button, Group, PasswordInput, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { LuCheck, LuX } from "react-icons/lu";

import { useLoginForm } from "../lib/useLoginForm";

export const LoginForm: React.FC = () => {
  const [form, submit] = useLoginForm({
    onSuccess: () => {
      notifications.show({
        icon: <LuCheck size={20} />,
        color: "green",
        message: "Вы успешно вошли в аккаунт!",
      });
    },
    onUnauthorized: () => {
      notifications.show({
        icon: <LuX size={20} />,
        color: "red",
        message: "Неверное имя пользователя или пароль!",
      });
    },
  });

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
          {...form.getInputProps("password")}
          label="Пароль"
          placeholder="Введите пароль…"
          autoComplete="password"
          withAsterisk
        />
      </Stack>

      <Group mt="lg">
        <Button type="submit" loading={form.submitting} fullWidth>
          Войти
        </Button>
      </Group>
    </form>
  );
};
