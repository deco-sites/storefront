import { useCart } from "../../sdk/cart.ts";
import { MINICART_CONTAINER_ID, MINICART_DRAWER_ID } from "../../sdk/useUI.ts";
import { type Minicart } from "../minicart/Minicart.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  minicart?: Minicart;
  loading?: "lazy" | "eager";
}

function Bag({ minicart, loading }: Props) {
  const totalItems = loading === "eager" && minicart
    ? minicart.data.items.length ?? 0
    : 0;

  return (
    <label
      class="indicator"
      for={MINICART_DRAWER_ID}
      aria-label="open cart"
      data-deco="open-cart"
      hx-target={`#${MINICART_CONTAINER_ID}`}
      hx-post={useCart()}
      hx-swap="innerHTML"
    >
      {totalItems > 0 && (
        <span class="indicator-item badge badge-secondary badge-sm">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}

      <span class="btn btn-circle btn-sm btn-ghost no-animation">
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
      </span>
    </label>
  );
}

export default Bag;
