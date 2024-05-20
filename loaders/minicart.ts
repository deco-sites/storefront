import { AppContext } from "../apps/site.ts";
import { Minicart } from "../components/minicart/Minicart.tsx";
import { usePlatform } from "../sdk/usePlatform.tsx";

import vtex from "../sdk/cart/vtex/loader.ts";
import vnda from "../sdk/cart/vnda/loader.ts";
import wake from "../sdk/cart/wake/loader.ts";
import linx from "../sdk/cart/linx/loader.ts";
import shopify from "../sdk/cart/shopify/loader.ts";
import nuvemshop from "../sdk/cart/nuvemshop/loader.ts";

// deno-lint-ignore no-explicit-any
const loaders: Record<string, any> = {
  vtex,
  vnda,
  wake,
  linx,
  shopify,
  nuvemshop,
};

function loader(
  props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const platform = usePlatform();

  const loader = loaders[platform];

  if (!loader) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  return loader(props, req, ctx);
}

export default loader;
