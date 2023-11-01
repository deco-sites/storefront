import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import { flex, Colors, colorClasses, BorderColors, borderColorClasses2, BorderWidth, borderWidthClasses, BorderRadius, borderRadiusClasses } from "../../constants.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Bg {
  bgColor?: Colors;
  bgImage?: ImageWidget;
}

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
    contentAlign?: {
      /** @default Center */
      mobile?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
      /** @default Center */
      desktop?: "Center" | "Start" | "End" | "Baseline" | "Stretch";
    };
  }
  style?: {
    background?: Bg;
    border?: {
      width?: BorderWidth;
      color?: BorderColors;
      radius?: BorderRadius;
    }
  }
}

export default function Card({ icon, label, description, layout, style }: Props) {
  const bgColor = style?.background?.bgColor || "Transparent";

  const hasPadding = (bgColor && bgColor !== "Transparent") || (style?.border?.width && style.border.width !== "None");

  return (
    <div class={clx(
      "flex gap-3",
      layout?.iconPosition === "Left" ? "flex-row" : "flex-col",
      layout?.flex?.mobile ? flex.item.mobile[layout.flex.mobile] : "flex-1",
      layout?.flex?.desktop ? flex.item.mobile[layout.flex.desktop] : "lg:flex-1",
      layout?.contentAlign?.mobile && flex.align.mobile[layout.contentAlign.mobile],
      layout?.contentAlign?.desktop && flex.align.desktop[layout.contentAlign.desktop],
      layout?.contentAlign?.mobile == "Center" && "text-center",
      layout?.contentAlign?.desktop == "Center" && "lg:text-center",
      bgColor && colorClasses[bgColor],
      hasPadding && "p-4 lg:p-8",
      style?.border?.color && borderColorClasses2[style.border.color],
      style?.border?.width && borderWidthClasses[style.border.width],
      style?.border?.radius && borderRadiusClasses[style.border.radius],
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