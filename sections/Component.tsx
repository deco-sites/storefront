import { useSection } from "deco/hooks/usePartialSection.ts";
import { AppContext } from "../apps/site.ts";

interface Props {
  component: string;
  props?: Record<string, unknown>;
}

export const useComponent = (
  component: string,
  props?: Record<string, unknown>,
  otherProps: { href?: string } = {},
) =>
  useSection({
    ...otherProps,
    props: {
      props,
      component,
      __resolveType: "site/sections/Component.tsx",
    },
  });

const identity = <T,>(x: T) => x;

export const loader = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { default: Component, loader = identity } = await import(component);

  return {
    props: await loader(props, req, ctx),
    Component,
  };
};

export const action = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { default: Component, action = identity } = await import(component);

  return {
    props: await action(props, req, ctx),
    Component,
  };
};

export default function Section(
  // deno-lint-ignore no-explicit-any
  { Component, props }: { Component: any; props: any },
) {
  return <Component {...props} />;
}
