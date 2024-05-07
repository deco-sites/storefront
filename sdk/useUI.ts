/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displaySearchPopup = signal(false);

export const MINICART_DRAWER_ID = "minicart-drawer";
export const SIDEMENU_DRAWER_ID = "sidemenu-drawer";
export const SEARCHBAR_DRAWER_ID = "searchbar-drawer";

const state = {
  displaySearchPopup,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
