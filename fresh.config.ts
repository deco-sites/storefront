import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@1.23.0/plugins/mod.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: plugins({ manifest }),
});
