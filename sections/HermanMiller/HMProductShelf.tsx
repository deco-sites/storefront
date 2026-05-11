import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useId } from "../../sdk/useId.ts";

/** @titleBy name */
export interface HMProductCard {
  image: ImageWidget;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  href: string;
  rating?: number;
  /** @description Swatches de cor (imagens 48x48) */
  swatches?: {
    image: ImageWidget;
    label: string;
  }[];
}

export interface Props {
  title?: string;
  /** @maxItems 12 */
  products?: HMProductCard[];
}

function StarRating({ rating = 4.5 }: { rating?: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div class="flex gap-0.5 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < full ? "#C8102E" : i === full && half ? "url(#half)" : "none"}
          stroke="#C8102E"
          strokeWidth="1.5"
        >
          {i === full && half && (
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#C8102E" />
                <stop offset="50%" stopColor="white" />
              </linearGradient>
            </defs>
          )}
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: HMProductCard }) {
  return (
    <div class="flex flex-col h-full">
      <StarRating rating={product.rating ?? 4.5} />
      <a href={product.href} class="group flex flex-col flex-1">
        <div class="bg-gray-50 flex items-center justify-center mb-4" style="aspect-ratio: 1; padding: 16px;">
          <Image
            src={product.image}
            alt={product.name}
            width={250}
            height={250}
            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <h3 class="font-bold text-sm md:text-base text-black leading-tight mb-2">
          {product.name}
        </h3>
        {product.originalPrice && (
          <span class="text-xs text-gray-400 line-through">
            {product.originalPrice}
          </span>
        )}
        <div class="flex items-center gap-2 mb-3">
          <span class="text-sm md:text-base font-medium text-black">
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

      {/* Swatches */}
      {product.swatches && product.swatches.length > 0 && (
        <div class="flex items-center gap-1 mb-4 flex-wrap">
          {product.swatches.slice(0, 4).map((swatch) => (
            <div
              key={swatch.label}
              class="w-9 h-9 border border-gray-300 hover:border-gray-600 cursor-pointer overflow-hidden"
              title={swatch.label}
            >
              <Image src={swatch.image} alt={swatch.label} width={36} height={36} class="w-full h-full object-contain" />
            </div>
          ))}
          {product.swatches.length > 4 && (
            <span class="text-xs text-gray-500">+{product.swatches.length - 4}</span>
          )}
        </div>
      )}

      <a
        href={product.href}
        class="text-center text-sm font-medium py-2 border w-full hover:bg-gray-50 transition-colors"
        style="color: #C8102E; border-color: #C8102E;"
      >
        Mais Detalhes
      </a>
    </div>
  );
}

export default function HMProductShelf({
  title = "Mais Vendidos",
  products = [
    {
      image: "https://hermanmiller.vtexassets.com/arquivos/ids/158847-300-300?width=300&height=300&aspect=true",
      name: "Cadeira Aeron",
      price: "R$ 16.689,00",
      href: "/cadeira-aeron",
      rating: 5,
      swatches: [
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/158847-48-48?width=48&height=48&aspect=true", label: "Grafite" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/163851-48-48?width=48&height=48&aspect=true", label: "Preto" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/163814-48-48?width=48&height=48&aspect=true", label: "Mineral" },
      ],
    },
    {
      image: "https://hermanmiller.vtexassets.com/arquivos/ids/158889-300-300?width=300&height=300&aspect=true",
      name: "Cadeira Sayl",
      price: "R$ 9.108,00",
      href: "/cadeira-sayl",
      rating: 4.5,
      swatches: [
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/158889-48-48?width=48&height=48&aspect=true", label: "Preto" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/160660-48-48?width=48&height=48&aspect=true", label: "Branco" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/158894-48-48?width=48&height=48&aspect=true", label: "Coral" },
      ],
    },
    {
      image: "https://hermanmiller.vtexassets.com/arquivos/ids/164548-300-300?width=300&height=300&aspect=true",
      name: "Herman Miller x Logitech G Cadeira Embody Gaming",
      price: "R$ 19.753,00",
      href: "/cadeira-embody-gaming",
      rating: 4.5,
      swatches: [
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/164548-48-48?width=48&height=48&aspect=true", label: "Preto" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/164556-48-48?width=48&height=48&aspect=true", label: "Azul" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/164567-48-48?width=48&height=48&aspect=true", label: "Verde" },
      ],
    },
    {
      image: "https://hermanmiller.vtexassets.com/arquivos/ids/161714-300-300?width=300&height=300&aspect=true",
      name: "Cadeira Verus",
      price: "R$ 7.025,00",
      href: "/cadeira-verus",
      rating: 4.5,
      swatches: [
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/161714-48-48?width=48&height=48&aspect=true", label: "Preto" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/161527-48-48?width=48&height=48&aspect=true", label: "Cinza" },
        { image: "https://hermanmiller.vtexassets.com/arquivos/ids/165394-48-48?width=48&height=48&aspect=true", label: "Branco" },
      ],
    },
  ],
}: Props) {
  const id = useId();

  return (
    <div class="px-5 sm:px-8 md:px-10 py-8 md:py-12">
      {title && (
        <h2 class="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{title}</h2>
      )}
      <div
        id={id}
        class="grid grid-cols-[32px_1fr_32px] grid-rows-[1fr_48px]"
      >
        <Slider class="carousel carousel-center col-span-full row-span-1 gap-4 md:gap-6">
          {products.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[80vw] sm:w-[44vw] md:w-[calc(25%-18px)] flex-none first:pl-0"
            >
              <div class="w-full">
                <ProductCard product={product} />
              </div>
            </Slider.Item>
          ))}
        </Slider>

        {/* Prev */}
        <div class="col-start-1 row-start-2 flex items-center justify-center z-10">
          <Slider.PrevButton
            class="btn btn-circle btn-outline btn-sm border-gray-300 bg-white"
            disabled={false}
          >
            <Icon id="chevron-right" class="rotate-180" size={16} />
          </Slider.PrevButton>
        </div>
        {/* Dots */}
        <ul class="col-start-2 row-start-2 flex items-center justify-center gap-2">
          {products.map((_, index) => (
            <li key={index} class="carousel-item">
              <Slider.Dot
                index={index}
                class="w-3 h-3 rounded-full bg-gray-300 disabled:bg-black transition-colors no-animation"
              />
            </li>
          ))}
        </ul>
        {/* Next */}
        <div class="col-start-3 row-start-2 flex items-center justify-center z-10">
          <Slider.NextButton
            class="btn btn-circle btn-outline btn-sm border-gray-300 bg-white"
            disabled={false}
          >
            <Icon id="chevron-right" size={16} />
          </Slider.NextButton>
        </div>

        <Slider.JS rootId={id} />
      </div>
    </div>
  );
}
