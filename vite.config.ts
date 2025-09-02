import { plugins } from "deco/plugins/deco.ts";
import manifest from "./manifest.gen.ts";

import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    ...plugins({
      manifest,
      htmx: true,
    }),
    fresh(),
    tailwindcss(),
  ],
});
