import { itemToAnalyticsItem, useCart } from "apps/salesforce/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, mapItemsToAnalyticsItems, updateItem, addCoupon } =
    useCart();
  const items = cart.value?.productItems ?? [];
  const locale = cart.value?.locale;
  const currencyCode = cart.value?.currency;
  const total = cart.value?.productTotal ?? 0;
  const subtotal = cart.value?.productSubTotal ?? 0;
  const discounts = cart.value?.productItems?.reduce(
    (acc, item) => acc + item.price - item.priceAfterItemDiscount,
    0,
  ) ?? 0;

  return (
    <BaseCart
      items={items?.map((item) => ({
        image: { src: item.image.link, alt: item.image.alt },
        quantity: item.quantity,
        name: item.productName,
        price: {
          sale: item.price,
          list: item.basePrice,
        },
      }))}
      total={total}
      subtotal={subtotal}
      discounts={discounts}
      locale={locale!}
      currency={currencyCode!}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={cart.value?.couponItems?.map((coupon) => coupon.valid).join(",")}
      checkoutHref={`/`}
      onAddCoupon={(text) => addCoupon({ text })}
      onUpdateQuantity={(quantity, index) => {
        const item = items?.[index];
        return updateItem({ itemId: item?.itemId!, quantity });
      }}
      itemToAnalyticsItem={(index) => {
        const item = items?.[index];

        return item &&
          itemToAnalyticsItem(item, index, cart.value?.couponItems);
      }}
    />
  );
}

export default Cart;