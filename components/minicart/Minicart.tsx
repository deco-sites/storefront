import { AnalyticsEvent } from "apps/commerce/types.ts";
import {
  MINICART_CONTAINER_ID,
  MINICART_DRAWER_ID,
  MINICART_FORM_ID,
} from "../../constants.ts";
import { useSubmitCart } from "../../sdk/cart.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Coupon from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import CartItem, { Item } from "./Item.tsx";

export interface Minicart {
  original: Record<string, unknown>;
  data: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
  };
  options: {
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
    locale: string;
    currency: string;
  };
}

function Cart({
  cart: {
    original,
    data: {
      items,
      total,
      subtotal,
      coupon,
      discounts,
    },
    options: {
      locale,
      currency,
      enableCoupon = true,
      freeShippingTarget,
      checkoutHref,
    },
  },
}: { cart: Minicart }) {
  const count = items.length;

  const beginCheckoutEvent = useSendEvent({
    on: "click",
    event: {
      name: "begin_checkout",
      params: { coupon, currency, value: total, items },
    },
  });

  const viewCartEvent = useSendEvent<AnalyticsEvent>({
    on: "view",
    event: {
      name: "view_cart",
      params: { currency, value: total, items },
    },
  });

  return (
    <div
      {...viewCartEvent}
      class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full"
    >
      {count === 0
        ? (
          <div class="flex flex-col gap-6">
            <span class="font-medium text-2xl">Sua sacola está vazia</span>
            <label
              for={MINICART_DRAWER_ID}
              class="btn btn-outline no-animation"
            >
              Escolher produtos
            </label>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-2 py-4 w-full">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <form
              id={MINICART_FORM_ID}
              class="contents"
              hx-disabled-elt="this"
              hx-trigger="submit, change"
              hx-target={`#${MINICART_CONTAINER_ID}`}
              hx-indicator={`#${MINICART_CONTAINER_ID}`}
              hx-post={useSubmitCart()}
              hx-swap="innerHTML"
            >
              <ul
                role="list"
                class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
              >
                {items.map((item, index) => (
                  <li>
                    <CartItem
                      item={item}
                      index={index}
                      locale={locale}
                      currency={currency}
                    />
                  </li>
                ))}
              </ul>

              {/* This contains the original platform cart. Integrations usually use this value */}
              <input
                type="hidden"
                name="original"
                value={encodeURIComponent(JSON.stringify(original))}
              />
            </form>

            {/* Cart Footer */}
            <footer class="w-full">
              {/* Subtotal */}
              <div class="border-t border-base-200 py-2 flex flex-col">
                {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between px-4 text-sm">
                  <span>Subtotal</span>
                  <output form={MINICART_FORM_ID}>
                    {formatPrice(subtotal, currency, locale)}
                  </output>
                </div>
                {enableCoupon && <Coupon coupon={coupon} />}
              </div>

              {/* Total */}
              <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                <div class="flex justify-between items-center w-full">
                  <span>Total</span>
                  <output form={MINICART_FORM_ID} class="font-medium text-xl">
                    {formatPrice(total, currency, locale)}
                  </output>
                </div>
                <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span>
              </div>

              <div class="p-4">
                <a
                  {...beginCheckoutEvent}
                  data-deco="buy-button"
                  class="btn btn-primary w-full no-animation"
                  href={checkoutHref}
                >
                  <span class="[.htmx-request_&]:hidden">Begin Checkout</span>
                  <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
