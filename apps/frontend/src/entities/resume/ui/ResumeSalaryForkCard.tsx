import {
  Card,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import type { Salary } from "@/shared/api";

export type ResumeSalaryForkCardProps = {
  salary: Salary;
};

export const ResumeSalaryForkCard: React.FC<ResumeSalaryForkCardProps> = ({
  salary,
}) => {
  return (
    <Card>
      <Stack>
        <Stack component="hgroup" gap={4}>
          <Title size="h4" order={5}>
            Ваша рыночная стоимость
          </Title>
          <Text c="dimmed" size="sm" style={{ textWrap: "pretty" }}>
            На основе анализа актуальных вакансий.
          </Text>
        </Stack>

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
