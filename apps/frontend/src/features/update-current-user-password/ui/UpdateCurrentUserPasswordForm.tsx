import { Button, Flex, PasswordInput, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { LuCheck } from "react-icons/lu";

import {
  type UseUpdateCurrentUserPasswordFormProps,
  useUpdateCurrentUserPasswordForm,
} from "../lib/useUpdateCurrentUserPasswordForm";

export type UpdateCurrentUserPasswordFormProps =
  UseUpdateCurrentUserPasswordFormProps & { onCancel?: VoidFunction };

export const UpdateCurrentUserPasswordForm: React.FC<
  UpdateCurrentUserPasswordFormProps
> = ({ onSuccess, onCancel, ...props }) => {
  const [form, submit] = useUpdateCurrentUserPasswordForm({
    onSuccess: () => {
      notifications.show({
        icon: <LuCheck size={20} />,
        color: "green",
        message: "Пароль обновлён!",
      });

      onSuccess?.();
    },
    ...props,
  });

  const [showOldPasswords, { toggle: toggleShowOldPasswords }] =
    useDisclosure();

  return (
    <Flex
      component="form"
      gap="lg"
      flex={1}
      justify="space-between"
      direction="column"
      onSubmit={submit as unknown as React.FormEventHandler<HTMLDivElement>}
    >
      <Stack>
        <PasswordInput
          {...form.getInputProps("oldPassword")}
          label="Старый пароль"
          placeholder="Введите старый пароль…"
          autoComplete="password"
          withAsterisk
          data-autofocus
        />

        <PasswordInput
          {...form.getInputProps("newPassword1")}
          label="Новый пароль"
          placeholder="Введите новый пароль…"
          autoComplete="new-password"
          visible={showOldPasswords}
          onVisibilityChange={toggleShowOldPasswords}
          withAsterisk
        />

        <PasswordInput
          {...form.getInputProps("newPassword2")}
          label="Подтверждение нового пароля"
          placeholder="Введите новый пароль ещё раз…"
          autoComplete="new-password"
          visible={showOldPasswords}
          onVisibilityChange={toggleShowOldPasswords}
          withAsterisk
        />
      </Stack>

      <Flex gap="sm" direction={{ base: "column-reverse", sm: "row" }}>
        <Button
          h={{ base: 40, sm: 36 }}
          c="red"
          color="gray"
          variant="light"
          fullWidth
          disabled={form.submitting}
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          h={{ base: 40, sm: 36 }}
          type="submit"
          fullWidth
          loading={form.submitting}
          disabled={!form.isDirty() || !form.isValid()}
        >
          Сохранить
        </Button>
      </Flex>
    </Flex>
  );
};
