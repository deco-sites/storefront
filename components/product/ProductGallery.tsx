import ProductCard, {
  Layout as CardLayout,
} from "$store/components/product/ProductCard.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { PageInfo, Product, ProductListingPage } from "apps/commerce/types.ts";
import ShowMore from "$store/islands/ShowMore.tsx";
import { Head } from "$fresh/runtime.ts";
import { Format } from "$store/components/search/SearchResult.tsx";
import { Resolved } from "deco/engine/core/resolver.ts";
import { usePartialSection } from "deco/hooks/usePartialSection.ts";
import { Partial } from "$fresh/runtime.ts";
import Spinner from "$store/components/ui/Spinner.tsx";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4 | 5;
}

export interface Props {
  products: Product[] | null;
  pageInfo: PageInfo;
  offset: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
    format?: Format;
  };
  url: URL;
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
  { products : p, pageInfo, layout, offset, url }: Props,
) {
  const platform = usePlatform();
  const products = p
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 4];


  const partialUrl = pageInfo.nextPage ? new URL(url.href) : null;
  if (pageInfo.nextPage) {
    partialUrl?.searchParams.set("page", (pageInfo.currentPage + 1).toString());
    partialUrl?.searchParams.set("partial", "true");
  }

  return (
    <div
      class={`grid ${mobile} gap-2 items-center ${desktop} sm:gap-10`}
      f-client-nav
    >
      <Head>
        {pageInfo.nextPage && <link rel="next" href={pageInfo.nextPage} />}
        {pageInfo.previousPage && (
          <link rel="prev" href={pageInfo.previousPage} />
        )}
      </Head>

      {
        products?.map((product, index) => {
          return(
            <ProductCard product={product} layout={layout?.card} key={index} />
          )
        })
      }

      {(layout && layout?.format === "Show More") && (
        <>
          <ShowMore
            pageInfo={pageInfo}
          >
            {partialUrl && (
              <>
                <div class="mt-2">
                  <Spinner size={24}/>
                </div>    
                <button
                  id={`show-more-button-${pageInfo.currentPage}`}
                  class="btn cursor-pointer hidden w-0 h-0 absolute"
                  {...usePartialSection({ href: partialUrl.href })}
                >
                  Show More
                </button>
              </>
            )}
          </ShowMore>
        </>
      )}
    </div>
  );
}

export default ProductGallery;
