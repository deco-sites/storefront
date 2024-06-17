import type { Product } from "apps/commerce/types.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useId } from "../../sdk/useId.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
}

const ringStyles = clx(
  "h-5 w-5 block",
  "rounded-full text-center",
  "ring-2 ring-offset-2",
  "ring-transparent peer-checked:ring-primary",
  "border border-base-300",
);

const btnStyles = clx(
  "btn btn-primary btn-outline",
);

const colors: Record<string, string | undefined> = {
  "Dark Mode": "black",
  "White Mode": "white",
};

const useStyles = (value: string) => {
  if (colors[value]) {
    return ringStyles;
  }
  return btnStyles;
};

export const Ring = (
  { value, class: _class }: { value: string; class?: string },
) => {
  const color = colors[value];
  const styles = clx(useStyles(value), _class);

  return (
    <span style={{ backgroundColor: color }} class={styles}>
      {color ? null : value}
    </span>
  );
};

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const relativeUrl = relative(url);
  const id = useId();

  return (
    <ul
      class="flex flex-col gap-4"
      hx-target="closest section"
      hx-swap="outerHTML"
      hx-sync="this:replace"
    >
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-4">
            {Object.entries(possibilities[name])
              .filter(([value]) => value)
              .map(([value, link]) => {
                const relativeLink = relative(link);

                return (
                  <li>
                    <label
                      class="avatar cursor-pointer"
                      hx-get={useSection({ href: relativeLink })}
                    >
                      {/* Checkbox for radio button on the frontend */}
                      <input
                        class="hidden peer"
                        type="radio"
                        name={`${id}-${name}`}
                        checked={relativeLink === relativeUrl}
                      />
                      <Ring
                        value={value}
                        class="[.htmx-request_&]:hidden"
                      />
                      {/* Loading spinner */}
                      <span
                        class={clx(
                          useStyles(value),
                          "hidden [.htmx-request_&]:inline-flex",
                          "loading loading-xs loading-spinner",
                        )}
                      />
                    </label>
                  </li>
                );
              })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default VariantSelector;
