import { Center, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuChevronRight } from "react-icons/lu";

import { UserUsernameCard, type UserUsernameCardProps } from "@/entities/user";
import { UpdateCurrentUserUsernameForm } from "@/features/update-current-user-username";
import { Popup } from "@/shared/ui/Popup";

export type CurrentUserUsernameCardProps = UserUsernameCardProps;

export const CurrentUserUsernameCard: React.FC<
  CurrentUserUsernameCardProps
> = ({ value: username, ...props }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <UserUsernameCard
        variant="action"
        component="button"
        value={username}
        onClick={open}
        rightSection={
          <Center me={8}>
            <LuChevronRight size={20} opacity={0.75} />
          </Center>
        }
        {...props}
      />

      <Popup
        opened={opened}
        onClose={close}
        title="Изменение имени пользователя"
      >
        <Text c="dimmed" mb="xs" size="sm">
          Вы можете выбрать публичное имя пользователя. Другие пользователи
          смогут найти Вас по такому имени.
        </Text>

        <UpdateCurrentUserUsernameForm
          initialValues={{ username }}
          onSuccess={close}
          onCancel={close}
        />
      </Popup>
    </>
  );
};
