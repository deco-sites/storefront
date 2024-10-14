import { type SectionProps } from "@deco/deco";
import { useDevice, useScript } from "@deco/deco/hooks";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "../../../sdk/useId.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { useSendEvent } from "../../../sdk/useSendEvent.ts";
import Breadcrumb from "../../ui/Breadcrumb.tsx";
import Sort from "./Sort.tsx";
import Gallery from "./Gallery.tsx";
import NotFound from "./NotFound.tsx";
import FiltersDrawer from "./filters/Drawer.tsx";
import Filters from "./filters/Filters.tsx";
import Summary from "./Summary.tsx";

export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @hidden */
  partial?: "hideMore" | "hideLess";
}

const setPageQuerystring = (page: string, id: string) => {
  const element = document.getElementById(id)?.querySelector(
    "[data-product-list]",
  );
  if (!element) {
    return;
  }
  new IntersectionObserver((entries) => {
    const url = new URL(location.href);
    const prevPage = url.searchParams.get("page");
    for (let it = 0; it < entries.length; it++) {
      if (entries[it].isIntersecting) {
        url.searchParams.set("page", page);
      } else if (
        typeof history.state?.prevPage === "string" &&
        history.state?.prevPage !== page
      ) {
        url.searchParams.set("page", history.state.prevPage);
      }
    }
    history.replaceState({ prevPage }, "", url.href);
  }).observe(element);
};

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

function SearchResultPage({ page, ...props }: SectionProps<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  const container = useId();
  const controls = useId();
  const isMobile = useDevice() !== "desktop";
  const { startingPage = 0, url, partial } = props;
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...(useOffer(product.offers)),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });

  return (
    <>
      <div id={container} {...viewItemListEvent} class="w-full">
        {partial
          ? <Gallery {...props} page={page} />
          : (
            <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
              <Breadcrumb itemListElement={breadcrumb?.itemListElement} />

              {isMobile && (
                <FiltersDrawer id={controls} filters={filters}>
                  <div class="flex sm:hidden justify-between items-end">
                    <div class="flex flex-col">
                      <Summary
                        recordPerPage={pageInfo.recordPerPage ?? 0}
                        records={pageInfo.records ?? 0}
                      />
                      <Sort sortOptions={sortOptions} url={url} />
                    </div>

                    <label class="btn btn-ghost" for={controls}>
                      Filters
                    </label>
                  </div>
                </FiltersDrawer>
              )}

              <div class="grid place-items-center grid-cols-1 sm:grid-cols-[250px_1fr]">
                {!isMobile && (
                  <aside class="place-self-start flex flex-col gap-9">
                    <span class="text-base font-semibold h-12 flex items-center">
                      Filters
                    </span>

                    <Filters filters={filters} />
                  </aside>
                )}

                <div class="flex flex-col gap-9">
                  {!isMobile && (
                    <div class="flex justify-between items-center">
                      <Summary
                        recordPerPage={pageInfo.recordPerPage ?? 0}
                        records={pageInfo.records ?? 0}
                      />
                      <div>
                        <Sort sortOptions={sortOptions} url={url} />
                      </div>
                    </div>
                  )}
                  <Gallery {...props} page={page} />
                </div>
              </div>
            </div>
          )}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            setPageQuerystring,
            `${pageInfo.currentPage}`,
            container,
          ),
        }}
      />
    </>
  );
}

export default SearchResultPage;
