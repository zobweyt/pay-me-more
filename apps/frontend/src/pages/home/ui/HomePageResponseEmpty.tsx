import { Card, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { LuFileUser } from "react-icons/lu";

export const HomePageResponseEmpty: React.FC = () => {
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
        </Stack>
      </Stack>
    </Card>
  );
};
