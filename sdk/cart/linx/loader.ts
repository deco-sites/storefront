import { itemToAnalyticsItem } from "apps/linx/hooks/useCart.ts";
import type a from "apps/linx/loaders/cart.ts";
import { AppContext } from "apps/linx/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { useUpdateQuantity } from "../../cart.ts";

type Cart = Awaited<ReturnType<typeof a>>;

const useAnalyticsItem =
  (items: NonNullable<NonNullable<Cart>["Basket"]>["Items"], coupon: string) =>
  (index: number) => {
    const item = items[index];

    if (!item) {
      return null;
    }

    return itemToAnalyticsItem(item, coupon, index);
  };

const locale = "pt-BR";
const currency = "BRL";

export const cartFrom = (cart: Cart): Minicart => {
  const items = cart?.Basket?.Items ?? [];

  const total = cart?.Basket?.Total ?? 0;
  const subtotal = cart?.Basket?.SubTotal ?? 0;
  const coupon = cart?.Basket?.Coupons?.[0]?.Code ?? "";

  return {
    data: {
      items: items.map((item) => ({
        image: { src: item!.ImagePath!, alt: "product image" },
        quantity: item!.Quantity!,
        name: item!.Name!,
        price: { sale: item!.RetailPrice!, list: item!.ListPrice! },
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
      checkoutHref: "/carrinho",
    },

    useUpdateQuantity: (quantity: number, index: number) =>
      useUpdateQuantity({
        Quantity: quantity,
        BasketItemID: items[index]?.BasketItemID,
      }),
    useAnalyticsItem: useAnalyticsItem(items, coupon),
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
