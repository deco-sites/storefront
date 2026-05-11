import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy label */
export interface CategoryItem {
  image: ImageWidget;
  label: string;
  href: string;
}

export interface Props {
  title?: string;
  /** @maxItems 6 */
  items?: CategoryItem[];
}

export default function CategoryBannerRow({
  title = "Visualize por Categoria",
  items = [
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/c11f002d-b7a3-439d-9e87-a379e8be105d___78a50c2d8bc4b91cc8805c60f9a29510.png",
      label: "Cadeiras para trabalho",
      href: "/cadeiras-para-trabalho",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/7eeac031-3c3c-4c57-a440-ff334e100a86___a783127a8869a65dd69c75b192daaf8d.png",
      label: "Mesas",
      href: "/mesas",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/931c5cdc-c325-49d7-b869-46407ee68dbf___c76f8bc5f154cd81861b8330eeb743fa.png",
      label: "Iluminação",
      href: "/iluminacao",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/908165b7-ec5d-46bc-8bb6-5e8017429731___9ab582af6548dbd0cde559dee87eb738.png",
      label: "Gaming",
      href: "/gaming",
    },
  ],
}: Props) {
  return (
    <div class="px-5 sm:px-8 md:px-10 py-8 md:py-12">
      {title && (
        <h2 class="text-xl md:text-2xl font-bold mb-6 md:mb-8">{title}</h2>
      )}
      <div
        class={`grid gap-4 md:gap-6 ${
          items.length === 4
            ? "grid-cols-2 md:grid-cols-4"
            : items.length === 3
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
        }`}
      >
        {items.map((item) => (
          <a key={item.label} href={item.href} class="group flex flex-col gap-3">
            <div class="overflow-hidden" style="aspect-ratio: 3/4;">
              <Image
                src={item.image}
                alt={item.label}
                width={400}
                height={533}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <span class="text-center font-bold text-sm md:text-base">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
