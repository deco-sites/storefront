import commerce from "apps/commerce/mod.ts";
import { color as linx } from "apps/linx/mod.ts";
import { color as nuvemshop } from "apps/nuvemshop/mod.ts";
import { color as shopify } from "apps/shopify/mod.ts";
import { color as vnda } from "apps/vnda/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { color as wake } from "apps/wake/mod.ts";
import { Props as WebsiteProps } from "apps/website/mod.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";
import { type Section } from "@deco/deco/blocks";
import { type App as A, type AppContext as AC } from "@deco/deco";
export interface Props extends WebsiteProps {
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  theme?: Section;
}
export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "custom";
export let _platform: Platform = "custom";
export type App = ReturnType<typeof Site>;
// @ts-ignore somehow deno task check breaks, I have no idea why
export type AppContext = AC<App>;
const color = (platform: string) => {
  switch (platform) {
    case "vtex":
      return vtex;
    case "vnda":
      return vnda;
    case "wake":
      return wake;
    case "shopify":
      return shopify;
    case "linx":
      return linx;
    case "nuvemshop":
      return nuvemshop;
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};
let firstRun = true;
/**
 * @title Site
 * @description Start your site from a template or from scratch.
 * @category Tool
 * @logo https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1/0ac02239-61e6-4289-8a36-e78c0975bcc8
 */
export default function Site({ ...state }: Props): A<Manifest, Props, [
  ReturnType<typeof commerce>,
]> {
  _platform = state.platform || "custom";
  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }
  return {
    state,
    manifest,
    dependencies: [
      commerce(state),
    ],
  };
}
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
