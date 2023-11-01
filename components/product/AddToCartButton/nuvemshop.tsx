import { useCart } from "apps/nuvemshop/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem" | "platform">;

function AddToCartButton(props: Props) {
  const { addItems } = useCart();

  const onAddItem = async () => {
    console.log("here");
    const items = await addItems({
      quantity: 1,
      itemId: props.productID,
      add_to_cart_enhanced: "1",
    });
    console.log(items);
  };

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
