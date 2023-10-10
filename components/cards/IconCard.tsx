import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";

export interface Props {
  label: string;
  icon: AvailableIcons;
  description: string;

  layout: {
    icon?: {
      position?: "top" | "left";
    };
  };
}

function BenefitCard({ icon, label, description }: Props) {
  return (
    <div class={clx()}>
      <div class="flex-none">
        <Icon
          id={icon}
          width={36}
          height={36}
          strokeWidth={0.01}
          fill="currentColor"
        />
      </div>
      <div class="flex-auto flex flex-col gap-1 lg:gap-2">
        <div class="text-base lg:text-xl leading-7">
          {label}
        </div>
        <p class="text-sm leading-5">
          {description}
        </p>
      </div>
    </div>
  );
}

export default BenefitCard;
