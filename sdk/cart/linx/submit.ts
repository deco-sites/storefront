import { type AppContext } from "apps/linx/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  setQuantity: async ({ items, original }, _req, ctx) => {
    const cart = original as Cart;

    const index =
      cart?.Basket?.Items?.findIndex((product, index) =>
        product?.Quantity !== items[index].quantity
      ) ?? -1;

    const BasketItemID = cart?.Basket?.Items?.[index]?.BasketItemID;
    const Quantity = items[index].quantity;

    if (
      typeof BasketItemID !== "string" ||
      typeof Quantity !== "number"
    ) {
      throw new Error(
        "Unreachable code. This is probably a bug. Please report it to the developers.",
      );
    }

    const response = await ctx.invoke(
      "linx/actions/cart/updateItem.ts",
      { BasketItemID, Quantity },
    );

    return cartFrom(response);
  },
  setCoupon: async ({ text }, _req, ctx) => {
    const response = await ctx.invoke(
      "linx/actions/cart/addCoupon.ts",
      { CouponCode: text ?? undefined },
    );

    return cartFrom(response);
  },
};

export default actions;
