import { Section } from "deco/blocks/section.ts";
import { App } from "deco/mod.ts";
import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

export type Props = CommerceProps & {
  theme?: Section;
};

export let platform: undefined | CommerceProps["commerce"]["platform"];

export default function Site(
  { theme, ...state }: Props,
): App<Manifest, Props, [ReturnType<typeof commerce>]> {
  platform = state.commerce.platform;

  return {
    state,
    manifest,
    dependencies: [
      commerce({ ...state, global: theme ? [theme] : [] }),
    ],
  };
}

export { onBeforeResolveProps } from "apps/website/mod.ts";
