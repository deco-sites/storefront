import { useSection } from "@deco/deco/hooks";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { clx } from "../../../sdk/clx.ts";
import { useUrlRebased } from "../../../sdk/url.ts";
import ProductCard from "../../product/ProductCard.tsx";
import InfiniteButton from "./buttons/Infinite.tsx";
import type { Props as PageProps } from "./Page.tsx";
import Pagination from "./Pagination.tsx";

interface Props extends PageProps {
  page: ProductListingPage;
  url: string;
}

function Gallery({ layout, startingPage = 0, url, partial, page }: Props) {
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const nextPageUrl = pageInfo.nextPage &&
    useUrlRebased(pageInfo.nextPage, url);
  const prevPageUrl = pageInfo.previousPage &&
    useUrlRebased(pageInfo.previousPage, url);

  const partialPrev = useSection({
    href: prevPageUrl,
    props: { partial: "hideMore" },
  });
  const partialNext = useSection({
    href: nextPageUrl,
    props: { partial: "hideLess" },
  });
  const infinite = layout?.pagination !== "pagination";

  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-center">
      <div
        class={clx(
          "pb-2 sm:pb-10",
          (!prevPageUrl || partial === "hideLess") && "hidden",
        )}
      >
        <InfiniteButton url={partialPrev} rel="prev">
          Show Less
        </InfiniteButton>
      </div>

      <div
        data-product-list
        class={clx(
          "grid items-center",
          "grid-cols-2 gap-2",
          "sm:grid-cols-4 sm:gap-10",
          "w-full",
        )}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            class="h-full min-w-[160px] max-w-[300px]"
          />
        ))}
      </div>

      <div class="pt-2 sm:pt-10 w-full">
        {infinite
          ? (
            <div class="flex justify-center [&_section]:contents">
              <InfiniteButton
                rel="next"
                class={clx(
                  (!nextPageUrl || partial === "hideMore") && "hidden",
                )}
                url={partialNext}
              >
                Show More
              </InfiniteButton>
            </div>
          )
          : (
            <Pagination
              nextPageUrl={nextPageUrl}
              prevPageUrl={prevPageUrl}
              currentPage={zeroIndexedOffsetPage + 1}
            />
          )}
      </div>
    </div>
  );
}

export default Gallery;
