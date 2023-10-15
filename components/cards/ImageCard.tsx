import { ButtonType, getButtonClasses } from "../../constants.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy label */
export interface Props {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;

  style?: {
    textPosition?: "Top" | "Bottom";
    textAlignment?: "Center" | "Left";
    button?: ButtonType;
  };
}

function CardText(
  { tag, label, description, alignment }: {
    tag?: string;
    label?: string;
    description?: string;
    alignment?: "Center" | "Left";
  },
) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "Center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && <h3 class="text-lg text-base-content">{label}</h3>}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

function Card(
  { href, tag, label, description, buttonText, style, image }: Props,
) {
  const position = style?.textPosition === "Bottom" ? "Bottom" : "Top";
  const alignment = style?.textAlignment === "Left" ? "Left" : "Center";
  return (
    <div>
      <a href={href} class="flex flex-col gap-4 lg:w-[280px] w-40 lg:h-auto">
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
              class="card w-full"
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
