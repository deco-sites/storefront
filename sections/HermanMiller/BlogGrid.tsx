import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
export interface BlogPost {
  image: ImageWidget;
  alt?: string;
  title: string;
  href: string;
}

export interface Props {
  heading?: string;
  /** @maxItems 3 */
  posts?: BlogPost[];
}

export default function BlogGrid({
  heading = "Confira os conteúdos do nosso blog:",
  posts = [
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/affe70d1-b86c-4906-9315-10fcdfcd5892___8677b930c25f9c9d3be5e3f7fb4461d3.png",
      alt: "Cadeiras ergonômicas",
      title: "Modelos de cadeiras ergonômicas da Herman Miller: 6 opções inovadoras",
      href: "/blog/cadeiras-ergonomicas",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/b419915f-9956-48de-80e5-64d0343ea0ee___91d392adc31a6befdec1bde078a77c40.png",
      alt: "Cadeiras para pessoas altas",
      title: "As melhores cadeiras ergonômicas para pessoas altas",
      href: "/blog/cadeiras-pessoas-altas",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/f2572425-2f75-4671-b3d8-7e0934dbbf8b___32f81908ff05e783cbabaf436b1e786e.png",
      alt: "Cadeiras gaming",
      title: "Conheça as melhores cadeiras gaming Herman Miller",
      href: "/blog/cadeiras-gaming",
    },
  ],
}: Props) {
  return (
    <div class="px-5 sm:px-8 md:px-10 py-10 md:py-14">
      {heading && (
        <h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-10">
          {heading}
        </h2>
      )}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {posts.map((post) => (
          <a key={post.href} href={post.href} class="group flex flex-col gap-3">
            <div class="overflow-hidden aspect-video">
              <Image
                src={post.image}
                alt={post.alt ?? post.title}
                width={500}
                height={280}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <p class="text-sm text-gray-800 leading-snug flex items-start gap-1 group-hover:underline">
              {post.title}
              <span class="flex-none ml-1">→</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
