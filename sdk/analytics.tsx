import type { AnalyticsEvent } from "apps/commerce/types.ts";

export const sendEvent = <E extends AnalyticsEvent>(event: E) =>
  window.DECO.events.dispatch(event);
