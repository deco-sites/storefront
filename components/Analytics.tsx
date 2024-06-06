// @ts-nocheck life is too short for type errors
// TypeScript will skip type checking for this entire file
import { useScript } from "apps/htmx/hooks/useScript.ts";
import { type CartSDK } from "../sdk/cart.ts";

type Callback = () => void;

declare global {
  interface Window {
    STOREFRONT: {
      CART: CartSDK | null;
      SEEN: WeakMap<Element, boolean>;
    };
  }
}

function script() {
  globalThis.window.STOREFRONT ||= { SEEN: new WeakMap(), CART: null };
  const storefront = globalThis.window.STOREFRONT;

  const init = () => {
    const callbacks: Callback[] = [];
    const observer = new MutationObserver(() => {
      for (const callback of callbacks) {
        const start = performance.now();
        callback();
        performance.measure(callback.name, { start });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const onDOMChange = (cb: () => void) => callbacks.push(cb);

    function initAnalytics() {
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

      function analytics() {
        document.querySelectorAll("[data-event]").forEach((node) => {
          if (storefront.SEEN.has(node)) {
            return;
          }

          storefront.SEEN.set(node, true);

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
      }

      onDOMChange(analytics);
    }

    initAnalytics();
  };

  if (document.readyState === "complete") {
    init();
  } else {
    addEventListener("DOMContentLoaded", init);
  }
}

function Script() {
  return (
    <script
      type="module"
      dangerouslySetInnerHTML={{ __html: useScript(script) }}
    />
  );
}

export default Script;
