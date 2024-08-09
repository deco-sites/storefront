import { asset } from "$fresh/runtime.ts";
import { useScript } from "@deco/deco/hooks";
import { Head } from "@deco/deco/htmx";
import { ComponentChildren } from "preact";

const serviceWorkerScript = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js?__frsh_c"));

export const Layout = (
  { children, revision, hmrUniqueId }: {
    children: ComponentChildren;
    revision: string;
    hmrUniqueId: string;
  },
) => {
  return (
    <>
      {/* Include Icons and manifest */}
      {/** @ts-ignore: ignore error */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={`/styles.css?revision=${revision}${hmrUniqueId}`}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      {children}

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(serviceWorkerScript),
        }}
      />
    </>
  );
};
