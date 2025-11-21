import { Center, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LuChevronRight } from "react-icons/lu";

import { UserPasswordCard, type UserPasswordCardProps } from "@/entities/user";
import { UpdateCurrentUserPasswordForm } from "@/features/update-current-user-password";
import { Popup } from "@/shared/ui/Popup";

export type CurrentUserPasswordCardProps = UserPasswordCardProps;

export const CurrentUserPasswordCard: React.FC<CurrentUserPasswordCardProps> = (
  props,
) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <UserPasswordCard
        variant="action"
        component="button"
        onClick={open}
        rightSection={
          <Center me={8}>
            <LuChevronRight size={20} opacity={0.75} />
          </Center>
        }
        {...props}
      />

      <Popup opened={opened} onClose={close} title="Изменение пароля">
        <Text c="dimmed" mb="xs" size="sm">
          Вы можете изменить пароль от своего аккаунта. Изменение пароля не
          затронет сессии на других устройствах.
        </Text>

        <UpdateCurrentUserPasswordForm onSuccess={close} onCancel={close} />
      </Popup>
    </>
  );
};
