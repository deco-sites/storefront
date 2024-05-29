import type { AnalyticsEvent } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

declare global {
  interface Window {
    DECO_ANALYTICS_NODES: WeakMap<Element, boolean>;
  }
}

const script = () => {
  globalThis.window.DECO_ANALYTICS_NODES ||= new WeakMap();

  const init = () => {
    const seen = globalThis.window.DECO_ANALYTICS_NODES;

    function sendEvent(e: Element | null) {
      const event = e?.getAttribute("data-event");

      if (!event) {
        return;
      }

      const decoded = JSON.parse(decodeURIComponent(event));
      globalThis.window.DECO.events.dispatch(decoded);
    }

    function handleClick(e: Event) {
      e.stopPropagation();
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
        const on = maybeTrigger === "click" ? "click" : "view";

        if (on === "click") {
          node.addEventListener("click", handleClick, { passive: true });

          return;
        }

        if (on === "view") {
          handleView?.observe(node);

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

export const useSendEvent = <E extends AnalyticsEvent>(
  event: E,
  on: "click" | "view",
) => {
  return {
    ["data-event"]: encodeURIComponent(JSON.stringify(event)),
    ["data-event-trigger"]: on,
  };
};

export default Analytics;
