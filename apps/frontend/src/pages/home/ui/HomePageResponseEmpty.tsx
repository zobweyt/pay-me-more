import { Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { LuArrowUp, LuFileUser } from "react-icons/lu";

export type HomePageResponseEmptyProps = {
  onScrollIntoForm?: VoidFunction;
};

export const HomePageResponseEmpty: React.FC<HomePageResponseEmptyProps> = ({
  onScrollIntoForm,
}) => {
  return (
    <Card>
      <Stack component="hgroup" gap="sm" my="lg">
        <ThemeIcon mx="auto" mb="xs" size="xl" variant="light">
          <LuFileUser size="50%" />
        </ThemeIcon>
        <Stack gap="xs">
          <Title ta="center" size="h4" order={5}>
            Резюме не заполнено
          </Title>
          <Text
            c="dimmed"
            ta="center"
            size="sm"
            style={{ textWrap: "balance" }}
          >
            Заполните форму выше и нажмите «Оценить резюме» и наш ИИ предложит
            вам рекомендации.
          </Text>

          <Button
            mt="sm"
            mx="auto"
            size="sm"
            radius={9999}
            onClick={onScrollIntoForm}
            rightSection={<LuArrowUp size={20} />}
          >
            Перейти к форме
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
