import { itemToAnalyticsItem } from "apps/vnda/hooks/useCart.ts";
import type a from "apps/vnda/loaders/cart.ts";
import { AppContext } from "apps/vnda/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";

export type Cart = Awaited<ReturnType<typeof a>>;

const normalizeUrl = (url: string) =>
  url.startsWith("//") ? `https:${url}` : url;

const locale = "pt-BR";
const currency = "BRL";

export const cartFrom = (cart: Cart): Minicart => {
  const items = cart?.orderForm?.items ?? [];
  const total = cart?.orderForm?.total ?? 0;
  const subtotal = cart?.orderForm?.subtotal ?? 0;
  const discounts = cart?.orderForm?.subtotal_discount ?? 0;
  const coupon = cart?.orderForm?.coupon_code ?? undefined;
  const token = cart?.orderForm?.token;

  return {
    platformCart: cart,
    storefront: {
      items: items.map((item, index) => ({
        image: normalizeUrl(item.image_url ?? ""),
        listPrice: item.variant_price,
        ...itemToAnalyticsItem(item, index),
      })),
      total,
      subtotal,
      discounts,
      coupon,
      locale,
      currency,
      freeShippingTarget: 1000,
      enableCoupon: false, // We still do not support coupon on vnda
      checkoutHref: `/checkout/${token}`,
    },
  };
};

async function loader(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const response = await ctx.invoke("vnda/loaders/cart.ts");

  return cartFrom(response);
}

export default loader;
