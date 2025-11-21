import { Button, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { LuFilterX, LuUserMinus } from "react-icons/lu";

export type UsersInfiniteListEmptyProps = {
  onResetSearchParams?: VoidFunction;
};

export const UsersPageEmpty: React.FC<UsersInfiniteListEmptyProps> = ({
  onResetSearchParams,
}) => {
  return (
    <Stack my="lg" align="center">
      <ThemeIcon size={64} color="red" radius="xl" variant="light">
        <LuUserMinus size={36} />
      </ThemeIcon>

      <Stack component="hgroup" gap="xs">
        <Title size="h2" ta="center">
          Пользователи не найдены
        </Title>
        <Text c="dimmed" ta="center" fz="md">
          Попробуйте другие настройки поиска.
        </Text>
      </Stack>

      <Button
        c="red"
        variant="default"
        onClick={onResetSearchParams}
        leftSection={<LuFilterX size={18} />}
      >
        Сбросить фильтры
      </Button>
    </Stack>
  );
};
