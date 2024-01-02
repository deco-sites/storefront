import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import type { INavItem } from "./LpNavItem.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface MenuTopProps {
  label?: AvailableIcons;
  text: string;
  href: string;
}

export interface Props {
  logo?: { src: ImageWidget; alt?: string };
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <div class="collapse collapse-plus px-4">
      <input type="checkbox" />
      <div class="text-black">{item.label}</div>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
