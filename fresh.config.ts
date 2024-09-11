import { defineConfig } from "$fresh/server.ts";
import plugins from "deco/plugins/fresh.ts";
import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: plugins({
    manifest,
    htmx: true,
    // @ts-expect-error somehow this typing doesnt work
    tailwind,
  }),
});
