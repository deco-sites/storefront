import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import { clx } from "../../sdk/clx.ts";
import { useViewTransition } from "../../sdk/useViewTransition.ts";

const TRANSITION_NAME = "product-details-fallback";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  const { style } = useViewTransition(TRANSITION_NAME);

  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div style={style} class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={style}
      class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0"
    >
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

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
  const { style, css } = useViewTransition(TRANSITION_NAME);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        style={{ height: "710px", ...style }}
        class="w-full flex justify-center items-center"
      >
        <span class="loading loading-spinner" />
      </div>
    </>
  );
}
