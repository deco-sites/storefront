// deno-lint-ignore-file
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    /**
     * @title Product Image
     * @description How the main product image will be displayed
     * @default one
     */

    image?: "two" | "one" | "alterning";

    onMouseOver?: {
      image?: "Disable" | "Zoom image" | "Modal zoom";
    }

    width: number;
    height: number;
  };
}

/**
 * @title Product Image Gallery grid
 * @description Renders two images side by side both on mobile and on desktop. On mobile, the overflow is reached causing a scrollbar to be rendered.
 */
export default function GalleryImageGrid(props: Props) {
  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
    layout,
  } = props;
  const aspectRatio = `${width} / ${height}`;
  
  return (
    <ul
      class={`flex flex-wrap relative ${layout?.image == "alterning" ? "[&>*:nth-child(3)]:w-full" : ""}`}
    >
      {images.map((img, index) => (
        <li class={`overflow-hidden ${layout?.image == "one" ? "" : "w-2/4"}`}>
          <Image
            class={`w-screen ${
              layout?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale hover:scale-150 hover:cursor-zoom-in"
                : ""
            }`}
            id="zoom-image"
            sizes="100vw, 40vw"
            style={{ aspectRatio }}
            src={img.url!}
            alt={img.alternateName}
            width={width}
            height={height}
            // Preload LCP image for better web vitals
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />

          {layout?.onMouseOver?.image === "Modal zoom"
            ? (
              <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                <ProductImageZoom
                  images={images}
                  width={700}
                  height={Math.trunc(700 * height / width)}
                />
              </div>
            )
            : <></>}
        </li>
      ))}
    </ul>
  );
}