import { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { JSX } from "preact";
import { MINICART_CONTAINER_ID } from "../../constants.ts";
import { useAddToCart } from "../../sdk/cart.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useSendEvent } from "../Analytics.tsx";

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
  const platform = usePlatform();
  const id = useId();
  const item = mapProductToAnalyticsItem({ product, price, listPrice });
  const { additionalProperty = [], isVariantOf, productID } = product;
  const productGroupID = isVariantOf?.productGroupID;
  const addToCartEvent = useSendEvent({
    on: "click",
    event: { name: "add_to_cart", params: { items: [item] } },
  });

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
    <div
      class="flex"
      data-add-to-cart
      data-product-id={productID}
    >
      <input type="checkbox" id={id} class="hidden peer" />

      <label
        {...addToCartEvent}
        for={id}
        data-deco="add-to-cart"
        class={clx("btn no-animation", _class, "peer-checked:hidden w-full")}
        hx-disabled-elt="this"
        hx-indicator={`#${MINICART_CONTAINER_ID}`}
        hx-target={`#${MINICART_CONTAINER_ID}`}
        // deno-lint-ignore no-explicit-any
        hx-post={useAddToCart(props as any)}
        hx-swap="innerHTML"
      >
        Adicionar à Sacola
      </label>

      <div
        class={clx(
          "hidden peer-checked:flex flex-grow",
          "join border rounded-none w-min",
        )}
      >
        <button
          name="action"
          // value={`decrease::${index}`}
          class="btn btn-square btn-ghost join-item"
          // disabled={quantity <= 1}
        >
          -
        </button>
        <div
          class={clx(
            "flex-grow flex justify-center",
            "has-[:invalid]:tooltip has-[:invalid]:tooltip-error has-[:invalid]:tooltip-open has-[:invalid]:tooltip-bottom",
          )}
          data-tip="Quantity must be higher than 1"
        >
          <input
            // name={`item::${index}`}
            class={clx(
              "input text-center join-item [appearance:textfield] flex-grow",
              "invalid:input-error peer disabled:hidden inline",
            )}
            inputMode="numeric"
            type="number"
            disabled
            maxLength={3}
            min={1}
            size={3}
          />
          <span class="peer-disabled:inline hidden loading loading-spinner" />
        </div>
        <button
          name="action"
          // value={`increase::${index}`}
          class="btn btn-square btn-ghost join-item"
          // disabled={quantity >= QUANTITY_MAX_VALUE}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default AddToCartButton;
