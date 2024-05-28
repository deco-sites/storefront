import { AppContext } from "apps/shopify/mod.ts";
import { cartFrom } from "./loader.ts";

export type Props = { text: string };

async function action(props: Props, _req: Request, ctx: AppContext) {
  const { text } = props;

  const response = await ctx.invoke(
    "shopify/actions/cart/updateCoupons.ts",
    { discountCodes: [text] },
  );

  return cartFrom(response);
}

export default action;
