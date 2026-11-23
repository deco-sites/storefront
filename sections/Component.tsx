// deno-lint-ignore-file no-explicit-any
import { Component, type ComponentType } from "preact";
import {
  extname,
  fromFileUrl,
  isAbsolute,
  join,
  normalize,
  SEP,
  toFileUrl,
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
const ROOT = toFileUrl(Deno.cwd()).href;

// SECURITY: `component` comes from the request (useComponent -> /deco/render) and
// goes to a dynamic import(). Unguarded, anyone can import a remote URL or any
// local file, or run any module's loader/action with props they choose.
const ALLOWED_EXTENSIONS = [".tsx", ".jsx"];
const PROJECT_ROOT = Deno.cwd();

export function validateComponentPath(componentPath: string): string {
  let cleanPath = componentPath;
  if (cleanPath.startsWith("file://")) {
    cleanPath = fromFileUrl(cleanPath);
  } else {
    cleanPath = normalize(cleanPath);
    if (/^\\[A-Za-z]:\\/.test(cleanPath)) {
      cleanPath = cleanPath.slice(1);
    }
  }
  // fromFileUrl decodes "..%2f" into "../" after URL parsing; normalize again
  // or encoded traversal slips through.
  const absPath = normalize(
    isAbsolute(cleanPath) ? cleanPath : join(PROJECT_ROOT, cleanPath),
  );
  // Generic messages on purpose: never echo the attacker-controlled value.
  if (!absPath.startsWith(PROJECT_ROOT + SEP)) {
    throw new Error("Access denied: path outside of project.");
  }
  if (!ALLOWED_EXTENSIONS.includes(extname(absPath))) {
    throw new Error("Access denied: file extension not allowed.");
  }
  return toFileUrl(absPath).href;
}

// Only the modules this site renders through useComponent.
// tests/component-allowlist.test.ts fails when a useComponent target is
// missing here, so add new targets to this list.
export const ALLOWED_COMPONENTS: ReadonlySet<string> = new Set([
  "/components/Session.tsx",
  "/components/minicart/Minicart.tsx",
  "/components/product/OutOfStock.tsx",
  "/components/search/Searchbar/Suggestions.tsx",
  "/components/shipping/Results.tsx",
  "/components/wishlist/Provider.tsx",
  "/sections/Newsletter/Newsletter.tsx",
]);

export function resolveComponentUrl(component: string): string {
  const safeUrl = validateComponentPath(`${ROOT}${component}`);
  const relPath = fromFileUrl(safeUrl).slice(PROJECT_ROOT.length).replaceAll(
    SEP,
    "/",
  );
  if (!ALLOWED_COMPONENTS.has(relPath)) {
    throw new Error("Access denied: component not allowed.");
  }
  return safeUrl;
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
    resolveComponentUrl(component)
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
    resolveComponentUrl(component)
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
