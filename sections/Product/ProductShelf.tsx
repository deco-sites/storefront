import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section, {
  Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

export interface Props extends SectionHeaderProps {
  products: Product[] | null;
}

export default function ProductShelf({ products, title, cta }: Props) {
  if (!products || products.length === 0) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...(useOffer(product.offers)),
          })
        ),
      },
    },
  });

  return (
    <Section.Container
      {...viewItemListEvent}
      style={{ viewTransitionName: "loading-fallback-product-shelf" }}
    >
      <Section.Header title={title} cta={cta} />
      <ProductSlider products={products} itemListName={title} />
    </Section.Container>
  );
}

export function LoadingFallback() {
  return (
    <Section.Container
      class="justify-center items-center"
      style={{
        height: "624px",
        viewTransitionName: "loading-fallback-product-shelf",
      }}
    >
      <span class="loading loading-spinner" />
    </Section.Container>
  );
}
