import { DecoRouteState, setup } from "deco/mod.ts";

import { Hono } from "@hono/hono";
import type { Manifest } from "./manifest.gen.ts";

const honoApp = new Hono<DecoRouteState<Manifest>>();
await setup(honoApp);
const port = Deno.env.get("PORT") ? +Deno.env.get("PORT")! : 8000;
Deno.serve({ port, handler: honoApp.fetch });
