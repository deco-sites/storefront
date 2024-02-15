import { itemToAnalyticsItem, useCart } from "apps/wap/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";

function Cart() {
  const { cart, loading, updateItem, updateCoupon, removeItem } = useCart();
  const items = cart.value?.itens ?? [];

  const total = cart.value?.subtotal?.valor ?? 0;
  const subtotal = cart.value?.subtotal?.valor ?? 0;
  const locale = "pt-BR";
  const currency = "BRL";
  const coupon = cart.value?.coupon ?? undefined;

  return (
    <BaseCart
      items={items.map((item) => ({
        image: { src: item!.imagem!, alt: "product image" },
        quantity: item!.quantidade!,
        name: item!.nome!,
        price: { sale: item!.precos.precoPor!, list: item!.precos.precoDe! },
      }))}
      total={total}
      subtotal={subtotal}
      discounts={0}
      locale={locale}
      currency={currency} 
      loading={loading.value}
      freeShippingTarget={1000}
      coupon={coupon}
      checkoutHref={`/checkout/carrinho/`}
      onAddCoupon={(code) => updateCoupon({ hashCupom: code })}
      onUpdateQuantity={(quantidade: number, index: number) =>
        quantidade === 0
          ? removeItem({
              tipo: "produto",
              idProduto: items[index]?.hash.idProduto,
              idAtributoSimples: items[index]?.hash.idAtributoSimples,
              idUnidadeVenda: items[index]?.hash.idUnidadeVenda,
              idArmazem: items[index]?.hash.idArmazem,
            })
          : updateItem({
              tipo: "produto",
              quantidade,
              idProduto: items[index]?.hash.idProduto,
              idAtributoSimples: items[index]?.hash.idAtributoSimples,
              idUnidadeVenda: items[index]?.hash.idUnidadeVenda,
              idArmazem: items[index]?.hash.idArmazem,
            })
      }
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem(item, index);
      }}
    />
  );
}

export default Cart;
