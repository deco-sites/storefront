import { itemToAnalyticsItem, useCart } from "apps/nuvemshop/hooks/useCart.ts";
import Button from "./common.tsx";

function CartButton() {
  const { cart, loading } = useCart();
  const items = cart.value?.products ?? [];
  const currency = cart.value?.currency ?? "BRL";
  const total = cart.value?.total ?? 0;

  return (
    <Button
      currency={currency}
      loading={loading.value}
      total={Number(total)}
      items={items.map((item, index) => itemToAnalyticsItem(item, index))}
    />
  );
}

export default CartButton;
