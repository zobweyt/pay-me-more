import { Loader, Stack, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { client } from "@/shared/api";

import { HistoryPageItem } from "./HistoryPageItem";

export const HistoryPage: React.FC = () => {
  const { data: history, isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const { data: resumes } = await client.GET("/resumes");
      return resumes ?? null;
    },
    placeholderData: keepPreviousData,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return (
    <Stack gap="xs">
      <Title order={1} size="h2">
        История
      </Title>
      {isLoading || history === undefined ? (
        <Stack>
          <Loader mx="auto" size="lg" />
          <Title order={2} size="h5" ta="center">
            Загрузка истории...
          </Title>
        </Stack>
      ) : (
        <Stack>
          {history === null ? (
            <Stack>
              <Title order={2} size="h5" ta="center">
                Нет истории
              </Title>
            </Stack>
          ) : (
            history.map((historyItem, index) => (
              <HistoryPageItem key={index} historyItem={historyItem} />
            ))
          )}
        </Stack>
      )}
    </Stack>
  );
};
