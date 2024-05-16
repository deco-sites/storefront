import a from "apps/linx/actions/cart/addItem.ts";
import { AppContext } from "apps/linx/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = Parameters<typeof a>[0];

async function action(props: Props, _req: Request, ctx: AppContext) {
  const response = await ctx.invoke("linx/actions/cart/addItem.ts", props);

  return cartFrom(response);
}

export default action;
