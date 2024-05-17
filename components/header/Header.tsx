import type { ImageWidget } from "apps/admin/widgets.ts";
import type { Person, SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/usePartialSection.ts";
import { clx } from "../../sdk/clx.ts";
import {
  MINICART_CONTAINER_ID,
  MINICART_DRAWER_ID,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_DRAWER_ID,
} from "../../sdk/useUI.ts";
import { type Minicart } from "../minicart/Minicart.tsx";
import Searchbar, { SearchbarProps } from "../search/Searchbar/Form.tsx";
import Drawer from "../ui/Drawer.tsx";
import Icon from "../ui/Icon.tsx";
import Modal from "../ui/Modal.tsx";
import Alert from "./Alert.tsx";
import Bag from "./Bag.tsx";
import Login from "./Login.tsx";
import Menu from "./Menu.tsx";
import NavItem from "./NavItem.tsx";
import { headerHeight, navbarHeight } from "./constants.ts";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface SectionProps {
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

  minicart?: Minicart;

  user?: Person | null;
}

type Props = Omit<SectionProps, "alert"> & { loading?: "lazy" | "eager" };

function Desktop(
  { navItems, logo, searchbar, minicart, user, loading }: Props,
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
                height={logo.height || 23}
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

          <Login user={user} loading={loading} />

          <a
            class="btn btn-sm btn-ghost font-thin no-animation"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={0.4} />
            <span>WISHLIST</span>
          </a>

          <div class="flex items-center text-xs font-thin">
            <Bag loading={loading} minicart={minicart} />
          </div>
        </div>
      </div>
    </>
  );
}

function Mobile(
  { navItems, logo, searchbar, minicart, loading }: Props,
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
            {loading === "eager" && <Menu navItems={navItems!} />}
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
          <Bag loading={loading} minicart={minicart} />
        </div>
      </div>
    </>
  );
}

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
  ...props
}: Props) {
  const device = useDevice();

  return (
    <header
      style={{ height: headerHeight }}
      // Refetch the header in two situations
      // 1. When the window is resized so we have a gracefull Developer Experience
      // 2. When the user changes tab, so we can update the minicart badge when the user comes back
      hx-trigger="resize from:window, visibilitychange[document.visibilityState === 'visible'] from:document"
      hx-get={useSection()}
      hx-target="closest section"
      hx-swap="outerHTML"
    >
      {/* Minicart Drawer */}
      <Drawer
        id={MINICART_DRAWER_ID}
        class="drawer-end z-50"
        aside={
          <Drawer.Aside title="My Bag" drawer={MINICART_DRAWER_ID}>
            <div
              data-minicart-container
              id={MINICART_CONTAINER_ID}
              style={{
                minWidth: "calc(min(100vw, 425px))",
                maxWidth: "425px",
              }}
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

      <div class="bg-base-100 fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? <Desktop navItems={navItems} logo={logo} {...props} />
          : <Mobile navItems={navItems} logo={logo} {...props} />}
      </div>
    </header>
  );
}

export function LoadingFallback(props: SectionProps) {
  return <Header {...props} loading="lazy" />;
}

export default function Section(props: SectionProps) {
  return <Header {...props} loading="eager" />;
}
