// import { useCart } from "apps/shopify/hooks/useCart.ts";
import { Props as BtnProps } from "./common.tsx";
import { useSection } from "deco/hooks/usePartialSection.ts";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
};

function AddToCartButton({ productID, eventParams }: Props) {
  return (
    <label
      // onAddItem={onAddItem}
      eventParams={eventParams}
      class="btn btn-primary"
      for="minicart-drawer"
      hx-disabled-elt="this"
      hx-target="#minicart"
      hx-post={useSection({
        props: {
          __resolveType: "deco-sites/storefront/sections/Cart/Minicart.tsx",
          cart: {
            __resolveType: "shopify/actions/cart/addItems.ts",
            lines: {
              merchandiseId: productID,
            },
          },
          platform: "shopify",
        },
      })}
    >
      Add to Cart
    </label>
  );
}

export default AddToCartButton;
