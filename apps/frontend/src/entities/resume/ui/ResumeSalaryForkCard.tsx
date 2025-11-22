import {
  Alert,
  Card,
  Group,
  NumberFormatter,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { LuInfo } from "react-icons/lu";

import type { Salary } from "@/shared/api";

export type ResumeSalaryForkCardProps = {
  salary: Salary;
  previousSalary?: Salary | undefined;
};

const calculatePercentageIncrease = (
  previous: Salary | undefined,
  current: Salary,
) => {
  if (!previous || !previous.from || !previous.to) return 0;
  const previousAverage = (previous.from + previous.to) / 2;
  const currentAverage = (current.from + current.to) / 2;
  return Math.round(
    ((currentAverage - previousAverage) / previousAverage) * 100,
  );
};

export const ResumeSalaryForkCard: React.FC<ResumeSalaryForkCardProps> = ({
  salary,
  previousSalary,
}) => {
  const percentage = calculatePercentageIncrease(previousSalary, salary);

  const isIncrease = percentage > 0;

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

        <Stack align="center" mt={{ base: "sm", xs: "lg" }}>
          <Group fz="xl" gap="sm">
            <Stack align="center" gap={0}>
              {previousSalary && (
                <Text td="line-through" size="lg" inline opacity={0.5}>
                  <NumberFormatter
                    suffix="₽"
                    value={previousSalary?.from}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                    thousandSeparator
                  />
                </Text>
              )}
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
            <Text c="dimmed" mb={previousSalary ? "xs" : "lg"} size="xl">
              –
            </Text>
            <Stack align="center" gap={0}>
              {previousSalary && (
                <Text td="line-through" size="lg" inline opacity={0.5}>
                  <NumberFormatter
                    suffix="₽"
                    value={previousSalary?.to}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                    thousandSeparator
                  />
                </Text>
              )}
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
          <Text fz={{ base: "lg", xs: "xl" }} fw={500} mb="sm">
            в месяц
          </Text>
        </Stack>

        {previousSalary && (
          <Alert
            icon={<LuInfo size={20} />}
            color={percentage === 0 ? "blue" : isIncrease ? "green" : "red"}
          >
            {percentage === 0
              ? "Ваша вилка не изменилась"
              : `Ваша вилка ${isIncrease ? "выросла" : "уменьшилась"} на ${percentage}%`}
          </Alert>
        )}
      </Stack>
    </Card>
  );
};
