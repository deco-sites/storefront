import { MINICART_FORM_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  coupon?: string;
}

function Coupon({ coupon }: Props) {
  const formToggle = useId();

  return (
    <div class="flex justify-between items-center px-4">
      <span class="text-sm">Cupom de desconto</span>

      {/* Hidden checkbox trick */}
      <input type="checkbox" id={formToggle} class="hidden peer" />

      {/* Displayed when checkbox is checked=false */}
      <label
        for={formToggle}
        class="btn btn-ghost underline font-normal peer-checked:hidden no-animation"
      >
        {coupon || "Add"}
      </label>

      {/* Displayed when checkbox is checked=true */}
      <div class="join peer-checked:inline-flex hidden">
        <input
          form={MINICART_FORM_ID}
          name="coupon"
          class="input join-item"
          type="text"
          value={coupon ?? ""}
          placeholder={"Cupom"}
        />
        <button
          form={MINICART_FORM_ID}
          class="btn join-item"
          name="action"
          value="setCoupon"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default Coupon;
