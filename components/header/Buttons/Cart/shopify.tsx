import { itemToAnalyticsItem, useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props } from "./common.tsx";
import { useSection } from "deco/hooks/usePartialSection.ts";

function CartButton(props: Props) {
  return (
    <Button
      items={[]}
      {...props}
      hx-target="#minicart"
      hx-get={useSection({
        props: {
          __resolveType: "deco-sites/storefront/sections/Cart/Minicart.tsx",
          cart: { __resolveType: "shopify/loaders/cart.ts" },
          platform: "shopify",
        },
      })}
    />
  );
}

export default CartButton;
