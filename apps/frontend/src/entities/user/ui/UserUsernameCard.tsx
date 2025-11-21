import {
  ActionIcon,
  Box,
  Card,
  type CardProps,
  CopyButton,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef } from "react";
import { LuAtSign, LuCheck, LuCopy } from "react-icons/lu";

import type { UserResponse } from "@/shared/api";

export type UserUsernameCardProps = CardProps & {
  value: UserResponse["username"];
  rightSection?: React.ReactNode;
};

export const UserUsernameCard = createPolymorphicComponent<
  "div",
  UserUsernameCardProps
>(
  forwardRef<HTMLDivElement, UserUsernameCardProps>(
    ({ value, rightSection, ...props }, ref) => {
      return (
        <Card {...props} ref={ref}>
          <Group gap="sm">
            <ThemeIcon size={24} variant="transparent" radius="xl">
              <LuAtSign size="100%" />
            </ThemeIcon>

            <Box ta="start" miw={0} flex={1}>
              <Text lh={1.5} fw={500} fz="sm" lineClamp={1}>
                Имя пользователя
              </Text>
              <Text c="dimmed" lh={1.5} fz="sm" lineClamp={1}>
                {value}
              </Text>
            </Box>

            {rightSection ?? (
              <CopyButton value={value}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={
                      copied
                        ? "Имя пользователя скопировано"
                        : "Скопировать имя пользователя"
                    }
                    color={copied ? "green" : undefined}
                    position="left"
                  >
                    <ActionIcon
                      size="input-sm"
                      variant="default"
                      onClick={copy}
                    >
                      {copied ? (
                        <LuCheck
                          size={20}
                          color="var(--mantine-color-green-text)"
                        />
                      ) : (
                        <LuCopy size={20} opacity={0.75} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            )}
          </Group>
        </Card>
      );
    },
  ),
);
