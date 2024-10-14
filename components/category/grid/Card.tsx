import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/**
 * @title {{title}}
 */
export interface Item {
  image: ImageWidget;
  href: string;
  label: string;
}

function CategoryCard({ image, href, label }: Item) {
  return (
    <a href={href} class="flex flex-col items-center justify-center gap-4">
      <div class="w-44 h-44 rounded-full bg-base-200 flex justify-center items-center border border-transparent hover:border-primary">
        <Image
          src={image}
          alt={label}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      <span class="font-medium text-sm">{label}</span>
    </a>
  );
}

export default CategoryCard;
