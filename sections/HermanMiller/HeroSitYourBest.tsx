import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title?: string;
  description?: string;
  cta?: {
    label: string;
    href: string;
  };
  /** @description Imagem da direita (grid de cadeiras) */
  image?: ImageWidget;
  imageAlt?: string;
}

export default function HeroSitYourBest({
  title = "Sit Your Best",
  description =
    "Independentemente de quem você seja ou de como se senta, você se sentirá mais feliz em uma cadeira Herman Miller. Desde a Aeron até a Zeph, somente as nossas cadeiras se adaptam a cada ângulo, curva, músculo e movimento do seu corpo.",
  cta = { label: "Compre agora", href: "/cadeiras" },
  image =
    "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/a22c5b17-c9ad-4e8d-bc14-ce880b627b57___c0f953eb1e7ef3fdec335f9af3a9b9c8.jpg",
  imageAlt = "Herman Miller chairs collection",
}: Props) {
  return (
    <div class="flex flex-col md:flex-row w-full bg-white overflow-hidden min-h-[520px]">
      {/* Left text panel */}
      <div
        class="flex flex-col justify-center px-8 md:px-14 lg:px-20 py-14 bg-white"
        style="flex: 0 0 40%; max-width: 40%;"
      >
        <h1
          class="font-black leading-none mb-6 text-black"
          style="font-size: clamp(2.5rem, 4vw, 3.75rem);"
        >
          {title}
        </h1>
        <p class="text-sm md:text-base text-gray-700 leading-relaxed mb-8 max-w-sm">
          {description}
        </p>
        <a
          href={cta.href}
          class="inline-block bg-black text-white text-sm font-medium px-7 py-3 w-fit hover:bg-gray-800 transition-colors"
        >
          {cta.label}
        </a>
      </div>

      {/* Right image panel */}
      <div class="flex-1 relative" style="min-height: 400px;">
        <Image
          src={image}
          alt={imageAlt}
          width={900}
          height={600}
          class="w-full h-full object-cover object-center absolute inset-0"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  );
}
