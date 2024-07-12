import { defineConfig } from "$fresh/server.ts";
import plugins from "https://cdn.jsdelivr.net/gh/deco-sites/std@1.26.7/plugins/mod.ts";
import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: plugins({
    manifest,
    // @ts-expect-error somehow this typing doesnt work
    tailwind,
  }),
});
