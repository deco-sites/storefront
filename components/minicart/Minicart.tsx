import { useScript } from "apps/htmx/hooks/useScript.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
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

const onLoad = () => {
  window.STOREFRONT.CART?.restore();

  // TODO: Trigger event when actually intersecting
  window.DECO.events.dispatch({
    name: "view_cart",
    params: window.STOREFRONT.CART?.getCart(),
  });
};

const useSubmitCart = () =>
  useComponent(import.meta.url, {
    cart: { __resolveType: "site/actions/minicart/submit.ts" },
  });

const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART?.getCart(),
  });
};

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

  return (
    <form
      class="contents"
      id={MINICART_FORM_ID}
      hx-sync="this:replace"
      hx-trigger="submit, change delay:300ms"
      hx-target="this"
      hx-indicator="this"
      hx-disabled-elt="this"
      hx-post={useSubmitCart()}
      hx-swap="outerHTML"
    >
      {/* Button to submit the form */}
      <button hidden autofocus />

      {/* Add to cart controllers */}
      <input name="add-to-cart" type="hidden" />
      <button hidden name="action" value="add-to-cart" />

      {/* This contains the STOREFRONT cart. */}
      <input
        type="hidden"
        name="storefront-cart"
        value={encodeURIComponent(
          JSON.stringify({ coupon, currency, value: total, items }),
        )}
      />

      {/* This contains the original cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
      <input
        type="hidden"
        name="platform-cart"
        value={encodeURIComponent(JSON.stringify(original))}
      />

      <div
        class={clx(
          "flex flex-col flex-grow justify-center items-center overflow-hidden w-full",
          "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
        )}
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
                    class="btn btn-primary w-full no-animation"
                    href={checkoutHref}
                    hx-on:click={useScript(sendBeginCheckoutEvent)}
                  >
                    <span class="[.htmx-request_&]:hidden">Begin Checkout</span>
                    <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                  </a>
                </div>
              </footer>
            </>
          )}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
      />
    </form>
  );
}

export default Cart;
