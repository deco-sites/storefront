import { useCart } from "apps/nuvemshop/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem" | "platform">;

function AddToCartButton(props: Props) {
  const { addItems } = useCart();

  const onAddItem = () =>
    addItems({
      quantity: 1,
      itemId: Number(props.productID),
      add_to_cart_enhanced: "1",
    });

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
