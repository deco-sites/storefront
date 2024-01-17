import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@dfc9aa4d5eccb8cee38b7c7c589a53299040f660/plugins/mod.ts";
import manifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: plugins({ manifest }),
});
