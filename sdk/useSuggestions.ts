import { signal } from "@preact/signals";
import type { Suggestion } from "apps/commerce/types.ts";
import type { Resolved } from "deco/engine/core/resolver.ts";
import { useCallback } from "preact/compat";
import { debounce } from "std/async/debounce.ts";
import { invoke } from "../runtime.ts";

const payload = signal<Suggestion | null>(null);
const loading = signal<boolean>(false);

const debounced = debounce(
  async (
    query: string,
    { __resolveType, ...extraProps }: Resolved<Suggestion | null>,
  ) => {
    try {
      // Figure out a better way to type this loader
      // deno-lint-ignore no-explicit-any
      const invokePayload: any = {
        key: __resolveType,
        props: { query, ...extraProps },
      };
      payload.value = await invoke(invokePayload) as Suggestion | null;
    } catch (error) {
      console.error(
        "Something went wrong while fetching suggestions \n",
        error,
      );
    } finally {
      loading.value = false;
    }
  },
  150,
);

export const useSuggestions = (
  loader: Resolved<Suggestion | null>,
) => {
  const setQuery = useCallback((query: string) => {
    loading.value = true;
    debounced(query, loader);
  }, [loader]);

  return {
    loading,
    payload,
    setQuery,
  };
};
