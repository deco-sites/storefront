import { Section } from "$live/blocks/section.ts";
import { App } from "$live/mod.ts";
import commerce, { Props as CommerceProps } from "apps/commerce/mod.ts";
import manifest, { Manifest } from "../manifest.gen.ts";

export type Props = CommerceProps & {
  // theme?: Section;
};

export default function Site(
  { theme, ...state }: Props,
): App<Manifest, Props, [ReturnType<typeof commerce>]> {
  return {
    state,
    manifest,
    dependencies: [
      commerce({ ...state, global: theme ? [theme] : [] }),
    ],
  };
}

export { onBeforeResolveProps } from "apps/website/mod.ts";
