#!/usr/bin/env -S deno run -A --watch
import dev from "$live/dev.ts";
import tailwind from "deco-sites/std/tailwindv3.ts";
import daisyui from "npm:daisyui@2.51.6";
import tailwindConfig from "./tailwind.config.ts";
import site from "./site.json" assert { type: "json" };

// Start tailwind background process generation
tailwind({
  ...tailwindConfig,
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
});

// Generate manifest and boot server
await dev(import.meta.url, "./main.ts", site);
