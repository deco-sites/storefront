/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />

import { ServerContext } from "$fresh/server.ts";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";

const ctx = await ServerContext.fromManifest(manifest, { ...config, dev: false });

export default {
  fetch: ctx.handler(),
}