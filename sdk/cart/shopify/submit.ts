import { type AppContext } from "apps/shopify/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  setQuantity: async ({ items, original }, _req, ctx) => {
    const cart = original as Cart;

    if (!cart) {
      throw new Error(
        "Unreachable code. This is probably a bug. Please report it to the developers.",
      );
    }

    const props = {
      lines: items.map((item, index) => ({
        id: cart.lines.nodes[index].id,
        quantity: item.quantity,
      })),
    };

    const response = await ctx.invoke(
      "shopify/actions/cart/updateItems.ts",
      props,
    );

    return cartFrom(response);
  },
  setCoupon: async ({ text }, _req, ctx) => {
    const response = await ctx.invoke(
      "shopify/actions/cart/updateCoupons.ts",
      { discountCodes: [text ?? ""] },
    );

    return cartFrom(response);
  },
};

export default actions;
