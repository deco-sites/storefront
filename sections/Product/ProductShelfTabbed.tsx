import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import Section, {
  Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

export interface Props extends SectionHeaderProps {
  tabs: Tab[];

  /** @hide true */
  tabIndex?: number;
}

export default function TabbedProductShelf(
  { tabs, title, cta, tabIndex }: Props,
) {
  const ti = typeof tabIndex === "number"
    ? Math.min(Math.max(tabIndex, 0), tabs.length)
    : 0;

  const { products } = tabs[ti];

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products?.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...(useOffer(product.offers)),
          })
        ) ?? [],
      },
    },
  });

  return (
    <Section.Container {...viewItemListEvent}>
      <Section.Header title={title} cta={cta} />

      <Section.Tabbed tabs={tabs} current={ti}>
        {!products?.length
          ? (
            <div class="flex justify-center items-center">
              No Products found
            </div>
          )
          : <ProductSlider products={products} itemListName={title} />}
      </Section.Tabbed>
    </Section.Container>
  );
}

export function LoadingFallback() {
  return (
    <div style={{ height: "716px" }} class="flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
