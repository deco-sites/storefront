import { setupGithooks } from "https://deno.land/x/githooks@0.0.4/githooks.ts";

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

setupGithooks().catch(console.error);

// Generate manifest and boot server
await dev(import.meta.url, "./main.ts", config);

if (Deno.args.includes("build")) {
  Deno.exit(0);
}
