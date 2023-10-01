import { defineConfig } from "$fresh/server.ts";
import plugins from "https://denopkg.com/deco-sites/std@1.22.0/plugins/mod.ts";
import partytownPlugin from "partytown/mod.ts";
import decoManifest from "./manifest.gen.ts";

export default defineConfig({
  plugins: [
    ...plugins({
      manifest: decoManifest,
    }),
    partytownPlugin(),
  ],
});
