import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";
import {
  borderColorClasses2,
  BorderColors,
  BorderRadius,
  borderRadiusClasses,
  BorderWidth,
  borderWidthClasses,
  colorClasses,
  Colors,
  flex,
} from "../../constants.tsx";
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
  };
  style?: {
    background?: Bg;
    border?: {
      width?: BorderWidth;
      color?: BorderColors;
      radius?: BorderRadius;
    };
  };
}

export default function Card({
  icon = "Deco",
  label = "Item",
  description = "A text describing this item",
  layout,
  style,
}: Props) {
  const bgColor = style?.background?.bgColor || "Primary";

  const hasPadding = (bgColor && bgColor !== "Transparent") ||
    (style?.border?.width && style.border.width !== "None");

  return (
    <div
      class={clx(
        "flex gap-3",
        layout?.iconPosition === "Left" ? "flex-row" : "flex-col",
        bgColor && colorClasses[bgColor],
        hasPadding && "p-4 lg:p-8",
        style?.border?.color && borderColorClasses2[style.border.color],
        style?.border?.width && borderWidthClasses[style.border.width],
        style?.border?.radius && borderRadiusClasses[style.border.radius],
        style?.background?.bgImage ? "bg-cover bg-center" : "",
      )}
      style={{
        "background-image": style?.background?.bgImage
          ? `url(${style?.background?.bgImage})`
          : "",
      }}
    >
      <div class="flex-none">
        <Icon
          id={icon}
          width={36}
          height={36}
          strokeWidth={0.01}
          fill="currentColor"
          class="text-primary-content"
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
