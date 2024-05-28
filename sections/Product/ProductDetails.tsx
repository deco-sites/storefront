import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import { clx } from "../../sdk/clx.ts";
import NotFound from "../../sections/Product/NotFound.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return (
    <div
      class={clx(
        "container grid",
        "grid-cols-1 gap-2 py-0",
        "sm:grid-cols-5 sm:gap-6 sm:py-6",
      )}
    >
      <div class="sm:col-span-3">
        <ImageGallerySlider page={page} />
      </div>
      <div class="sm:col-span-2">
        <ProductInfo page={page} />
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
