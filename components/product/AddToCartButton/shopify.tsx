import { useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem" | "platform">;

function AddToCartButton(props: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      lines: {
        merchandiseId: props.productID,
      },
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
