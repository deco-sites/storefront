import a from "apps/vnda/actions/cart/addItem.ts";
import { AppContext } from "apps/vnda/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = Parameters<typeof a>[0];

async function action(props: Props, _req: Request, ctx: AppContext) {
  const response = await ctx.invoke("vnda/actions/cart/addItem.ts", props);

  return cartFrom(response);
}

export default action;
