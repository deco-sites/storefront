import { useEffect, useMemo } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { useShowMore } from "$store/sdk/useShowMore.ts";
import { PageInfo } from "apps/commerce/types.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

export interface Props {
  children: ComponentChildren;
  pageInfo: PageInfo;
}


export default function ShowMore(
  { children, pageInfo }: Props,
) {
  const { currentPage, loading } = useShowMore();

  const loadedPage = pageInfo.currentPage;
  const isAtPage = useMemo(() => currentPage.value === loadedPage, [
    currentPage.value,
  ]);

  useEffect(() => {
    if (loadedPage !== 1) {
      const url = new URL(window.location.href);
      url.searchParams.set("page", loadedPage.toString());
      window.history.replaceState({}, "", url.toString());
      loading.value = false;
    }
    currentPage.value = loadedPage;
  }, []);

  return (
    <div class={isAtPage ? "flex justify-center col-span-full" : "hidden"}>
      {children}
      <button 
        class={`btn cursor-pointer absolute ${loading.value ? "hidden" : ""}`}
        onClick={() => {
          loading.value = true;
          const element = document.getElementById(`show-more-button-${loadedPage}`);
          if(element) {
            element.click()
          }
        }}>
        Show More
      </button>
    </div>
  );
}
