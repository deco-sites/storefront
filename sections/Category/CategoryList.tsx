import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Container, {
  ExtendedStyle as Style,
  HeaderContent,
  Layout,
} from "$store/components/ui/Container.tsx";
import {
  buttonClasses,
  ButtonColor,
  getButtonClasses,
  imgPh,
} from "$store/components/ui/Types.tsx";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: HeaderContent;
  list?: Category[];
  layout?: Layout;
  style?: Style;
  cardStyle?: {
    textPosition?: "Top" | "Bottom";
    textAlignment?: "Center" | "Left";
  };
  sliderStyle?: {
    controlsColor?: ButtonColor;
    controlsOutline?: boolean;
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

function CategoryList(props: Props) {
  const id = `category-list-${useId()}`;
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        tag: "10% off",
        href: "/masculino",
        image: imgPh["sq"],
        label: "Dresses",
        description: "Amazing",
        buttonText: "View procucts",
      },
      {
        tag: "10% off",
        href: "/feminino",
        image: imgPh["sq"],
        label: "Bags",
        description: "Bags",
        buttonText: "View procucts",
      },
      {
        tag: "10% off",
        href: "/",
        image: imgPh["sq"],
        label: "Shoes",
        description: "New deals",
        buttonText: "View procucts",
      },
      {
        tag: "10% off",
        href: "/",
        image: imgPh["sq"],
        label: "Jackets",
        description: "New colors",
        buttonText: "View procucts",
      },
      {
        tag: "10% off",
        href: "/",
        image: imgPh["sq"],
        label: "Jeans",
        description: "Amazing",
        buttonText: "View procucts",
      },
      {
        href: "/",
        image: imgPh["sq"],
        label: "Shorts",
        description: "Summer",
        buttonText: "View procucts",
      },
    ],
    layout,
    style,
    cardStyle,
    sliderStyle,
  } = props;

  const controlsClasses = `${
    buttonClasses[sliderStyle?.controlsColor || "Default"]
  } ${sliderStyle?.controlsOutline ? "btn-outline" : ""}`;

  return (
    <Container header={header} layout={layout} style={style}>
      <div id={id} class="w-full relative grid">
        <Slider class="carousel carousel-start gap-4 lg:gap-8 row-start-2 row-end-5">
          {list.map((
            { tag, label, description, href, image, buttonText },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item"
            >
              <a
                href={href}
                class="flex flex-col gap-4 lg:w-[280px] w-40 lg:h-auto"
              >
                {cardStyle?.textPosition === "Top" &&
                  (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={cardStyle?.textAlignment}
                    />
                  )}
                {image &&
                  (
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
                {cardStyle?.textPosition === "Bottom" &&
                  (
                    <CardText
                      tag={tag}
                      label={label}
                      description={description}
                      alignment={cardStyle?.textAlignment}
                    />
                  )}
              </a>
              {buttonText &&
                (
                  <a href={href} class={getButtonClasses(style?.button || {})}>
                    {buttonText}
                  </a>
                )}
            </Slider.Item>
          ))}
        </Slider>
        <>
          <div class="z-10 absolute -left-3 lg:-left-8 top-1/3">
            <Slider.PrevButton
              class={`${controlsClasses} btn btn-circle btn-sm lg:btn-md`}
            >
              <Icon size={24} id="ChevronLeft" />
            </Slider.PrevButton>
          </div>
          <div class="z-10 absolute -right-3 lg:-right-8 top-1/3">
            <Slider.NextButton
              class={`${controlsClasses} btn btn-circle btn-sm lg:btn-md`}
            >
              <Icon size={24} id="ChevronRight" />
            </Slider.NextButton>
          </div>
        </>

        <SliderJS rootId={id} />
      </div>
    </Container>
  );
}

export default CategoryList;
