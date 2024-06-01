import { scriptAsDataURI } from "apps/utils/dataURI.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  productID: string;
  productGroupID?: string;
  isUserLoggedIn: boolean;
  variant?: "icon" | "full";
}

export const loader = (props: Props) => {
  return {
    variant: props.variant,
    inWishlist: false,
  };
};

export const action = (props: Props) => {
  return {
    variant: props.variant,
    inWishlist: false,
  };
};

export default function WishlistButton({
  variant = "full",
  inWishlist,
  isUserLoggedIn,
  productID,
  productGroupID,
}: {
  variant?: "icon" | "full";
  inWishlist: boolean;
  isUserLoggedIn: boolean;
  productID: string;
  productGroupID: string;
}) {
  const id = useId();
  const addToWishlistEvent = useSendEvent({
    on: "click",
    event: {
      name: "add_to_wishlist",
      params: {
        items: [
          {
            item_id: productID,
            item_group_id: productGroupID,
            quantity: 1,
          },
        ],
      },
    },
  });

  return (
    <>
      <button
        {...addToWishlistEvent}
        aria-label="Add to wishlist"
        class={clx(
          "btn no-animation",
          variant === "icon"
            ? "btn-circle btn-ghost"
            : "btn-primary btn-outline gap-2 w-full",
        )}
        hx-post={isUserLoggedIn
          ? useComponent(import.meta.url, {
            productID,
            productGroupID,
          })
          : undefined}
        hx-swap="outerHTML"
      >
        <Icon
          class="[.htmx-request_&]:hidden"
          id="Heart"
          size={24}
          strokeWidth={2}
          fill={inWishlist ? "black" : "none"}
        />
        {variant === "full" && (
          <span class="[.htmx-request_&]:hidden">
            {inWishlist ? "Remover" : "Favoritar"}
          </span>
        )}
        <span class="[.htmx-request_&]:inline hidden loading loading-xs loading-spinner" />
      </button>

      {!isUserLoggedIn && (
        <script
          type="module"
          src={scriptAsDataURI((id: string) =>
            document.getElementById(id)?.addEventListener("click", () =>
              globalThis.window.alert(
                "Please log in before adding to your wishlist",
              )), id)}
        />
      )}
    </>
  );
}
