import { Deco } from "@deco/deco";

import { Head } from "$fresh/runtime.ts";
import { bindings as HTMX } from "@deco/deco/htmx";
import manifest, { type Manifest } from "./manifest.gen.ts";
// compatibility code with Fresh
import type { ComponentType } from "preact";
import { Layout } from "./_app.tsx";

(Head as ComponentType).displayName = "HTMLHead";
// end compatibility code with fresh

const deco = await Deco.init({
  manifest,
  bindings: HTMX<Manifest>({
    Layout,
  }),
});

const envPort = Deno.env.get("PORT");
Deno.serve({ handler: deco.fetch.bind(deco), port: envPort ? +envPort : 8000 });
