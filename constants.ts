export const MINICART_CONTAINER_ID = "minicart";
export const MINICART_FORM_ID = "minicart-form";
export const MINICART_DRAWER_ID = "minicart-drawer";
export const SIDEMENU_DRAWER_ID = "sidemenu-drawer";
export const SEARCHBAR_DRAWER_ID = "searchbar-drawer";
export const SEARCHBAR_POPUP_ID = "searchbar-popup";
export const SEARCHBAR_INPUT_FORM_ID = "searchbar-form";

export const HEADER_HEIGHT = "110px";
export const NAVBAR_HEIGHT = "75px";

declare global {
  interface Window {
    STOREFRONT: {
      CART?: Record<string, unknown>;
      ANALYTICS?: WeakMap<Element, boolean>;
    };
  }
}
