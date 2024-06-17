import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "apps/utils/useScript.ts";
import { Context } from "deco/deco.ts";
import type { onINP } from "https://esm.sh/web-vitals@4.1.1";

type INPHandler = Parameters<typeof onINP>[0];
type PerfInp = PerformanceEventTiming & {
  element?: { name: string; class: string };
};

const sendWebVitalsReport = () => {
  // suggestion:  https://github.com/GoogleChrome/web-vitals?tab=readme-ov-file#report-only-the-delta-of-changes
  if (reportQueue.size > 0) {
    // Replace with whatever serialization method you prefer.
    // Note: JSON.stringify will likely include more data than you need.
    // const body = JSON.stringify([...reportQueue]);

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    // (navigator.sendBeacon && navigator.sendBeacon("/analytics", body)) ||
    //   fetch("/analytics", { body, method: "POST", keepalive: true });

    reportQueue.clear();
  }
};
const reportQueue = new Set<unknown>([]);

const reportFn: INPHandler = (
  report,
) => {
  const { entries, ...otherProps } = report;
  const lastEntry: PerfInp | undefined = entries.pop();
  if (lastEntry?.target) {
    lastEntry.element = {
      name: lastEntry.target.nodeName,
      class: (lastEntry.target as HTMLElement)?.classList
        .toString(),
    };
  }

  const newReport = {
    ...otherProps,
    lastEntry,
  };
  reportQueue.add(newReport);
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
          globalThis.window.reportQueue = globalThis.window.reportQueue || new Set([]);
          onINP(${reportFn}, {reportAllChanges: true});

          // Report all available metrics whenever the page is backgrounded or unloaded.
          addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
              sendWebVitalsReport();
            }
          });

          // NOTE: Safari does not reliably fire the 'visibilitychange' event when the
          // page is being unloaded. If Safari support is needed, you should also flush
          // the queue in the 'pagehide' event.
          addEventListener('pagehide', sendWebVitalsReport);
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
