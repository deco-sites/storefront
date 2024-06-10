import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useScript } from "apps/utils/useScript.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { SectionProps } from "deco/mod.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import SearchControls from "./Controls.tsx";

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

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;

  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);

    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }

    url = final.href;
  }

  return url;
};

function PageResult(props: SectionProps<typeof loader>) {
  const { layout, startingPage = 0, url, partial } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const nextPageUrl = useUrlRebased(pageInfo.nextPage, url);
  const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
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
        <a
          rel="prev"
          class="btn btn-ghost"
          hx-swap="outerHTML show:parent:top"
          hx-get={partialPrev}
        >
          <span class="inline [.htmx-request_&]:hidden">
            Show Less
          </span>
          <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
        </a>
      </div>

      <div
        data-product-list
        class={clx(
          "grid items-center",
          "grid-cols-2 gap-2",
          "sm:grid-cols-4 sm:gap-10",
        )}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
          />
        ))}
      </div>

      <div class={clx("pt-2 sm:pt-10")}>
        {infinite
          ? (
            <a
              rel="next"
              class={clx(
                "btn btn-ghost",
                (!nextPageUrl || partial === "hideMore") && "hidden",
              )}
              hx-swap="outerHTML show:parent:top"
              hx-get={partialNext}
            >
              <span class="inline [.htmx-request_&]:hidden">
                Show More
              </span>
              <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
            </a>
          )
          : (
            <div class={clx("join", infinite && "hidden")}>
              <a
                rel="prev"
                aria-label="previous page link"
                href={prevPageUrl ?? "#"}
                disabled={!prevPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                rel="next"
                aria-label="next page link"
                href={nextPageUrl ?? "#"}
                disabled={!nextPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            </div>
          )}
      </div>
    </div>
  );
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

function Result(props: SectionProps<typeof loader>) {
  const { startingPage = 0, url, partial } = props;
  const page = props.page!;
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

  const id = useId();

  return (
    <>
      <div id={id} {...viewItemListEvent}>
        {partial
          ? <PageResult {...props} />
          : (
            <div class="container px-4 sm:px-0 py-4 sm:py-10 flex flex-col gap-2 items-center justify-center">
              <SearchControls
                url={url}
                sortOptions={sortOptions}
                filters={filters}
                breadcrumb={breadcrumb}
              />

              <div class="grid place-items-center grid-cols-1 sm:grid-cols-[250px_1fr]">
                <aside class="hidden sm:block self-start">
                  <Filters filters={filters} />
                </aside>

                <div class="self-start">
                  <PageResult {...props} />
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
            id,
          ),
        }}
      />
    </>
  );
}

function SearchResult({
  page,
  ...props
}: SectionProps<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
