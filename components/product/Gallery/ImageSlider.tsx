
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";


type Position = "left" | "right" | "bottom" | "up";

type NewType = {
  /**
     * @title Product Image
     * @description How the main product image will be displayed
     * @default bullets
  */
  thumb?: "bullets" | "sticks" | "image";
  position:Position;
  width: number;
  height: number;
}


export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: NewType
}
/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */

const variants = {
  left: "sm:order-1",
  right:"sm:order-2",
  bottom: "sm:flex-row",
  up: "sm:flex-row"
};
const variantsCol = {
  left: "",
  right:"",
  bottom: "sm:flex-col",
  up: "sm:flex-col-reverse"
};
const variantBullets = {
  bullets: "w-4 h-4",
  sticks: "w-8 h-2",
};

export default function GallerySlider(props: Props) {
  const id = useId();

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }


  const {
    page: { product: { image: images = [] } },
    layout: { width, height }, layout,
  } = props;
  const aspectRatio = `${width} / ${height}`;
  const variant = layout?.thumb ?? "bullets";
  const variant2 = layout?.position ?? "left";
  

  if (variant === "bullets" || variant === "sticks") {
    return (
      <div id={id} class="grid grid-flow-row sm:grid-flow-col">
        {/* Image Slider */}
        <div class="relative order-1 sm:order-2">
          <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
            {images.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full"
              >
                <Image
                  class="w-full"
                  sizes="(max-width: 640px) 100vw, 40vw"
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

          <div class="absolute top-2 right-2 bg-base-100 rounded-full">
            <ProductImageZoom
              images={images}
              width={700}
              height={Math.trunc(700 * height / width)}
            />
          </div>
          {/* Dots */}
          <ul class="carousel carousel-center px-4 sm:px-0 sm:flex-row gap-4 order-2 sm:order-2 absolute bottom-2 right-2/4 translate-x-2/4">
            {images.map((img, index) => (
              <li class="carousel-item ">
                <Slider.Dot index={index}>
                  <div class={`${variantBullets[variant]} rounded-full bg-[#292929]`}></div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
        </div>

        <SliderJS rootId={id} />
      </div>
    )
  }

  return (
    <div id={id} class={`flex flex-col sm:flex-row ${variantsCol[variant2]}`}>
      {/* Image Slider */}
      <div class="relative order-1 sm:order-2">
        <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full"
            >
              <Image
                class="w-full"
                sizes="(max-width: 640px) 100vw, 40vw"
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

        <div class="absolute top-2 right-2 bg-base-100 rounded-full">
          <ProductImageZoom
            images={images}
            width={700}
            height={Math.trunc(700 * height / width)}
          />
        </div>
      </div>

      {/* Dots */}
      <ul class={`carousel carousel-center gap-1 px-4 sm:px-0 flex-col order-2 ${variants[variant2]}`}>
        {images.map((img, index) => (
          <li class="carousel-item min-w-[63px] sm:min-w-[100px]">
            <Slider.Dot index={index}>
              <Image
                style={{ aspectRatio }}
                class="group-disabled:border-base-300 border rounded "
                width={63}
                height={87.5}
                src={img.url!}
                alt={img.alternateName}
              />
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <SliderJS rootId={id} />
    </div>
  );
}
