import { DecoRouteState, setup } from "deco/mod.ts";

import { Hono } from "@hono/hono";
import type { Manifest } from "./manifest.gen.ts";

if (Deno.args.includes("build")) {
  Deno.exit(0);
}

const honoApp = new Hono<DecoRouteState<Manifest>>();
await setup(honoApp);
const port = Deno.env.get("PORT") ? +Deno.env.get("PORT")! : 8000;
Deno.serve({ port, handler: honoApp.fetch });
