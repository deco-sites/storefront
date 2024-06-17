import { type AppContext } from "apps/wake/mod.ts";
import { type CartSubmitActions } from "../../../actions/minicart/submit.ts";
import { type Cart, cartFrom } from "./loader.ts";

const actions: CartSubmitActions<AppContext> = {
  addToCart: async ({ addToCart }, _req, ctx) => {
    const response = await ctx.invoke(
      "wake/actions/cart/addItem.ts",
      // @ts-expect-error I don't know how to fix this
      addToCart,
    );

    return cartFrom(response);
  },
  setQuantity: async ({ items, platformCart }, _req, ctx) => {
    const cart = platformCart as Cart;

    const index =
      cart.products?.findIndex((product, index) =>
        product?.quantity !== items[index]
      ) ?? -1;

    const props = {
      productVariantId: cart.products?.[index]?.productVariantId,
      quantity: items[index],
    };

    if (
      typeof props.productVariantId !== "string" ||
      typeof props.quantity !== "number"
    ) {
      throw new Error(
        "Unreachable code. This is probably a bug. Please report it to the developers.",
      );
    }

    const response = await ctx.invoke(
      "wake/actions/cart/updateItemQuantity.ts",
      props,
    );

    return cartFrom(response);
  },
  setCoupon: async ({ coupon }, _req, ctx) => {
    const response = await ctx.invoke(
      "wake/actions/cart/addCoupon.ts",
      { coupon: coupon ?? undefined },
    )
      // When adding an invalid coupon, wake throws.
      // We should instead return the cart as is
      .catch(() => ctx.invoke("wake/loaders/cart.ts"));

    return cartFrom(response);
  },
};

export default actions;
