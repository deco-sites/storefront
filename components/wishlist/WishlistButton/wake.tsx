import { useComputed } from "@preact/signals";
import Button from "./common.tsx";
import { useWishlist } from "apps/wake/hooks/useWishlist.ts";
import { useUser } from "apps/wake/hooks/useUser.ts";

export interface Props {
  productID: string;
  productGroupID?: string;
  variant?: "icon" | "full";
}

function WishlistButton({
  variant = "icon",
  productGroupID,
  productID,
}: Props) {
  const { user } = useUser();
  const { loading, addItem, removeItem, getItem } = useWishlist();

  const listItem = useComputed(() => getItem({ productId: productGroupID }));

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      loading={loading.value}
      inWishlist={inWishlist}
      isUserLoggedIn={isUserLoggedIn}
      variant={variant}
      productGroupID={productGroupID}
      productID={productID}
      removeItem={() => removeItem({ productId: Number(productGroupID) })}
      addItem={() => addItem({ productId: Number(productGroupID) })}
    />
  );
}

export default WishlistButton;
