import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { Logo } from "../../components/header/Header.tsx";
import Icon from "../../components/ui/Icon.tsx";
import CartButtonLinx from "../../islands/Header/Cart/linx.tsx";
import CartButtonNuvemshop from "../../islands/Header/Cart/nuvemshop.tsx";
import CartButtonShopify from "../../islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "../../islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import CartButtonWake from "../../islands/Header/Cart/wake.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import {
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_DRAWER_ID,
} from "../../sdk/useUI.ts";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, logo, device }: {
    items: SiteNavigationElement[];
    logo?: Logo;
    device: "mobile" | "desktop" | "tablet";
  },
) {
  const platform = usePlatform();

  // Mobile header
  if (device === "mobile") {
    return (
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden grid grid-cols-3 justify-between items-center border-b border-base-200 w-full px-6 pb-6 gap-2"
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
            class="btn btn-circle btn-sm btn-ghost sm:hidden"
            aria-label="search icon button"
          >
            <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
          </label>
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>
    );
  }

  // Desktop header
  return (
    <div class="hidden sm:grid sm:grid-cols-3 items-center border-b border-base-200 w-full px-6">
      <ul class="flex gap-6 col-span-1 justify-start">
        {items.map((item) => <NavItem item={item} />)}
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
          class="btn btn-sm btn-ghost font-thin"
          aria-label="search icon button"
        >
          <Icon id="MagnifyingGlass" size={20} strokeWidth={0.1} />
          <span>SEARCH</span>
        </label>

        <a
          class="btn btn-sm btn-ghost font-thin"
          href="/account"
          aria-label="Account"
        >
          <Icon id="User" size={20} strokeWidth={0.4} />
          <span>ACCOUNT</span>
        </a>

        <a
          class="btn btn-sm btn-ghost font-thin"
          href="/wishlist"
          aria-label="Wishlist"
        >
          <Icon id="Heart" size={24} strokeWidth={0.4} />
          <span>WISHLIST</span>
        </a>

        <div class="flex items-center text-xs font-thin">
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
