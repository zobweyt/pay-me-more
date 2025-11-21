import {
  Card,
  Group,
  NumberFormatter,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { LuTrendingUp } from "react-icons/lu";

import type { ResumeSalary } from "../model/salary";

export type ResumeSalaryCardProps = {
  salary: ResumeSalary;
};

export const ResumeSalaryCard: React.FC<ResumeSalaryCardProps> = ({
  salary,
}) => {
  return (
    <Card>
      <Stack>
        <Group>
          <ThemeIcon
            size="xl"
            variant="gradient"
            gradient={{ from: "blue.7", to: "blue.5" }}
          >
            <LuTrendingUp size={24} />
          </ThemeIcon>
          <Stack gap={0}>
            <Text fw={600} size="lg">
              Ваша рыночная стоимость
            </Text>
            <Text>На основе анализа актуальных вакансий</Text>
          </Stack>
        </Group>
        <Stack align="center" my={{ base: "sm", xs: "lg" }}>
          <Group fz="xl" gap="sm">
            <Stack align="center" gap={0}>
              <Text
                variant="gradient"
                gradient={{ from: "violet.6", to: "grape.6" }}
                fw={600}
                lh="xs"
                fz={{ base: "h2", xs: "h1" }}
              >
                <NumberFormatter
                  suffix="₽"
                  value={salary.from}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  thousandSeparator
                />
              </Text>
              <Text c="dimmed" fz={{ base: "sm", xs: "md" }} fw={500}>
                от
              </Text>
            </Stack>
            <Text c="dimmed" mb="lg" size="xl">
              –
            </Text>
            <Stack align="center" gap={0}>
              <Text
                variant="gradient"
                gradient={{ from: "grape.6", to: "violet.6" }}
                fw={600}
                lh="xs"
                fz={{ base: "h2", xs: "h1" }}
              >
                <NumberFormatter
                  suffix="₽"
                  value={salary.to}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  thousandSeparator
                />
              </Text>
              <Text c="dimmed" fz={{ base: "sm", xs: "md" }} fw={500}>
                до
              </Text>
            </Stack>
          </Group>
          <Text fz={{ base: "lg", xs: "xl" }} fw={500}>
            в месяц
          </Text>
        </Stack>
      </Stack>
    </Card>
  );
};
