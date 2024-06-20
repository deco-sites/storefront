import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
}

const onClick = () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  window.STOREFRONT.CART.addToCart(item, platformProps);
};

const onChange = () => {
  const input = event!.currentTarget as HTMLInputElement;
  const productID = input!
    .closest("div[data-cart-item]")!
    .getAttribute("data-item-id")!;
  const quantity = Number(input.value);

  if (!input.validity.valid) {
    return;
  }

  window.STOREFRONT.CART.setQuantity(productID, quantity);
};

// Copy cart form values into AddToCartButton
const onLoad = (id: string) => {
  window.STOREFRONT.CART.subscribe((sdk) => {
    const container = document.getElementById(id);
    const checkbox = container?.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    const input = container?.querySelector<HTMLInputElement>(
      'input[type="number"]',
    );
    const itemID = container?.getAttribute("data-item-id")!;

    const quantity = sdk.getQuantity(itemID) || 0;

    if (!input || !checkbox) {
      return;
    }

    input.value = quantity.toString();
    checkbox.checked = quantity > 0;

    // enable interactivity
    container?.querySelectorAll<HTMLButtonElement>("button").forEach((node) =>
      node.disabled = false
    );
    container?.querySelectorAll<HTMLButtonElement>("input").forEach((node) =>
      node.disabled = false
    );
  });
};

const useAddToCart = ({ product, seller }: Props) => {
  const platform = usePlatform();
  const { additionalProperty = [], isVariantOf, productID } = product;
  const productGroupID = isVariantOf?.productGroupID;

  if (platform === "vtex") {
    return {
      allowedOutdatedData: ["paymentData"],
      orderItems: [{ quantity: 1, seller: seller, id: productID }],
    };
  }

  if (platform === "shopify") {
    return { lines: { merchandiseId: productID } };
  }

  if (platform === "vnda") {
    return {
      quantity: 1,
      itemId: productID,
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    };
  }

  if (platform === "wake") {
    return {
      productVariantId: Number(productID),
      quantity: 1,
    };
  }

  if (platform === "nuvemshop") {
    return {
      quantity: 1,
      itemId: Number(productGroupID),
      add_to_cart_enhanced: "1",
      attributes: Object.fromEntries(
        additionalProperty.map(({ name, value }) => [name, value]),
      ),
    };
  }

  if (platform === "linx") {
    return {
      ProductID: productGroupID,
      SkuID: productID,
      Quantity: 1,
    };
  }

  return null;
};

function AddToCartButton(props: Props) {
  const { product, item, class: _class } = props;
  const platformProps = useAddToCart(props);
  const id = useId();

  return (
    <div
      id={id}
      class="flex"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >
      <input type="checkbox" class="hidden peer" />

      <button
        disabled
        class={clx("flex-grow peer-checked:hidden", _class?.toString())}
        hx-on:click={useScript(onClick)}
      >
        Add to Cart
      </button>

      {/* Quantity Input */}
      <div class="flex-grow hidden peer-checked:flex">
        <QuantitySelector
          disabled
          min={0}
          max={100}
          hx-on:change={useScript(onChange)}
        />
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}

export default AddToCartButton;
