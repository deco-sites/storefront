import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@ffc12592249d06b06867ec19a9f4fa2226a5236f/plugins/mod.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: plugins({ manifest }),
});
