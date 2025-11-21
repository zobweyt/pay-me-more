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
import { LuCalendarPlus, LuCheck, LuCopy } from "react-icons/lu";

import type { UserResponse } from "@/shared/api";

export type UserCreatedAtCardProps = CardProps & {
  value: UserResponse["created_at"];
  rightSection?: React.ReactNode;
};

export const UserCreatedAtCard: React.FC<UserCreatedAtCardProps> = ({
  value,
  rightSection,
  ...props
}) => {
  const displayDate = Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(Date.parse(value));

  return (
    <Card {...props}>
      <Group gap="sm">
        <ThemeIcon size={24} variant="transparent" radius="xl">
          <LuCalendarPlus size="100%" />
        </ThemeIcon>

        <Box flex={1} miw={0}>
          <Text lh={1.5} fw={500} fz="sm" lineClamp={1}>
            Дата регистрации
          </Text>
          <Text c="dimmed" lh={1.5} fz="sm" lineClamp={1}>
            {displayDate}
          </Text>
        </Box>

        {rightSection ?? (
          <CopyButton value={displayDate}>
            {({ copied, copy }) => (
              <Tooltip
                label={
                  copied
                    ? "Дата регистрации скопирована"
                    : "Скопировать дату регистрации"
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
