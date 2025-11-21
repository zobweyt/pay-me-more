import {
  Box,
  Card,
  type CardProps,
  Group,
  Text,
  ThemeIcon,
  createPolymorphicComponent,
} from "@mantine/core";
import { forwardRef } from "react";
import { LuKeyRound } from "react-icons/lu";

export type UserPasswordCardProps = CardProps & {
  rightSection?: React.ReactNode;
};

export const UserPasswordCard = createPolymorphicComponent<
  "div",
  UserPasswordCardProps
>(
  forwardRef<HTMLDivElement, UserPasswordCardProps>(
    ({ rightSection, ...props }, ref) => {
      return (
        <Card {...props} ref={ref}>
          <Group gap="sm">
            <ThemeIcon size={24} variant="transparent" radius="xl">
              <LuKeyRound size="100%" />
            </ThemeIcon>

            <Box ta="start" miw={0} flex={1}>
              <Text lh={1.5} fw={500} fz="sm" lineClamp={1}>
                Пароль
              </Text>
              <Text c="dimmed" lh={1.5} fz="sm" lineClamp={1}>
                {"*".repeat(8)}
              </Text>
            </Box>

            {rightSection}
          </Group>
        </Card>
      );
    },
  ),
);
