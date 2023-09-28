import { itemToAnalyticsItem, useCart } from "apps/linx/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItem, addCoupon } = useCart();
  const items = cart.value?.Basket?.Items ?? [];

  const total = cart.value?.Basket?.Total ?? 0;
  const subtotal = cart.value?.Basket?.SubTotal ?? 0;
  const locale = "pt-BR";
  const currency = "BRL";
  const coupon = cart.value?.Basket?.Coupons?.[0]?.Code ?? undefined;

  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: item!.ImagePath!, alt: "product image" },
        quantity: item!.Quantity!,
        name: item!.Name!,
        price: { sale: item!.RetailPrice!, list: item!.ListPrice! },
      }))}
      total={total}
      subtotal={subtotal}
      discounts={0}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon?.toString()}
      checkoutHref="/carrinho"
      onAddCoupon={(CouponCode) => addCoupon({ CouponCode })}
      onUpdateQuantity={(quantity: number, index: number) =>
        updateItem({
          Quantity: quantity,
          BasketItemID: items[index]?.BasketItemID,
        })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, coupon, index);
      }}
    />
  );
}

export default Cart;
