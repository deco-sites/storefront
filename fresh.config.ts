import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@7bf6bf5d885211b2e7d171601f4a2c6bddd3abb2/plugins/mod.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: plugins({ manifest }),
});
