import { SimpleGrid, type SimpleGridProps } from "@mantine/core";

import { UserCard, type UserCardProps } from "@/entities/user";
import type { UserResponse } from "@/shared/api";

export type UsersGridProps = SimpleGridProps &
  Pick<UserCardProps, "back"> & {
    users: UserResponse[];
  };

export const UsersGrid: React.FC<UsersGridProps> = ({
  users,
  back,
  ...props
}) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs" {...props}>
      {users?.map((user) => (
        <UserCard key={user.id} user={user} back={back} />
      ))}
    </SimpleGrid>
  );
};
