import type { IconType } from "react-icons/lib";
import { LuHistory, LuSettings, LuSparkles, LuStar } from "react-icons/lu";

import { routes } from "@/shared/config/routes";

export type AppSection = {
  icon: IconType;
  label: React.ReactNode;
  pathname: string;
};

export const APP_SECTIONS: AppSection[] = [
  {
    icon: LuSparkles,
    label: "Главная",
    pathname: routes.shell.home.$path(),
  },
  {
    icon: LuHistory,
    label: "История",
    pathname: routes.shell.history.$path(),
  },
  {
    icon: LuStar,
    label: "Избранное",
    pathname: routes.shell.favorites.$path(),
  },
  {
    icon: LuSettings,
    label: "Настройки",
    pathname: routes.shell.settings.$path(),
  },
];
