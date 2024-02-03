import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { PageInfo, Product } from "apps/commerce/types.ts";
import ShowMore from "$store/islands/ShowMore.tsx";
import { Head } from "$fresh/runtime.ts";
import { Format } from "$store/components/search/SearchResult.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  loaderProps: string;
  offset: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
    format?: Format;
  };
}

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

function ProductGallery(
  { products, pageInfo, layout, offset, loaderProps }: Props,
) {
  const platform = usePlatform();
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

      <Head>
        {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage} />}
        {pageInfo.previousPage && (
          <link rel="prev" href={pageInfo.previousPage} />
        )}
      </Head>

      {(layout.format === "Show More") && (
        <>
          <ShowMore
            pageInfo={pageInfo}
            layout={layout}
            platform={platform}
            loaderProps={loaderProps}
          />
        </>
      )}
    </div>
  );
}

export default ProductGallery;
