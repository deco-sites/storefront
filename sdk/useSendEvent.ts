import { AnalyticsEvent } from "apps/commerce/types.ts";

export interface Options<E extends AnalyticsEvent> {
  event: E;
  on: "click" | "view" | "change";
  onBeforeSend?: (event: E, currrentTarget: HTMLElement) => E;
}

export const useSendEvent = <E extends AnalyticsEvent>(
  { event, on, onBeforeSend }: Options<E>,
) => {
  const onBeforeStr = onBeforeSend?.toString();

  return {
    ["data-event"]: encodeURIComponent(JSON.stringify(event)),
    ["data-event-trigger"]: on,
    ["data-before-send"]: onBeforeStr && encodeURIComponent(onBeforeStr),
  };
};
