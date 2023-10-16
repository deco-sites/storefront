import type { AnalyticsEvent } from "apps/commerce/types.ts";

export const sendEvent = <E extends AnalyticsEvent>(event: E) => {
  const doSend = window.DECO_SITES_STD &&
    window.DECO_SITES_STD.sendAnalyticsEvent;

  if (typeof doSend === "function") {
    return doSend(event);
  }

  console.info(
    "Cannot find Analytics section in your page. Press `.` to add Analytics and supress this warning",
  );
};
