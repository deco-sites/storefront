import { itemToAnalyticsItem, useCart } from "apps/wake/hooks/useCart.ts";
import Button from "../../../components/header/Bag.tsx";

function CartButton() {
  const { loading, cart } = useCart();
  const { total, products, coupon } = cart.value;

  return (
    <Button
      currency="BRL"
      loading={loading.value}
      total={total}
      items={(products ?? []).map(
        (item, index) =>
          itemToAnalyticsItem({ ...item!, coupon: coupon ?? "" }, index),
      )}
    />
  );
}

export default CartButton;
