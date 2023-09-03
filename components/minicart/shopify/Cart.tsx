import { itemToAnalyticsItem, useCart } from "apps/shopify/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const items = cart.value?.lines?.nodes ?? [];
  const coupons = cart.value?.discountCodes;
  const locale = "pt-BR";
  const currency = cart.value?.cost?.totalAmount.currencyCode ?? "BRL";
  const total = cart.value?.cost?.totalAmount.amount ?? 0;
  const subTotal = cart.value?.cost?.subtotalAmount.amount ?? 0;
  const checkoutHref = cart.value?.checkoutUrl
    ? new URL(cart.value?.checkoutUrl).pathname
    : "";

  return (
    <BaseCart
      items={items?.map((item) => ({
        image: {
          src: item.merchandise.image.url,
          alt: item.merchandise.image.altText,
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
      loading={loading.value}
      freeShippingTarget={1000}
      checkoutHref={checkoutHref}
      coupon={coupons && coupons[0]?.code}
      onAddCoupon={(text) => addCouponsToCart({ discountCodes: [text] })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({
          lines: [{
            id: items[index].id,
            quantity: quantity,
          }],
        })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
