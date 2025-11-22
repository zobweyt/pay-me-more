import {
  Button,
  type ButtonProps,
  Code,
  type ElementProps,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type React from "react";
import { useState } from "react";
import { LuCheck, LuX } from "react-icons/lu";

import { useLoginMutation } from "@/features/login";

import { MOCK_USERS } from "../config/mockUsers";

const FastLoginPageButton: React.FC<
  {
    username: string;
    password: string;
    onLoadingChange?: (loading: boolean) => void;
  } & ButtonProps &
    ElementProps<"button">
> = ({ username, password, onClick, onLoadingChange, ...props }) => {
  const { mutateAsync: login, isPending } = useLoginMutation();

  return (
    <Button
      loading={isPending}
      onClick={async (event) => {
        onLoadingChange?.(true);
        onClick?.(event);
        const { status } = await login({ username, password, scope: "" });
        onLoadingChange?.(false);

        if (status === 200) {
          notifications.show({
            icon: <LuCheck size={20} />,
            color: "green",
            message: `Вы успешно вошли в аккаунт как ${username}!`,
          });
        }
        if (status === 401) {
          notifications.show({
            icon: <LuX size={20} />,
            color: "red",
            message: "Неверное имя пользователя или пароль!",
          });
        }
      }}
      {...props}
    >
      Войти как {username}
    </Button>
  );
};

export const FastLoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Stack>
      <Text size="sm" style={{ textWrap: "pretty" }}>
        Чтобы сэкономить ваше время, мы сделали тестовых пользователей:
      </Text>
      <Stack gap="xs">
        {MOCK_USERS.map((mockUser) => (
          <FastLoginPageButton
            key={mockUser.username}
            disabled={loading}
            onLoadingChange={setLoading}
            username={mockUser.username}
            password={mockUser.password}
          />
        ))}
      </Stack>
      <Text size="sm" style={{ textWrap: "pretty" }}>
        Пароль для всех перечисленных выше пользователей по умолчанию{" "}
        <Code>password</Code>.
      </Text>
    </Stack>
  );
};
