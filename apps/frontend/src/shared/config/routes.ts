import { route, string } from "react-router-typesafe-routes";

export const routes = route({
  children: {
    auth: route({
      searchParams: {
        redirect: string(),
      },
      children: {
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
        favorites: route({
          path: "favorites",
        }),
        settings: route({
          path: "settings",
        }),
        user: route({
          path: "users/:username",
          params: {
            username: string(),
          },
          searchParams: {
            back: string(),
          },
        }),
        users: route({
          path: "users",
          searchParams: {
            q: string(),
          },
        }),
      },
    }),
  },
});
