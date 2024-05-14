import { OrderForm } from "apps/vtex/utils/types.ts";
import { Resolved, SectionProps } from "deco/mod.ts";
import Minicart from "../../components/minicart/Minicart.tsx";
import { useMinicart as useMinicartVTEX } from "../../sdk/cart/vtex.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { AppContext } from "../../apps/site.ts";

export interface Props {
  cart?: Resolved<OrderForm | null>;
  partial: "inner";
}

function Section(
  { minicart, partial }: SectionProps<typeof loader, typeof action>,
) {
  if (partial !== "inner" || !minicart) {
    return null;
  }

  return <Minicart {...minicart} />;
}

const invoke = <T,>(
  { __resolveType, ...props }: Resolved<T>,
  ctx: AppContext,
  formProps?: Record<string, unknown>,
) =>
  // deno-lint-ignore no-explicit-any
  (ctx as any).invoke(__resolveType, { ...props, ...formProps }) as Promise<T>;

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const platform = usePlatform();
  const { partial = "inner", cart } = props;

  if (!cart) {
    throw new Error("Missing cart loader props");
  }

  // Props from forms inside the cart, like coupons etc.
  // Input names are used as keys and must match action prop keys
  const formProps = Object.fromEntries([
    ...(await req.formData()).entries(),
  ]);

  if (platform === "vtex") {
    return {
      partial,
      minicart: useMinicartVTEX({
        cart: await invoke(cart, ctx, formProps),
        url: req.url,
      }),
    };
  }

  return {
    partial,
    minicart: null,
  };
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const platform = usePlatform();
  const { partial = "inner", cart } = props;

  if (!cart) {
    throw new Error("Missing cart loader props");
  }

  if (platform === "vtex") {
    return {
      partial,
      minicart: useMinicartVTEX({
        cart: await invoke(cart, ctx),
        url: req.url,
      }),
    };
  }

  return {
    partial,
    minicart: null,
  };
};

export default Section;
