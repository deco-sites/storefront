import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy name */
export interface HMProduct {
  image: ImageWidget;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  href: string;
}

export interface Props {
  title?: string;
  /** @description Imagem lifestyle da esquerda */
  lifestyleImage?: ImageWidget;
  lifestyleImageAlt?: string;
  /** @description Link "Ver todos os produtos" */
  cta?: {
    label: string;
    href: string;
  };
  /** @maxItems 6 */
  products?: HMProduct[];
}

export default function SeatYourBest({
  title = "SEAT YOUR BEST",
  lifestyleImage =
    "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/5c0b538f-11f9-4773-bc3b-329a752b556b___8cd1a22cb96fe48643ca761442dc8195.png",
  lifestyleImageAlt = "Herman Miller showroom",
  cta = { label: "Ver todos os produtos", href: "/cadeiras" },
  products = [
    {
      image:
        "https://hermanmiller.vtexassets.com/arquivos/ids/158847-300-300?width=300&height=300&aspect=true",
      name: "Cadeira Aeron",
      price: "R$ 16.689,00",
      href: "/cadeira-aeron",
    },
    {
      image:
        "https://hermanmiller.vteximg.com.br/arquivos/ids/165500/Mirra-Triflex_MRFN123AWAP-0001_grgr_01.png?v=638712528847970000",
      name: "Cadeira Mirra 2 Triflex",
      price: "R$ 12.870,00",
      href: "/cadeira-mirra-2",
    },
    {
      image:
        "https://hermanmiller.vteximg.com.br/arquivos/ids/159222/Carbono.jpg?v=636972545011330000",
      name: "Cadeira Cosm Média",
      price: "R$ 13.578,75",
      originalPrice: "R$ 15.975,00",
      discount: "-15%",
      href: "/cadeira-cosm",
    },
    {
      image:
        "https://hermanmiller.vtexassets.com/arquivos/ids/158889-300-300?width=300&height=300&aspect=true",
      name: "Cadeira Sayl",
      price: "R$ 9.108,00",
      href: "/cadeira-sayl",
    },
    {
      image:
        "https://hermanmiller.vteximg.com.br/arquivos/ids/165048/PIA1YB325HA-0002_01.jpg?v=638349024953130000",
      name: "Cadeira Verus Interweave",
      price: "R$ 6.867,00",
      href: "/cadeira-verus-interweave",
    },
    {
      image:
        "https://hermanmiller.vteximg.com.br/arquivos/ids/165896/cadeira-Setu-Grafite_CQ51MA-0150_1.jpg?v=638987519344300000",
      name: "Cadeira Setu",
      price: "R$ 7.463,00",
      href: "/cadeira-setu",
    },
  ],
}: Props) {
  return (
    <div class="flex flex-col md:flex-row w-full overflow-hidden" style="min-height: 560px;">
      {/* Left lifestyle image */}
      <div
        class="relative hidden md:block"
        style="flex: 0 0 45%; max-width: 45%; min-height: 560px;"
      >
        <Image
          src={lifestyleImage}
          alt={lifestyleImageAlt}
          width={720}
          height={720}
          class="w-full h-full object-cover object-center absolute inset-0"
          loading="lazy"
        />
      </div>

      {/* Right product grid */}
      <div class="flex-1 flex flex-col items-center justify-center px-6 md:px-10 lg:px-14 py-10 bg-white">
        <h2 class="text-2xl md:text-3xl font-black tracking-wide uppercase text-center mb-8">
          {title}
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-xl">
          {products.map((product) => (
            <a
              key={product.href}
              href={product.href}
              class="group flex flex-col bg-gray-50 hover:bg-gray-100 transition-colors p-3"
            >
              <div class="aspect-square flex items-center justify-center mb-3 bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span class="font-bold text-xs md:text-sm leading-tight mb-1 text-black">
                {product.name}
              </span>
              {product.originalPrice && (
                <span class="text-xs line-through text-gray-400">
                  {product.originalPrice}
                </span>
              )}
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs md:text-sm font-medium text-black">
                  {product.price}
                </span>
                {product.discount && (
                  <span
                    class="text-xs font-bold text-white px-1 py-0.5"
                    style="background-color: #C8102E;"
                  >
                    {product.discount}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        <a
          href={cta.href}
          class="mt-8 flex items-center gap-2 text-sm font-medium text-black hover:underline"
        >
          {cta.label}
          <span>→</span>
        </a>
      </div>
    </div>
  );
}
