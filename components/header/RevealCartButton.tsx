import { useSection } from "deco/hooks/usePartialSection.ts";
import { useId } from "../../sdk/useId.ts";
import { MINICART_CONTAINER_ID, MINICART_DRAWER_ID } from "../../sdk/useUI.ts";
import { type Props as MinicartProps } from "../../sections/Cart/Minicart.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  // loading: boolean;
  // currency: string;
  // total: number;
  // items: AnalyticsItem[];
  minicart?: MinicartProps;
}

function CartButton({ minicart }: Props) {
  // const totalItems = items.length;
  const id = useId();

  return (
    <div class="indicator">
      {
        /* <span
        class={`indicator-item badge badge-secondary badge-sm ${
          totalItems === 0 ? "hidden" : ""
        }`}
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span> */
      }

      <label
        id={id}
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
        data-deco="open-cart"
        class="btn btn-circle btn-sm btn-ghost"
        hx-target={`#${MINICART_CONTAINER_ID}`}
        hx-post={useSection({
          props: {
            __resolveType: "site/sections/Cart/Minicart.tsx",
            ...minicart,
          },
        })}
      >
        <Icon id="ShoppingCart" size={24} strokeWidth={2} />
      </label>
    </div>
  );
}

export default CartButton;
