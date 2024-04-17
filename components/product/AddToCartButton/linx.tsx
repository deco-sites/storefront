import { useCart } from "apps/linx/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
  productGroupID: string;
};

function AddToCartButton({ productGroupID, productID, eventParams }: Props) {
  const { addItem } = useCart();

  return (
    <Button
      eventParams={eventParams}
      onAddItem={() =>
        addItem({
          ProductID: productGroupID,
          SkuID: productID,
          Quantity: 1,
        })}
    />
  );
}

export default AddToCartButton;
