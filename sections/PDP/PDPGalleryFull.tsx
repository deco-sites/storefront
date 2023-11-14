import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Container from "$store/components/Layout/Container.tsx";
import NotFound from "$store/sections/Product/NotFound.tsx"
import FullWidth, { Layout } from "$store/components/product/Gallery/FullWidth.tsx"

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  layout?: Layout;
}

export default function PDPGalleryFull({ page, layout }: Props) {
  let result

  if (page === null) {
    result = <NotFound />;
  } else {
    result = <FullWidth page={page} layout={layout} />;
  }

  return (
    <Container>
      {result}
    </Container>
  )
}
