import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

const script = () => {
  globalThis.window.STOREFRONT ||= {};
  globalThis.window.STOREFRONT.ANALYTICS ||= new WeakMap();

  const init = () => {
    const seen = globalThis.window.STOREFRONT.ANALYTICS!;

    function identity<T>(x: T) {
      return x;
    }

    function sendEvent(e: Element | null) {
      const event = e?.getAttribute("data-event");
      const maybeBeforeSend = e?.getAttribute("data-before-send");

      const beforeSend = maybeBeforeSend
        ? new Function(
          `return ${decodeURIComponent(maybeBeforeSend)}`,
        )()
        : identity;

      if (!event) {
        return;
      }

      const decoded = JSON.parse(decodeURIComponent(event));
      const transformed = beforeSend(decoded, e);

      console.log("Sending event", transformed);

      globalThis.window.DECO.events.dispatch(transformed);
    }

    function handleClick(e: Event) {
      e.stopPropagation();
      sendEvent(e.currentTarget as HTMLElement | null);
    }

    function handleChange(e: Event) {
      sendEvent(e.currentTarget as HTMLElement | null);
    }

    // Only available on newer safari versions
    const handleView = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver((items) => {
        for (const item of items) {
          const { isIntersecting, target } = item;

          if (!isIntersecting) {
            continue;
          }

          handleView!.unobserve(target);
          sendEvent(target);
        }
      })
      : null;

    const traverse = () => {
      const start = performance.now();

      document.querySelectorAll("[data-event]").forEach((node) => {
        if (seen.has(node)) {
          return;
        }

        seen.set(node, true);

        const maybeTrigger = node.getAttribute("data-event-trigger");
        const on = maybeTrigger === "click"
          ? "click"
          : maybeTrigger === "change"
          ? "change"
          : "view";

        if (on === "click") {
          node.addEventListener("click", handleClick, { passive: true });

          return;
        }

        if (on === "view") {
          handleView?.observe(node);

          return;
        }

        if (on === "change") {
          node.addEventListener("change", handleChange, { passive: true });

          return;
        }
      });

      performance.measure("analytics", { start });
    };

    const observer = new MutationObserver(traverse);
    observer.observe(document.body, { childList: true, subtree: true });

    traverse();
  };

  if (document.readyState === "complete") {
    init();
  } else {
    addEventListener("DOMContentLoaded", init);
  }
};

function Analytics() {
  return <script type="module" src={scriptAsDataURI(script)} />;
}

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

export default Analytics;
