import { type Props as AddToCartOptions } from "../actions/minicart/add.ts";
import { useComponent } from "../sections/Component.tsx";

const Minicart = import.meta.resolve("../components/minicart/Minicart.tsx");

export const useCart = () => {
  return useComponent(Minicart, {
    cart: { __resolveType: "site/loaders/minicart.ts" },
  });
};

export const useAddToCart = (props: AddToCartOptions) => {
  return useComponent(Minicart, {
    cart: {
      __resolveType: "site/actions/minicart/add.ts",
      ...props,
    },
  });
};

export const useSubmitCart = () => {
  return useComponent(Minicart, {
    cart: { __resolveType: "site/actions/minicart/submit.ts" },
  });
};
