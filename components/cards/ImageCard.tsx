import { ButtonType, getButtonClasses } from "../../constants.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Style {
  /** @description In px */
  width?: number;
  textPosition?: "Top" | "Bottom";
  textAlignment?: "Center" | "Left";
  button?: ButtonType;
}

/** @titleBy label */
export interface Props {
  image?: ImageWidget;
  label: string;
  description?: string;
  tag?: string;
  href?: string;
  buttonText?: string;
  style?: Style;
}

function CardText({
  label = "Item",
  description = "A text describing this item",
  tag = "Tag",
  alignment,
}: {
  label?: string;
  description?: string;
  tag?: string;
  alignment?: "Center" | "Left";
}) {
  return (
    <div
      class={`flex flex-col ${
        !alignment || alignment === "Center" ? "items-center" : "items-start"
      }`}
    >
      {tag && (
        <div class="text-xs bg-primary text-primary-content py-1 px-2 rounded mb-2">
          {tag}
        </div>
      )}
      {label && <h3 class="text-xl">{label}</h3>}
      {description && <div class="text-sm">{description}</div>}
    </div>
  );
}

function Card(
  {
    href,
    tag,
    label,
    description,
    buttonText = "Button",
    style,
    image =
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
  }: Props,
) {
  const position = style?.textPosition === "Bottom" ? "Bottom" : "Top";
  const alignment = style?.textAlignment === "Left" ? "Left" : "Center";
  return (
    <div
      class="flex flex-col gap-4 justify-center"
      style={{ width: style?.width || "auto" }}
    >
      <a href={href} class="flex flex-col gap-4 lg:w-full w-full lg:h-auto">
        {position === "Top" && (
          <CardText
            tag={tag}
            label={label}
            description={description}
            alignment={alignment}
          />
        )}
        {image && (
          <figure>
            <Image
              class="card"
              src={image}
              alt={description || label || tag}
              width={160}
              height={195}
              loading="lazy"
            />
          </figure>
        )}
        {position === "Bottom" && (
          <CardText
            tag={tag}
            label={label}
            description={description}
            alignment={alignment}
          />
        )}
      </a>
      {buttonText && (
        <a href={href} class={getButtonClasses(style?.button || {})}>
          {buttonText}
        </a>
      )}
    </div>
  );
}

export default Card;
