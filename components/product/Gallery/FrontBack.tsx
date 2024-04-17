import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

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
  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    layout: { width, height },
  } = props;
  const aspectRatio = `${width} / ${height}`;

  return (
    <ul class="carousel carousel-center gap-6">
      {[images[0], images[1] ?? images[0]].map((img, index) => (
        <li class="carousel-item">
          <Image
            class="w-screen sm:w-[24vw]"
            sizes="(max-width: 640px) 100vw, 24vw"
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

export default GalleryFrontBack;
