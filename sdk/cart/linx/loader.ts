import { itemToAnalyticsItem } from "apps/linx/hooks/useCart.ts";
import type a from "apps/linx/loaders/cart.ts";
import { AppContext } from "apps/linx/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";

export type Cart = Awaited<ReturnType<typeof a>>;

const locale = "pt-BR";
const currency = "BRL";

export const cartFrom = (cart: Cart): Minicart => {
  const items = cart?.Basket?.Items ?? [];

  const total = cart?.Basket?.Total ?? 0;
  const subtotal = cart?.Basket?.SubTotal ?? 0;
  const coupon = cart?.Basket?.Coupons?.[0]?.Code ?? "";

  return {
    platformCart: cart as unknown as Record<string, unknown>,
    storefront: {
      items: items.map((item, index) => ({
        image: item.ImagePath,
        listPrice: item.ListPrice,
        ...itemToAnalyticsItem(item, coupon, index),
      })),
      total,
      subtotal,
      discounts: 0,
      coupon,
      locale,
      currency,
      freeShippingTarget: 1000,
      checkoutHref: "/carrinho",
    },
  };
};

async function loader(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const response = await ctx.invoke("linx/loaders/cart.ts");

  return cartFrom(response);
}

export default loader;
