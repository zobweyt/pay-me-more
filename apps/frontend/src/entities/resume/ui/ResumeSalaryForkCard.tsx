import { Alert, Card, Stack, Text, Title } from "@mantine/core";
import { LuInfo, LuTrendingDown, LuTrendingUp } from "react-icons/lu";

import type { SalaryDto } from "@/shared/api";

import { ResumeSalaryFork } from "./ResumeSalaryFork";

export type ResumeSalaryForkCardProps = {
  salary: SalaryDto;
  previousSalary?: SalaryDto | undefined;
};

const calculatePercentageIncrease = (
  previous: SalaryDto | undefined,
  current: SalaryDto,
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
  const Icon =
    percentage === 0 ? LuInfo : isIncrease ? LuTrendingUp : LuTrendingDown;

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

        <ResumeSalaryFork salary={salary} previousSalary={previousSalary} />

        {previousSalary && (
          <Alert
            icon={<Icon size={20} />}
            color={percentage === 0 ? "blue" : isIncrease ? "green" : "red"}
          >
            {percentage === 0
              ? "Ваша вилка зарплаты не изменилась"
              : `Ваша вилка зарплаты ${isIncrease ? "выросла" : "уменьшилась"} на ${percentage}%`}
          </Alert>
        )}
      </Stack>
    </Card>
  );
};
