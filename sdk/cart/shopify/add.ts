import a from "apps/shopify/actions/cart/addItems.ts";
import { AppContext } from "apps/shopify/mod.ts";
import { orderFormToCart } from "./loader.ts";

export type Props = Parameters<typeof a>[0];

async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await ctx.invoke("shopify/actions/cart/addItems.ts", props);

  return orderFormToCart(form, req.url);
}

export default action;
