import { SimpleGrid, Skeleton } from "@mantine/core";

export const UsersPageSkeleton = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xs">
      {Array.from({ length: 9 }).map((_, index) => (
        <Skeleton key={index} height={74.59} />
      ))}
    </SimpleGrid>
  );
};
