import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useSection } from "deco/hooks/usePartialSection.ts";
import type { SectionProps } from "deco/types.ts";
import { AppContext } from "../../apps/site.ts";
import { useCart as useCartVTEX } from "../../sdk/cart/vtex.ts";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import {
  MINICART_CONTAINER_ID,
  MINICART_DRAWER_ID,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_DRAWER_ID,
} from "../../sdk/useUI.ts";
import Searchbar, { SearchbarProps } from "../search/Searchbar/Form.tsx";
import Drawer from "../ui/Drawer.tsx";
import Icon from "../ui/Icon.tsx";
import Modal from "../ui/Modal.tsx";
import Alert from "./Alert.tsx";
import Menu from "./Menu.tsx";
import NavItem from "./NavItem.tsx";
import RevealCartButton from "./RevealCartButton.tsx";
import { headerHeight, navbarHeight } from "./constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface Props {
  alerts?: string[];

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;

  /** @title Logo */
  logo?: Logo;

  /** @hidden */
  mode?: "private" | "public";
}

const useCart = () => {
  const platform = usePlatform();

  if (platform === "vtex") {
    return useCartVTEX();
  }

  throw new Error(`Unsupported platform: ${platform}`);
};

function Desktop(
  { navItems, logo, searchbar, cart }: Omit<
    SectionProps<typeof loader>,
    "device" | "alerts"
  >,
) {
  return (
    <>
      <Modal id={SEARCHBAR_POPUP_ID}>
        <div
          class="absolute top-0 bg-base-100 container"
          style={{ marginTop: headerHeight }}
        >
          <Searchbar {...searchbar} />
        </div>
      </Modal>
      <div class="grid grid-cols-3 items-center border-b border-base-200 w-full px-6">
        <ul class="flex gap-6 col-span-1 justify-start">
          {navItems!.map((item) => <NavItem item={item} />)}
        </ul>
        <div class="flex justify-center">
          {logo && (
            <a href="/" aria-label="Store logo">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}
        </div>
        <div class="flex-none flex items-center justify-end gap-2 col-span-1">
          <label
            for={SEARCHBAR_POPUP_ID}
            class="btn btn-sm btn-ghost font-thin no-animation"
            aria-label="search icon button"
          >
            <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
            <span>SEARCH</span>
          </label>

          <a
            class="btn btn-sm btn-ghost font-thin no-animation"
            href="/account"
            aria-label="Account"
          >
            <Icon id="User" size={20} strokeWidth={0.4} />
            <span>ACCOUNT</span>
          </a>

          <a
            class="btn btn-sm btn-ghost font-thin no-animation"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={0.4} />
            <span>WISHLIST</span>
          </a>

          <div class="flex items-center text-xs font-thin">
            <RevealCartButton minicart={useCart()} {...cart} />
          </div>
        </div>
      </div>
    </>
  );
}

function Mobile(
  { navItems, logo, searchbar, cart }: Omit<
    SectionProps<typeof loader>,
    "device" | "alerts"
  >,
) {
  return (
    <>
      <Drawer
        id={SEARCHBAR_DRAWER_ID}
        aside={
          <Drawer.Aside title="Search" drawer={SEARCHBAR_DRAWER_ID}>
            <div class="w-screen overflow-y-auto">
              <Searchbar {...searchbar} />
            </div>
          </Drawer.Aside>
        }
      />
      <Drawer
        id={SIDEMENU_DRAWER_ID}
        aside={
          <Drawer.Aside title="Menu" drawer={SIDEMENU_DRAWER_ID}>
            <Menu navItems={navItems!} />
          </Drawer.Aside>
        }
      />
      <div
        style={{ height: navbarHeight }}
        class="grid grid-cols-3 justify-between items-center border-b border-base-200 w-full px-6 pb-6 gap-2"
      >
        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-circle md:btn-sm btn-xs btn-ghost"
          aria-label="open menu"
        >
          <Icon id="Bars3" size={20} strokeWidth={0.01} />
        </label>
        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}

        <div class="flex justify-end gap-1">
          <label
            for={SEARCHBAR_DRAWER_ID}
            class="btn btn-circle btn-sm btn-ghost"
            aria-label="search icon button"
          >
            <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
          </label>
          <RevealCartButton minicart={useCart()} {...cart} />
        </div>
      </div>
    </>
  );
}

function MinicartDrawer() {
  return (
    <Drawer
      id={MINICART_DRAWER_ID}
      class="drawer-end z-50"
      aside={
        <Drawer.Aside title="My Bag" drawer={MINICART_DRAWER_ID}>
          <div
            data-minicart-container
            id={MINICART_CONTAINER_ID}
            style={{ minWidth: "calc(min(100vw, 425px))", maxWidth: "425px" }}
            class={clx(
              "h-full flex flex-col bg-base-100 items-center justify-center overflow-auto",
              "[.htmx-request&]:pointer-events-none",
              "[[data-minicart-container]&_section]:contents",
            )}
          >
            <span class="loading loading-lg" />
          </div>
        </Drawer.Aside>
      }
    />
  );
}

export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  if (props.mode !== "private") {
    return { ...props, device: ctx.device };
  }

  const { cart: { __resolveType, ...cartProps } } = useCart();
  const cart = await ctx.invoke(__resolveType, cartProps);

  return {
    device: ctx.device,
    ...props,
    cart: {
      totalItems: cart.items.length,
    },
  };
};

function Header({
  alerts = [],
  navItems = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  searchbar,
  device,
  mode,
  ...props
}: SectionProps<typeof loader>) {
  const hxTags = mode !== "private"
    ? {
      "hx-get": useSection({ props: { mode: "private", device } }),
      "hx-trigger": "intersect once",
      "hx-target": "closest section",
      "hx-swap": "outerHTML",
    }
    : null;

  return (
    <header style={{ height: headerHeight }} {...hxTags}>
      <MinicartDrawer />
      <div class="bg-base-100 fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? (
            <Desktop
              navItems={navItems}
              logo={logo}
              searchbar={searchbar}
              {...props}
            />
          )
          : (
            <Mobile
              navItems={navItems}
              logo={logo}
              searchbar={searchbar}
              {...props}
            />
          )}
      </div>
    </header>
  );
}

export default Header;
