import type { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface Props {
  badge?: string;
  title?: string;
  description?: HTMLWidget;
  cta?: {
    label: string;
    href: string;
  };
  image?: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
  };
}

export default function OutletSplitBanner({
  badge = "ATÉ 50% OFF",
  title = "Seleção Outlet",
  description =
    "Descubra uma seleção de cadeiras, mesas e acessórios com até 50% de desconto. Últimas unidades disponíveis. Enquanto durarem os estoques.",
  cta = { label: "Compre agora", href: "/outlet" },
  image = {
    desktop:
      "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/83643eab-6bee-4584-9268-d984da98faf5___70117e22b95af6b9b52a16d06b40f888.png",
    mobile:
      "https://hermanmiller.vtexassets.com/assets/vtex.file-manager-graphql/images/83643eab-6bee-4584-9268-d984da98faf5___70117e22b95af6b9b52a16d06b40f888.png",
    alt: "Seleção Outlet Herman Miller",
  },
}: Props) {
  return (
    <div class="flex flex-col md:flex-row w-full overflow-hidden" style="min-height: 420px;">
      {/* Left text panel */}
      <div class="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-12 bg-white border border-gray-100"
        style="flex: 0 0 47%; max-width: 47%;">
        {badge && (
          <span class="text-xs font-medium tracking-widest text-gray-500 uppercase mb-3">
            {badge}
          </span>
        )}
        <h2
          class="font-black text-black leading-none mb-5"
          style="font-size: clamp(2rem, 4vw, 3.25rem);"
        >
          {title}
        </h2>
        {description && (
          <p
            class="text-sm md:text-base text-gray-600 leading-relaxed mb-8 max-w-xs"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
        <a
          href={cta.href}
          class="inline-block bg-black text-white text-sm font-medium px-7 py-3 w-fit hover:bg-gray-800 transition-colors"
        >
          {cta.label}
        </a>
      </div>

      {/* Right image */}
      <div class="flex-1 relative" style="min-height: 360px;">
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={image.mobile}
            width={768}
            height={500}
          />
          <Source
            media="(min-width: 768px)"
            src={image.desktop}
            width={900}
            height={560}
          />
          <img
            src={image.desktop}
            alt={image.alt ?? title}
            class="w-full h-full object-cover object-center absolute inset-0"
            loading="lazy"
          />
        </Picture>
      </div>
    </div>
  );
}
