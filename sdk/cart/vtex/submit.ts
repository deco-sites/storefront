import { type AppContext } from "apps/vtex/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  setQuantity: async ({ items }, req, ctx) => {
    const response = await ctx.invoke(
      "vtex/actions/cart/updateItems.ts",
      { allowedOutdatedData: ["paymentData"], orderItems: items },
    );

    return cartFrom(response, req.url);
  },
  setCoupon: async ({ text }, req, ctx) => {
    const response = await ctx.invoke("vtex/actions/cart/updateCoupons.ts", {
      text: text ?? undefined,
    });

    return cartFrom(response, req.url);
  },
};

export default actions;
