import {
  Accordion,
  type AccordionItemProps,
  Box,
  Flex,
  type MantineColor,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import type React from "react";
import type { IconType } from "react-icons/lib";
import {
  LuBrain,
  LuLightbulb,
  LuPercent,
  LuRocket,
  LuTarget,
  LuTrendingUp,
  LuZap,
} from "react-icons/lu";

import type { RecommendationDto } from "@/shared/api";

const icons: IconType[] = [
  LuLightbulb,
  LuZap,
  LuRocket,
  LuTrendingUp,
  LuBrain,
  LuPercent,
  LuTarget,
];

const colors: MantineColor[] = [
  "blue",
  "cyan",
  "grape",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
  "yellow",
];

export type ResumeRecommendationsAccordionItemProps = AccordionItemProps & {
  recommendation: RecommendationDto;
};

export const ResumeRecommendationsAccordionItem: React.FC<
  ResumeRecommendationsAccordionItemProps
> = ({ recommendation, ...props }) => {
  const Icon = icons[Math.floor(Math.random() * icons.length)] as IconType;
  const color = colors[
    Math.floor(Math.random() * colors.length)
  ] as MantineColor;

  return (
    <Accordion.Item bg="var(--mantine-color-default-hover)" {...props}>
      <Accordion.Control
        icon={
          <ThemeIcon color={color} radius="xs" variant="light">
            <Icon size={20} />
          </ThemeIcon>
        }
      >
        <Text fw={500} me="sm">
          {recommendation.title}
        </Text>
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Text c="dimmed" size="sm" style={{ textWrap: "pretty" }}>
            {recommendation.subtitle}
          </Text>
          <Flex c="orange" gap="xs" align="center">
            <Box visibleFrom="xs">
              <LuZap size={16} style={{ flexShrink: 0 }} />
            </Box>
            <Text fw={500} size="sm">
              {recommendation.result}
            </Text>
          </Flex>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
