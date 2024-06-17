import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const id = useId();
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <div class="flex justify-center items-center gap-2 text-primary">
        <Icon id="local_shipping" size={24} />
        {remaining > 0
          ? (
            <label for={id}>
              Faltam {formatPrice(remaining, currency, locale)}{" "}
              para ganhar frete grátis!
            </label>
          )
          : <label for={id}>Você ganhou frete grátis!</label>}
      </div>
      <progress
        id={id}
        class="progress progress-primary w-full"
        value={percent}
        max={100}
      />
    </div>
  );
}

export default FreeShippingProgressBar;
