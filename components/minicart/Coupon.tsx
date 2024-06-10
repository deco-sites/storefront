import { MINICART_FORM_ID } from "../../constants.ts";
import { useScript } from "apps/utils/useScript.ts";

export interface Props {
  coupon?: string;
}

function Coupon({ coupon }: Props) {
  return (
    <div class="flex justify-between items-center px-4">
      <span class="text-sm">Cupom de desconto</span>

      <button
        type="button"
        class="btn btn-ghost underline font-normal no-animation"
        hx-on:click={useScript(() => {
          event?.stopPropagation();
          const button = event?.currentTarget as HTMLButtonElement;
          button.classList.add("hidden");
          button.nextElementSibling?.classList.remove("hidden");
        })}
      >
        {coupon || "Add"}
      </button>

      {/* Displayed when checkbox is checked=true */}
      <div class="join hidden">
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
          value="set-coupon"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default Coupon;
