/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

export const MINICART_DRAWER_ID = "minicart-drawer";
export const SIDEMENU_DRAWER_ID = "sidemenu-drawer";
export const SEARCHBAR_DRAWER_ID = "searchbar-drawer";
export const SEARCHBAR_POPUP_ID = "searchbar-popup";
export const SEARCHBAR_SUGGESTION_ID = "searchbar-suggestion";
export const SEARCHBAR_INPUT_FORM_ID = "searchbar-form";

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    const input = document.getElementById(SEARCHBAR_POPUP_ID) as
      | HTMLInputElement
      | null;

    if (input) {
      input.checked = true;

      document.getElementById(SEARCHBAR_INPUT_FORM_ID)?.focus();
    }
  }
});
