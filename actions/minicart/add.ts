import { type AppContext } from "../../apps/site.ts";
import { type Minicart } from "../../components/minicart/Minicart.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

import vtex, { Props as VTEX } from "../../sdk/cart/vtex/add.ts";
import vnda, { Props as VNDA } from "../../sdk/cart/vnda/add.ts";
import shopify, { Props as Shopify } from "../../sdk/cart/shopify/add.ts";

export type Props = VTEX | Shopify | VNDA;

// @gimenes remove once all platforms are supported
// deno-lint-ignore no-explicit-any
const actions: Record<string, any> = {
  vtex,
  vnda,
  shopify,
};

function loader(
  props: Props,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const platform = usePlatform();

  const action = actions[platform];

  if (!action) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  return action(props, req, ctx);
}

export default loader;
