import Icon from "$store/components/ui/Icon.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Front Back
 * @description Renders two images side by side both on mobile and on desktop. On mobile, the overflow is reached causing a scrollbar to be rendered.
 */
function GalleryFrontBack(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col">
      <div class="relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-6 w-[99vw]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-2/5"
            >
              <Image
                class="w-screen"
                sizes="(max-width: 640px) 100vw"
                style={{ aspectRatio }}
                src={img.url!}
                alt={img.alternateName}
                width={width}
                height={height}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </Slider.Item>
          ))}
        </Slider>
        <Slider.PrevButton
          class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
          disabled
        >
          <Icon size={24} id="ChevronLeft" strokeWidth={3} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
          disabled={images.length < 2}
        >
          <Icon size={24} id="ChevronRight" strokeWidth={3} />
        </Slider.NextButton>

        {/* Dots */}
        <ul class="carousel carousel-center px-4 sm:px-0 sm:flex-row gap-4 order-2 sm:order-2 absolute bottom-2 right-2/4">
          {images.map((img, index) => (
            <li class="carousel-item ">
              <Slider.Dot index={index}>
                <div class="w-4 h-4 rounded-full bg-[#292929]"></div>
              </Slider.Dot>
            </li>
          ))}
        </ul>

      </div>
      <SliderJS rootId={id} />
    </div>
  );
}

export default GalleryFrontBack;
