import { Avatar, Stack, Text, Title } from "@mantine/core";

import type { UserResponse } from "@/shared/api";

export type UserSectionProps = {
  user: UserResponse;
};

export const UserSection: React.FC<UserSectionProps> = ({ user }) => {
  return (
    <Stack>
      <Avatar
        mx="auto"
        size="xl"
        name={user.username}
        color="initials"
        variant="filled"
      />
      <Stack gap={8} component="hgroup">
        <Title order={2} size="h2" ta="center" lh={1.25} lineClamp={1}>
          {user.username}
        </Title>
        <Text c="dimmed" ta="center" lh={1.25} lineClamp={1}>
          {user.id}
        </Text>
      </Stack>
    </Stack>
  );
};
