import type { Filter, FilterToggle } from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { clx } from "../../../../sdk/clx.ts";
import { formatPrice } from "../../../../sdk/format.ts";
import Avatar from "../../../ui/Avatar.tsx";
import FilterItem from "./Item.tsx";

interface Props {
  filters: Filter[];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const useAvatar = key === "tamanho" || key === "cor";
  const flexDirection = useAvatar ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx("flex flex-wrap gap-2", flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (useAvatar) {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <FilterItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        return <FilterItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 p-4 sm:p-0">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col gap-4">
            <span>{filter.label}</span>
            <FilterValues {...filter} />
          </li>
        ))}
    </ul>
  );
}

export default Filters;
