import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "apps/utils/useScript.ts";
import { Context } from "deco/deco.ts";
import type { onINP } from "https://esm.sh/web-vitals@4.1.1";

type INPHandler = Parameters<typeof onINP>[0];

const sendWebVitalsReport = (v: unknown) => {
  // suggestion:  https://github.com/GoogleChrome/web-vitals?tab=readme-ov-file#report-only-the-delta-of-changes
  console.log(v);
};

const reportFn: INPHandler = (
  report,
) => {
  const { entries, ...otherProps } = report;
  const lastEntry = entries?.[entries.length - 1].toJSON();
  lastEntry.element = {
    element: lastEntry.target?.nodeName,
    class: (lastEntry.target as undefined | HTMLElement)?.classList.toString(),
  };
  sendWebVitalsReport({
    ...otherProps,
    lastEntry,
  });
};

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
            __html: `
          import {onINP} from "https://esm.sh/web-vitals@4.1.1";
          globalThis.window.sendWebVitalsReport = globalThis.window.sendWebVitalsReport || (${sendWebVitalsReport});
          onINP(${reportFn}, {reportAllChanges: true});
        `,
          }}
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
