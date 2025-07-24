/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="deno.ns" />
/// <reference lib="esnext" />
/// <reference lib="dom.iterable" />

// these imports are needed to make deno deploy include the files in the bundle
// because we are importing these dynamically in the code and DD doesn't recognize them to be included
import "./components/shipping/Results.tsx";
import "./components/search/Searchbar/Suggestions.tsx";

import { start } from "$fresh/server.ts";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";

await start(manifest, config);
