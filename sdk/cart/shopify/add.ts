import a from "apps/shopify/actions/cart/addItems.ts";
import { AppContext } from "apps/shopify/mod.ts";
import { cartFromFragment } from "./loader.ts";

export type Props = Parameters<typeof a>[0];

async function action(props: Props, _req: Request, ctx: AppContext) {
  const fragment = await ctx.invoke("shopify/actions/cart/addItems.ts", props);

  return cartFromFragment(fragment);
}

export default action;
