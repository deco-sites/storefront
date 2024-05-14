// deno-lint-ignore-file no-explicit-any
import { Props as AddItemsProps } from "apps/vtex/actions/cart/addItems.ts";
import { Props as UpdateCartProps } from "apps/vtex/actions/cart/updateItems.ts";
import { itemToAnalyticsItem } from "apps/vtex/hooks/useCart.ts";
import { OrderForm, OrderFormItem } from "apps/vtex/utils/types.ts";
import { asResolved } from "deco/mod.ts";
import { ComponentProps, Props } from "../../components/minicart/Minicart.tsx";

export const useRevealCart = (): Props => {
  return {
    cart: asResolved({ __resolveType: "vtex/loaders/cart.ts" }) as any,
  };
};

export const useAddToCart = (
  seller: string,
  productID: string,
): Props => {
  const action: AddItemsProps = {
    allowedOutdatedData: ["paymentData"],
    orderItems: [{ quantity: 1, seller, id: productID }],
  };

  return {
    cart: asResolved({
      __resolveType: "vtex/actions/cart/addItems.ts",
      ...action,
    }) as any,
  };
};

const useUpdateQuantity = (
  quantity: number,
  index: number,
): Props => {
  const action: UpdateCartProps = {
    allowedOutdatedData: ["paymentData"],
    orderItems: [{ quantity, index }],
  };

  return ({
    cart: asResolved({
      __resolveType: "vtex/actions/cart/updateItems.ts",
      ...action,
    }) as any,
  });
};

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

const useAddCoupon = (): Props => {
  return {
    cart: asResolved({
      __resolveType: "vtex/actions/cart/updateCoupons.ts",
    }) as any,
  };
};

export const useMinicart = (
  { cart, url }: { cart: OrderForm | null; url: string },
): ComponentProps => {
  const { items, totalizers } = cart ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    (totalizers?.find((item) => item.id === "Discounts")?.value || 0) * -1;
  const locale = cart?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart?.marketingData?.coupon ?? undefined;

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
    // onAddCoupon={(text) => addCouponsToCart({ text })}

    useAddCoupon,
    useUpdateQuantity,
    useAnalyticsItem: useAnalyticsItem(items, coupon, url),
  };
};
