import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import { Section } from "deco/blocks/section.ts";
import { App } from "deco/mod.ts";
import { gray, rgb24 } from "std/fmt/colors.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

export type Props = CommerceProps & {
  theme?: Section;
};

export let _platform: undefined | CommerceProps["commerce"]["platform"];

const getPlatformInfo = (
  commerce: CommerceProps["commerce"],
): { platform: string; account?: string } => {
  if (commerce.platform === "vtex") {
    return {
      ...commerce,
      platform: rgb24(commerce.platform, 0xF71963),
    };
  }

  if (commerce.platform === "vnda") {
    return {
      ...commerce,
      platform: rgb24(commerce.platform, 0x0c29d0),
    };
  }

  if (commerce.platform === "shopify") {
    return {
      account: commerce.storeName,
      platform: rgb24(commerce.platform, 0x96bf48),
    };
  }

  return {
    platform: gray("unknown"),
  };
};

let firstRun = true;

export default function Site(
  { theme, ...state }: Props,
): App<Manifest, Props, [ReturnType<typeof commerce>]> {
  _platform = state.commerce.platform;

  const { account, platform } = getPlatformInfo(state.commerce);

  // Prevent console.logging twice
  if (!firstRun) {
    console.info(
      ` 🐁 ${rgb24("Storefront", 0x02f77d)} | ${platform} ${
        account ? `- ${gray(account)}` : ""
      }\n`,
    );
  } else {
    firstRun = false;
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
