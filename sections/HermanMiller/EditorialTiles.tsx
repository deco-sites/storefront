import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy caption */
export interface Tile {
  image: ImageWidget;
  alt?: string;
  caption: string;
  href: string;
}

export interface Props {
  /** @description Título da seção (opcional) */
  title?: string;
  /** @description Centralizar título */
  centerTitle?: boolean;
  /** @maxItems 3 */
  tiles?: Tile[];
}

export default function EditorialTiles({
  title,
  centerTitle = false,
  tiles = [
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/5f25cf21-7aaf-4572-8d19-30e3c2ef0238___c52600c76760b6dee80debbfd50b101c.png",
      alt: "Estilo de decoração",
      caption: "Descubra qual o seu estilo de decoração com a Herman Miller",
      href: "/blog/estilos",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/9f5f7771-48d6-4174-8965-7eaa2eda07f4___39c709605bfee8539302f8dfd57876e5.png",
      alt: "Designer Herman Miller",
      caption: "Qual designer Herman Miller você é?",
      href: "/blog/designer",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/e6293492-6c9c-4c82-ad00-a1e2ac608058___32f81908ff05e783cbabaf436b1e786e.png",
      alt: "Quarto gamer",
      caption: "Inspirações para você montar um quarto gamer com LED",
      href: "/blog/gaming",
    },
  ],
}: Props) {
  return (
    <div class="px-5 sm:px-8 md:px-10 py-8 md:py-12">
      {title && (
        <h2
          class={`text-xl md:text-2xl lg:text-3xl font-bold mb-8 ${
            centerTitle ? "text-center" : ""
          }`}
        >
          {title}
        </h2>
      )}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {tiles.map((tile) => (
          <a key={tile.href} href={tile.href} class="group flex flex-col gap-3">
            <div class="overflow-hidden aspect-video md:aspect-[4/3]">
              <Image
                src={tile.image}
                alt={tile.alt ?? tile.caption}
                width={500}
                height={375}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <p class="text-sm text-gray-800 flex items-center gap-1 group-hover:underline">
              {tile.caption}
              <span class="ml-1">→</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
