import { useSection } from "deco/hooks/usePartialSection.ts";
import Button from "../ui/Button.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  id: string;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  { onChange, quantity, disabled, loading, id }: Props,
) {
  const decrement = () => onChange?.(Math.max(0, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div class="join border rounded-none w-min">
      <Button
        class="btn-square btn-ghost join-item"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
        hx-target="#minicart"
        hx-post={useSection({
          props: {
            __resolveType: "deco-sites/storefront/sections/Cart/Minicart.tsx",
            cart: {
              __resolveType: "shopify/actions/cart/updateItems.ts",
              lines: [{
                id,
                quantity: quantity - 1,
              }],
            },
            platform: "shopify",
          },
        })}
      >
        -
      </Button>
      <input
        class="input text-center join-item [appearance:textfield]"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="btn-square btn-ghost join-item"
        onClick={increment}
        disabled={disabled}
        loading={loading}
        hx-target="#minicart"
        hx-post={useSection({
          props: {
            __resolveType: "deco-sites/storefront/sections/Cart/Minicart.tsx",
            cart: {
              __resolveType: "shopify/actions/cart/updateItems.ts",
              lines: [{
                id,
                quantity: quantity + 1,
              }],
            },
            platform: "shopify",
          },
        })}
      >
        +
      </Button>
    </div>
  );
}

export default QuantitySelector;
