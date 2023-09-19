import { itemToAnalyticsItem, useCart } from "apps/linx/hooks/useCart.ts";
import Button from "./common.tsx";


function CartButton() {
  const { loading, cart } = useCart();
  const cartSize = cart.value?.Shopper?.Basket?.Items?.length || 0;
  const products = cart.value?.Shopper?.Basket?.Items;
  const coupon = cart.value?.Shopper?.Basket?.Coupons?.Code;

  return (
    <Button
      currency="BRL"
      loading={loading.value}
      total={cartSize}
      items={(products ?? []).map(
        (item, index) =>
          itemToAnalyticsItem({ product: item!, coupon: coupon ?? "" }, index),
      )}
    />
  );
}

export default CartButton;
