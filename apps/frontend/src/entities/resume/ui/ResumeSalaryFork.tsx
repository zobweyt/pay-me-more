import { Group, NumberFormatter, Stack, Text } from "@mantine/core";

import type { Salary } from "@/shared/api";

export type ResumeSalaryForkProps = {
  salary: Salary;
  previousSalary?: Salary | undefined;
};

export const ResumeSalaryFork: React.FC<ResumeSalaryForkProps> = ({
  salary,
  previousSalary,
}) => {
  return (
    <Stack align="center" mt={{ base: "sm", xs: "lg" }}>
      <Group fz="xl" gap={8}>
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
            ms={-18}
            fz={{ base: "h3", xs: "h2", sm: "h1" }}
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
            me={-18}
            fz={{ base: "h3", xs: "h2", sm: "h1" }}
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
  );
};
