import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
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

  const { breadcrumbList } = page;

  return (
    <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
      <Breadcrumb itemListElement={breadcrumbList.itemListElement} />

      <div
        class={clx(
          "container grid",
          "grid-cols-1 gap-2 py-0",
          "sm:grid-cols-5 sm:gap-6",
        )}
      >
        <div class="sm:col-span-3">
          <ImageGallerySlider page={page} />
        </div>
        <div class="sm:col-span-2">
          <ProductInfo page={page} />
        </div>
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
