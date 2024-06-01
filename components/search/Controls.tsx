import type { ProductListingPage } from "apps/commerce/types.ts";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions"
  >
  & { url: string };

function SearchControls({ url, filters, breadcrumb, sortOptions }: Props) {
  const id = useId();

  return (
    <Drawer
      id={id}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h1 class="px-4 py-3">
                <span class="font-medium text-2xl">Filtrar</span>
              </h1>
              <label class="btn btn-ghost" for={id}>
                <Icon id="XMark" size={24} strokeWidth={2} />
              </label>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 p-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] sm:border-b sm:border-base-200">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
          <label class="btn btn-ghost sm:hidden" for={id}>
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </label>
          {sortOptions.length > 0 && (
            <Sort sortOptions={sortOptions} url={url} />
          )}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
