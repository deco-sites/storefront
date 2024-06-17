import { itemToAnalyticsItem } from "apps/nuvemshop/hooks/useCart.ts";
import type a from "apps/nuvemshop/loaders/cart.ts";
import { AppContext } from "apps/nuvemshop/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";

export type Cart = Awaited<ReturnType<typeof a>>;

const locale = "pt-BR";

export const cartFrom = (cart: Cart | null): Minicart => {
  const items = cart?.products ?? [];
  const coupons = cart?.coupon;
  const coupon = coupons?.[0] as string | undefined;
  const currency = cart?.currency ?? "BRL";
  const total = Number(cart?.total ?? 0);
  const subtotal = Number(cart?.subtotal ?? 0);
  const checkoutHref = `/checkout/v3/start/${cart?.id}/${cart?.token}`;

  return {
    platformCart: cart as unknown as Record<string, unknown>,
    storefront: {
      items: items?.map((item, index) => ({
        image: item.image.src,
        listPrice: Number(item.compare_at_price),
        ...itemToAnalyticsItem(item, index),
      })),
      total,
      subtotal,
      discounts: 0,
      coupon,
      locale,
      currency,
      enableCoupon: false,
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
  const response = await ctx.invoke("nuvemshop/loaders/cart.ts");

  return cartFrom(response);
}

export default loader;
