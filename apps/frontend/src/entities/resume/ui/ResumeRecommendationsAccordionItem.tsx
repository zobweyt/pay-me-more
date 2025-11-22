import {
  Accordion,
  type AccordionItemProps,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import type React from "react";
import { LuLightbulb, LuZap } from "react-icons/lu";

import type { Recommendation } from "@/shared/api";

export type ResumeRecommendationsAccordionItemProps = AccordionItemProps & {
  recommendation: Recommendation;
};

export const ResumeRecommendationsAccordionItem: React.FC<
  ResumeRecommendationsAccordionItemProps
> = ({ recommendation, ...props }) => {
  return (
    <Accordion.Item bg="var(--mantine-color-default-hover)" {...props}>
      <Accordion.Control
        icon={
          <ThemeIcon color="orange" radius="xs" variant="light">
            <LuLightbulb size={20} />
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
          <Group c="orange" gap="xs">
            <LuZap size={16} />
            <Text fw={500} size="sm">
              {recommendation.result}
            </Text>
          </Group>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
