import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "../../../components/product/ProductImageZoom.tsx";
import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import { clx } from "../../../sdk/clx.ts";
import { useId } from "../../../sdk/useId.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    layout,
    page: { product: { image: images = [] } },
  } = props;

  const { width, height } = layout || { width: 300, height: 370 };

  const aspectRatio = `${width} / ${height}`;

  return (
    <>
      <div id={id} class="grid grid-flow-row sm:grid-flow-col gap-2">
        {/* Image Slider */}
        <div class="relative order-1 sm:order-2 h-min">
          <Slider class="carousel carousel-center gap-6 w-full">
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
            <label class="btn btn-ghost hidden sm:inline-flex" for={zoomId}>
              <Icon id="Zoom" size={24} />
            </label>
          </div>
        </div>

        {/* Dots */}
        <ul
          class={clx(
            "carousel carousel-center",
            "sm:carousel-vertical",
            "gap-1 px-4 order-2",
            "sm:gap-2 sm:px-0 sm:order-1",
          )}
          style={{ maxHeight: "600px" }}
        >
          {images.map((img, index) => (
            <li class="carousel-item">
              <Slider.Dot index={index}>
                <Image
                  style={{ aspectRatio }}
                  class="group-disabled:border-base-300 border rounded "
                  width={100}
                  height={123}
                  src={img.url!}
                  alt={img.alternateName}
                />
              </Slider.Dot>
            </li>
          ))}
        </ul>

        <Slider.JS rootId={id} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={images}
        width={700}
        height={Math.trunc(700 * height / width)}
      />
    </>
  );
}
