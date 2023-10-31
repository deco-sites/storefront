import { itemToAnalyticsItem, useCart } from "apps/salesforce/hooks/useCart.ts";
import Button from "./common.tsx";

function CartButton() {
  const { loading, cart } = useCart();

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
    <Button
      currency={currencyCode}
      loading={loading.value}
      total={(total - discounts) / 100}
      items={items.map((item, index) => itemToAnalyticsItem(item, index))}
    />
  );
}

export default CartButton;