import { itemToAnalyticsItem } from "apps/nuvemshop/hooks/useCart.ts";
import type a from "apps/nuvemshop/loaders/cart.ts";
import { AppContext } from "apps/nuvemshop/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { useUpdateQuantity } from "../../cart.ts";

type Cart = Awaited<ReturnType<typeof a>>;

const useAnalyticsItem =
  (items: NonNullable<NonNullable<Cart>["products"]>) => (index: number) => {
    const item = items[index];

    if (!item) {
      return null;
    }

    return itemToAnalyticsItem(item, index);
  };

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
    data: {
      items: items?.map((item) => ({
        image: {
          src: item.image.src,
          alt: item.image.alt[0] as string,
        },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: Number(item.price),
          list: Number(item.compare_at_price),
        },
      })),
      total,
      subtotal,
      discounts: 0,
      coupon,
    },
    options: {
      locale,
      currency,
      enableCoupon: false,
      freeShippingTarget: 1000,
      checkoutHref,
    },

    useUpdateQuantity: (quantity: number, index: number) =>
      useUpdateQuantity({ quantity, itemId: items[index].id }),
    useAnalyticsItem: useAnalyticsItem(items),
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
