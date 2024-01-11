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

function Navbar({ items, searchbar, logo, buttons }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  buttons?: Buttons;
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full p-6 gap-2"
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
              height={logo.height || 16}
            />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
          {platform === "vnda" && <CartButtonVDNA />}
          {platform === "wake" && <CartButtonWake />}
          {platform === "linx" && <CartButtonLinx />}
          {platform === "shopify" && <CartButtonShopify />}
          {platform === "nuvemshop" && <CartButtonNuvemshop />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden lg:grid lg:grid-cols-3 items-center border-b border-base-200 w-full px-6">
        <div class="flex items-center gap-6 col-span-1">
          <MenuButton />
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex justify-center">
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
                height={logo.height || 16}
              />
            </a>
          )}
        </div>
        <div class="flex-none flex items-center justify-end gap-6 col-span-1">
          {!buttons?.hideSearchButton && (
            <div class="flex items-center text-xs font-thin gap-2">
              <SearchButton />SEARCH
            </div>
          )}

          <Searchbar searchbar={searchbar} />
          {!buttons?.hideAccountButton && (
            <div class="flex items-center text-xs font-thin gap-2">
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href="/account"
                aria-label="Account"
              >
                <Icon id="User" size={24} strokeWidth={0.4} />
              </a>
              ACCOUNT
            </div>
          )}
          {!buttons?.hideWishlistButton && (
            <div class="flex items-center text-xs font-thin gap-2">
              <a
                class="btn btn-circle btn-sm btn-ghost"
                href="/wishlist"
                aria-label="Wishlist"
              >
                <Icon id="Heart" size={24} strokeWidth={0.4} />
              </a>
              WISHLIST
            </div>
          )}
          {!buttons?.hideCartButton && (
            <div class="flex items-center text-xs font-thin gap-2">
              {platform === "vtex" && <CartButtonVTEX />}
              {platform === "vnda" && <CartButtonVDNA />}
              {platform === "wake" && <CartButtonWake />}
              {platform === "linx" && <CartButtonLinx />}
              {platform === "shopify" && <CartButtonShopify />}
              {platform === "nuvemshop" && <CartButtonNuvemshop />}
              CART
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
