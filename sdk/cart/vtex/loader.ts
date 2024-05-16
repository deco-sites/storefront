import { itemToAnalyticsItem } from "apps/vtex/hooks/useCart.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { OrderForm, OrderFormItem } from "apps/vtex/utils/types.ts";
import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { useUpdateQuantity } from "../../cart.ts";

const useAnalyticsItem =
  (items: OrderFormItem[], coupon: string | undefined, url: string) =>
  (index: number) => {
    const item = items[index];
    const detailUrl = new URL(item.detailUrl, url).href;

    if (!item) {
      return null;
    }

    return itemToAnalyticsItem({ ...item, detailUrl, coupon }, index);
  };

export const orderFormToCart = (
  form: OrderForm | null,
  url: string,
): Minicart => {
  const { items, totalizers } = form ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    (totalizers?.find((item) => item.id === "Discounts")?.value || 0) * -1;
  const locale = form?.clientPreferencesData.locale ?? "pt-BR";
  const currency = form?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = form?.marketingData?.coupon ?? undefined;

  return {
    data: {
      items: items.map((item) => ({
        image: { src: item.imageUrl, alt: item.skuName },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: item.sellingPrice / 100,
          list: item.listPrice / 100,
        },
      })),
      total: (total - discounts) / 100,
      subtotal: total / 100,
      discounts: discounts / 100,
      coupon: coupon,
    },
    options: {
      currency: currency,
      locale: locale,
      freeShippingTarget: 1000,
      checkoutHref: "/checkout",
    },

    useUpdateQuantity: (quantity: number, index: number) =>
      useUpdateQuantity({ quantity, index }),
    useAnalyticsItem: useAnalyticsItem(items, coupon, url),
  };
};

async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const form = await ctx.invoke("vtex/loaders/cart.ts") as OrderForm | null;

  return orderFormToCart(form, req.url);
}

export default loader;
