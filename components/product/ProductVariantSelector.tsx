import type { Product } from "apps/commerce/types.ts";
import { useSection } from "deco/hooks/useSection.ts";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
}

const ringClass = clx(
  "h-6 w-6",
  "rounded-full text-center",
  "ring-1 ring-offset-4",
  "ring-base-300 peer-checked:ring-base-content",
);

const colors: Record<string, string | undefined> = {
  "Dark Mode": "black",
  "White Mode": "white",
};

export const Ring = (
  { value, class: _class }: { value: string; class?: string },
) => {
  const color = colors[value] ?? "transparent";

  return (
    <span style={{ backgroundColor: color }} class={clx(ringClass, _class)}>
      {color === "transparent" ? value.substring(0, 2) : null}
    </span>
  );
};

function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const relativeUrl = relative(url);

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
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeLink = relative(link);

              return (
                <li class="h-6 w-6">
                  <label
                    class="avatar cursor-pointer"
                    hx-get={useSection({ href: relativeLink })}
                  >
                    {/* Checkbox for radio button on the frontend */}
                    <input
                      class="hidden peer"
                      type="radio"
                      name={name}
                      checked={relativeLink === relativeUrl}
                    />
                    <Ring
                      value={value}
                      class="block [.htmx-request_&]:hidden"
                    />
                    {/* Loading spinner */}
                    <span
                      class={clx(
                        ringClass,
                        "hidden [.htmx-request_&]:block",
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
