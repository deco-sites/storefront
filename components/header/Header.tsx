import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import { useSection } from "deco/hooks/useSection.ts";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import Searchbar, { type SearchbarProps } from "../search/Searchbar/Form.tsx";
import Drawer from "../ui/Drawer.tsx";
import Icon from "../ui/Icon.tsx";
import Modal from "../ui/Modal.tsx";
import Alert from "./Alert.tsx";
import Bag from "./Bag.tsx";
import Login from "./Login.tsx";
import Menu from "./Menu.tsx";
import NavItem from "./NavItem.tsx";

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

  /** @hide true */
  variant?: "menu";
}

type Props = Omit<SectionProps, "alert" | "variant">;

const Desktop = (
  { navItems, logo, searchbar }: Props,
) => (
  <>
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        <Searchbar {...searchbar} />
      </div>
    </Modal>

    <div class="grid grid-cols-3 items-center border-b border-base-200 w-full px-6">
      <ul class="flex gap-6 col-span-1 justify-start">
        {navItems?.slice(0, 4).map((item) => <NavItem item={item} />)}
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
          <Icon id="search" />
          <span>SEARCH</span>
        </label>

        <Login />

        <a
          class="btn btn-sm btn-ghost font-thin no-animation"
          href="/wishlist"
          aria-label="Wishlist"
        >
          <Icon id="favorite" />
          <span>WISHLIST</span>
        </a>

        <div class="flex items-center text-xs font-thin">
          <Bag />
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({ logo, searchbar }: Props) => (
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
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
            style={{ minWidth: "100vw" }}
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />

    <div
      class="grid place-items-center w-screen px-5 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content auto min-content min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
        hx-target={`#${SIDEMENU_CONTAINER_ID}`}
        hx-swap="outerHTML"
        hx-trigger="click once"
        hx-get={useSection({ props: { variant: "menu" } })}
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
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

      <label
        for={SEARCHBAR_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="search icon button"
      >
        <Icon id="search" />
      </label>

      <Login />

      <Bag />
    </div>
  </>
);

function Header({
  alerts = [],
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
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
      // Refetch the header in two situations
      // 1. When the window is resized so we have a gracefull Developer Experience
      // 2. When the user changes tab, so we can update the minicart badge when the user comes back
      hx-trigger="resize from:window, visibilitychange[document.visibilityState === 'visible'] from:document"
      hx-get={useSection()}
      hx-target="closest section"
      hx-swap="outerHTML"
    >
      <div class="bg-base-100 fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
    </header>
  );
}

export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }

  return <Header {...props} />;
}
