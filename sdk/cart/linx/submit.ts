import { type AppContext } from "apps/linx/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, _req, ctx) => {
    const response = await ctx.invoke(
      "linx/actions/cart/addItem.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart,
    );

    return cartFrom(response);
  },
  setQuantity: async ({ items, platformCart }, _req, ctx) => {
    const cart = platformCart as Cart;

    const index =
      cart?.Basket?.Items?.findIndex((product, index) =>
        product?.Quantity !== items[index]
      ) ?? -1;

    const BasketItemID = cart?.Basket?.Items?.[index]?.BasketItemID;
    const Quantity = items[index];

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
  setCoupon: async ({ coupon }, _req, ctx) => {
    const response = await ctx.invoke(
      "linx/actions/cart/addCoupon.ts",
      { CouponCode: coupon ?? undefined },
    );

    return cartFrom(response);
  },
};

export default actions;
