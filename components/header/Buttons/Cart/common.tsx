import { AnalyticsItem } from "apps/commerce/types.ts";
import Icon from "../../../../components/ui/Icon.tsx";
import { sendEvent } from "../../../../sdk/analytics.tsx";
import { MINICART_DRAWER_ID } from "../../../../sdk/useUI.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
  };

  return (
    <div class="indicator">
      <span
        class={`indicator-item badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>

      <label
        for={MINICART_DRAWER_ID}
        class="btn btn-circle btn-sm btn-ghost"
        aria-label="open cart"
        data-deco="open-cart"
        onClick={onClick}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
      </label>
    </div>
  );
}

export default CartButton;
