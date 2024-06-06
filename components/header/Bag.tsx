import { useScript } from "apps/htmx/hooks/useScript.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";

function onLoad() {
  const script = document.currentScript;
  window.STOREFRONT.CART?.onChange((sdk) => {
    const count = sdk.getCart().items.length;
    const counter = script?.closest("span");

    // Set minicart items count on header
    counter?.classList.remove("after:hidden");
    counter?.setAttribute(
      "data-minicart-items-count",
      count > 9 ? "9+" : count.toString(),
    );
  });
}

function Bag() {
  return (
    <label
      class="indicator"
      for={MINICART_DRAWER_ID}
      aria-label="open cart"
    >
      <span
        class={clx(
          "btn btn-circle btn-sm btn-ghost no-animation",
          "after:hidden after:indicator-item after:badge after:badge-secondary after:badge-sm after:content-[attr(data-minicart-items-count)] after:font-thin",
        )}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
        />
      </span>
    </label>
  );
}

export default Bag;
