import { useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
};

function AddToCartButton({ productID, eventParams }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      lines: {
        merchandiseId: productID,
      },
    });

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
