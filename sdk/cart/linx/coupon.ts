import { AppContext } from "apps/linx/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = { text: string };

async function action(props: Props, _req: Request, ctx: AppContext) {
  const { text } = props;

  const response = await ctx.invoke(
    "linx/actions/cart/addCoupon.ts",
    { CouponCode: text },
  );

  return cartFrom(response);
}

export default action;
