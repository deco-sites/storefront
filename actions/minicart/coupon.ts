import { type AppContext } from "../../apps/site.ts";
import { type Minicart } from "../../components/minicart/Minicart.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

import vtex from "../../sdk/cart/vtex/coupon.ts";
import wake from "../../sdk/cart/wake/coupon.ts";
import linx from "../../sdk/cart/linx/coupon.ts";
import shopify from "../../sdk/cart/shopify/coupon.ts";

// deno-lint-ignore no-explicit-any
const actions: Record<string, any> = {
  vtex,
  wake,
  linx,
  shopify,
};

async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const platform = usePlatform();

  const action = actions[platform];

  if (!action) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  const props = Object.fromEntries((await req.formData()).entries());

  return action(props, req, ctx);
}

export default loader;
