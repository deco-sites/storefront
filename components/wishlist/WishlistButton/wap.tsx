import { useComputed } from "@preact/signals";
import Button from "./common.tsx";
import { useWishlist } from "apps/wap/hooks/useWishlist.ts";
import { useUser } from "apps/wap/hooks/useUser.ts";

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

  const listItem = useComputed(() => getItem(Number(productID)));

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
      removeItem={() =>
        removeItem({
          idProduto: Number(productID),
          idAtributoSimples: 0,
          idUnidadeVenda: 0,
          parametroAdicional: "",
        })
      }
      addItem={() =>
        addItem({
          idProduto: Number(productID),
          idAtributoSimples: 0,
          idUnidadeVenda: 0,
          quantidade: 1,
          parametroAdicional: "",
        })
      }
    />
  );
}

export default WishlistButton;
