import type { IconType } from "react-icons/lib";
import { LuHouse, LuSettings, LuUsers } from "react-icons/lu";

import { routes } from "@/shared/config/routes";

export type AppSection = {
  icon: IconType;
  label: React.ReactNode;
  pathname: string;
};

export const APP_SECTIONS: AppSection[] = [
  {
    icon: LuHouse,
    label: "Главная",
    pathname: routes.shell.home.$path(),
  },
  {
    icon: LuUsers,
    label: "Пользователи",
    pathname: routes.shell.users.$path(),
  },
  {
    icon: LuSettings,
    label: "Настройки",
    pathname: routes.shell.settings.$path(),
  },
];
