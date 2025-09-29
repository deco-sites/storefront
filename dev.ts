import { build } from "@deco/dev/tailwind";
await build();
import { setupGithooks } from "https://deno.land/x/githooks@0.0.4/githooks.ts";

setupGithooks().catch(console.error);

if (Deno.args.includes("build")) {
  Deno.exit(0);
}
