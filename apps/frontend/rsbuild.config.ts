import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "PayMeMore",
    favicon: "./public/favicon.svg",
    meta: {
      viewport: "width=device-width, initial-scale=1.0, user-scalable=no",
    },
  },
  source: {
    entry: {
      index: "./src/app/index.tsx",
    },
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    publicDir: {
      name: "./public",
      watch: true,
      copyOnBuild: false,
    },
  },
});
