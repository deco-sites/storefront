import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

/**
 * This function is usefull for sending events on click. Works with both Server and Islands components
 */
export const SendEventOnClick = <E extends AnalyticsEvent>({ event, id }: {
  event: E;
  id: string;
}) => null;

export const SendEventOnView = <E extends AnalyticsEvent>(
  { event, id }: { event: E; id: string },
) => null;
