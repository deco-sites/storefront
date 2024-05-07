import type { ComponentChildren } from "preact";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Searchbar from "../../components/search/Searchbar.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Cart from "../../islands/Cart.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import {
  MINICART_DRAWER_ID,
  SEARCHBAR_DRAWER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../sdk/useUI.ts";
import type { Props as MenuProps } from "./Menu.tsx";
import Menu from "./Menu.tsx";

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, drawer, children }: {
    title: string;
    drawer: string;
    children: ComponentChildren;
  },
) => (
  <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100vw]">
    <div class="flex justify-between items-center">
      <h1 class="px-4 py-3">
        <span class="font-medium text-2xl">{title}</span>
      </h1>
      <label for={drawer} aria-label="X" class="btn btn-ghost">
        <Icon id="XMark" size={24} strokeWidth={2} />
      </label>
    </div>
    {children}
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  return (
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
          <Menu {...menu} />
        </Aside>
      }
    >
      <Drawer
        id={SEARCHBAR_DRAWER_ID}
        aside={
          <Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
            {searchbar && (
              <div class="w-screen">
                <Searchbar {...searchbar} />
              </div>
            )}
          </Aside>
        }
      >
        <Drawer
          id={MINICART_DRAWER_ID}
          class="drawer-end"
          aside={
            <Aside title="My Bag" drawer={MINICART_DRAWER_ID}>
              <Cart platform={platform} />
            </Aside>
          }
        >
          {children}
        </Drawer>
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
