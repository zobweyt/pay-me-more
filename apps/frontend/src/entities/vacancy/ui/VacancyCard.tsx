import { Card } from "@mantine/core";

export const VacancyCard: React.FC = () => {
  return (
    <Card>
      {/* <Stack>
        <Flex direction={{ base: "column", xs: "row" }} justify="space-between">
          <Group>
            <ThemeIcon size="xl" variant="light" color="lime">
              <LuBriefcase size={24} />
            </ThemeIcon>
            <Stack gap={0}>
              <Text fw={600} size="md">
                {vacancy.vacancy_name}
              </Text>
              <Text size="sm" c="dimmed" fw={500}>
                {vacancy.company_name}
              </Text>
            </Stack>
          </Group>
          <Flex
            direction={{ base: "row", xs: "column" }}
            justify="space-between"
            gap="xs"
            mt={{ base: "md", xs: 0 }}
            align={{ base: "center", xs: "end" }}
          >
            <Group gap={8}>
              <Text fw={500}>
                <NumberFormatter
                  suffix="₽"
                  value={vacancy.salary.from}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  thousandSeparator
                />
              </Text>
              <Text c="dimmed">–</Text>
              <Text fw={500}>
                <NumberFormatter
                  suffix="₽"
                  value={vacancy.salary.to}
                  style={{ fontVariantNumeric: "tabular-nums" }}
                  thousandSeparator
                />
              </Text>
            </Group>
            <Badge variant="light" color="gray" tt="none">
              {vacancy.schedule}
            </Badge>
          </Flex>
        </Flex>
        <Group gap="lg">
          <Group c="dimmed" gap={4}>
            <LuMapPin />
            <Text fz="sm" fw={500}>
              {vacancy.location}
            </Text>
          </Group>
          <Group c="dimmed" gap={4}>
            <LuCalendarRange />
            <Text fz="sm" fw={500}>
              {vacancy.experience.from}-{vacancy.experience.to}
            </Text>
          </Group>
        </Group>
        <Text fz="sm">{vacancy.description}</Text>
        <Flex wrap="wrap" gap={4}>
          {vacancy.skills.map((skill) => (
            <Pill key={skill}>{skill}</Pill>
          ))}
        </Flex>
        <Button w="fit-content" rightSection={<LuExternalLink size={16} />}>
          Подробнее
        </Button>
      </Stack> */}
    </Card>
  );
};
