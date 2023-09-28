import type { ProductLeaf } from "apps/commerce/types.ts";

export type Possibilities = Record<string, Record<string, string | undefined>>;

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductLeaf,
): Possibilities => {
  const possibilities: Possibilities = {};
  const selectedSpecs = new Map(
    (selected.additionalProperty ?? [])
      .map((s) => [s.name, s] as const),
  );

  for (const variant of variants) {
    const { url, additionalProperty: specs = [] } = variant;

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      if (!possibilities[name][value]) {
        possibilities[name][value] = it === 0 ? url : undefined;
      }

      const isSelectable = specs.every((s) =>
        s.name === name || selectedSpecs.get(s.name)?.value === s.value
      );

      if (isSelectable) {
        possibilities[name][value] = url;
      }
    }
  }

  return possibilities;
};
