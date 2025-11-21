import {
  ActionIcon,
  Avatar,
  Flex,
  Group,
  Menu,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { LuCheck, LuLogOut, LuPalette, LuSettings } from "react-icons/lu";
import { Link } from "react-router";

import { useLogoutMutation } from "@/features/logout";
import type { CurrentUserResponse } from "@/shared/api";
import { routes } from "@/shared/config/routes";
import { ColorSchemeSegmentedControl } from "@/shared/ui/ColorSchemeSegmentedControl";

export type CurrentUserMenuProps = {
  currentUser: CurrentUserResponse;
};

export const CurrentUserMenu: React.FC<CurrentUserMenuProps> = ({
  currentUser,
}) => {
  const { mutate: logout } = useLogoutMutation();

  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <Tooltip
          label="Настройки"
          position="bottom"
          events={{ focus: true, hover: false, touch: false }}
        >
          <ActionIcon size="lg" radius="xl" variant="transparent">
            <Avatar
              name={currentUser.username}
              color="initials"
              variant="filled"
            />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown maw={240}>
        <Flex p="xs" gap="xs">
          <Avatar
            name={currentUser.username}
            color="initials"
            variant="filled"
          />
          <Stack gap={0}>
            <Text size="sm" fw="500">
              {currentUser.username}
            </Text>
            <Text c="dimmed" size="sm" lineClamp={1}>
              {currentUser.id}
            </Text>
          </Stack>
        </Flex>
        {/* <Menu.Item
          component={Link}
          to={routes.shell.user.$buildPath({
            params: { username: currentUser.username },
          })}
          leftSection={<LuUser size={18} />}
        >
          Профиль
        </Menu.Item> */}
        <Menu.Divider />
        <Group ps="sm" pe={4} py={4} gap="xs">
          <LuPalette size={18} />

          <Text size="sm" me="auto">
            Тема
          </Text>

          <ColorSchemeSegmentedControl />
        </Group>
        <Menu.Item
          component={Link}
          to={routes.shell.settings.$path()}
          leftSection={<LuSettings size={18} />}
        >
          Настройки
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          onClick={() => {
            logout(undefined, {
              onSuccess: () => {
                notifications.show({
                  icon: <LuCheck size={20} />,
                  color: "green",
                  message: "Вы вышли из аккаунта!",
                });
              },
            });
          }}
          leftSection={<LuLogOut size={18} />}
        >
          Выйти из аккаунта
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
