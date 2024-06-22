import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section, {
  Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useViewTransition } from "../../sdk/useViewTransition.ts";

const TRANSITION_NAME = "product-shelf-fallback";

export interface Props extends SectionHeaderProps {
  products: Product[] | null;
}

export default function ProductShelf({ products, title, cta }: Props) {
  const { style } = useViewTransition(TRANSITION_NAME);

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
    <Section.Container {...viewItemListEvent} style={style}>
      <Section.Header title={title} cta={cta} />
      <ProductSlider products={products} itemListName={title} />
    </Section.Container>
  );
}

export function LoadingFallback() {
  const { style, css } = useViewTransition(TRANSITION_NAME);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        style={{ height: "716px", ...style }}
        class="flex justify-center items-center"
      >
        <span class="loading loading-spinner" />
      </div>
    </>
  );
}
