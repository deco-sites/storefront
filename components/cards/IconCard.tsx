import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import { flex } from "../../constants.tsx";

export interface Props {
  label: string;
  icon: AvailableIcons;
  description: string;
  layout?: {
    iconPosition?: "Top" | "Left";
    flex?: {
      mobile?: "1" | "Auto" | "Initial" | "None",
      desktop?: "1" | "Auto" | "Initial" | "None",
    } 
  }
}

export default function IconCard({ icon, label, description, layout }: Props) {
  return (
    <div class={clx(
      "flex gap-3",
      layout?.iconPosition === "Left" ? "flex-row" : "flex-col",
      layout?.flex?.mobile ? flex.item.mobile[layout.flex.mobile] : "flex-1",
      layout?.flex?.desktop ? flex.item.mobile[layout.flex.desktop] : "sm:flex-1",
    )}>
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