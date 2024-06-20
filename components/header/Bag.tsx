import { useScript } from "deco/hooks/useScript.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;

    if (!counter) {
      return;
    }

    // Set minicart items count on header
    if (count === 0) {
      counter.classList.add("hidden");
    } else {
      counter.classList.remove("hidden");
    }

    counter.innerText = count > 9 ? "9+" : count.toString();
  });

function Bag() {
  const id = useId();

  return (
    <>
      <label
        class="indicator"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <span
          id={id}
          class="hidden indicator-item badge badge-primary badge-sm font-thin"
        />

        <span class="btn btn-square btn-sm btn-ghost no-animation">
          <Icon id="shopping_bag" />
        </span>
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </>
  );
}

export default Bag;
