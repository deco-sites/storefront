import { type AppContext } from "../../apps/site.ts";
import { type Minicart } from "../../components/minicart/Minicart.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

import vtex from "../../sdk/cart/vtex/coupon.ts";

const actions: Record<string, any> = {
  vtex,
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
