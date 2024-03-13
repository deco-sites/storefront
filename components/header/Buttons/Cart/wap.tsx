import { itemToAnalyticsItem, useCart } from "apps/wap/hooks/useCart.ts";
import Button from "./common.tsx";

function CartButton() {
  const { loading, cart } = useCart();
  const { subtotal, itens } = cart.value ?? {};

  return (
    <Button
      currency="BRL"
      loading={loading.value}
      total={subtotal?.valor ?? 0}
      items={(itens ?? []).map((item, index) =>
        itemToAnalyticsItem({ ...item! }, index)
      )}
    />
  );
}

export default CartButton;
