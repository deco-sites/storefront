import { itemToAnalyticsItem } from "apps/wake/hooks/useCart.ts";
import type a from "apps/wake/loaders/cart.ts";
import { AppContext } from "apps/wake/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { useUpdateQuantity } from "../../cart.ts";

type Cart = Awaited<ReturnType<typeof a>>;

const useAnalyticsItem =
  (items: NonNullable<Cart["products"]>) => (index: number) => {
    const item = items[index];

    if (!item) {
      return null;
    }

    return itemToAnalyticsItem(item, index);
  };

const locale = "pt-BR";
const currency = "BRL";

export const cartFrom = (cart: Cart): Minicart => {
  const items = cart?.products ?? [];

  const total = cart?.total ?? 0;
  const subtotal = cart?.subtotal ?? 0;
  const coupon = cart?.coupon ?? undefined;

  return {
    data: {
      items: items.map((item) => ({
        image: { src: item!.imageUrl!, alt: "product image" },
        quantity: item!.quantity!,
        name: item!.name!,
        price: { sale: item!.price!, list: item!.listPrice! },
      })),
      total,
      subtotal,
      discounts: 0,
      coupon,
    },
    options: {
      locale,
      currency,
      freeShippingTarget: 1000,
      checkoutHref: `/checkout`,
    },

    useUpdateQuantity: (quantity: number, index: number) =>
      useUpdateQuantity({
        quantity,
        productVariantId: items[index]?.productVariantId,
      }),
    useAnalyticsItem: useAnalyticsItem(items),
  };
};

async function loader(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const response = await ctx.invoke("wake/loaders/cart.ts");

  return cartFrom(response);
}

export default loader;
