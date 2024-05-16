import { Props as ActionProps } from "apps/vtex/actions/cart/updateCoupons.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = ActionProps;

async function action(
  props: Props,
  req: Request,
  ctx: AppContext,
) {
  const response = await ctx.invoke(
    "vtex/actions/cart/updateCoupons.ts",
    props,
  );

  return cartFrom(response, req.url);
}

export default action;
