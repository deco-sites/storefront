import { Deco } from "deco/mod.ts";

import "deco/runtime/htmx/FreshHeadCompat.ts";
import { bindings as HTMX } from "deco/runtime/htmx/mod.ts";
import { Layout } from "./_app.tsx";

const deco = await Deco.init({
  bindings: HTMX({
    Layout,
  }),
});

const envPort = Deno.env.get("PORT");
Deno.serve({ handler: deco.fetch.bind(deco), port: envPort ? +envPort : 8000 });
