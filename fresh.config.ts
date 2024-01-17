import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@ad6490d50d377980cd8e9f29efc00634e9eda2cb/plugins/mod.ts";
import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: plugins({
    manifest,
    // deno-lint-ignore no-explicit-any
    tailwind: tailwind as any,
  }),
});
