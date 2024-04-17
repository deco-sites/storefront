import { itemToAnalyticsItem, useCart } from "apps/wake/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItem, addCoupon } = useCart();
  const items = cart.value.products ?? [];

  const total = cart.value.total ?? 0;
  const subtotal = cart.value.subtotal ?? 0;
  const locale = "pt-BR";
  const currency = "BRL";
  const coupon = cart.value.coupon ?? undefined;

  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: item!.imageUrl!, alt: "product image" },
        quantity: item!.quantity!,
        name: item!.name!,
        price: { sale: item!.price!, list: item!.listPrice! },
      }))}
      total={total}
      subtotal={subtotal}
      discounts={0}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon}
      checkoutHref={`/checkout`}
      onAddCoupon={(code) => addCoupon({ coupon: code })}
      onUpdateQuantity={(quantity: number, index: number) =>
        updateItem({
          quantity,
          productVariantId: items[index]?.productVariantId,
        })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
