import type { FilterToggleValue } from "apps/commerce/types.ts";

function FilterItem({
  url,
  selected,
  label,
  quantity,
}: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-400">({quantity})</span>}
    </a>
  );
}

export default FilterItem;
