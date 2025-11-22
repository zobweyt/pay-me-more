import { Skeleton, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

const robotMessages = [
  "Анализируем данные... Пип-пип...",
  "Генерируем рекомендации... фшшш...",
  "Оцениваем ваши навыки... клик-клик...",
  "Расчёт вилки... бжжжжж...",
  "Загрузка завершена! щёлк!",
];

export const HomePageLoading: React.FC = () => {
  const [message, setMessage] = useState("Инициализация...");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessage((prev) => {
        const index = robotMessages.indexOf(prev);
        return robotMessages[(index + 1) % robotMessages.length] as string;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [robotMessages]);

  return (
    <Stack>
      {message}
      <Skeleton h={128} />
      <Skeleton h={196} />
    </Stack>
  );
};
