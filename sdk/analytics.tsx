import type { AnalyticsEvent } from "apps/commerce/types.ts";

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};
