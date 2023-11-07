import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;

  const analyticsItems = items.map((item) => ({
    sku: item.id,
    inProductGroupWithID: item.productId,
    name: item.name,
    seller: item.seller,
    listPrice: parseFloat((item.listPrice / 100).toFixed(2)),
    price: parseFloat((item.price / 100).toFixed(2)),
    url: `${self?.location.host}${item.detailUrl}`,
    brand: item.additionalInfo.brandName ?? "",
    category: Object.values(item.productCategories).join('>') ?? "",
  }));

  const analytics = {
    items: analyticsItems,
    extended: {
      view: {
        id: "mini_cart",
        name: "Mini Cart",
      },
      index: 0,
      quantity: 1,
    },
  };

  return (
    <BaseCart
      analytics={analytics}
      items={items.map((item) => ({
        image: { src: item.imageUrl, alt: item.skuName },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: item.sellingPrice / 100,
          list: item.listPrice / 100,
        },
      }))}
      total={(total - discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })}
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
    />
  );
}

export default Cart;
