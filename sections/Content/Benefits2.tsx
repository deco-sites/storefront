import Container, {
  Props as ContainerProps,
} from "$store/sections/Layout/Container.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { textColorClasses, TextColors } from "$store/components/ui/Types.tsx";

export interface BenefitsProps {
  titleSection?: string;
  cards?: CardProps[];
  layout?: {
    background: "Normal" | "Reverse";
  };
  container?: ContainerProps;
}

export interface CardProps {
  icon?: {
    img?: AvailableIcons;
    color?: TextColors;
  };
  title?: string;
  description?: string;
  cta?: {
    href: string;
    text?: string;
    label?: AvailableIcons;
    hide?: {
      label?: boolean;
    };
    variant?: "Normal" | "Reverse" | "Border none";
  };
}

const background_cta = (variant: "Normal" | "Reverse") => ({
  "Reverse":
    "bg-[#FFF] text-[#000] border border-[#C9CFCF] hover:bg-[#C9CFCF] px-6",
  "Normal":
    "bg-[#000] text-[#FFF] border border-[#181212] hover:bg-[#FFF] hover:text-[#181212] px-6",
  "Border none": `bg-transparent hover:bg-transparent px-0 ${
    variant === "Reverse"
      ? "text-[#FFF] hover:underline"
      : "text-[#181212] hover:underline"
  } border-none`,
});

export default function Benefits(
  { titleSection, cards, layout, container }: BenefitsProps,
) {
  return (
    <Container {...container}>
      <div class="flex flex-col items-start justify-center gap-4 md:gap-6">
        <div class="flex justify-start">
          <p class="font-semibold text-[32px] md:text-[40px]">
            {titleSection}
          </p>
        </div>
        <div class="grid flex-row wrap justify-center gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {cards?.map((
            { icon, title, description, cta }: CardProps,
            index: number,
          ) => (
            <div
              key={index}
              class={`flex flex-col justify-start items-start gap-2 md:gap-6 p-6 md:p-10 ${
                layout?.background === "Reverse" ? "" : ""
              } rounded-2xl transition-transform duration-200`}
            >
              <div class={textColorClasses[icon?.color || "Base"]}>
                {icon?.img && <Icon id={icon.img ?? ""} size={40} />}
              </div>
              {title && (
                <p class="font-bold mt-2 md:mt-0 md:text-[24px]">{title}</p>
              )}
              {description && (
                <p class="text-xs md:text-base md:min-h-[100px]">
                  {description}
                </p>
              )}
              {cta?.text && (
                <a
                  href={cta?.href ?? "#"}
                  class={`${
                    cta && cta.variant
                      ? background_cta("Normal")[cta.variant]
                      : ""
                  } btn rounded-none text-base normal-case py-3 ${
                    !cta?.hide?.label ? "pr-3" : "pr-5"
                  } 
                  transition-colors duration-200 flex items-center`}
                >
                  <span class="h-full flex justify-center items-center">
                    {cta?.text}
                  </span>
                  <span class="h-full flex justify-center items-center">
                    {!cta?.hide?.label && cta?.label
                      ? <Icon id={cta?.label} size={30} />
                      : ""}
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
