import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { MINICART_CONTAINER_ID, MINICART_DRAWER_ID } from "../../sdk/useUI.ts";
import { useComponent } from "../../sections/Component.tsx";
import { type Props as MinicartProps } from "../minicart/Minicart.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  totalItems?: number;
  minicart?: MinicartProps;
}

function CartButton({ minicart, totalItems = 0 }: Props) {
  return (
    <label
      class="indicator"
      for={MINICART_DRAWER_ID}
      aria-label="open cart"
      data-deco="open-cart"
      hx-target={`#${MINICART_CONTAINER_ID}`}
      hx-post={useComponent(
        import.meta.resolve("../minicart/Minicart.tsx"),
        minicart,
      )}
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

export default CartButton;
