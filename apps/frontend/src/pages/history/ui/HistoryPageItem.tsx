import {
  Button,
  Card,
  Group,
  NumberFormatter,
  Pill,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { LuArrowRight, LuHandCoins, LuLightbulb } from "react-icons/lu";
import { Link } from "react-router";

import { getRecommendationsSuffix } from "@/entities/resume";
import { routes } from "@/shared/config/routes";

import type { mockHistory } from "../config/mockHistory";

export const HistoryPageItem: React.FC<{
  historyItem: (typeof mockHistory)[0];
}> = ({ historyItem }) => {
  return (
    <Card>
      <Stack>
        <Title size="h4" order={5}>
          {historyItem.role}
        </Title>
        <Pill.Group>
          {historyItem.skills.map((skill, index) => (
            <Pill key={`${skill}-${index}`} size="md">
              {skill}
            </Pill>
          ))}
        </Pill.Group>
        <Group gap="lg">
          <Group gap={4}>
            <ThemeIcon variant="transparent" color="blue">
              <LuHandCoins size={20} />
            </ThemeIcon>
            <Group gap="xs">
              <Text
                variant="gradient"
                gradient={{ from: "violet.6", to: "grape.6" }}
                fw={600}
                fz="md"
              >
                <NumberFormatter
                  suffix="₽"
                  value={historyItem.salary.from}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  thousandSeparator
                />
              </Text>
              <Text c="dimmed" size="xl">
                –
              </Text>
              <Text
                variant="gradient"
                gradient={{ from: "grape.6", to: "violet.6" }}
                fw={600}
                fz="md"
              >
                <NumberFormatter
                  suffix="₽"
                  value={historyItem.salary.to}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  thousandSeparator
                />
              </Text>
            </Group>
          </Group>
          <Group gap={4}>
            <ThemeIcon variant="transparent" color="blue">
              <LuLightbulb size={20} />
            </ThemeIcon>
            <Text fw={500} fz="md">
              {historyItem.recommendations.length}{" "}
              {getRecommendationsSuffix(historyItem.recommendations.length)}
            </Text>
          </Group>
        </Group>
        <Button
          w="fit-content"
          component={Link}
          to={routes.shell.historyItem.$buildPath({
            params: { historyItemId: historyItem.id },
          })}
          size="md"
          rightSection={<LuArrowRight size={20} />}
        >
          Подробнее
        </Button>
      </Stack>
    </Card>
  );
};
