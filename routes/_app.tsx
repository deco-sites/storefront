import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "deco/deco.ts";
import { useDevice } from "$store/sdk/device.ts";
import { deviceOf } from "deco/utils/device.ts";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (req, ctx) => {
  const revision = await Context.active().release?.revision();
  const {device} = useDevice()
  device.value = deviceOf(req)

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />
    </>
  );
});
