// deno-lint-ignore-file no-explicit-any
import { useSection } from "deco/hooks/useSection.ts";
import type { SectionProps } from "deco/mod.ts";
import { Component, type ComponentType } from "preact";
import { toFileUrl } from "std/path/mod.ts";
import type { AppContext } from "../apps/site.ts";

interface Props {
  component: string;
  props?: Record<string, unknown>;
}

export type ComponentProps<LoaderFunc, ActionFunc = LoaderFunc> = SectionProps<
  LoaderFunc,
  ActionFunc
>;

const ROOT = toFileUrl(Deno.cwd()).href;

export class ErrorBoundary extends Component<
  { fallback?: ComponentType<{ error: Error }> },
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    const error = this.state.error;

    if (error && Fallback) {
      return <Fallback error={error} />;
    }

    return <>{children}</>;
  }
}

export function useComponent<T = Record<string, unknown>>(
  component: string,
  props?: T,
  otherProps: { href?: string } = {},
) {
  return useSection({
    ...otherProps,
    props: {
      props,
      component: component.replace(ROOT, ""),
      __resolveType: "site/sections/Component.tsx",
    },
  });
}

const identity = <T,>(x: T) => x;

export const loader = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { default: Component, loader, action, ErrorFallback } = await import(
    `${ROOT}${component}`
  );

  try {
    const p = await (loader || action || identity)(props, req, ctx);

    return {
      Component: () => (
        <ErrorBoundary fallback={ErrorFallback}>
          <Component {...p} />
        </ErrorBoundary>
      ),
    };
  } catch (error) {
    return {
      Component: () => <ErrorFallback error={error} />,
    };
  }
};

export const action = async (
  { component, props }: Props,
  req: Request,
  ctx: AppContext,
) => {
  const { default: Component, action, loader, ErrorFallback } = await import(
    `${ROOT}${component}`
  );

  try {
    const p = await (action || loader || identity)(props, req, ctx);

    return {
      Component: () => (
        <ErrorBoundary fallback={ErrorFallback}>
          <Component {...p} />
        </ErrorBoundary>
      ),
    };
  } catch (error) {
    return {
      Component: () => <ErrorFallback error={error} />,
    };
  }
};

export default function Section({ Component }: { Component: any }) {
  return <Component />;
}
