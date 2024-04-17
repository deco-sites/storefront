import Decohub from "apps/decohub/mod.ts";

/**
 * @title Deco Hub
 * @description Unlock apps and integrations on deco.cx
 * @category Tool
 * @logo https://raw.githubusercontent.com/deco-cx/apps/main/decohub/logo.png
 */
export default function App(...params: Parameters<typeof Decohub>) {
  return Decohub(...params);
}

export { Preview } from "apps/decohub/mod.ts";
