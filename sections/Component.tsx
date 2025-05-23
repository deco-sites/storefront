// deno-lint-ignore-file no-explicit-any
import { Component, type ComponentType } from "preact";
import {
  toFileUrl,
  fromFileUrl,
  normalize,
  isAbsolute,
  join,
  extname
} from "std/path/mod.ts";
import type { AppContext } from "../apps/site.ts";
import { useSection } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";

interface Props {
  component: string;
  props?: Record<string, unknown>;
}

export type ComponentProps<LoaderFunc, ActionFunc = LoaderFunc> = SectionProps<
  LoaderFunc,
  ActionFunc
>;

const ROOT = Deno.cwd();
const ROOT_FILE_URL = toFileUrl(Deno.cwd()).href;
const ALLOWED_EXTENSIONS = [".tsx", ".jsx"];

function validateComponentPath(componentPath: string): string {
  let cleanPath = componentPath;

  if (cleanPath.startsWith("file://")) {
    cleanPath = fromFileUrl(cleanPath);
  } else {
    cleanPath = normalize(cleanPath);
    if (/^\\[A-Za-z]:\\/.test(cleanPath)) {
      cleanPath = cleanPath.slice(1);
    }
  }

  const absPath = isAbsolute(cleanPath)
    ? cleanPath
    : join(ROOT, cleanPath);

  if (!absPath.startsWith(ROOT)) {
    throw new Error("Access denied: path outside of project.");
  }

  if (!ALLOWED_EXTENSIONS.includes(extname(absPath))) {
    throw new Error("Access denied: file extension not allowed.");
  }

  return toFileUrl(absPath).href;
}

export class ErrorBoundary extends Component<{
  fallback?: ComponentType<{
    error: Error;
  }>;
}, {
  error: Error | null;
}> {
  override state = { error: null };
  static override getDerivedStateFromError(error: Error) {
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
  otherProps: {
    href?: string;
  } = {},
) {
  return useSection({
    ...otherProps,
    props: {
      props,
      component: component.replace(ROOT_FILE_URL, ""),
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
    validateComponentPath(`${ROOT_FILE_URL}${component}`)
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
    validateComponentPath(`${ROOT_FILE_URL}${component}`)
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
export default function Section({ Component }: {
  Component: any;
}) {
  return <Component />;
}
