import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

export interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
  [htmx: `hx-${string}`]: string;
}

const onEvent = (e: string) => {
  document.currentScript.nextSibling.addEventListener("click", function () {
    window.DECO.events.dispatch(e);
  });
};

function CartButton({ loading, currency, total, items, ...rest }: Props) {
  const totalItems = items.length;

  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <script
        type="defer"
        src={scriptAsDataURI(onEvent, {
          name: "view_cart",
          params: { currency, value: total, items },
        })}
      />

      <label
        class="btn btn-circle btn-sm btn-ghost"
        aria-label="open cart"
        data-deco="open-cart"
        for="minicart-drawer"
        {...rest}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
      </label>
    </div>
  );
}

export default CartButton;
