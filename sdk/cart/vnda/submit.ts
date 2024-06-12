import { type AppContext } from "apps/vnda/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, _req, ctx) => {
    const response = await ctx.invoke(
      "vnda/actions/cart/addItem.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart,
    );

    return cartFrom(response);
  },
  setQuantity: async ({ items, platformCart }, _req, ctx) => {
    const cart = platformCart as Cart;

    const index =
      cart?.orderForm?.items?.findIndex((product, index) =>
        product?.quantity !== items[index]
      ) ?? -1;

    const props = {
      itemId: cart?.orderForm?.items?.[index]?.id,
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
      "vnda/actions/cart/updateItem.ts",
      props,
    );

    return cartFrom(response);
  },
  setCoupon: () => {
    throw new Error("Not implemented yet");
  },
};

export default actions;
