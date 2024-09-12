import type { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useId } from "../../sdk/useId.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { useSection } from "@deco/deco/hooks";
interface Props {
  product: Product;
}
const colors: Record<string, string | undefined> = {
  "White": "white",
  "Black": "black",
  "Gray": "gray",
  "Blue": "#99CCFF",
  "Green": "#aad1b5",
  "Yellow": "#F1E8B0",
  "DarkBlue": "#4E6E95",
  "LightBlue": "#bedae4",
  "DarkGreen": "#446746",
  "LightGreen": "#aad1b5",
  "DarkYellow": "#c6b343",
  "LightYellow": "#F1E8B0",
};
const useStyles = (value: string, checked: boolean) => {
  if (colors[value]) {
    return clx(
      "border border-base-300 rounded-full",
      "w-12 h-12 block",
      "border border-[#C9CFCF] rounded-full",
      "ring-2 ring-offset-2",
      checked ? "ring-primary" : "ring-transparent",
    );
  }
  return clx(
    "btn btn-ghost border-[#C9CFCF] hover:bg-base-200 hover:border-[#C9CFCF] w-12 h-12",
    "ring-2 ring-offset-2",
    checked ? "ring-primary" : "ring-transparent border-[#C9CFCF]",
  );
};
export const Ring = ({ value, checked = false, class: _class }: {
  value: string;
  checked?: boolean;
  class?: string;
}) => {
  const color = colors[value];
  const styles = clx(useStyles(value, checked), _class);
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
  const filteredNames = Object.keys(possibilities).filter((name) =>
    name.toLowerCase() !== "title" && name.toLowerCase() !== "default title"
  );
  if (filteredNames.length === 0) {
    return null;
  }
  return (
    <ul
      class="flex flex-col gap-4"
      hx-target="closest section"
      hx-swap="outerHTML"
      hx-sync="this:replace"
    >
      {filteredNames.map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-sm">{name}</span>
          <ul class="flex flex-row gap-4">
            {Object.entries(possibilities[name])
              .filter(([value]) => value)
              .map(([value, link]) => {
                const relativeLink = relative(link);
                const checked = relativeLink === relativeUrl;
                return (
                  <li>
                    <label
                      class="cursor-pointer grid grid-cols-1 grid-rows-1 place-items-center"
                      hx-get={useSection({ href: relativeLink })}
                    >
                      {/* Checkbox for radio button on the frontend */}
                      <input
                        class="hidden peer"
                        type="radio"
                        name={`${id}-${name}`}
                        checked={checked}
                      />
                      <div
                        class={clx(
                          "col-start-1 row-start-1 col-span-1 row-span-1",
                          "[.htmx-request_&]:opacity-0 transition-opacity",
                        )}
                      >
                        <Ring value={value} checked={checked} />
                      </div>
                      {/* Loading spinner */}
                      <div
                        class={clx(
                          "col-start-1 row-start-1 col-span-1 row-span-1",
                          "opacity-0 [.htmx-request_&]:opacity-100 transition-opacity",
                          "flex justify-center items-center",
                        )}
                      >
                        <span class="loading loading-sm loading-spinner" />
                      </div>
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
