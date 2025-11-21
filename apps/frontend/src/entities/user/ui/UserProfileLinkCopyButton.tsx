import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { LuCheck, LuLink } from "react-icons/lu";

import type { UserResponse } from "@/shared/api";
import { routes } from "@/shared/config/routes";

export type UserProfileLinkCopyButtonProps = {
  username: UserResponse["username"];
};

export const UserProfileLinkCopyButton: React.FC<
  UserProfileLinkCopyButtonProps
> = ({ username }) => {
  return (
    <CopyButton
      value={`${import.meta.env.PROD ? "https" : "http"}://${window.location.host}${routes.shell.user.$buildPath(
        {
          params: { username },
        },
      )}`}
    >
      {({ copied, copy }) => (
        <Tooltip
          label={
            copied
              ? "Ссылка на профиль скопирована"
              : "Скопировать ссылку на профиль"
          }
          color={copied ? "green" : undefined}
          position="bottom"
        >
          <ActionIcon
            c={copied ? "green" : "dimmed"}
            ms="auto"
            size="lg"
            color="gray"
            radius="xl"
            variant="subtle"
            onClick={copy}
          >
            {copied ? (
              <LuCheck size={20} color="var(--mantine-color-green-text)" />
            ) : (
              <LuLink size={20} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};
