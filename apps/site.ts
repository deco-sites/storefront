import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { color as shopify } from "apps/shopify/mod.ts";
import { color as vnda } from "apps/vnda/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { color as wake } from "apps/wake/mod.ts";
import { Section } from "deco/blocks/section.ts";
import { App } from "deco/mod.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

export type Props =
  & {
    /**
     * @title Active Commerce Platform
     * @description Choose the active ecommerce platform
     * @default custom
     */
    platform: Platform;
  }
  & CommerceProps
  & {
    theme?: Section;
  };

type Platform = "vtex" | "vnda" | "shopify" | "wake" | "custom";

export let _platform: Platform = "custom";

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
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};

let firstRun = true;

export default function Site(
  { theme, ...state }: Props,
): App<Manifest, Props, [ReturnType<typeof commerce>]> {
  _platform = state.platform || state.commerce?.platform || "custom";

  // Prevent console.logging twice
  if (firstRun) {
    firstRun = false;
    console.info(
      ` 🐁 ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }

  return {
    state,
    manifest,
    dependencies: [
      commerce({ ...state, global: theme ? [theme] : [] }),
    ],
  };
}

export { onBeforeResolveProps } from "apps/website/mod.ts";
