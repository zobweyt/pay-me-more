import { Badge, Group, SimpleGrid, Text, Title } from "@mantine/core";
import { LuRabbit, LuSparkles, LuTarget, LuZap } from "react-icons/lu";

import { HomePageLandingFeatureCard } from "./HomePageLandingFeatureCard";

export const HomePageLanding: React.FC = () => {
  return (
    <Group justify="center">
      <Badge
        tt="none"
        fw={500}
        fz={{ base: "sm", sm: "md" }}
        h={{ base: 36, sm: 44 }}
        px="md"
        color="orange"
        variant="light"
        leftSection={<LuZap />}
      >
        Узнайте свою стоимость за минуту
      </Badge>

      <Group
        component="hgroup"
        mt={{ base: "sm", sm: "lg" }}
        mb={{ base: "md", sm: "xl" }}
        justify="center"
      >
        <Title
          fz={{ base: 36, xs: 48, sm: 60 }}
          lh={0.75}
          ta="center"
          style={{ textWrap: "balance" }}
        >
          Сколько ты{" "}
          <Text
            span
            ta="center"
            fz="inherit"
            fw="inherit"
            variant="gradient"
            gradient={{ from: "yellow.5", to: "yellow.7" }}
          >
            зарабатываешь
          </Text>
          ?
        </Title>
        <Text
          c="dimmed"
          ta="center"
          fz={{ base: "md", sm: "xl" }}
          style={{ textWrap: "balance" }}
        >
          Узнайте свою рыночную стоимость и получите рекомендации по улучшению
          резюме
        </Text>
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3 }} flex={1}>
        <HomePageLandingFeatureCard
          icon={LuTarget}
          color="cyan"
          title="Точная оценка"
          description="На основе реальных вакансий"
        />
        <HomePageLandingFeatureCard
          icon={LuSparkles}
          color="violet"
          title="Персонализация"
          description="Рекомендации от ИИ"
        />
        <HomePageLandingFeatureCard
          icon={LuRabbit}
          color="orange"
          title="Быстро"
          description="Результат за минуту"
        />
      </SimpleGrid>
    </Group>
  );
};
