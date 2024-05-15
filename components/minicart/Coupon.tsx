import { useId } from "preact/hooks";
import { MINICART_CONTAINER_ID } from "../../sdk/useUI.ts";

export interface Props {
  coupon?: string;
  useAddCoupon: () => string;
}

function Coupon({ coupon, useAddCoupon }: Props) {
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
        hx-post={useAddCoupon()}
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
