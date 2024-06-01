import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useSection } from "deco/hooks/useSection.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { clx } from "../../sdk/clx.ts";

/** @titleBy title */
interface Tab {
  title: string;
  products: Product[] | null;
}

export interface Props {
  tabs: Tab[];
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };

  /** @hide */
  tabIndex?: number;
}

function TabbedProductShelf({
  tabs,
  title,
  description,
  layout,
  tabIndex,
}: Props) {
  const id = useId();
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
    <div class="w-full container  py-8 flex flex-col gap-8 lg:gap-12 lg:py-10">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div class="flex justify-center">
        <div class="tabs tabs-boxed">
          {tabs.map((tab, index) => (
            <button
              class={clx("tab tab-lg", index === ti && "tab-active", "gap-2")}
              hx-get={useSection({ props: { tabIndex: index } })}
              hx-swap="outerHTML"
              hx-target="closest section"
            >
              <span>{tab.title}</span>
              <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
            </button>
          ))}
        </div>
      </div>

      {!products?.length
        ? <div class="flex justify-center items-center">No Products found</div>
        : (
          <div
            id={id}
            {...viewItemListEvent}
            class="container grid grid-cols-[48px_1fr_48px] px-0 sm:px-5"
          >
            <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
              {products.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-[270px] sm:w-[292px] first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
                >
                  <ProductCard
                    product={product}
                    itemListName={title}
                    index={index}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <>
              <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 bg-base-100">
                  <Icon size={24} id="ChevronLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2 bg-base-100">
                  <Icon size={24} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
            <Slider.JS rootId={id} />
          </div>
        )}
    </div>
  );
}

export default TabbedProductShelf;
