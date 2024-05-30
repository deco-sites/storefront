import { useCart } from "../../sdk/cart.ts";
import { MINICART_CONTAINER_ID, MINICART_DRAWER_ID } from "../../constants.ts";
import { type Minicart } from "../minicart/Minicart.tsx";
import Icon from "../ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";

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
      <span
        data-minicart-items-count={totalItems > 9 ? "9+" : totalItems}
        class={clx(
          "btn btn-circle btn-sm btn-ghost no-animation",
          totalItems > 0 &&
            "after:indicator-item after:badge after:badge-secondary after:badge-sm after:content-[attr(data-minicart-items-count)] after:font-thin",
        )}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
      </span>
    </label>
  );
}

export default Bag;
