import { useComputed, useSignal } from "@preact/signals";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useWishlist } from "apps/vtex/hooks/useWishlist.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";

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
  const listItem = useComputed(() =>
    getItem({ sku: productID, productId: productGroupID })
  );
  const fetching = useSignal(false);

  const isUserLoggedIn = Boolean(user.value?.email);
  const inWishlist = Boolean(listItem.value);

  return (
    <Button
      class={variant === "icon"
        ? "btn-circle btn-ghost gap-2"
        : "btn-primary btn-outline gap-2"}
      loading={fetching.value}
      aria-label="Add to wishlist"
      onClick={async (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isUserLoggedIn) {
          window.alert("Please log in before adding to your wishlist");

          return;
        }

        if (loading.value) {
          return;
        }

        try {
          fetching.value = true;

          if (inWishlist) {
            await removeItem({ id: listItem.value!.id }!);
          } else if (productID && productGroupID) {
            await addItem({ sku: productID, productId: productGroupID });

            sendEvent({
              name: "add_to_wishlist",
              params: {
                items: [{
                  item_id: productID,
                  item_group_id: productGroupID,
                  quantity: 1,
                }],
              },
            });
          }
        } finally {
          fetching.value = false;
        }
      }}
    >
      <Icon
        id="Heart"
        size={24}
        strokeWidth={2}
        fill={inWishlist ? "black" : "none"}
      />
      {variant === "icon" ? null : inWishlist ? "Remover" : "Favoritar"}
    </Button>
  );
}

export default WishlistButton;
