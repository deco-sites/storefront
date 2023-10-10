import ProductCard, { Layout } from "../../components/cards/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { VNode } from "../../constants.tsx";
import type { Product } from "apps/commerce/types.ts";

export interface Props {
  /** @title Products */
  items?: Product[] | null;
  /** @title Card Layout */
  layout?: Layout;
}

function loader({ items, layout }: Props): VNode[] | null {
  const platform = usePlatform();

  return items?.map((product) => (
    <ProductCard
      platform={platform}
      product={product}
      layout={layout}
    />
  )) ?? null;
}

export default loader;
