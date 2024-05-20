import { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { JSX } from "preact";
import { useId } from "preact/hooks";
import { useAddToCart } from "../../sdk/cart.ts";
import { clx } from "../../sdk/clx.ts";
import { MINICART_CONTAINER_ID, MINICART_DRAWER_ID } from "../../sdk/useUI.ts";
import { SendEventOnClick } from "../Analytics.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLLabelElement> {
  product: Product;
  price: number;
  listPrice: number;
  seller: string;

  class?: string;
}

function AddToCartButton(
  { product, price, listPrice, seller, class: _class }: Props,
) {
  const id = useId();
  const platform = usePlatform();
  const item = mapProductToAnalyticsItem({ product, price, listPrice });
  const { additionalProperty = [], isVariantOf, productID } = product;
  const productGroupID = isVariantOf?.productGroupID;

  const props = platform === "vtex"
    ? { seller, productID }
    : platform === "shopify"
    ? { lines: { merchandiseId: productID } }
    : platform === "vnda"
    ? {
      quantity: 1,
      itemId: productID,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    }
    : platform === "wake"
    ? {
      productVariantId: Number(productID),
      quantity: 1,
    }
    : platform === "nuvemshop"
    ? {
      quantity: 1,
      itemId: Number(productGroupID),
      add_to_cart_enhanced: "1",
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    }
    : platform === "linx"
    ? {
      ProductID: productGroupID,
      SkuID: productID,
      Quantity: 1,
    }
    : null;

  if (!props) {
    return null;
  }

  return (
    <>
      <label
        id={id}
        for={MINICART_DRAWER_ID}
        data-deco="add-to-cart"
        class={clx("btn no-animation", _class)}
        hx-disabled-elt="this"
        hx-target={`#${MINICART_CONTAINER_ID}`}
        // deno-lint-ignore no-explicit-any
        hx-post={useAddToCart(props as any)}
        hx-swap="innerHTML"
      >
        Adicionar à Sacola
      </label>
      <SendEventOnClick
        event={{ name: "add_to_cart", params: { items: [item] } }}
        id={id}
      />
    </>
  );
}

export default AddToCartButton;
