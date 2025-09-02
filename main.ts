/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

import { start } from "fresh";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";

await start(manifest, config);
