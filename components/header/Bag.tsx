import { MINICART_DRAWER_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";

function Bag() {
  return (
    <label
      class="indicator"
      for={MINICART_DRAWER_ID}
      aria-label="open cart"
      data-deco="open-cart"
    >
      <span
        data-minicart-items-count
        class={clx(
          "btn btn-circle btn-sm btn-ghost no-animation",
          "after:hidden after:indicator-item after:badge after:badge-secondary after:badge-sm after:content-[attr(data-minicart-items-count)] after:font-thin",
        )}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
      </span>
    </label>
  );
}

export default Bag;
