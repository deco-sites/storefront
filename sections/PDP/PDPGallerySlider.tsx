import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Container from "$store/components/Layout/Container.tsx";
import NotFound from "$store/sections/Product/NotFound.tsx"
import GallerySlider, { Layout } from "$store/components/product/Gallery/ImageSlider.tsx"
import ProductInfo from "$store/components/product/ProductInfo.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  layout?: Layout;
}

export default function PDPGallerySlider({ page, layout }: Props) {
  let result

  if (page === null) {
    result = <NotFound />;
  } else {
    result = (
      <div class="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-none grid-rows-none sm:grid-rows-none grid-flow-row sm:grid-flow-col place-items-center sm:place-items-center">
        <GallerySlider page={page} layout={layout} />
        <ProductInfo page={page} layout={{}} />
      </div>
    );
  }

  return (
    <Container>
      {result}
    </Container>
  )
}
