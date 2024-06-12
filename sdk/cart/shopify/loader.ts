import { itemToAnalyticsItem } from "apps/shopify/hooks/useCart.ts";
import type a from "apps/shopify/loaders/cart.ts";
import { AppContext } from "apps/shopify/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";

export type Cart = Awaited<ReturnType<typeof a>>;

const locale = "pt-BR";

export const cartFrom = (cart: Cart): Minicart => {
  const items = cart?.lines?.nodes ?? [];
  const coupons = cart?.discountCodes;
  const coupon = coupons && coupons[0]?.applicable
    ? coupons[0].code
    : undefined;
  const currency = cart?.cost?.totalAmount.currencyCode ?? "BRL";
  const total = cart?.cost?.totalAmount.amount ?? 0;
  const subTotal = cart?.cost?.subtotalAmount.amount ?? 0;
  const checkoutHref = cart?.checkoutUrl
    ? new URL(cart?.checkoutUrl).pathname
    : "";

  return {
    platformCart: cart as unknown as Record<string, unknown>,
    storefront: {
      items: items?.map((item, index) => ({
        image: item.merchandise.image?.url ?? "",
        listPrice: item.cost.amountPerQuantity.amount,
        ...itemToAnalyticsItem(item, index),
        item_id: item.merchandise.id,
      })),
      total,
      subtotal: subTotal,
      discounts: 0,
      coupon: coupon,
      currency,
      locale,
      freeShippingTarget: 1000,
      checkoutHref,
    },
  };
};

async function loader(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const response = await ctx.invoke("shopify/loaders/cart.ts");

  return cartFrom(response);
}

export default loader;
