import { useId } from "preact/hooks";
import { MINICART_CONTAINER_ID } from "../../sdk/useUI.ts";
import { useComponent } from "../../sections/Component.tsx";
import { Props as MinicartProps } from "./Minicart.tsx";

export interface Props {
  coupon?: string;
  useAddCoupon: () => MinicartProps;
}

function Coupon({ coupon, useAddCoupon }: Props) {
  // const [loading, setLoading] = useState(false);
  // const [display, setDisplay] = useState(false);
  const formToggle = useId();

  return (
    <div class="flex justify-between items-center px-4">
      <span class="text-sm">Cupom de desconto</span>

      {/* Hidden checkbox trick */}
      <input
        data-form-toggle
        type="checkbox"
        id={formToggle}
        class="hidden peer"
      />

      {/* Displayed when checkbox is checked=false */}
      <label
        for={formToggle}
        class="btn btn-ghost underline font-normal peer-checked:hidden no-animation"
      >
        {coupon || "Add"}
      </label>

      {/* Displayed when checkbox is checked=true */}
      <form
        class="join peer-checked:inline-flex hidden"
        hx-disabled-elt="button"
        hx-target={`#${MINICART_CONTAINER_ID}`}
        hx-post={useComponent(
          import.meta.resolve("./Minicart.tsx"),
          useAddCoupon(),
        )}
      >
        <input
          name="text"
          class="input join-item"
          type="text"
          value={coupon ?? ""}
          placeholder={"Cupom"}
        />
        <button class="btn join-item" type="submit">
          Ok
        </button>
      </form>
    </div>
  );
}

export default Coupon;
