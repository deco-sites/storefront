import { useCart } from "apps/salesforce/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem" | "platform">;


function AddToCartButton(props: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      basketItems: [{
        productId: props.productID,
        quantity: 1,
      }],
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
