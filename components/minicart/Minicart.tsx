import { AnalyticsItem } from "apps/commerce/types.ts";
import { useCart } from "../../sdk/cart.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { MINICART_DRAWER_ID } from "../../sdk/useUI.ts";
import { SendEventOnClick, SendEventOnView } from "../Analytics.tsx";
import Coupon from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import CartItem, { Item, Props as ItemProps } from "./Item.tsx";

export interface Minicart {
  data: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
  };
  options: {
    freeShippingTarget: number;
    checkoutHref: string;
    locale: string;
    currency: string;
  };

  useAnalyticsItem: ItemProps["useAnalyticsItem"];
  useUpdateQuantity: ItemProps["useUpdateQuantity"];
}

function Cart({
  cart: {
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
      freeShippingTarget,
      checkoutHref,
    },
    useAnalyticsItem,
    useUpdateQuantity,
  },
}: { cart: Minicart }) {
  const count = items.length;
  const beginCheckout = useId();
  const analyticsItems = items
    .map((_, index) => useAnalyticsItem(index))
    .filter((x): x is AnalyticsItem => Boolean(x));

  return (
    <>
      <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full">
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
              <ul
                role="list"
                class="mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
              >
                {items.map((item, index) => (
                  <li key={index}>
                    <CartItem
                      item={item}
                      index={index}
                      locale={locale}
                      currency={currency}
                      useAnalyticsItem={useAnalyticsItem}
                      useUpdateQuantity={useUpdateQuantity}
                    />
                  </li>
                ))}
              </ul>

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
                    <span>
                      {formatPrice(subtotal, currency, locale)}
                    </span>
                  </div>
                  <Coupon coupon={coupon} />
                </div>

                {/* Total */}
                <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
                  <div class="flex justify-between items-center w-full">
                    <span>Total</span>
                    <span class="font-medium text-xl">
                      {formatPrice(total, currency, locale)}
                    </span>
                  </div>
                  <span class="text-sm text-base-300">
                    Taxas e fretes serão calculados no checkout
                  </span>
                </div>

                <div class="p-4">
                  <a
                    id={beginCheckout}
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

      {/* Events */}
      <SendEventOnClick
        id={beginCheckout}
        event={{
          name: "begin_checkout",
          params: { coupon, currency, value: total, items: analyticsItems },
        }}
      />
      <SendEventOnView
        id={MINICART_DRAWER_ID}
        event={{
          name: "view_cart",
          params: { currency, value: total, items: analyticsItems },
        }}
      />
    </>
  );
}

export default Cart;
