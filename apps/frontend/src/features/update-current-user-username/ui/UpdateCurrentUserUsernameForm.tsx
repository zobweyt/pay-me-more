import { Button, Flex, Stack, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { LuCheck } from "react-icons/lu";

import {
  type UseUpdateCurrentUserUsernameFormProps,
  useUpdateCurrentUserUsernameForm,
} from "../lib/useUpdateCurrentUserUsernameForm";

export type UserUpdateUsernameFormProps =
  UseUpdateCurrentUserUsernameFormProps & { onCancel?: VoidFunction };

export const UpdateCurrentUserUsernameForm: React.FC<
  UserUpdateUsernameFormProps
> = ({ onSuccess, onCancel, ...props }) => {
  const [form, submit] = useUpdateCurrentUserUsernameForm({
    onSuccess: () => {
      notifications.show({
        icon: <LuCheck size={20} />,
        color: "green",
        message: "Имя пользователя обновлено!",
      });

      onSuccess?.();
    },
    ...props,
  });

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
        <TextInput
          {...form.getInputProps("username")}
          label="Новое имя пользователя"
          placeholder="Введите новое имя пользователя…"
          autoComplete="username"
          withAsterisk
          data-autofocus
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
