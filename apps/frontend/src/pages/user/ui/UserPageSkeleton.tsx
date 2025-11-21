import { Skeleton, Stack } from "@mantine/core";

export const UserPageSkeleton = () => {
  return (
    <Stack gap="xl">
      <Stack>
        <Skeleton circle height={84} mx="auto" />

        <Stack gap={8} component="hgroup">
          <Skeleton height={32.5} maw={196} mx="auto" />
          <Skeleton height={20} maw={296} mx="auto" radius="sm" />
        </Stack>
      </Stack>

      <Stack gap="sm">
        <Skeleton height={28} maw={256} />
        <Skeleton height={76} />
        <Skeleton height={76} />
        <Skeleton height={76} />
      </Stack>
    </Stack>
  );
};
