import { sendEvent } from "$store/sdk/analytics.tsx";
import type { AnalyticsEvent } from "apps/commerce/types.ts";

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => (
  <script
    type="module"
    dangerouslySetInnerHTML={{
      __html:
        `document.getElementById("${id}").addEventListener("click", () => (${sendEvent})(${
          JSON.stringify(event)
        }));`,
    }}
  />
);

/**
 * This componente should be used when want to send event for rendered componentes.
 * This behavior is usefull for view_* events.
 */
export const SendEventOnLoad = <E extends AnalyticsEvent>(
  { event }: { event: E },
) => (
  <script
    type="module"
    dangerouslySetInnerHTML={{
      __html: `(${sendEvent})(${JSON.stringify(event)});`,
    }}
  />
);
