import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { Section } from "deco/blocks/section.ts";
import ImageGallerySlider from "$store/components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "$store/components/product/ProductInfo.tsx";
import NotFound from "$store/sections/Product/NotFound.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page?.seo) {
    return <NotFound />;
  }

  return (
    <div class="w-full container py-8 flex flex-col gap-6 lg:py-10">
      <div class="flex flex-col gap-6 lg:flex-row lg:justify-center">
        <ImageGallerySlider
          page={page}
        />
        <ProductInfo
          page={page}
        />
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
