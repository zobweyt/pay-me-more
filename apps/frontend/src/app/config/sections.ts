import type { IconType } from "react-icons/lib";
import { LuHistory, LuSparkles } from "react-icons/lu";

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
];
