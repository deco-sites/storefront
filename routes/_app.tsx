import { AppProps } from "$fresh/server.ts";
import GlobalTags from "$store/components/GlobalTags.tsx";
import Theme from "$store/sections/Theme/Theme.tsx";
import { SCRIPT_CONTEXT } from "../components/Analytics.tsx";
import { useContext } from "preact/hooks";

const RenderScript = () => {
  const scripts = useContext(SCRIPT_CONTEXT);

  return (
    <>
      <template id="scripts">{scripts}</template>
      <script
        dangerouslySetInnerHTML={{
          __html: `${() => {
            const template = document.getElementById("scripts");
            template ? document.body.append(...template.childNodes) : undefined;
          }}`,
        }}
      >
      </script>
    </>
  );
};

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

function App(props: AppProps) {
  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <GlobalTags />

      <SCRIPT_CONTEXT.Provider value={[]}>
        {/* Rest of Preact tree */}
        <props.Component />

        <RenderScript />
        {/* Include service worker */}
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
        />
      </SCRIPT_CONTEXT.Provider>
    </>
  );
}

export default App;
