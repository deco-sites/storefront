import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  onClick?: () => void;
}

function AddToCartButton({ seller, productID, eventParams, onClick }: Props) {
  const { addItems } = useCart();
  const onAddItem = () => {
    if (onClick) {
      onClick();
    }

    return addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: 1,
      }],
    });
  };

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
