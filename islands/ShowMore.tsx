import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import { PageInfo, Product, ProductListingPage } from "apps/commerce/types.ts";
import ProductCard from "$store/components/product/ProductCard.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import { Columns } from "$store/components/product/ProductGallery.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { Resolved } from "deco/engine/core/resolver.ts";

export interface Props {
  pageInfo: PageInfo;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
  platform: ReturnType<typeof usePlatform>;
  loaderProps: Resolved<ProductListingPage | null>;
}

export default function ShowMore(
  { pageInfo, layout, platform, loaderProps }: Props,
) {
  const products = useSignal<Array<Product | null>>([]);
  const nextPage = useSignal(pageInfo.nextPage);
  const loading = useSignal(false);

  const handleLoadMore = async () => {
    loading.value = true;

    const url = new URL(
      window.location.origin + window.location.pathname + nextPage.value,
    );

    const invokePayload: any = {
      key: loaderProps.__resolveType,
      props: {
        ...loaderProps,
        __resolveType: undefined,
        pageHref: url.href,
      },
    };

    const page = await invoke(invokePayload) as ProductListingPage | null;

    loading.value = false;

    if (page) {
      window.history.pushState({}, "", nextPage.value);
      nextPage.value = page.pageInfo.nextPage;
      products.value = [...products.value, ...page.products];
    }
  };

  return (
    <>
      {products.value.map((product, index) => {
        if (!product) return null;
        return (
          <ProductCard
            product={product}
            preload={index === 0}
            layout={layout?.card}
            platform={platform}
          />
        );
      })}
      {nextPage.value && (
        <button
          onClick={handleLoadMore}
          class="btn w-auto mx-auto col-span-full"
        >
          {loading.value ? <Spinner /> : "Show More"}
        </button>
      )}
    </>
  );
}
