import { Avatar, Box, Card, type CardProps, Flex, Text } from "@mantine/core";
import type React from "react";
import { Link } from "react-router";

import type { UserResponse } from "@/shared/api";
import { routes } from "@/shared/config/routes";

export type UserCardProps = CardProps & {
  user: UserResponse;
  back?: string | undefined;
};

export const UserCard: React.FC<UserCardProps> = ({ user, back, ...props }) => {
  return (
    <Card
      variant="action"
      component={Link}
      to={routes.shell.user.$buildPath({
        params: { username: user.username },
        searchParams: { back },
      })}
      {...props}
    >
      <Flex align="center" gap="xs">
        <Avatar name={user.username} color="initials" variant="filled" />
        <Box>
          <Text fw={500} size="sm">
            {user.username}
          </Text>
          <Text c="dimmed" size="sm" lineClamp={1}>
            {user.id}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};
