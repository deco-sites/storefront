import Icon from "$store/components/ui/Icon.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Slider from "$store/components/ui/Slider.tsx";
import Image from "apps/website/components/Image.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import ProductInfo from "$store/components/product/ProductInfo.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;

    onMouseOver?: {
      imageZoom?: "Disable" | "Zoom image" | "Modal zoom";
    },
    
    positionInfo : "left" | "right";
  };
}
/**
 * @title Product Image Front Back
 * @description Renders a slider images full width on desktop. On mobile, the overflow is reached causing a scrollbar to be rendered.
 */
const variantsInfo = {
  left: "sm:left-12",
  right:"sm:right-10",
};

const variantsArrows = {
  left: "sm:right-24 mr-16",
  right:"sm:left-24 ml-16",
};

function GalleryFullWidth(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height }, layout,
  } = props;
  const aspectRatio = `${width} / ${height}`;
  const variantInfo = layout?.positionInfo ?? "right";

  return (
    <div id={id} class="grid grid-flow-row sm:grid-flow-col">
      <div class="lg:relative order-1 sm:order-2 mb-1 lg:mb-28 xl:mb-20 2xl:mb-10">
        <div class="relative lg:static">
          <Slider class="carousel carousel-center gap-3 w-[99vw]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-[70%] lg:w-2/5"
              >
                <Image
                  class={`w-screen ${layout?.onMouseOver?.imageZoom == "Zoom image"
                    ? "duration-100 transition-scale hover:scale-150 hover:cursor-zoom-in"
                    : ""
                    }`}
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
            class={`no-animation hidden lg:flex absolute bottom-5 btn btn-circle btn-outline ${variantsArrows[variantInfo]} !ml-0`}
            disabled
          >
            <Icon size={24} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>

          <Slider.NextButton
            class={`no-animation hidden lg:flex absolute bottom-5 btn btn-circle btn-outline ${variantsArrows[variantInfo]} !mr-0`}
            disabled={images.length < 2}
          >
            <Icon size={24} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>

          {layout?.onMouseOver?.imageZoom === "Modal zoom" ? <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700 * height / width)}
            />
          </div> : <></>}

          {/* Dots */}
          <ul class="carousel carousel-center px-4 sm:px-0 sm:flex-row gap-4 order-2 sm:order-2 absolute bottom-2 right-2/4 translate-x-2/4">
            {images.map((img, index) => (
              <li class="carousel-item ">
                <Slider.Dot index={index}>
                  <div class="w-4 h-4 rounded-full bg-[#292929]"></div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>
        <div class={`static lg:absolute bg-white padding px-5 py-4 top-16 w-full lg:w-[28%] rounded-2xl shadow-xl ${variantsInfo[variantInfo]}`}>
          <ProductInfo page={props.page} layout={{}} />
        </div>
      </div>
      <SliderJS rootId={id} />
    </div>
  );
}

export default GalleryFullWidth;
