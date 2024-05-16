import { Props as UpdateCartProps } from "apps/vtex/actions/cart/updateItems.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { cartFrom } from "./loader.ts";

export interface Props {
  quantity: number;
  index: number;
}

async function action(
  { quantity, index }: Props,
  req: Request,
  ctx: AppContext,
) {
  const props: UpdateCartProps = {
    allowedOutdatedData: ["paymentData"],
    orderItems: [{ quantity, index }],
  };

  const form = await ctx.invoke(
    "vtex/actions/cart/updateItems.ts",
    props,
  );

  return cartFrom(form, req.url);
}

export default action;
