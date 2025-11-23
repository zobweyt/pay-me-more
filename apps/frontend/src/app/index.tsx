import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import { FavoritesPage } from "@/pages/favorites";
import { HistoryPage } from "@/pages/history";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { NotFoundPage } from "@/pages/not-found";
import { RegisterPage } from "@/pages/register";
import { SettingsPage } from "@/pages/settings";
import { queryClient } from "@/shared/api";
import { routes } from "@/shared/config/routes";
import { defaultColorScheme, theme } from "@/shared/config/theme";

import { AuthLayout } from "./layouts/auth/AuthLayout";
import { ProtectedLayout } from "./layouts/protected/ProtectedLayout";
import { ShellLayout } from "./layouts/shell/ShellLayout";

import "./styles/index.css";

import { FastLoginPage } from "@/pages/fastlogin";
import { HistoryItemPage } from "@/pages/history-item";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The root element not found.");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme={defaultColorScheme}>
        <Notifications />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route
                element={<FastLoginPage />}
                path={routes.auth.fastlogin.$path()}
              />
              <Route element={<LoginPage />} path={routes.auth.login.$path()} />
              <Route
                element={<RegisterPage />}
                path={routes.auth.register.$path()}
              />
            </Route>
            <Route element={<ShellLayout />}>
              <Route element={<HomePage />} path={routes.shell.home.$path()} />
              <Route element={<ProtectedLayout />}>
                <Route
                  element={<HistoryPage />}
                  path={routes.shell.history.$path()}
                />
                <Route
                  element={<HistoryItemPage />}
                  path={routes.shell.historyItem.$path()}
                />
                <Route
                  element={<FavoritesPage />}
                  path={routes.shell.favorites.$path()}
                />
                <Route
                  element={<SettingsPage />}
                  path={routes.shell.settings.$path()}
                />
              </Route>
            </Route>
            <Route element={<NotFoundPage />} path="*" />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
