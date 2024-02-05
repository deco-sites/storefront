import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Resolved } from "deco/engine/core/resolver.ts";
import { FnContext } from "deco/mod.ts";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: Resolved<ProductListingPage | null>;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
  loaderProps,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  layout?: Layout;
  loaderProps: Resolved<ProductListingPage | null>;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      <div class="container px-4 sm:py-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns, format }}
              pageInfo={pageInfo}
              loaderProps={loaderProps}
            />
          </div>
        </div>

        {format == "Pagination" && (
          <div class="flex justify-center my-4">
            <div class="join">
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          </div>
        )}
      </div>
      <SendEventOnView
        id={id}
        event={{
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
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = async (props: Props, _req: Request, ctx: FnContext) => {
  const page = await ctx.invoke[props.page.__resolveType]({
    ...props.page,
  }) as ProductListingPage | null;

  return {
    ...props,
    page,
    loaderProps: {
      ...props.page,
    },
  };
};

export default SearchResult;
