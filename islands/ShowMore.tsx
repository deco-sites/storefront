import { useEffect, useMemo } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { useShowMore } from "$store/sdk/useShowMore.ts";
import { PageInfo } from "apps/commerce/types.ts";

export interface Props {
  children: ComponentChildren;
  pageInfo: PageInfo;
}

export default function ShowMore(
  { children, pageInfo }: Props,
) {
  const { currentPage, loading } = useShowMore();

  const loadedPage = pageInfo.currentPage;
  const isFirstPage = !pageInfo.previousPage;
  const isAtPage = useMemo(() => currentPage.value === loadedPage, [
    currentPage.value,
  ]);

  useEffect(() => {
    if (!isFirstPage) {
      loading.value = false;
    }
    currentPage.value = loadedPage;
  }, []);

  return (
    <div
      class={(isAtPage && pageInfo.nextPage)
        ? "flex justify-center col-span-full"
        : "hidden"}
    >
      {children}
      <button
        class={`btn cursor-pointer absolute ${loading.value ? "hidden" : ""}`}
        onClick={() => {
          loading.value = true;
          const element = document.getElementById(
            `show-more-button-${loadedPage}`,
          );
          if (element) {
            element.click();
          }
          if (pageInfo.nextPage) {
            const url = new URL(pageInfo.nextPage, window.location.href);
            url.searchParams.delete("partial");
            window.history.replaceState({}, "", url.toString());
          }
        }}
      >
        Show More
      </button>
    </div>
  );
}
