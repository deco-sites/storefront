import { sendEvent } from "$store/sdk/analytics.tsx";
import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

const snippet = (id: string, event: AnalyticsEvent) => {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(
      `Could not find element ${id}. Click event will not be send. This will cause loss in analytics`,
    );
  } else {
    element.addEventListener(
      "click",
      () => window.DECO.events.dispatch(event),
    );
  }
};

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => <script defer src={scriptAsDataURI(snippet, id, event)} />;

/**
 * This componente should be used when want to send event for rendered componentes.
 * This behavior is usefull for view_* events.
 */
export const SendEventOnLoad = <E extends AnalyticsEvent>(
  { event }: { event: E },
) => <script defer src={scriptAsDataURI(sendEvent, event)} />;
