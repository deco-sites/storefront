import { itemToAnalyticsItem, useCart } from "apps/shopify/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import { GetCartQuery } from "apps/shopify/utils/storefront/storefront.graphql.gen.ts";

type Props = {
  cart: GetCartQuery["cart"];
};

export const Cart = ({ cart }: Props) => {
  const items = cart?.lines?.nodes ?? [];
  const coupons = cart?.discountCodes;
  const coupon = coupons && coupons[0]?.applicable
    ? coupons[0].code
    : undefined;
  const locale = "pt-BR";
  const currency = cart?.cost?.totalAmount.currencyCode ?? "BRL";
  const total = cart?.cost?.totalAmount.amount ?? 0;
  const subTotal = cart?.cost?.subtotalAmount.amount ?? 0;
  const checkoutHref = cart?.checkoutUrl
    ? new URL(cart?.checkoutUrl).pathname
    : "";

  return (
    <BaseCart
      items={items?.map((item) => ({
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
      }))}
      total={total}
      subtotal={subTotal}
      discounts={0}
      locale={locale}
      currency={currency}
      loading={false}
      freeShippingTarget={1000}
      checkoutHref={checkoutHref}
      coupon={coupon}
      // onAddCoupon={(text) => addCouponsToCart({ discountCodes: [text] })}
      // onUpdateQuantity={(quantity, index) =>
      //   updateItems({
      //     lines: [{
      //       id: items[index].id,
      //       quantity: quantity,
      //     }],
      //   })}
      // itemToAnalyticsItem={(index) => {
      //   const item = items[index];

      //   return item && itemToAnalyticsItem(item, index);
      // }}
    />
  );
};

export default Cart;
