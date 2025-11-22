import {
  Card,
  Group,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  VisuallyHidden,
} from "@mantine/core";
import type { IconType } from "react-icons/lib";
import { LuFrown, LuSmile, LuThumbsUp } from "react-icons/lu";

export type ResumeQuality = "poor" | "moderate" | "good";

export type ResumeQualityProgressCardProps = {
  quality: ResumeQuality;
};

const config: Record<
  ResumeQuality,
  {
    color: "red" | "yellow" | "teal";
    label: string;
    filledCount: number;
    icon: IconType;
  }
> = {
  poor: { color: "red", label: "Плохое", filledCount: 1, icon: LuFrown },
  moderate: {
    color: "yellow",
    label: "Нормальное",
    filledCount: 2,
    icon: LuThumbsUp,
  },
  good: { color: "teal", label: "Хорошое", filledCount: 3, icon: LuSmile },
};
const barsMax = 3;

export const ResumeQualityProgressCard: React.FC<
  ResumeQualityProgressCardProps
> = ({ quality }) => {
  const { color, label, filledCount, icon: Icon } = config[quality];

  return (
    <Card>
      <Stack>
        <Group>
          <Stack component="hgroup" gap={4}>
            <Title size="h4" order={5}>
              Общее впечатление
            </Title>
            <Text c="dimmed" size="sm" style={{ textWrap: "pretty" }}>
              На основе вашего резюме.
            </Text>
          </Stack>
          <ThemeIcon
            ms="auto"
            mb="auto"
            size="xl"
            color={color}
            variant="light"
          >
            <Icon size="60%" />
            <VisuallyHidden>{label}</VisuallyHidden>
          </ThemeIcon>
        </Group>

        <Group grow gap="xs">
          {Array.from({ length: barsMax }, (_, i) => (
            <Progress
              key={i}
              color={color}
              value={i < filledCount ? 100 : 0}
              transitionDuration={0}
            />
          ))}
        </Group>
      </Stack>
    </Card>
  );
};
