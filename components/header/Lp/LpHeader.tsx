import type { ImageWidget } from "apps/admin/widgets.ts";
import Navbar from "$store/components/header/Lp/LpNavbar.tsx";
import { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Drawers from "$store/islands/Header/Lp/LpDrawers.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface NavItem {
  label: string;
  href: string;
  image?: {
    src?: ImageWidget;
    alt?: string;
  };
}

export interface MenuTopProps {
  label?: AvailableIcons;
  text: string;
  href: string;
}

export interface extraLinkItem {
  text: string;
  href: string;
}

export interface Props {
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];
  /** @title Logo */
  logo?: { src: ImageWidget; alt?: string };
  buildBy?: {
    text?: string;
    src: ImageWidget;
    alt?: string;
  };
  hrefLogin?: string;
}

function Header({
  navItems = [],
  logo,
  buildBy,
  hrefLogin = "#",
}: Props) {
  const idHeader = useId();

  return (
    <header class="min-h-[93px]">
      <Drawers menu={{ items: navItems, logo }}>
        <div class="bg-base-100 fixed w-full z-50 h-[95px]">
          <div>
            <Navbar
              items={navItems}
              logo={logo}
              buildBy={buildBy}
              hrefLogin={hrefLogin}
            />
          </div>
        </div>
      </Drawers>
    </header>
  );
}

export default Header;
