import { itemToAnalyticsItem, useCart } from "apps/nuvemshop/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

function Cart() {
  console.log("cart");
  const { cart, loading, addItems , updateItems} = useCart();
  if (IS_BROWSER) {
    console.log(cart);
  }

  const items = cart.value?.cart?.products ?? [];
  const coupons = cart.value?.coupon;
  const coupon = coupons && coupons[0]?.applicable
    ? coupons[0].code
    : undefined;
  const locale = "pt-BR";
  const currency = cart.value?.currency ?? "BRL";
  const total = cart.value?.total ?? 0;
  const subTotal = cart.value?.subtotal ?? 0;
  const checkoutHref = cart.value?.checkoutUrl
    ? new URL(cart.value?.checkoutUrl).pathname
    : "";

  return (
    <BaseCart
      items={items?.map((item) => ({
        image: {
          src: item.image.src,
          alt: item.image.alt[0],
        },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: item.price,
          list: item.compare_at_price,
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
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ discountCodes: [text] })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({
            quantity: quantity,
            itemId: items[index].id,
          })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
