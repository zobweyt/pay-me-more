import {
  Card,
  type MantineColor,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import type { IconType } from "react-icons/lib";

export const HomePageLandingFeatureCard: React.FC<{
  icon: IconType;
  color: MantineColor;
  title: string;
  description: string;
}> = ({ icon: Icon, color, title, description }) => {
  return (
    <Card>
      <Stack gap="xs">
        <ThemeIcon mx="auto" size="xl" color={color} variant="subtle">
          <Icon size="75%" />
        </ThemeIcon>
        <Title ta="center" size="h4" order={2}>
          {title}
        </Title>
        <Text c="dimmed" ta="center" size="sm">
          {description}
        </Text>
      </Stack>
    </Card>
  );
};
