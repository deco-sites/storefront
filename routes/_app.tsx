import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "apps/htmx/hooks/useScript.ts";
import { Context } from "deco/deco.ts";
import Analytics from "../components/Analytics.tsx";
import { MINICART_FORM_ID } from "../constants.ts";
import { cartScript } from "../sdk/cart.ts";

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(cartScript, MINICART_FORM_ID),
          }}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <Analytics />
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(serviceWorkerScript),
        }}
      />
    </>
  );
});
