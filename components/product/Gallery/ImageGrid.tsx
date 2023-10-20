import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

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
    layout: { width, height }, layout,
  } = props;
  const aspectRatio = `${width} / ${height}`;
  const variant = layout?.image ?? "one";

  if (variant === "one") {
    return (
      <ul>
        {images.map((img, index) => (
          <li>
            <Image
              class="w-screen "
              sizes="100vw, 24vw"
              style={{ aspectRatio }}
              src={img.url!}
              alt={img.alternateName}
              width={width}
              height={height}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>
    )
  }

  if (variant === "alterning") {
    return (
      <ul class="flex flex-wrap [&>*:nth-child(3)]:w-full">
        {images.map((img, index) => (
          <li class="w-2/4">
            <Image
              class="w-screen "
              sizes="100vw, 24vw"
              style={{ aspectRatio }}
              src={img.url!}
              alt={img.alternateName}
              width={width}
              height={height}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <ul class="flex flex-wrap">
      {images.map((img, index) => (
        <li class="w-2/4">
          <Image
            class="w-screen "
            sizes="100vw, 24vw"
            style={{ aspectRatio }}
            src={img.url!}
            alt={img.alternateName}
            width={width}
            height={height}
            // Preload LCP image for better web vitals
            preload={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </li>
      ))}
    </ul>
  );
}

