import { itemToAnalyticsItem } from "apps/vnda/hooks/useCart.ts";
import type a from "apps/vnda/loaders/cart.ts";
import { AppContext } from "apps/vnda/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { useUpdateQuantity } from "../../cart.ts";

type Cart = Awaited<ReturnType<typeof a>>;

const useAnalyticsItem =
  (items: NonNullable<Cart["orderForm"]>["items"]) => (index: number) => {
    const item = items[index];

    if (!item) {
      return null;
    }

    return itemToAnalyticsItem(item, index);
  };

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
    data: {
      items: items.map((item) => ({
        image: {
          src: normalizeUrl(item.image_url ?? ""),
          alt: item.product_name,
        },
        quantity: item.quantity,
        name: item.variant_name,
        price: {
          sale: item.variant_price,
          list: item.variant_price,
        },
      })),
      total,
      subtotal,
      discounts,
      coupon,
    },
    options: {
      locale,
      currency,
      freeShippingTarget: 1000,
      enableCoupon: false, // We still do not support coupon on vnda
      checkoutHref: `/checkout/${token}`,
    },

    useUpdateQuantity: (quantity: number, index: number) => {
      const item = items[index];

      if (!item || typeof item.id === "undefined") return "";

      return useUpdateQuantity({ quantity, itemId: item.id });
    },
    useAnalyticsItem: useAnalyticsItem(items),
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
