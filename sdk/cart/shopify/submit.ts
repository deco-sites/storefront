import { type AppContext } from "apps/shopify/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, _req, ctx) => {
    const response = await ctx.invoke(
      "shopify/actions/cart/addItems.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart,
    );

    return cartFrom(response);
  },
  setQuantity: async ({ items, platformCart }, _req, ctx) => {
    const cart = platformCart as Cart;

    if (!cart) {
      throw new Error(
        "Unreachable code. This is probably a bug. Please report it to the developers.",
      );
    }

    const props = {
      lines: items.map((item, index) => ({
        id: cart.lines.nodes[index].id,
        quantity: item,
      })),
    };

    const response = await ctx.invoke(
      "shopify/actions/cart/updateItems.ts",
      props,
    );

    return cartFrom(response);
  },
  setCoupon: async ({ coupon }, _req, ctx) => {
    const response = await ctx.invoke(
      "shopify/actions/cart/updateCoupons.ts",
      { discountCodes: [coupon ?? ""] },
    );

    return cartFrom(response);
  },
};

export default actions;
