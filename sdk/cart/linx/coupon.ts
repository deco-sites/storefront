import { AppContext } from "apps/wake/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = { text: string };

async function action(props: Props, _req: Request, ctx: AppContext) {
  const { text } = props;

  const response = await ctx.invoke(
    "wake/actions/cart/addCoupon.ts",
    { coupon: text },
  )
    // When adding an invalid coupon, wake throws.
    // We should instead return the cart as is
    .catch(() => ctx.invoke("wake/loaders/cart.ts"));

  return cartFrom(response);
}

export default action;
