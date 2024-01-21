// import { useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { useSection } from "deco/hooks/usePartialSection.ts";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
};

function AddToCartButton({ productID, eventParams }: Props) {

    

  return (<Button 
    // onAddItem={onAddItem} 
    eventParams={eventParams} 
    hx-target="#minicart"
    hx-post={useSection({
      props: {
        __resolveType: "deco-sites/storefront/sections/Cart/Minicart.tsx",
        cart: { 
          __resolveType: "shopify/actions/cart/addItems.ts" ,
          lines: {
            merchandiseId: productID,
          },
        },
        platform: "shopify",
      },
    })}
    />
    );
}

export default AddToCartButton;
