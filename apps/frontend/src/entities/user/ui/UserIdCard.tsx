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
} from "@mantine/core";
import { FaQuestion } from "react-icons/fa6";
import { LuCheck, LuCopy, LuHash } from "react-icons/lu";

import type { UserResponse } from "@/shared/api";

export type UserIdCardProps = CardProps & {
  value: UserResponse["id"];
  rightSection?: React.ReactNode;
};

export const UserIdCard: React.FC<UserIdCardProps> = ({
  value,
  rightSection,
  ...props
}) => {
  return (
    <Card {...props}>
      <Group gap="sm">
        <ThemeIcon size={24} variant="transparent" radius="xl">
          <LuHash size="100%" />
        </ThemeIcon>

        <Box flex={1} miw={0}>
          <Group gap={4}>
            <Text lh={1.5} fw={500} fz="sm" lineClamp={1}>
              Идентификатор
            </Text>
            <Tooltip
              label="Уникальный идентификатор пользователя"
              events={{ hover: true, focus: true, touch: true }}
            >
              <ActionIcon size={20} radius="xl" variant="light" color="gray">
                <FaQuestion size={12} opacity={0.75} strokeWidth={8} />
              </ActionIcon>
            </Tooltip>
          </Group>
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
                    ? "Идентификатор скопирован"
                    : "Скопировать идентификатор"
                }
                color={copied ? "green" : undefined}
                position="left"
              >
                <ActionIcon size="input-sm" variant="default" onClick={copy}>
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
};
