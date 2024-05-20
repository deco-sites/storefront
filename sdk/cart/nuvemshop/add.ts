import a from "apps/nuvemshop/actions/cart/addItems.ts";
import { AppContext } from "apps/nuvemshop/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = Parameters<typeof a>[0];

async function action(props: Props, _req: Request, ctx: AppContext) {
  const response = await ctx.invoke(
    "nuvemshop/actions/cart/addItems.ts",
    props,
  );

  // TODO: improve nuvemshop typings
  // deno-lint-ignore no-explicit-any
  return cartFrom(response as any);
}

export default action;
