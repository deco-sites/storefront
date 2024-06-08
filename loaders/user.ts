import { Person } from "apps/commerce/types.ts";
import { AppContext } from "../apps/site.ts";
import { usePlatform } from "../sdk/usePlatform.tsx";

import { AppContext as AppContextVTEX } from "apps/vtex/mod.ts";

function loader(
  _: unknown,
  _req: Request,
  ctx: AppContext,
): Promise<Person | null> {
  const platform = usePlatform();

  if (platform === "vtex") {
    const vtex = ctx as unknown as AppContextVTEX;

    return vtex.invoke("vtex/loaders/user.ts");
  }

  throw new Error(`Unsupported platform: ${platform}`);
}

export default loader;
