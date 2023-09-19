import { itemToAnalyticsItem, useCart } from "apps/linx/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItem, addCoupon } = useCart();
  const items = cart.value?.Shopper?.Basket?.Items ?? [];

  const total = cart.value?.Shopper?.Basket?.Total ?? 0;
  const subtotal = cart.value?.Shopper?.Basket?.SubTotal ?? 0;
  const locale = "pt-BR";
  const currency = "BRL";
  const coupon = cart.value?.Shopper?.Basket?.Coupons?.Amount ?? undefined;

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
      checkoutHref={`/checkout/easy`}
      onAddCoupon={(code) => addCoupon({ coupon: code })}
      onUpdateQuantity={(quantity: number, index: number) =>
        updateItem({
          quantity,
          productVariantId: items[index]?.BasketItemID.toString(),
        })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
