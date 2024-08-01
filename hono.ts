import { Deco } from "deco/mod.ts";

import { bindings as HTMX } from "deco/runtime/htmx/mod.ts";
import { Layout } from "./_app.tsx";

const deco = await Deco.init({
    bindings: HTMX({
        Layout,
    }),
});

Deno.serve(deco.handler);
