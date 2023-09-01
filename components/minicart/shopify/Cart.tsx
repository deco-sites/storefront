import {  useCart, itemToAnalyticsItem } from "apps/shopify/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  console.log(cart.value)
  const items = cart.value?.cart?.lines?.nodes ?? [];
  const coupons = cart.value?.cart?.discountCodes;
  const locale = "pt-BR";
  const currency = cart.value?.cart?.cost?.totalAmount.currencyCode ?? "BRL";
  const total = cart.value?.cart?.cost?.totalAmount.amount ?? 0;
  const subTotal = cart.value?.cart?.cost?.subtotalAmount.amount ?? 0;
  const checkoutHref = cart.value?.cart?.checkoutUrl ? new URL(cart.value?.cart?.checkoutUrl).pathname : ""


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
          lines: {
            id: items[index].id,
            quantity: quantity,
          },
        })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
