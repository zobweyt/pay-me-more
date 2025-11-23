import { Button, Card, Loader, Pill, Stack, Title } from "@mantine/core";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router";
import { useTypedParams } from "react-router-typesafe-routes";

import {
  ResumeRecommendationsCard,
  ResumeSalaryForkCard,
} from "@/entities/resume";
import { mockHistory } from "@/pages/history/config/mockHistory";
import { routes } from "@/shared/config/routes";

export const HistoryItemPage = () => {
  const { historyItemId } = useTypedParams(routes.shell.historyItem);

  const { data: historyItem, isLoading } = useQuery({
    queryKey: ["history-item", historyItemId],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return (
        mockHistory.find((historyItem) => historyItem.id === historyItemId) ??
        null
      );
    },
    staleTime: 0,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
  return (
    <Stack>
      <Button
        leftSection={<LuArrowLeft size={20} />}
        component={Link}
        w="fit-content"
        variant="subtle"
        size="md"
        to={routes.shell.history.$path()}
      >
        Назад
      </Button>

      <Title size="h2">Детали</Title>

      {(isLoading || historyItem === undefined) && (
        <Stack>
          <Loader mx="auto" size="lg" />
          <Title order={2} size="h5" ta="center">
            Загрузка...
          </Title>
        </Stack>
      )}

      {historyItem === null && (
        <Stack>
          <Loader mx="auto" size="lg" />
          <Title order={2} size="h5" ta="center">
            Загрузка...
          </Title>
        </Stack>
      )}

      {!!historyItem && (
        <>
          <Card>
            <Stack>
              <Title size="h4" order={5}>
                {historyItem.role}
              </Title>
              <Pill.Group>
                {historyItem.skills.map((skill, index) => (
                  <Pill key={`${skill}-${index}`} size="md">
                    {skill}
                  </Pill>
                ))}
              </Pill.Group>
            </Stack>
          </Card>
          <ResumeSalaryForkCard salary={historyItem.salary} />
          {!!historyItem.recommendations.length && (
            <ResumeRecommendationsCard
              recommendations={historyItem.recommendations}
            />
          )}
        </>
      )}
    </Stack>
  );
};
