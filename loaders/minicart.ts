import { AppContext } from "../apps/site.ts";
import { Minicart } from "../components/minicart/Minicart.tsx";
import { usePlatform } from "../sdk/usePlatform.tsx";

import vtex from "../sdk/cart/vtex/loader.ts";

const loaders: Record<string, any> = {
  vtex,
};

function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const platform = usePlatform();

  const loader = loaders[platform];

  if (!loader) {
    throw new Error(`Unsupported platform: ${platform}`);
  }

  return loader(_props, req, ctx);
}

export default loader;
