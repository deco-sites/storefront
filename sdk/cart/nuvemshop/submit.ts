import { type AppContext } from "apps/nuvemshop/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, _req, ctx) => {
    const response = await ctx.invoke(
      "nuvemshop/actions/cart/addItems.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart,
    );

    // deno-lint-ignore no-explicit-any
    return cartFrom(response as any);
  },
  setQuantity: async ({ items, platformCart }, _req, ctx) => {
    const cart = platformCart as Cart;

    const index =
      cart?.products?.findIndex((product, index) =>
        product?.quantity !== items[index]
      ) ?? -1;

    const props = {
      itemId: cart?.products?.[index]?.id,
      quantity: items[index],
    };

    if (
      typeof props.itemId !== "string" ||
      typeof props.quantity !== "number"
    ) {
      throw new Error(
        "Unreachable code. This is probably a bug. Please report it to the developers.",
      );
    }

    const response = await ctx.invoke(
      "nuvemshop/actions/cart/updateItems.ts",
      props,
    );

    // deno-lint-ignore no-explicit-any
    return cartFrom(response as any);
  },
  setCoupon: () => {
    throw new Error("Not implemented yet");
  },
};

export default actions;
