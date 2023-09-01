import { itemToAnalyticsItem, useCart } from "apps/shopify/hooks/useCart.ts";
import Button from "./common.tsx";

function CartButton() {
    const { cart, loading } = useCart();
    const items = cart.value?.cart?.lines?.nodes ?? [];
    const currency = cart.value?.cart?.cost?.totalAmount.currencyCode ?? "BRL";
    const total = cart.value?.cart?.cost?.totalAmount.amount ?? 0;
    return (
        <Button
        currency={currency}
        loading={loading.value}
        total={total}
        items={items.map((item, index) =>
            itemToAnalyticsItem(item, index)
        )}
        />
    );
}

export default CartButton;
