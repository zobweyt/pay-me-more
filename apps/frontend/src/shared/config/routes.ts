import { route, string } from "react-router-typesafe-routes";

export const routes = route({
  children: {
    auth: route({
      searchParams: {
        redirect: string(),
      },
      children: {
        fastlogin: route({
          path: "fastlogin",
        }),
        login: route({
          path: "login",
        }),
        register: route({
          path: "register",
        }),
      },
    }),
    shell: route({
      children: {
        home: route({
          path: "",
          hash: string(),
        }),
        history: route({
          path: "history",
        }),
        historyItem: route({
          path: "history/:historyItemId",
        }),
        favorites: route({
          path: "favorites",
        }),
        settings: route({
          path: "settings",
        }),
      },
    }),
  },
});
