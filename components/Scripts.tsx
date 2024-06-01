// @ts-nocheck life is too short for type errors
// TypeScript will skip type checking for this entire file

import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { MINICART_FORM_ID } from "../constants.ts";

type Callback = () => void;

declare global {
  interface Window {
    STOREFRONT: {
      CART: Record<string, unknown> | null;
      SEEN: WeakMap<Element, boolean>;
    };
  }
}

function script(minicartFormId: string) {
  globalThis.window.STOREFRONT ||= { SEEN: new WeakMap(), CART: null };
  const storefront = globalThis.window.STOREFRONT;

  console.log("running script");

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

    function initCart() {
      function exposeCartToWindow() {
        const input = document.getElementById(minicartFormId)?.querySelector(
          'input[name="original"]',
        ) as HTMLInputElement | null;

        if (!input) {
          return;
        }

        storefront.CART = JSON.parse(decodeURIComponent(input.value));
      }

      function adjustQuantities() {
        const form = document.getElementById(minicartFormId) as
          | HTMLFormElement
          | null;

        // cart items
        const items = form?.querySelectorAll("[data-item-id]");

        // Set minicart items count on header
        const count = items?.length ?? 0;
        const counter = document.querySelector("[data-minicart-items-count]");
        counter?.classList.remove("after:hidden");
        counter?.setAttribute(
          "data-minicart-items-count",
          count > 9 ? "9+" : count.toString(),
        );

        // Set minicart quantities on dom items
        items?.forEach((item) => {
          const id = item.getAttribute("data-item-id");
          const cartInput = item.querySelector("input");
          const quantity = cartInput?.value ?? "1";

          const decrease = item.querySelector("button[data-action-decrease]") as
            | HTMLButtonElement
            | null;
          const increase = item.querySelector("button[data-action-increase]") as
            | HTMLButtonElement
            | null;

          if (cartInput && !storefront.SEEN.has(item)) {
            storefront.SEEN.set(item, true);

            decrease?.addEventListener("click", () => {
              const newValue = `${+cartInput.value - 1}`;

              if (newValue === "0") {
                decrease.disabled = true;
              } else {
                cartInput.value = newValue;
              }
            });
            increase?.addEventListener("click", () => {
              cartInput.value = `${+cartInput.value + 1}`;
            });
          }

          document.querySelectorAll(
            `[data-add-to-cart][data-product-id="${id}"]`,
          )?.forEach((container) => {
            // Update quantities on all AddToCartButtons
            container.querySelector('input[type="checkbox"]')
              ?.setAttribute("checked", "true");

            const input = container.querySelector('input[type="number"]');
            input?.setAttribute("value", quantity);
            input?.removeAttribute("disabled");

            // Setup callbacks
            input?.addEventListener("change", (e) => {
              e?.stopPropagation();
              cartInput.value = e.currentTarget.value;
              e.currentTarget.disabled = true;

              cartInput?.dispatchEvent(new Event("change", { bubbles: true }));
            });
            container.querySelector("[data-action-decrease]")
              ?.addEventListener("click", (e) => {
                e.stopPropagation();
                decrease?.click();
                e.currentTarget.parentElement.querySelector("input").disabled =
                  true;
              });
            container.querySelector("[data-action-increase]")
              ?.addEventListener("click", (e) => {
                e.stopPropagation();
                increase?.click();
                e.currentTarget.parentElement.querySelector("input").disabled =
                  true;
              });
          });
        });
      }

      onDOMChange(exposeCartToWindow);
      onDOMChange(adjustQuantities);
    }

    initAnalytics();
    initCart();
  };

  if (document.readyState === "complete") {
    init();
  } else {
    addEventListener("DOMContentLoaded", init);
  }
}

function Section() {
  return (
    <script
      type="module"
      src={scriptAsDataURI(script, MINICART_FORM_ID)}
    />
  );
}

export default Section;
