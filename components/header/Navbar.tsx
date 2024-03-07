import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonLinx from "$store/islands/Header/Cart/linx.tsx";
import CartButtonShopify from "$store/islands/Header/Cart/shopify.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import CartButtonWake from "$store/islands/Header/Cart/wake.tsx";
import CartButtonNuvemshop from "$store/islands/Header/Cart/nuvemshop.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "$store/components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar(
  { items, searchbar, logo, buttons, logoPosition = "left", device }: {
    items: SiteNavigationElement[];
    searchbar?: SearchbarProps;
    logo?: Logo;
    buttons?: Buttons;
    logoPosition?: "left" | "center";
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
        <MenuButton />
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
          <SearchButton />
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
      <ul
        class={`flex gap-6 col-span-1 ${
          logoPosition === "left" ? "justify-center" : "justify-start"
        }`}
      >
        {items.map((item) => <NavItem item={item} />)}
      </ul>
      <div
        class={`flex ${
          logoPosition === "left" ? "justify-start -order-1" : "justify-center"
        }`}
      >
        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="block"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 100}
              height={logo.height || 13}
            />
          </a>
        )}
      </div>
      <div class="flex-none flex items-center justify-end gap-6 col-span-1">
        {!buttons?.hideSearchButton && (
          <div class="flex items-center text-xs font-thin gap-1">
            <SearchButton />SEARCH
          </div>
        )}

        <Searchbar searchbar={searchbar} />
        {!buttons?.hideAccountButton && (
          <a
            class="flex items-center text-xs font-thin"
            href="/account"
            aria-label="Account"
          >
            <div class="flex btn btn-circle btn-sm btn-ghost gap-1">
              <Icon id="User" size={20} strokeWidth={0.4} />
            </div>
            ACCOUNT
          </a>
        )}
        {!buttons?.hideWishlistButton && (
          <a
            class="flex items-center text-xs font-thin"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <button
              class="flex btn btn-circle btn-sm btn-ghost gap-1"
              aria-label="Wishlist"
            >
              <Icon id="Heart" size={24} strokeWidth={0.4} />
            </button>
            WISHLIST
          </a>
        )}
        {!buttons?.hideCartButton && (
          <div class="flex items-center text-xs font-thin">
            {platform === "vtex" && <CartButtonVTEX />}
            {platform === "vnda" && <CartButtonVDNA />}
            {platform === "wake" && <CartButtonWake />}
            {platform === "linx" && <CartButtonLinx />}
            {platform === "shopify" && <CartButtonShopify />}
            {platform === "nuvemshop" && <CartButtonNuvemshop />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
