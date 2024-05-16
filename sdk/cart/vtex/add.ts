import { Props as AddItemsProps } from "apps/vtex/actions/cart/addItems.ts";
import { AppContext } from "apps/vtex/mod.ts";
import { cartFrom } from "./loader.ts";

export interface Props {
  seller: string;
  productID: string;
}

async function action(
  { seller, productID }: Props,
  req: Request,
  ctx: AppContext,
) {
  const props: AddItemsProps = {
    allowedOutdatedData: ["paymentData"],
    orderItems: [{ quantity: 1, seller: seller, id: productID }],
  };

  const response = await ctx.invoke(
    "vtex/actions/cart/addItems.ts",
    props,
  );

  return cartFrom(response, req.url);
}

export default action;
