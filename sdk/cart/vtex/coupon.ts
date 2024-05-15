import { Props as ActionProps } from "apps/vtex/actions/cart/updateCoupons.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { orderFormToCart } from "./loader.ts";

export type Props = ActionProps;

async function action(
  props: Props,
  req: Request,
  ctx: AppContext,
) {
  const form = await ctx.invoke(
    "vtex/actions/cart/updateCoupons.ts",
    props,
  );

  return orderFormToCart(form, req.url);
}

export default action;
