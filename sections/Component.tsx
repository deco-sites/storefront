import { useSection } from "deco/hooks/useSection.ts";
import type { AppContext } from "../apps/site.ts";
import type { SectionProps } from "deco/mod.ts";
import { toFileUrl } from "std/path/mod.ts";

interface Props {
  component: string;
  props?: Record<string, unknown>;
}

export type ComponentProps<LoaderFunc, ActionFunc = LoaderFunc> = SectionProps<
  LoaderFunc,
  ActionFunc
>;

const ROOT = toFileUrl(Deno.cwd()).href;

export const useComponent = <T = Record<string, unknown>>(
  component: string,
  props?: T,
  otherProps: { href?: string } = {},
) =>
  useSection({
    ...otherProps,
    props: {
      props,
      component: component.replace(ROOT, ""),
      __resolveType: "site/sections/Component.tsx",
    },
  });

const identity = <T,>(x: T) => x;

export const loader = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { default: Component, loader, action } = await import(
    `${ROOT}${component}`
  );

  return {
    props: await (loader || action || identity)(props, req, ctx),
    Component,
  };
};

export const action = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { default: Component, action, loader } = await import(
    `${ROOT}${component}`
  );

  return {
    props: await (action || loader || identity)(props, req, ctx),
    Component,
  };
};

export default function Section(
  // deno-lint-ignore no-explicit-any
  { Component, props }: { Component: any; props: any },
) {
  return <Component {...props} />;
}
