import { type AppContext } from "../../apps/site.ts";
import { type Minicart } from "../../components/minicart/Minicart.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

import vtex, { Props as VTEX } from "../../sdk/cart/vtex/add.ts";
import vnda, { Props as VNDA } from "../../sdk/cart/vnda/add.ts";
import wake, { Props as WAKE } from "../../sdk/cart/wake/add.ts";
import linx, { Props as Linx } from "../../sdk/cart/linx/add.ts";
import shopify, { Props as Shopify } from "../../sdk/cart/shopify/add.ts";
import nuvemshop, { Props as NuvemShop } from "../../sdk/cart/nuvemshop/add.ts";

export type Props = VTEX | Shopify | VNDA | WAKE | NuvemShop | Linx;

// deno-lint-ignore no-explicit-any
const actions: Record<string, any> = {
  vtex,
  vnda,
  wake,
  linx,
  nuvemshop,
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
