import { AppContext } from "apps/shopify/mod.ts";
import { cartFromFragment } from "./loader.ts";

export type Props = { text: string };

async function action(props: Props, _req: Request, ctx: AppContext) {
  const { text } = props;

  const fragment = await ctx.invoke(
    "shopify/actions/cart/updateCoupons.ts",
    { discountCodes: [text] },
  );

  return cartFromFragment(fragment);
}

export default action;
