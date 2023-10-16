import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export type Props = {
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
} & Pick<ProductListingPage, "products" | "pageInfo">;

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
};

function ProductGallery({ products, layout, pageInfo }: Props) {
  const platform = usePlatform();
  const perPage = pageInfo.recordPerPage || products.length;
  const offset = pageInfo.currentPage * perPage;

  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];

  return (
    <div class={`grid ${mobile} gap-2 items-center ${desktop} sm:gap-10`}>
      {products?.map((product, index) => (
        <ProductCard
          product={product}
          preload={index === 0}
          index={offset + index}
          layout={layout?.card}
          platform={platform}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
