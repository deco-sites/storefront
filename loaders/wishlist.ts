import { AppContext } from "../apps/site.ts";
import { type Wishlist } from "../components/wishlist/Provider.tsx";
import { usePlatform } from "../sdk/usePlatform.tsx";

import { AppContext as AppContextVTEX } from "apps/vtex/mod.ts";
import { AppContext as AppContextWAKE } from "apps/wake/mod.ts";

async function loader(
  _: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Wishlist> {
  const platform = usePlatform();

  if (platform === "vtex") {
    const response = await (ctx as unknown as AppContextVTEX).invoke(
      "vtex/loaders/wishlist.ts",
      { count: Infinity },
    );

    return {
      productIDs: response.map((item) => item.sku),
    };
  }
  if (platform === "wake") {
    const response = await (ctx as unknown as AppContextWAKE).invoke(
      "wake/loaders/wishlist.ts",
    );

    return {
      productIDs: response.map((item) => item.productId),
    };
  }
  if (platform === "shopify") {
    return {
      productIDs: [],
    };
  }

  throw new Error(`Unsupported platform: ${platform}`);
}

export default loader;
