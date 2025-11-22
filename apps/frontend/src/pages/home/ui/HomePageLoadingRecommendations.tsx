import { Card, Skeleton, Stack, Text, Title, Transition } from "@mantine/core";
import { useEffect, useState } from "react";

const robotMessages = [
  "🤖 Анализирую данные в облаках… 📊 Погружаемся в алгоритмы…",
  "🦖 Генерирую советы на лету… ✨ на связи!",
  "💡 Оцениваю ваши навыки… 🔍 Загрузите креатив!",
  "🚀 Оптимизирую ваши шансы… 🌌 Открываю новые горизонты…",
  "🎉 Создаю уникальные рекомендации… 🎁 Готовьтесь к сюрпризу!",
  "🤓 Сканирую информацию… 🖥️ Печатаем успех…",
  "📈 Анализирую тренды… 🧐 Летим в будущее с новыми данными!",
  "🔧 Запускаю генерацию… 🎨 Готовьте свои идеи, давайте взорвемся креативом!",
  "⚙️ Тестирую ваши возможности… ✈️ Готовьтесь к новым высотам!",
  "🌌 Собираю данные со вселенной… 🌠 Каждый пиксель важен! 🚀",
  "🌐 Строю мосты с новыми возможностями… 🗺️ Рекомендуйте себя!",
];
export const HomePageLoadingRecommendations: React.FC = () => {
  const [message, setMessage] = useState("⏳ Загрузка рекомендаций…");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setMessage((prev) => {
          const index = robotMessages.indexOf(prev);
          return robotMessages[(index + 1) % robotMessages.length] as string;
        });
        setVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [robotMessages]);

  return (
    <Card>
      <Stack>
        <Stack component="hgroup" gap={4}>
          <Title size="h4" order={5}>
            Рекомендации
          </Title>
          <Transition transition="fade" mounted={visible} duration={500}>
            {(styles) => (
              <Text style={styles} c="dimmed" size="sm">
                {message}
              </Text>
            )}
          </Transition>
        </Stack>
        <Skeleton h={168.98} />
        <Skeleton h={48.8} />
        <Skeleton h={48.8} />
      </Stack>
    </Card>
  );
};
