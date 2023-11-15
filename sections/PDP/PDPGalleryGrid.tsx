import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Container from "$store/components/Layout/Container.tsx";
import NotFound from "$store/sections/Product/NotFound.tsx"
import GalleryImageGrid, { Layout } from "$store/components/product/Gallery/ImageGrid.tsx"
import ProductInfo from "$store/components/product/ProductInfo.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  layout?: Layout;
}

export default function PDPGalleryGrid({ page, layout }: Props) {
  let result

  if (page === null) {
    result = <NotFound />;
  } else {
    result = (
      <div class="grid gap-2 sm:gap-2 grid-cols-1 sm:grid-cols-2 grid-rows-none sm:grid-rows-1 grid-flow-row-dense sm:grid-flow-row place-items-center sm:place-items-start">
        <GalleryImageGrid page={page} layout={layout} />
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
