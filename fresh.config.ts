import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@4d254969c1e70303115095d5cd7d3912071b9286/plugins/mod.ts";
import manifest from "./manifest.gen.ts";
import tailwind from "./tailwind.config.ts";

export default defineConfig({
  plugins: plugins({
    manifest,
    // deno-lint-ignore no-explicit-any
    tailwind: tailwind as any,
  }),
});
