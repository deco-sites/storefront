import type { Filter } from "apps/commerce/types.ts";
import type { ComponentChildren } from "preact";
import Drawer from "../../../ui/Drawer.tsx";
import Icon from "../../../ui/Icon.tsx";
import Filters from "./Filters.tsx";

interface Props {
  id: string;
  filters: Filter[];
  children: ComponentChildren;
}

function FiltersDrawer({ id, filters, children }: Props) {
  return (
    <Drawer
      id={id}
      aside={
        <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden">
          <div class="flex justify-between items-center">
            <h1 class="px-4 py-3">
              <span class="font-medium text-2xl">Filters</span>
            </h1>
            <label class="btn btn-ghost" for={id}>
              <Icon id="close" />
            </label>
          </div>
          <div class="flex-grow overflow-auto">
            <Filters filters={filters} />
          </div>
        </div>
      }
    >
      {children}
    </Drawer>
  );
}

export default FiltersDrawer;
