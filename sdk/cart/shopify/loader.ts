import { itemToAnalyticsItem } from "apps/shopify/hooks/useCart.ts";
import {
  CartFragment,
} from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";
import { AppContext } from "apps/shopify/mod.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { useUpdateQuantity } from "../../cart.ts";

const useAnalyticsItem =
  (items: CartFragment["lines"]["nodes"]) => (index: number) => {
    const item = items[index];

    if (!item) {
      return null;
    }

    return itemToAnalyticsItem(item, index);
  };

const locale = "pt-BR";

export const cartFromFragment = (cart: CartFragment | null): Minicart => {
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
    data: {
      items: items?.map((item) => ({
        image: {
          src: item.merchandise.image?.url ?? "",
          alt: item.merchandise.image?.altText ?? "",
        },
        quantity: item.quantity,
        name: item.merchandise.product.title,
        price: {
          sale: item.cost.compareAtAmountPerQuantity?.amount,
          list: item.cost.amountPerQuantity.amount,
        },
      })),
      total: total,
      subtotal: subTotal,
      discounts: 0,
      coupon: coupon,
    },
    options: {
      currency: currency,
      locale: locale,
      freeShippingTarget: 1000,
      checkoutHref,
    },

    useUpdateQuantity: (quantity: number, index: number) =>
      useUpdateQuantity({
        lines: [{
          id: items[index].id,
          quantity: quantity,
        }],
      }),
    useAnalyticsItem: useAnalyticsItem(items),
  };
};

async function loader(
  _props: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const fragment = await ctx.invoke("shopify/loaders/cart.ts");

  return cartFromFragment(fragment);
}

export default loader;
cartFromFragment;
